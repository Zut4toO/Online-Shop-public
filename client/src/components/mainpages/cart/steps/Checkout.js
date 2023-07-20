import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { cart_state } from '../../../../redux/actions/cartStateAction';
import { orderSuccessRemoveFromCart } from '../../../../redux/actions/cartActions';
import CashButton from '../CashButton';
import PayPalButton from '../PayPalButton';
import LoadingMedium from '../../../../components/utils/loading/LoadingMedium';

const Checkout = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const cartstateItems = useSelector((state) => state.cartReducer);
  const cartstate = useSelector((state) => state.cartStateReducer);
  const token = useSelector((state) => state.token);
  const { settings } = settingsstate;
  const cartItems = cartstateItems.cartItems;

  const text = settings[0]?.color[0]?.textColor;
  const accent = settings[0]?.color[0]?.accentColor;

  const notificiation = settings[0]?.notification[0]?.value;
  const notificiationMail = settings[0]?.notificationMail;

  const [loading, setLoading] = useState(false);

  const [acceptBox, setacceptBox] = useState(false);

  const sliderDeliveryValue = cartstate.sliderDeliveryValue;
  const sliderPaymentValue = cartstate.payment;
  const timeValidation = cartstate.timeValidation;
  const message = cartstate.message;
  const time = cartstate.time;
  const distance = cartstate.distance ?? { text: '0 km', value: 0 };

  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(cart_state({ acceptBox: !acceptBox }));
    setacceptBox(!acceptBox);
  };

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
  let productPrice = cartItems.reduce((x, item) => x + item.price, 0);

  const cashTranSuccess = async () => {
    const paymentID = '#' + Math.floor(100000000 + Math.random() * 100000000);
    // Überprüfe Uhrzeit, Mindestbestellwert, Bei Lieferung + Lieferkosten
    if (sliderDeliveryValue === '') {
      toast.error(`Bitte wähle eine Liefermethode aus`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }

    if (sliderDeliveryValue === 'lieferung') {
      setLoading(true);
      if (carttotal < settings[0]?.minDeliveryAmount) {
        toast.error(`Mindestbestellwert ${settings[0]?.minDeliveryAmount}€`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        return false;
      }
      /* Hier Zeit überprüfen */
      if (!timeValidation) {
        toast.error(`Außerhalb unserer Bestellzeiten.`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        return false;
      }
      if (!acceptBox) {
        toast.error(`Bitte akzeptiere die ABGs`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        return false;
      }
      await axios.post(
        '/api/cashpayment',
        {
          cartItems,
          paymentID,
          time,
          sliderDeliveryValue,
          carttotal,
          message,
          notificiation,
          notificiationMail,
        },
        {
          headers: { Authorization: token },
        }
      );
      setTimeout(() => {
        cartItems.map((remove) => {
          dispatch(orderSuccessRemoveFromCart(remove));
        });
        toast.success(
          'Bestellung erfolgreich abgeschlossen. Mehr inofs findest du hier',
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        setLoading(false);
      }, 1000);
    } else if (sliderDeliveryValue === 'abholung') {
      setLoading(true);
      if (carttotal < 2) {
        toast.error(`Mindestbestellwert 2.00€`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        return false;
      }
      /* Hier Zeit überprüfen */
      if (!timeValidation) {
        toast.error('Außerhalb unserer Bestellzeiten.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        return false;
      }
      if (!acceptBox) {
        toast.error(`Bitte akzeptiere die ABGs`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        return false;
      }
      await axios.post(
        '/api/cashpayment',
        {
          cartItems,
          paymentID,
          time,
          sliderDeliveryValue,
          carttotal,
          message,
          notificiation,
          notificiationMail,
        },
        {
          headers: { Authorization: token },
        }
      );
      setTimeout(() => {
        cartItems.map((remove) => {
          dispatch(orderSuccessRemoveFromCart(remove));
        });
        toast.success(
          'Bestellung erfolgreich. Weitere Details per Mail und in deiner Historie',
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
      toast.error(`Mindestbestellwert 2.00€`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div>
      <div className='flex justify-center'>
        {loading ? <LoadingMedium /> : <div></div>}
      </div>
      <div className={`${loading ? 'hidden' : ''} h-[350px]`}>
        <div className='text-xs text-white text-center pb-4 select-none'>
          <label>
            <input
              type='checkbox'
              className={`${accent} mr-1`}
              checked={acceptBox}
              onChange={handleAccept}
            />
            Ich erkläre mich mit den{' '}
            <span className={`${text}`}>
              {/* <Link to='/agb'> */}
              AGBs
              {/* </Link> */}
            </span>{' '}
            einverstanden. Ich habe die{' '}
            <span className={`${text}`}>
              {/* <Link to='/privacy'> */}
              Datenschutzerklärung
              {/* </Link> */}
            </span>{' '}
            und die{' '}
            <span className={`${text}`}>
              {/* <Link to='/cookies'> */}
              Hinweise zu Cookies
              {/* </Link> */}
            </span>{' '}
            zur Kenntnis genommen
          </label>
        </div>

        <div className='pb-4'>
          <div
            className={`${
              sliderDeliveryValue != 'lieferung' ? 'hidden' : null
            }`}
          >
            <div class='flex justify-center items-end'>
              <div class='text-sm font-medium text-white mr-1 '>Ware:</div>
              <span class={`text-sm font-medium text-white `}>
                {/* {(Math.round(settings.delivery === "lieferung"?carttotal + 2: carttotal * 100) / 100).toFixed(2)} */}
                {(Math.round(productPrice * 100) / 100).toFixed(2)}€
              </span>
            </div>
            <div class='flex justify-center items-end'>
              <div class='text-sm font-medium text-white mr-1 '>
                Lieferkosten:
              </div>
              <span class={`text-sm font-medium  text-white`}>
                {/* {(Math.round(settings.delivery === "lieferung"?carttotal + 2: carttotal * 100) / 100).toFixed(2)} */}
                {(
                  Math.round(
                    parseFloat(
                      distance.value === 0
                        ? 0
                        : distance.value / 1000 <=
                          settings[0]?.deliveryFirstDistance
                        ? (
                            Math.round(settings[0]?.deliveryFirstPrice * 100) /
                            100
                          ).toFixed(2)
                        : distance.value / 1000 <=
                          settings[0]?.deliverySecondDistance
                        ? (
                            Math.round(settings[0]?.deliverySecondPrice * 100) /
                            100
                          ).toFixed(2)
                        : distance.value / 1000 <=
                          settings[0]?.deliveryThirdDistance
                        ? (
                            Math.round(settings[0]?.deliveryThirdPrice * 100) /
                            100
                          ).toFixed(2)
                        : 0
                    ) * 100
                  ) / 100
                ).toFixed(2)}
                €
              </span>
            </div>
          </div>
          <div class='flex justify-center items-end'>
            <div class='text-sm font-medium text-white mr-1 pb-0.5'>Summe:</div>
            <span class={`text-lg font-bold ${text}`}>
              {/* {(Math.round(settings.delivery === "lieferung"?carttotal + 2: carttotal * 100) / 100).toFixed(2)} */}
              {(Math.round(carttotal * 100) / 100).toFixed(2)}€
            </span>
          </div>
          <div className='text-white text-xs flex justify-center'>
            inkl. MwSt.
          </div>
        </div>

        <div className='flex justify-center'>
          {sliderPaymentValue === '' ? (
            ''
          ) : sliderPaymentValue === 'bargeld' ? (
            <div onClick={cashTranSuccess}>
              <CashButton />
            </div>
          ) : (
            <div>
              <PayPalButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
