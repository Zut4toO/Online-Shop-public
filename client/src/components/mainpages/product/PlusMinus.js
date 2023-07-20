import React, { useState } from 'react';

function PlusMinus({ quantity, setQuantity }) {
  const decrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <div>
      <div className='container '>
        <div className='grid grid-cols-12 text-center'>
          <button
            className='col-span-3 bg-gray-400 font-bold'
            onClick={decrementQuantity}
          >
            -
          </button>
          {/* Menger muss zwischen 1 und 20 sein! */}
          {/* Why type = tel? bug...? */}
          <input
            type='tel'
            value={
              quantity < 1
                ? setQuantity(1)
                : quantity > 20
                ? setQuantity(20)
                : quantity
            }
            min='1'
            max='9'
            id='typeNumber'
            class='form-control col-span-6 bg-gray-700 text-center font-semibold'
          />
          <button
            className='col-span-3 bg-gray-400 font-bold'
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlusMinus;
