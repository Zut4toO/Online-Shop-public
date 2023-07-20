import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import DeliveryPickupSlider from '../DeliveryPickupSlider';
import { cart_state } from '../../../../redux/actions/cartStateAction';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/* const initialState = {
  firstName: null,
  lastName: null,
  street: null,
  streetNumber: null,
  zipCode: null,
  email: null,
  telefon: null,
}; */

const DeliveryMethodGuest = () => {
  const cartstate = useSelector((state) => state.cartStateReducer);
  console.log(cartstate.guestData);
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;
  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const code = settings[0]?.color[0]?.code;

  const [sliderDeliveryValue, setSliderDeliveryValue] = useState(
    cartstate.sliderDeliveryValue
  );
  const [distanceChecker, setDistanceChecker] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [distance, setDistance] = useState({ text: '0 km', value: 0 });

  useEffect(() => {
    dispatch(cart_state({ distance: distance }));
  }, [distance]);

  const auth = useSelector((state) => state.auth);
  const reload = useSelector((state) => state.auth.reload);

  const { isLogged } = auth;

  const checkDistance = () => {
    if (
      guestData.firstName.length === 0 ||
      guestData.lastName.length === 0 ||
      guestData.street.length === 0 ||
      guestData.streetNumber.length === 0 ||
      guestData.zipCode.length === 0 ||
      guestData.city.length === 0 ||
      guestData.email.length === 0 ||
      guestData.email.length === 0
    ) {
      toast.error(`Bitte fülle alle Felder aus.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    setDistanceChecker(!distanceChecker);
  };
  useEffect(async () => {
    if (isLogged) {
      if (sliderDeliveryValue === 'lieferung' && distance.value === 0) {
        const res = await axios.get('/api/distance', {
          params: {
            storeAddress: `${settings[0]?.streetNumber} ${settings[0]?.street} ${settings[0]?.city} Germany`,
            customerAddress: `${auth.user.streetNumber} ${auth.user.street} ${auth.user.city} Germany`,
          },
        });
      }
    } else if (!isLogged) {
      if (
        sliderDeliveryValue === 'lieferung' &&
        guestData.streetNumber.length >= 1 &&
        guestData.street.length >= 1 &&
        guestData.city.length >= 1 &&
        guestData.firstName.length >= 1 &&
        guestData.lastName.length >= 1 &&
        guestData.zipCode.length === 5
      ) {
        const res = await axios.get('/api/distance', {
          params: {
            storeAddress: `${settings[0]?.streetNumber} ${settings[0]?.street} ${settings[0]?.city} Germany`,
            customerAddress: `${guestData.streetNumber} ${guestData.street} ${guestData.city} Germany`,
          },
        });
        setDistance({
          ...distance,
          text: res.data[0].distance.text,
          value: res.data[0].distance.value,
        });
      }
    }
  }, [sliderDeliveryValue, distanceChecker, refresh, reload]);

  const [guestData, setGuestData] = useState(cartstate.guestData);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestData({ ...guestData, [name]: value });
  };

  useEffect(() => {
    dispatch(cart_state({ guestData: guestData }));
  }, [guestData]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: code ?? '#fff',
        contrastText: '#fff',
      },
      text: {
        primary: '#fff',
        secondary: '#fff',
      },
    },
  });
  return (
    <div className={`h-[350px] text-lg font-semibold text-white`}>
      <div className='flex justify-center'>
        <DeliveryPickupSlider
          setState={setSliderDeliveryValue}
          state={sliderDeliveryValue}
        />
      </div>

      <div className='text-md mt-2 md:tracking-wider tracking-tighter	'>
        <div
          className={`${sliderDeliveryValue === 'lieferung' ? null : 'hidden'}`}
        >
          <div className='flex justify-center'>
            <div className='flex justify-center pr-1'>
              <div className='pr-1'>Lieferzeit</div>
              <div className={`${text}`}>
                {settings[0]?.minimalDeliveryTime} min
              </div>
            </div>
            <div className='flex justify-center pr-1'>
              <div className='pr-1'>Lieferkosten</div>
              <div className={`${text}`}>
                {distance.value === 0 ? (
                  <div>0.00€ (0 km)</div>
                ) : distance.value / 1000 <=
                  settings[0]?.deliveryFirstDistance ? (
                  <div className='flex'>
                    <div className='pr-1'>
                      {(
                        Math.round(settings[0]?.deliveryFirstPrice * 100) / 100
                      ).toFixed(2)}
                      €
                    </div>
                    <div className='text-white'>({distance.text})</div>
                  </div>
                ) : distance.value / 1000 <=
                  settings[0]?.deliverySecondDistance ? (
                  <div className='flex'>
                    <div className='pr-1'>
                      {(
                        Math.round(settings[0]?.deliverySecondPrice * 100) / 100
                      ).toFixed(2)}
                      €
                    </div>
                    <div className='text-white'>({distance.text})</div>
                  </div>
                ) : distance.value / 1000 <=
                  settings[0]?.deliveryThirdDistance ? (
                  <div className='flex'>
                    <div className='pr-1'>
                      {(
                        Math.round(settings[0]?.deliveryThirdPrice * 100) / 100
                      ).toFixed(2)}
                      €
                    </div>
                    <div className='text-white'>({distance.text})</div>
                  </div>
                ) : (
                  <div className='text-red-600'>
                    Zu weit (Max.{settings[0]?.deliveryThirdDistance}km)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='text-sm'>
            <div
              className={`${
                sliderDeliveryValue === 'lieferung' ? 'hidden' : 'mt-7'
              } flex justify-center`}
            ></div>
            {console.log(cartstate?.guestData?.firstName)}
            <div className='mx-auto'>
              <div className='flex justify-center mx-4 my-2'>
                <div className='mr-4 w-full'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          cartstate.guestData.firstName === null ? false : true,
                      }}
                      type='text'
                      id='textfield'
                      label='Vorname'
                      name='firstName'
                      variant='standard'
                      value={
                        cartstate.guestData.firstName ?? guestData.firstName
                      }
                      onChange={handleChange}
                      fullWidth
                    />
                  </ThemeProvider>
                </div>
                <div className='w-full'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          cartstate.guestData.lastName === null ? false : true,
                      }}
                      type='text'
                      id='textfield'
                      label='Nachname'
                      name='lastName'
                      variant='standard'
                      value={cartstate.guestData.lastName ?? guestData.lastName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </ThemeProvider>
                </div>
              </div>
              <div className='flex justify-center mx-4 my-2'>
                <div className='mr-4 w-full'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          cartstate.guestData.street === null ? false : true,
                      }}
                      type='text'
                      id='textfield'
                      label='Straße'
                      name='street'
                      variant='standard'
                      value={cartstate.guestData.street ?? guestData.street}
                      onChange={handleChange}
                      fullWidth
                    />
                  </ThemeProvider>
                </div>
                <div className=' w-full'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          cartstate.guestData.streetNumber === null
                            ? false
                            : true,
                      }}
                      type='text'
                      id='textfield'
                      label='Hausnummer'
                      name='streetNumber'
                      variant='standard'
                      value={
                        cartstate.guestData.streetNumber ??
                        guestData.streetNumber
                      }
                      onChange={handleChange}
                      fullWidth
                    />
                  </ThemeProvider>
                </div>
              </div>
              <div className='flex justify-center mx-4 my-2'>
                <div className='mr-4 w-full'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          cartstate.guestData.zipCode === null ? false : true,
                      }}
                      type='text'
                      id='textfield'
                      label='Postleitzahl'
                      name='zipCode'
                      variant='standard'
                      value={cartstate.guestData.zipCode ?? guestData.zipCode}
                      onChange={handleChange}
                      fullWidth
                    />
                  </ThemeProvider>
                </div>
                <div className=' w-full'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          cartstate.guestData.city === null ? false : true,
                      }}
                      type='text'
                      id='textfield'
                      label='Stadt'
                      name='city'
                      variant='standard'
                      value={cartstate.guestData.city ?? guestData.city}
                      onChange={handleChange}
                      fullWidth
                    />
                  </ThemeProvider>
                </div>
              </div>
              <div className='flex justify-center mx-4 mt-2 mb-6'>
                <div className='mr-4 w-full'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          cartstate.guestData.email === null ? false : true,
                      }}
                      type='email'
                      id='textfield'
                      label='E-Mail'
                      name='email'
                      variant='standard'
                      value={cartstate.guestData.email ?? guestData.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  </ThemeProvider>
                </div>
                <div className=' w-full'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          cartstate.guestData.telefon === null ? false : true,
                      }}
                      type='tel'
                      id='textfield'
                      label='Telefon Nr.'
                      name='telefon'
                      variant='standard'
                      value={cartstate.guestData.telefon ?? guestData.telefon}
                      onChange={handleChange}
                      fullWidth
                    />
                  </ThemeProvider>
                </div>
              </div>
            </div>

            {sliderDeliveryValue === 'lieferung' ? (
              <button
                className={`mx-auto block md:w-[92%] w-[92%] ${bg} ${hoverbgColor} p-1 mt-1 rounded font-semibold text-white transition duration-300 `}
                onClick={checkDistance}
              >
                Lieferadresse bestätigen
              </button>
            ) : (
              <div className='p-4'></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethodGuest;
