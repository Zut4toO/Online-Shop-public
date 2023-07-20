// Mindestbestellwert fehlt

import React from 'react';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { orderSuccessRemoveFromCart } from '../../../redux/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingMedium from '../../utils/loading/LoadingMedium';

const PayPalFeeButton = ({}) => {
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
    message,
    distance,
  } = cartState;

  //console.log(timeValidation, acceptBox, sliderDeliveryValue, message);

  //console.log(distance);
  console.log('final', cartState.acceptBox);

  const carttotal =
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

  //console.log(carttotal);
  //console.log(distance.value);
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
          if (timeValidation !== true) {
            tempError = true;
            toast.error(`Außerhalb unserer Bestellzeiten.`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          console.log('acceptBox', acceptBox);

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
          //actions.order.capture();
          axios.post(`/api/orders/${data.orderID}/capture`).then(() => {
            axios
              .post(
                '/api/paypalpayment',
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
        onCancel={() => {
          toast.error('Zahlung abgebrochen', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }}
        onError={(error) => {
          //setPaid(false);
          //console.log('error', error);
          toast.error('Zahlung nicht erfolgreich', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }}
      />
    </>
  );
};

export default PayPalFeeButton;

/* 
      <PayPalButtons
        key={Math.random()}
        //onClick={(data, actions) => {}}
        createOrder={(data, actions) => {
          let tempError = false;
          console.log(paypaylState);
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
                // payee: {
                //   email_address: '',
                // },
              },
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            },
          });
        }}
        onApprove={(data, actions) => {
          actions.order.capture().then(() => {
            axios
              .post(
                '/api/paypalpayment',
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
          });
        }}
        onCancel={() => {
          toast.error('Zahlung abgebrochen', {
            position: toast.POSITION.BOTTOM_RIGHT,
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
