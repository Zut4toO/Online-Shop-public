// Shop https://www.youtube.com/watch?v=v2ob3bpaLP8
// React-Select https://www.youtube.com/watch?v=n02t9wvd6hs
// priceHandler https://www.youtube.com/watch?v=DmRuFl3tqFE

import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PlusMinus from './PlusMinus';
import { addToCart } from '../../../redux/actions/cartActions';
import { showToast } from '../../../redux/actions/toastAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/accordion';

const Dishes = ({ dish }) => {
  function customThemePrice(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 4,
      backgroundColor: code,
      colors: {
        ...theme.colors,
        primary25: '#fff',
        primary: code,
      },
    };
  }
  function customThemeAdded(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 4,
      colors: {
        ...theme.colors,
        primary25: '#86efac',
        primary: '#6b7280',
      },
    };
  }

  function customThemeRemoved(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 4,
      colors: {
        ...theme.colors,
        primary25: '#fca5a5',
        primary: '#6b7280',
      },
    };
  }
  const animatedComponents = makeAnimated();

  const [variant, setVariant] = useState(dish.variants[0].price);
  const [variantName, setVariantName] = useState(dish.variants[0].label);
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState([]);
  const [removeIng, setRemoveIng] = useState([]);
  const [imageFound, setImageFound] = useState(dish.image);
  const priceHandler = (e) => {
    setVariant(e.price);
    setVariantName(e.label);
  };
  const formatVariant = ({ label, price }) => (
    <div className='flex font-semibold'>
      <div>{label}</div>
      <div className='pl-2'>{(Math.round(price * 100) / 100).toFixed(2)}€</div>
    </div>
  );

  const formatToppings = ({ label, value }) => (
    <div className='flex font-semibold'>
      <div>{label}</div>
      <div className='pl-2'>{(Math.round(value * 100) / 100).toFixed(2)}€</div>
    </div>
  );

  let sumOfToppings = 0;

  toppings.forEach((extra) => {
    sumOfToppings = sumOfToppings + parseFloat(extra.value);
  });

  const total = (parseFloat(variant) + parseFloat(sumOfToppings)) * quantity;

  const cartstate = useSelector((state) => state.cartReducer);

  const { status } = cartstate;

  const dispatch = useDispatch();
  function addtocart() {
    dispatch(
      addToCart(
        dish,
        quantity,
        variant,
        variantName,
        toppings,
        removeIng,
        sumOfToppings,
        false
      )
    );

    dispatch(showToast('added'));
  }

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;
  const text = settings[0]?.color[0]?.textColor;
  const code = settings[0]?.color[0]?.code;

  return (
    <div>
      <div class='w-[21rem]'>
        {/* H-Full Notwendigkeit überprüfen */}
        <div
          class={`pb-0 md:pb-2 md:py-4 py:0 md:px-4 px-0 border-t-4 border-l-4 border-r-4 bg-gray-700 ${border} rounded-t-lg h-full justify-center`}
        >
          <div className='md:block flex  justify-center'>
            <div className='md:mx-5 md:mt-5 mx-1 mt-1 md:pl-[0px] pl-[1px]'>
              {/* Achtung Bild evetuell nicht zentriert */}
              {imageFound != undefined ? (
                <img
                  src={dish.image}
                  alt='dishes.png'
                  className='md:w-64 md:h-64 rounded md:full w-[122px] h-[122px]'
                  onError={() => setImageFound(undefined)}
                ></img>
              ) : (
                <div className='md:w-64 md:h-64 w-[122px] h-[122px] bg-gray-800 notimage'>
                  <div className='md:pt-10 pt:2'>
                    <div className='flex justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='md:w-24 md:h-24 w-16 h-16 text-white'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
                        />
                      </svg>
                    </div>
                    <div className='text-white font-bold text-center md:mt-5 mt-0'>
                      Kein Bild verfügbar
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`${
                imageFound === undefined
                  ? 'md:w-[256px] w-full'
                  : 'md:w-[256px] w-[197.88px]'
              } block md:mx-5 md:mt-5 mr-1 mt-1 w-full`}
            >
              {/* Choose Size */}
              <div
                className={`md:font-semibold font-semibold text-sm md:w-[100%] `}
              >
                <div className='pb-1'>
                  <Select
                    options={dish.variants}
                    formatOptionLabel={formatVariant}
                    theme={customThemePrice}
                    onChange={priceHandler}
                    placeholder='Größe wählen'
                    defaultValue={dish.variants}
                    components={animatedComponents}
                    isSearchable={false}
                  />
                </div>
                {/* Select Extras*/}
                <div className='pb-1'>
                  <Select
                    isOptionSelected={(option, selectValue) =>
                      selectValue.some((i) => i === option)
                    }
                    options={dish.selectedToppings}
                    formatOptionLabel={formatToppings}
                    theme={customThemeAdded}
                    onChange={setToppings}
                    placeholder='Extras hinzufügen'
                    isMulti
                    autoFocus
                    noOptionsMessage={() => 'Keine weiteren Extras verfügbar'}
                    components={animatedComponents}
                    isSearchable={false}
                  />
                </div>
                {/* Deselect Extras*/}

                <Select
                  options={dish.selectedRemovedToppings}
                  theme={customThemeRemoved}
                  onChange={setRemoveIng}
                  placeholder='Zutaten entfernen'
                  isMulti
                  autoFocus
                  noOptionsMessage={() =>
                    'Es steht nichts mehr zur Abwahl bereits'
                  }
                  components={animatedComponents}
                  isSearchable={false}
                />
              </div>
              {dish.selectedAdditives.length > 0 ? (
                <div className='flex justify-end items-center'>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton>
                        <div className='text-white'>Zusatzstoffe anzeigen</div>
                      </AccordionButton>
                      {dish.selectedAdditives.map((test) => {
                        return (
                          <AccordionPanel>
                            <div className='text-white mr-1'>{test.label}</div>
                          </AccordionPanel>
                        );
                      })}
                    </AccordionItem>
                  </Accordion>
                </div>
              ) : (
                <div className='pt-6'></div>
              )}
            </div>
          </div>

          <div class='flex justify-between md:pl-0 pl-5'>
            <div class='md:py-4 py-1'>
              <p class='text-sm font-semibold text-gray-400'>Artikel</p>
              <p class={`text-lg font-semibold ${text}`}>{dish.name}</p>
            </div>
            <div class='md:py-4 py-1 md:pr-0 pr-4'>
              <p class='text-sm font-semibold text-gray-400'>Betrag</p>
              <p class={`text-lg font-semibold ${text}`}>
                {(Math.round(total * 100) / 100).toFixed(2)}€
              </p>
            </div>
          </div>
        </div>
        <div class='w-full'>
          <div class='container'>
            <div className='grid grid-cols-12 dishess-center'>
              <div
                className={`col-span-4 bg-gray-500 py-4 px-6 rounded-bl-lg border-l-4 border-b-4 ${border}`}
              >
                <PlusMinus quantity={quantity} setQuantity={setQuantity} />
              </div>
              <button
                className={`col-span-8 ${bg} py-4 px-6 rounded-br-lg flex justify-center cursor-pointer`}
                onClick={addtocart}
              >
                <div className='font-bold pr-2'>Hinzufügen</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  viewBox='0 0 576 512'
                >
                  <path d='M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM272 180H316V224C316 235 324.1 244 336 244C347 244 356 235 356 224V180H400C411 180 420 171 420 160C420 148.1 411 140 400 140H356V96C356 84.95 347 76 336 76C324.1 76 316 84.95 316 96V140H272C260.1 140 252 148.1 252 160C252 171 260.1 180 272 180zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dishes;
