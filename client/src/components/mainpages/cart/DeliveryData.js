import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { systemSettings } from '../../../redux/actions/systemSettingsAction';
import { cart_state } from '../../../redux/actions/cartStateAction';
import { useSelector, useDispatch } from 'react-redux';
import { reload_userinfor } from '../../../redux/actions/authAction';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const initialState = {
  firstName: null,
  lastName: null,
  street: null,
  streetNumber: null,
  zipCode: null,
  city: null,
  err: '',
  success: '',
};

const DeliveryData = ({ distance, setDistance, refresh, setRefresh }) => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const { user } = auth;
  const [data, setData] = useState(initialState);
  const {
    firstName,
    lastName,
    street,
    streetNumber,
    zipCode,
    city,
    err,
    success,
  } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  /*   success &&
    toast.success(success, {
      position: toast.POSITION.BOTTOM_RIGHT,
    }); */
  err &&
    toast.info(err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  const updateInfor = () => {
    try {
      axios
        .patch(
          '/user/update',
          {
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            street: street ? street : user.street,
            streetNumber: streetNumber ? streetNumber : user.streetNumber,
            zipCode: zipCode ? zipCode : user.zipCode,
            city: city ? city : user.city,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then(() => {
          dispatch(
            reload_userinfor({
              firstName: firstName ? firstName : user.firstName,
              lastName: lastName ? lastName : user.lastName,
              street: street ? street : user.street,
              streetNumber: streetNumber ? streetNumber : user.streetNumber,
              zipCode: zipCode ? zipCode : user.zipCode,
              city: city ? city : user.city,
            })
          );
        });

      setData({ ...data, err: '', success: 'Profil erfolgreich aktualisiert' });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  const handleUpdate = () => {
    if (firstName || lastName || street || streetNumber || zipCode || city)
      updateInfor();
    setDistance({
      ...distance,
      text: '0 km',
      value: 0,
    });
    setRefresh(!refresh);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(systemSettings());
  }, []);

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const border = settings[0]?.color[0]?.borderColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const code = settings[0]?.color[0]?.code;

  useEffect(() => {
    dispatch(cart_state({ distance: distance }));
  }, [distance]);

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
    <div className=' justify-center mb-5'>
      <div className='flex justify-center mx-4 my-4'>
        <div className='mr-4 w-full'>
          <ThemeProvider theme={theme}>
            <TextField
              type='text'
              id='textfield'
              label='Vorname'
              name='firstName'
              variant='standard'
              value={firstName ?? user.firstName}
              onChange={handleChange}
              fullWidth
            />
          </ThemeProvider>
        </div>
        <div className='w-full'>
          <ThemeProvider theme={theme}>
            <TextField
              type='text'
              id='textfield'
              label='Nachname'
              name='lastName'
              variant='standard'
              value={lastName ?? user.lastName}
              onChange={handleChange}
              fullWidth
            />
          </ThemeProvider>
        </div>
      </div>
      <div className='text-sm'>
        <div className='flex justify-center mx-4 my-4'>
          <div className='mr-4 w-full'>
            <ThemeProvider theme={theme}>
              <TextField
                type='text'
                id='textfield'
                label='Straße'
                name='street'
                variant='standard'
                value={street ?? user.street}
                onChange={handleChange}
                fullWidth
              />
            </ThemeProvider>
          </div>
          <div className=' w-full'>
            <ThemeProvider theme={theme}>
              <TextField
                type='text'
                id='textfield'
                label='Hausnummer'
                name='streetNumber'
                variant='standard'
                value={streetNumber ?? user.streetNumber}
                onChange={handleChange}
                fullWidth
              />
            </ThemeProvider>
          </div>
        </div>
        <div className='flex justify-center mx-4 my-4'>
          <div className='mr-4 w-full'>
            <ThemeProvider theme={theme}>
              <TextField
                type='text'
                id='textfield'
                label='Postleitzahl'
                name='zipCode'
                variant='standard'
                value={zipCode ?? user.zipCode}
                onChange={handleChange}
                fullWidth
              />
            </ThemeProvider>
          </div>
          <div className=' w-full'>
            <ThemeProvider theme={theme}>
              <TextField
                type='text'
                id='textfield'
                label='Stadt'
                name='city'
                variant='standard'
                value={city ?? user.city}
                onChange={handleChange}
                fullWidth
              />
            </ThemeProvider>
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            onClick={handleUpdate}
            className={`block md:w-[92%] w-[92%] ${bg} ${hoverbgColor} p-1 mt-1 rounded font-semibold text-white transition duration-300 `}
          >
            Lieferadresse ändern
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryData;
