import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../redux/actions/cartActions';
import { deleteFromCart } from '../../../redux/actions/cartActions';
import { systemSettings } from '../../../redux/actions/systemSettingsAction';
import { useSelector, useDispatch } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/de';
import Stepper from './Stepper';
import StepperGuest from './StepperGuest';
import StepperControl from './StepperControl';
import StepperControlGuest from './StepperControlGuest';
import DeliveryMethod from './steps/DeliveryMethod';
import TimePicker from './steps/TimePicker';
import PaymentPicker from './steps/PaymentPicker';
import Checkout from './steps/Checkout';
import LoginGuest from './stepsGuest/LoginGuest';
import DeliveryMethodGuest from './stepsGuest/DeliveryMethodGuest';
import TimePickerGuest from './stepsGuest/TimePickerGuest';
import PaymentPickerGuest from './stepsGuest/PaymentPickerGuest';
import CheckoutGuest from './stepsGuest/CheckoutGuest';
dayjs.extend(customParseFormat);
dayjs.locale('de');

const initialOptions = {
  'client-id':
    'Ae52VE3BpkZmpWsqKR56DSQg8J2g_2Rfq0vvjamrjQiFfiTH2IB9W3Wyw6wGvJeMJNpxAciQrxF0nwTe',
  components: 'buttons',
  'data-namespace': 'PayPalSDK',
  currency: 'EUR',
  intent: 'capture',
  'enable-funding': ['sofort', 'giropay'],
  'disable-funding': ['card', 'sepa'],
};

