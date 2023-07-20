import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_state } from '../../../redux/actions/cartStateAction';
import { systemSettings } from '../../../redux/actions/systemSettingsAction';
import './optionPicker.css';

const PaymentChoice = ({ setState, state }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(systemSettings());
  }, []);

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const cartstate = useSelector((state) => state.cartStateReducer);

  const { settings } = settingsstate;

  const bg = settings[0]?.color[0]?.bgColor;

  //console.log(cartstate.payment);

  function handleChange(event) {
    setState(event.target.value);
    dispatch(cart_state({ payment: event.target.value }));
  }
  return (
    <div className='border-1 border-red-500 flex justify-center'>
      {settings[0]?.payments.map((payment) => {
        if (payment.value === 'paypal' && settings[0]?.merchantID.length < 2) {
          return;
        }
        return (
          <div
            className={`${
              state != '' && state === payment.value ? `${bg} rounded-lg` : ''
            }`}
          >
            <input
              checked={settings[0]?.payments.length === 1 ? 'checked' : null}
              type='radio'
              id={payment.value}
              name='payment'
              value={payment.value}
              onChange={(e) => {
                if (settings[0]?.payments.length === 1) {
                  setState(payment.value);
                  dispatch(cart_state({ payment: payment.value }));
                } else {
                  handleChange(e);
                }
              }}
            ></input>
            <label className='inline-block w-40' for={payment.value}>
              <div>
                <div className='flex justify-center'>
                  <img
                    src={`/images/${payment.value}.png`}
                    alt={`${payment.value}.png`}
                    className='max-h-[50px] mx-auto'
                  />
                  <img
                    src='/images/sofort.png'
                    alt='sofort.png'
                    className={`max-h-[50px] mx-auto ${
                      payment.value === 'paypal' ? '' : 'hidden'
                    }`}
                  />
                </div>
                <div
                  className={`${
                    cartstate.payment === 'paypal' ? 'hidden' : null
                  }`}
                >
                  <img
                    src='/images/giropaywhite.png'
                    alt='giropaywhite.png'
                    className={`max-h-[50px] max-w-[70px] mx-auto rounded-r-[5px] rounded-l-[6px] ${
                      payment.value === 'paypal' ? null : 'hidden'
                    }`}
                  />
                </div>
                <div
                  className={`${
                    cartstate.payment === 'paypal' ? null : 'hidden'
                  }`}
                >
                  <img
                    src='/images/giropay.png'
                    alt='giropay.png'
                    className={`max-h-[50px] max-w-[70px] mx-auto  ${
                      payment.value === 'paypal' ? null : 'hidden'
                    }`}
                  />
                </div>
              </div>

              <div
                className={`${
                  payment.label === 'Bargeld' ? 'mt-[30px]' : null
                } text-center`}
              >
                {payment.label === 'PayPal' ? 'Online bezahlen' : payment.label}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentChoice;
