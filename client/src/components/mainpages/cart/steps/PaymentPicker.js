import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cart_state } from '../../../../redux/actions/cartStateAction';
import PaymentChoice from '../PaymentChoice';

const PaymentPicker = () => {
  const cartstate = useSelector((state) => state.cartStateReducer);

  const [sliderPaymentValue, setSliderPaymentValue] = useState(
    cartstate.payment
  );
  const [message, setMessage] = useState('');

  console.log(message);

  const dispatch = useDispatch();
  const handleMessage = (e) => {
    setMessage(e.target.value);
    dispatch(cart_state({ message: e.target.value }));
  };

  return (
    <div className='h-[350px]'>
      <div className=' flex items-center justify-center text-lg text-white font-semibold mb-10'>
        <PaymentChoice
          setState={setSliderPaymentValue}
          state={sliderPaymentValue}
        />
      </div>
      <div className='mb-4 w-[90%] mx-auto'>
        <label for='message' class='block mb-2 text-sm font-medium text-white'>
          <div className='flex'>
            <div>Anmerkung zur Bestellung</div> ({<div>{message.length}</div>}
            <div>/60 Zeichen</div>)
          </div>
        </label>
        <textarea
          id='message'
          rows='2'
          maxLength={60}
          onChange={handleMessage}
          placeholder='z.B. Wünsche oder Hinweise'
          class='outline-none p-2.5 w-full text-sm text-white rounded-lg border-2 border-gray-600 bg-gray-700'
        ></textarea>
      </div>
    </div>
  );
};

export default PaymentPicker;