const CartScreen = () => {
  const auth = useSelector((state) => state.auth);

  const { isLogged } = auth;
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(systemSettings());
  }, []);

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const hoverText = settings[0]?.color[0]?.hoverText;

  const [activeSub, setActiveSub] = useState(['PLACEHOLDER']);

  useEffect(() => {
    const getSubscriptionValue = async () => {
      const res = await axios.get('/api/activesubscription', {
        headers: { Authorization: token },
      });
      setActiveSub(
        res.data.filter(
          (data) => data.subscriptionStatus === 'BILLING.SUBSCRIPTION.ACTIVATED'
        )
      );
    };
    getSubscriptionValue();
  }, [token]);

  const cartstateItems = useSelector((state) => state.cartReducer);
  const cartItems = cartstateItems.cartItems;

  const [checkTotal, setCheckTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setCheckTotal(cartItems.reduce((x, item) => x + item.price, 0));
  }, [refresh]);

  const [todayClosed, setTodayClosed] = useState();

  const checkDay = () => {
    switch (dayjs().day()) {
      case 0:
        return settings[0]?.isClosedSunday[0]?.label === 'Geschlossen'
          ? setTodayClosed(true)
          : '';
      case 1:
        return settings[0]?.isClosedMonday[0]?.label === 'Geschlossen'
          ? setTodayClosed(true)
          : '';
      case 2:
        return settings[0]?.isClosedTuesday[0]?.label === 'Geschlossen'
          ? setTodayClosed(true)
          : '';
      case 3:
        return settings[0]?.isClosedWednesday[0]?.label === 'Geschlossen'
          ? setTodayClosed(true)
          : '';
      case 4:
        return settings[0]?.isClosedThursday[0]?.label === 'Geschlossen'
          ? setTodayClosed(true)
          : '';
      case 5:
        return settings[0]?.isClosedFriday[0]?.label === 'Geschlossen'
          ? setTodayClosed(true)
          : '';
      case 6:
        return settings[0]?.isClosedSaturday[0]?.label === 'Geschlossen'
          ? setTodayClosed(true)
          : '';
    }
  };

  useEffect(() => {
    checkDay();
  }, [todayClosed]);

  const cartstate = useSelector((state) => state.cartStateReducer);
  const distance = cartstate.distance;

  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Liefermethode', 'Uhrzeit', 'Zahlungsmethode', 'Bezahlen'];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <DeliveryMethod />;
      case 2:
        return <TimePicker />;
      case 3:
        return <PaymentPicker />;
      case 4:
        return <Checkout />;
      default:
    }
  };

  const handleClickDirection = useCallback(
    (direction) => {
      let newStep = currentStep;

      direction === 'next' ? newStep++ : newStep--;

      if (newStep < currentStep) {
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        return;
      }

      //console.log('validation', cartstate.timeValidation);
      // check if steps are within bounds
      if (currentStep === 1 && cartstate.sliderDeliveryValue === undefined) {
        toast.error(`Bitte wähle eine Liefermethode aus`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      if (
        currentStep === 1 &&
        cartstate.sliderDeliveryValue === 'lieferung' &&
        distance.value / 1000 > settings[0]?.deliveryThirdDistance
      ) {
        toast.error(
          `Leider können wir diese Adresse aufgrund der Entfernung nicht beliefern.`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        return;
      }
      if (
        currentStep === 1 &&
        cartstate.sliderDeliveryValue === 'lieferung' &&
        checkTotal < settings[0]?.minDeliveryAmount
      ) {
        toast.error(
          `Mindestbestellwert für Lieferung${(
            Math.round(settings[0]?.minDeliveryAmount * 100) / 100
          ).toFixed(2)}€`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        return;
      }
      if (
        currentStep === 2 &&
        (cartstate.timeValidation === undefined ||
          cartstate.timeValidation === false)
      ) {
        toast.error(`Bitte zulässige Uhrzeit auswählen`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }

      if (currentStep === 3 && cartstate.payment === undefined) {
        toast.error(`Bitte Zahlungsmethode auswählen`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      if (
        currentStep === 3 &&
        cartstate.payment === 'paypal' &&
        checkTotal < settings[0]?.minPayPalAmount
      ) {
        toast.error(
          `Online Zahlung ab ${(
            Math.round(settings[0]?.minPayPalAmount * 100) / 100
          ).toFixed(2)}€ möglich.`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        return;
      }

      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    },
    [currentStep, cartstate, checkTotal]
  );

  const [currentStepGuest, setCurrentStepGuest] = useState(1);
  const stepsGuest = [
    'Gast',
    'Liefermethode',
    'Uhrzeit',
    'Zahlungsmethode',
    'Bezahlen',
  ];

  const displayStepGuest = (step) => {
    switch (step) {
      case 1:
        return <LoginGuest />;
      case 2:
        return <DeliveryMethodGuest />;
      case 3:
        return <TimePickerGuest />;
      case 4:
        return <PaymentPickerGuest />;
      case 5:
        return <CheckoutGuest />;
      default:
    }
  };

  //console.log(guestData);

  const handleClickDirectionGuest = useCallback(
    (direction) => {
      let newStep = currentStepGuest;

      direction === 'next' ? newStep++ : newStep--;

      if (newStep < currentStepGuest) {
        newStep > 0 &&
          newStep <= stepsGuest.length &&
          setCurrentStepGuest(newStep);
        return;
      }

      //console.log('validation', cartstate.timeValidation);
      // check if steps are within bounds
      if (
        currentStepGuest === 2 &&
        cartstate.sliderDeliveryValue === undefined
      ) {
        toast.error(`Bitte wähle eine Liefermethode aus`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      if (
        currentStepGuest === 2 &&
        cartstate.sliderDeliveryValue === 'lieferung' &&
        distance.value / 1000 > settings[0]?.deliveryThirdDistance
      ) {
        toast.error(
          `Leider können wir diese Adresse aufgrund der Entfernung nicht beliefern.`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        return;
      }
      if (
        currentStepGuest === 2 &&
        (cartstate.guestData.firstName === '' ||
          cartstate.guestData.lastName === '' ||
          cartstate.guestData.street === '' ||
          cartstate.guestData.streetNumber === '' ||
          cartstate.guestData.city === '' ||
          cartstate.guestData.zipCode === '' ||
          cartstate.guestData.email === '' ||
          cartstate.guestData.telefon === '')
      ) {
        toast.error(`Bitte alle Felder ausfüllen.`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      if (
        currentStepGuest === 2 &&
        cartstate.sliderDeliveryValue === 'lieferung' &&
        checkTotal < settings[0]?.minDeliveryAmount
      ) {
        toast.error(
          `Mindestbestellwert für Lieferung${(
            Math.round(settings[0]?.minDeliveryAmount * 100) / 100
          ).toFixed(2)}€`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        return;
      }
      if (
        currentStepGuest === 2 &&
        cartstate.sliderDeliveryValue === 'lieferung' &&
        cartstate.distance.value === 0
      ) {
        toast.error('Bitte bestätige deine Lieferadresse', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      if (
        currentStepGuest === 3 &&
        (cartstate.timeValidation === undefined ||
          cartstate.timeValidation === false)
      ) {
        toast.error(`Bitte zulässige Uhrzeit auswählen`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }

      if (currentStepGuest === 4 && cartstate.payment === undefined) {
        toast.error(`Bitte Zahlungsmethode auswählen`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      if (
        currentStepGuest === 4 &&
        cartstate.payment === 'paypal' &&
        checkTotal < settings[0]?.minPayPalAmount
      ) {
        toast.error(
          `Online Zahlung ab ${(
            Math.round(settings[0]?.minPayPalAmount * 100) / 100
          ).toFixed(2)}€ möglich.`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        return;
      }

      newStep > 0 &&
        newStep <= stepsGuest.length &&
        setCurrentStepGuest(newStep);
    },
    [currentStepGuest, cartstate, checkTotal]
  );
  return (
    <div>
      <div className='min-h-screen bg-gray-700'>
        <div className='py-12 text-center'>
          {activeSub.length < 1 ? (
            <div className={`flex justify-center pt-52 text-4xl ${text}`}>
              Wir überarbeiten zurzeit unsere Webseite. Wir freuen uns darauf,
              dich bald wieder bedienen zu dürfen.
            </div>
          ) : settings[0]?.isClosed[0]?.value === 'holiday' ? (
            <div className={`flex justify-center pt-52 text-4xl ${text}`}>
              Wir haben zurzeit Urlaub. Wir freuen uns darauf, dich bald wieder
              bedienen zu dürfen.
            </div>
          ) : settings[0]?.isClosed[0]?.value === 'soldout' ? (
            <div className={`flex justify-center pt-52 text-4xl ${text}`}>
              Für Heute sind wir leider ausverkauft. Wir freuen uns darauf, dich
              bald wieder bedienen zu dürfen.
            </div>
          ) : settings[0]?.isClosed[0]?.value === 'maintance' ? (
            <div className={`flex justify-center pt-52 text-4xl ${text}`}>
              Wir überarbeiten zurzeit unsere Webseite. Wir freuen uns darauf,
              dich bald wieder bedienen zu dürfen.
            </div>
          ) : (
            <div>
              <div className='max-w-md mx-auto bg-gray-800 shadow-xl rounded-lg md:max-w-7xl '>
                <div className='md:flex '>
                  <div className='w-full md:p-4 md:px-5 md:py-5'>
                    <div className='xl:grid xl:grid-cols-12 gap-2 '>
                      <div className='col-span-8 p-2 md:p-5 grid '>
                        <h1
                          className={`text-xl font-medium ${text} md:flex-none flex md:justify-start justify-center`}
                        >
                          Warenkorb
                        </h1>
                        {/* Produkt Infos */}
                        {cartItems.map((item) => {
                          return (
                            <div className='flex justify-between items-center mt-3 pl-3 py-3 bg-gray-700 rounded-md'>
                              <div className='flex items-center w-full'>
                                <div className='flex w-full items-center'>
                                  <img
                                    src={item.image}
                                    alt='dishes.png'
                                    className='rounded w-20 h-20 border-10'
                                    onError={(event) =>
                                      (event.target.style.display = 'none')
                                    }
                                  ></img>
                                  <div className='flex flex-col md:ml-3 ml-1 min-w-xs'>
                                    <span className='md:text-md font-medium'>
                                      <div className={`${text}`}>
                                        {console.log(item)}
                                        {item.name +
                                          ' ' +
                                          item.variantName +
                                          ' '}
                                        (
                                        {(
                                          Math.round(item.variant * 100) / 100
                                        ).toFixed(2)}
                                        €)
                                      </div>
                                    </span>
                                    <div
                                      class={`text-xs ${text} font-semibold`}
                                    >
                                      <div className=''>
                                        <div className='text-green-600'>
                                          {item.toppings?.length >= 1
                                            ? 'Extras:'
                                            : ''}
                                        </div>
                                        {item.toppings.map((chosenToppings) => {
                                          return (
                                            <div>{chosenToppings.label}</div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div
                                      class={`text-xs ${text} font-semibold`}
                                    >
                                      <div className=''>
                                        <div className='text-red-600'>
                                          {item.removeIng.length >= 1
                                            ? 'Entfernt:'
                                            : ''}
                                        </div>
                                        {item.removeIng.map(
                                          (removeIngredient) => {
                                            return (
                                              <div>
                                                {removeIngredient.label}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex justify-between md:mr-4'>
                                  <div className='flex'>
                                    <div class='flex justify-center items-center'>
                                      <div className='px-2 md:px-4 flex '>
                                        <button
                                          onClick={() => {
                                            dispatch(
                                              addToCart(
                                                item,
                                                item.quantity - 1,
                                                item.variant,
                                                item.variantName,
                                                item.toppings,
                                                item.removeIng,
                                                item.sumOfToppings,
                                                true
                                              )
                                            );
                                            setRefresh(!refresh);
                                          }}
                                        >
                                          <span class='font-semibold text-red-500 pb-1'>
                                            -
                                          </span>
                                        </button>
                                        <div className='focus:outline-none bg-gray-500 h-6 w-8 rounded text-m text-white mx-2 flex justify-center'>
                                          {item.quantity}
                                        </div>
                                        <button
                                          onClick={() => {
                                            dispatch(
                                              addToCart(
                                                item,
                                                item.quantity + 1,
                                                item.variant,
                                                item.variantName,
                                                item.toppings,
                                                item.removeIng,
                                                item.sumOfToppings,
                                                true
                                              )
                                            );
                                            setRefresh(!refresh);
                                          }}
                                        >
                                          <span class='font-semibold text-green-500 pb-1'>
                                            +
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div class='px-1 md:px-4'>
                                      <span
                                        class={`text-xs font-medium ${text}`}
                                      >
                                        {(
                                          Math.round(item.price * 100) / 100
                                        ).toFixed(2)}
                                        €
                                      </span>
                                    </div>
                                  </div>
                                  <div className='flex px-1 md:px-4'>
                                    <div className='w-full cursor-pointer'>
                                      <svg
                                        onClick={() => {
                                          dispatch(deleteFromCart(item));
                                          setRefresh(!refresh);
                                        }}
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6 text-red-600'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        stroke-width='2'
                                      >
                                        <path
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className='items-center mt-8 pt-4 border-t border-gray-700 text-md font-medium text-white '>
                          <Link to='/'>Weitere Artikel hinzufügen</Link>
                        </div>
                      </div>
                      {/* Checkout Right Site */}
                      <div className='relative  min-h-[550px] py-5 bg-gray-900 rounded overflow-visible col-span-4'>
                        <div className=' h-full'>
                          <div
                            className={`flex justify-center text-xl ${text} font-semibold`}
                          >
                            {isLogged
                              ? 'Bezahlung und Bestelldetails'
                              : 'Gastbestellung'}
                          </div>
                          {todayClosed === true ||
                          settings[0]?.isClosed[0]?.value === true ? (
                            <div className='text-red-500 text-xl pt-52 flex justify-center'>
                              Heute haben wir leider geschlossen
                            </div>
                          ) : (
                            <PayPalScriptProvider options={initialOptions}>
                              <div>
                                {/* Date */}
                                {cartItems.length < 1 ? (
                                  <div
                                    className={`text-white font-semibold text-2xl mt-52 pt-4 flex justify-center ${hoverText}`}
                                  >
                                    <Link to='/'>Jetzt Artikel hinzufügen</Link>
                                  </div>
                                ) : isLogged ? (
                                  /*  Userbestellung */

                                  <div>
                                    {/*  Stepper */}
                                    <div className='w-full mx-auto rounded-2xl pb-2'>
                                      <div className='container horizontal mt-5'>
                                        <Stepper
                                          steps={steps}
                                          currentStep={currentStep}
                                        />
                                      </div>
                                      <div className='my-10'>
                                        {displayStep(currentStep)}
                                      </div>
                                      <StepperControl
                                        handleClickDirection={
                                          handleClickDirection
                                        }
                                        currentStep={currentStep}
                                        steps={steps}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  /* Gastbesetllung */
                                  <div>
                                    {/*  Stepper */}
                                    <div className='w-full mx-auto rounded-2xl pb-2'>
                                      <div className='container horizontal mt-5'>
                                        <StepperGuest
                                          stepsGuest={stepsGuest}
                                          currentStepGuest={currentStepGuest}
                                        />
                                      </div>
                                      <div className='my-10'>
                                        {displayStepGuest(currentStepGuest)}
                                      </div>
                                      <StepperControlGuest
                                        handleClickDirectionGuest={
                                          handleClickDirectionGuest
                                        }
                                        currentStepGuest={currentStepGuest}
                                        stepsGuest={stepsGuest}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </PayPalScriptProvider>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
