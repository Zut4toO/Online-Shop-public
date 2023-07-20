import React from 'react';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { orderSuccessRemoveFromCart } from '../../../redux/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingMedium from '../../utils/loading/LoadingMedium';

const PayPalFeeGuestButton = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;

  let ids = cartItems.map((obj) => {
    return { id: obj._id, price: obj.price };
  });

  const cartState = useSelector((state) => state.cartStateReducer);
  const {
    time,
    timeValidation,
    acceptBox,
    sliderDeliveryValue,
    guestData,
    message,
    distance,
  } = cartState;

  var carttotal =
    sliderDeliveryValue === 'lieferung'
      ? cartItems.reduce((x, item) => x + item.price, 0) +
        parseFloat(
          distance.value === 0
            ? 0
            : distance.value / 1000 <= settings[0]?.deliveryFirstDistance
            ? (Math.round(settings[0]?.deliveryFirstPrice * 100) / 100).toFixed(
                2
              )
            : distance.value / 1000 <= settings[0]?.deliverySecondDistance
            ? (
                Math.round(settings[0]?.deliverySecondPrice * 100) / 100
              ).toFixed(2)
            : distance.value / 1000 <= settings[0]?.deliveryThirdDistance
            ? (Math.round(settings[0]?.deliveryThirdPrice * 100) / 100).toFixed(
                2
              )
            : 0
        )
      : cartItems.reduce((x, item) => x + item.price, 0);

  const notificiation = settings[0]?.notification[0]?.value;
  const notificiationMail = settings[0]?.notificationMail;

  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {isPending ? <LoadingMedium /> : null}
      <PayPalButtons
        key={Math.random()}
        //onClick={(data, actions) => {}}
        createOrder={(data, actions) => {
          let tempError = false;
          if (sliderDeliveryValue === '') {
            tempError = true;
            toast.error(`Bitte wähle eine Liefermethode aus.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (
            cartItems.reduce((x, item) => x + item.price, 0) <
            settings[0]?.minDeliveryAmount
          ) {
            tempError = true;
            toast.error(`Warenmindestwert ${settings[0]?.minDeliveryAmount}€`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (
            cartItems.reduce((x, item) => x + item.price, 0) <
            settings[0]?.minPayPalAmount
          ) {
            tempError = true;
            toast.error(`Warenmindestwert ${settings[0]?.minPayPalAmount}€`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (
            guestData.firstName === undefined ||
            guestData.lastName === undefined ||
            guestData.street === undefined ||
            guestData.streetNumber === undefined ||
            guestData.city === undefined ||
            guestData.zipCode === undefined ||
            guestData.email === undefined ||
            guestData.telefon === undefined
          ) {
            tempError = true;
            toast.error(`Bitte gib die benötigten Kontaktdaten an.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (timeValidation !== true) {
            tempError = true;
            toast.error(`Außerhalb unserer Bestellzeiten.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (acceptBox !== true) {
            tempError = true;
            toast.error(`Bitte akzeptiere die ABGs.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (tempError) {
            actions.disable();
          }
          return axios
            .post('/api/orders', { ids, carttotal })
            .then((response) => {
              return response.data.id;
            });
        }}
        onApprove={(data, actions) => {
          axios.post(`/api/orders/${data.orderID}/capture`).then(() => {
            axios
              .patch(
                `/api/guestpaypalpayment/`,
                {
                  cartItems: cartItems,
                  //paymentID: data.orderID,
                  paymentID:
                    '#' + Math.floor(100000000 + Math.random() * 100000000),
                  time: time,
                  sliderDeliveryValue: sliderDeliveryValue,
                  carttotal: carttotal,
                  notificiation: notificiation,
                  notificiationMail: notificiationMail,
                  message: message,
                },
                {
                  headers: { Authorization: token },
                }
              )
              .then(() => {
                cartItems.map((remove) => {
                  dispatch(orderSuccessRemoveFromCart(remove));
                });
                toast.success('Bestellung erfolgreich abgeschlossen.', {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              });
          });
        }}
        onError={() => {
          //setPaid(false);
          toast.error('Zahlung nicht erfolgreich', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }}
      />
    </>
  );
};

export default PayPalFeeGuestButton;

/* 
<PayPalButtons
        key={Math.random()}
        //onClick={(data, actions) => {}}
        createOrder={(data, actions) => {
          let tempError = false;
          if (sliderDeliveryValue == '') {
            tempError = true;
            toast.error(`Bitte wähle eine Liefermethode aus.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (carttotal <= settings[0]?.minDeliveryAmount) {
            tempError = true;
            toast.error(
              `Mindestbestellwert ${settings[0]?.minDeliveryAmount}€`,
              {
                position: toast.POSITION.BOTTOM_RIGHT,
              }
            );
          }
          if (
            guestData.firstName === undefined ||
            guestData.lastName === undefined ||
            guestData.street === undefined ||
            guestData.streetNumber === undefined ||
            guestData.city === undefined ||
            guestData.zipCode === undefined ||
            guestData.email === undefined ||
            guestData.telefon === undefined
          ) {
            tempError = true;
            toast.error(`Bitte gib die benötigten Kontaktdaten an.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (timeValidation != true) {
            tempError = true;
            toast.error(`Außerhalb unserer Bestellzeiten.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (acceptBox != true) {
            tempError = true;
            toast.error(`Bitte akzeptiere die ABGs.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          if (tempError) {
            actions.disable();
          }
          return actions.order.create({
            purchase_units: [
              {
                description: 'Restaurant',
                amount: {
                  value: carttotal,
                  currency_code: 'EUR',
                },
               payee: {
                  email_address: 'codeslmontage@gmail.com'
                }, 
              },
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            },
          });
        }}
        onApprove={(data, actions) => {
          axios
            .patch(
              `/api/guestpaypalpayment/`,
              {
                cartItems: cartItems,
                //paymentID: data.orderID,
                paymentID:
                  '#' + Math.floor(100000000 + Math.random() * 100000000),
                time: time,
                sliderDeliveryValue: sliderDeliveryValue,
                carttotal: carttotal,
                notificiation: notificiation,
                notificiationMail: notificiationMail,
              },
              {
                headers: { Authorization: token },
              }
            )
            .then(() => {
              cartItems.map((remove) => {
                dispatch(orderSuccessRemoveFromCart(remove));
              });
              toast.success('Bestellung erfolgreich abgeschlossen.', {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            });
        }}
        onError={() => {
          //setPaid(false);
          toast.error('Zahlung nicht erfolgreich', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }}
      />
*/
