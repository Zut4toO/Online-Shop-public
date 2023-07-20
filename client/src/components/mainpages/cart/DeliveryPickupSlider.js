import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_state } from '../../../redux/actions/cartStateAction';
import { systemSettings } from '../../../redux/actions/systemSettingsAction';
import './optionPicker.css';

const DeliveryPickupSlider = ({ setState, state }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(systemSettings());
  }, []);

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const bg = settings[0]?.color[0]?.bgColor;

  function handleChange(event) {
    setState(event.target.value);
    dispatch(
      cart_state({
        sliderDeliveryValue: event.target.value,
        timeValidation: false,
        time: new Date(),
      })
    );
  }

  return (
    <div className='border-1 border-red-500 flex justify-center'>
      {settings[0]?.delivery.map((deliveryOption) => {
        return (
          <div
            className={`${
              state != '' && state === deliveryOption.value
                ? `${bg} rounded-lg border-2 mx-1`
                : 'rounded-lg border-2 mx-1'
            }`}
          >
            <input
              checked={settings[0]?.delivery.length === 1 ? 'checked' : null}
              type='radio'
              id={deliveryOption.value}
              name='delivery'
              value={deliveryOption.value}
              onChange={(e) => {
                if (settings[0]?.delivery.length === 1) {
                  setState(deliveryOption.value);
                  dispatch(
                    cart_state({
                      sliderDeliveryValue: deliveryOption.value,
                      timeValidation: false,
                      time: new Date(),
                    })
                  );
                } else {
                  handleChange(e);
                }
              }}
            ></input>
            <label className='inline-block w-32' for={deliveryOption.value}>
              <div className='text-center'>{deliveryOption.label}</div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryPickupSlider;
