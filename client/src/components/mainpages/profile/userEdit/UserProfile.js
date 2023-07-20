import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { isLength, isMatch } from '../../../utils/validation/Validation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from '../../../../redux/actions/usersActions';
import OrderHistory from '../history/OrderHistory';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './modal.css';

const initialState = {
  firstName: null,
  lastName: null,
  companyName: null,
  street: null,
  streetNumber: null,
  zipCode: null,
  email: null,
  telefon: null,
  password: null,
  cf_password: null,
  err: '',
};

const Profile = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const code = settings[0]?.color[0]?.code;

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const { user, isAdmin, isMasterAdmin } = auth;
  const [data, setData] = useState(initialState);
  const {
    firstName,
    lastName,
    companyName,
    street,
    streetNumber,
    zipCode,
    city,
    telefon,
    password,
    cf_password,
    err,
    success,
  } = data;

  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin || isMasterAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  const updateInfor = () => {
    try {
      axios.patch(
        '/user/update',
        {
          firstName: firstName ? firstName : user.firstName,
          lastName: lastName ? lastName : user.lastName,
          companyName: companyName ? companyName : user.companyName,
          street: street ? street : user.street,
          streetNumber: streetNumber ? streetNumber : user.streetNumber,
          city: city ? city : user.city,
          zipCode: zipCode ? zipCode : user.zipCode,
          telefon: telefon ? telefon : user.telefon,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: '', success: 'Profil erfolgreich aktualisiert' });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: 'Password must be at least 6 characters.',
        success: '',
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: 'Passwörter stimmen nicht überein',
        success: '',
      });

    try {
      axios.post(
        '/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: '', success: 'Profil erfolgreich aktualisiert' });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  const handleUpdate = () => {
    if (
      firstName ||
      lastName ||
      companyName ||
      street ||
      streetNumber ||
      city ||
      zipCode ||
      telefon
    )
      updateInfor();
    if (password) updatePassword();
  };

  success &&
    toast.success(success, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  err &&
    toast.info(err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  const [showModal, setShowModal] = useState(false);

  const handleSelfDelete = async (id) => {
    try {
      if (user.role === 0) {
        setLoading(true);
        await axios.delete(`/user/selfdelete/${id}`, {
          headers: { Authorization: token },
        });
        toast.info('Account wurde gelöscht', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        setCallback(!callback);
        localStorage.removeItem('firstLogin');
        window.location.href = '/';
      }
      if (user.role != 0) {
        toast.error(
          'Support und Adminaccounts können sich nicht selbstständig löschen',
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

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
    <div>
      {loading && <h3>Loading.....</h3>}
      <div className='min-h-screen bg-gray-700 py-12 text-white font-medium'>
        <div className='max-w-md mx-auto bg-gray-800 shadow-lg rounded-lg md:max-w-7xl'>
          <div className='md:flex '>
            <div className='w-full p-4 px-4'>
              <div className='grid grid-cols-12 gap-4'>
                <div className='lg:col-span-4 col-span-12 bg-gray-800 p-2 h-full'>
                  <h2
                    className={`flex justify-center text-2xl font-bold ${text}`}
                  >
                    Einstellungen
                  </h2>

                  <div className='pt-1'>
                    <div className='flex my-4'>
                      <div className='flex justify-between mr-4 w-full'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            type='text'
                            id='textfield'
                            label='Vorname'
                            name='firstName'
                            variant='outlined'
                            value={firstName ?? user.firstName}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between w-full'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            type='text'
                            id='textfield'
                            label='Nachname'
                            name='lastName'
                            variant='outlined'
                            value={lastName ?? user.lastName}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={theme}>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          type='text'
                          id='textfield'
                          label='Firma'
                          name='companyName'
                          variant='outlined'
                          value={companyName ?? user.companyName}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex my-4'>
                      <div className='flex justify-between mr-4 w-full'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            type='text'
                            id='textfield'
                            label='Straße'
                            name='street'
                            variant='outlined'
                            value={street ?? user.street}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between w-full'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            type='text'
                            id='textfield'
                            label='Hausnummer'
                            name='street'
                            variant='outlined'
                            value={streetNumber ?? user.streetNumber}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>

                    <div className='flex'>
                      <div className='flex justify-between mr-4 w-full'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            type='text'
                            id='textfield'
                            label='Postleitzahl'
                            name='zipCode'
                            variant='outlined'
                            value={zipCode ?? user.zipCode}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between w-full'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            type='text'
                            id='textfield'
                            label='Stadt'
                            name='city'
                            variant='outlined'
                            value={city ?? user.city}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={theme}>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          disabled
                          type='email'
                          id='textfield'
                          label='E-Mail'
                          name='email'
                          variant='outlined'
                          value={user.email}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={theme}>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          type='tel'
                          id='textfield'
                          label='Telefon Nr.'
                          name='telefon'
                          variant='outlined'
                          value={telefon ?? user.telefon}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex'>
                      <div className='flex justify-between my-1 mr-4'>
                        <ThemeProvider theme={theme}>
                          <FormControl variant='outlined'>
                            <InputLabel htmlFor='password-textfield'>
                              Passwort*
                            </InputLabel>
                            <OutlinedInput
                              id='textfield'
                              InputLabelProps={{ shrink: true }}
                              type={values.showPassword ? 'text' : 'password'}
                              value={password ?? user.password}
                              name='password'
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                  >
                                    {values.showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label='Password'
                            />
                          </FormControl>
                        </ThemeProvider>
                      </div>

                      <div className='flex justify-between my-1 md:w-[223px]'>
                        <ThemeProvider theme={theme}>
                          <FormControl variant='outlined'>
                            <InputLabel htmlFor='password-textfield'>
                              Bestätigen*
                            </InputLabel>
                            <OutlinedInput
                              id='textfield'
                              InputLabelProps={{ shrink: true }}
                              type={values.showPassword ? 'text' : 'password'}
                              value={cf_password ?? user.cf_password}
                              name='cf_password'
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                  >
                                    {values.showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label='CF_Password'
                            />
                          </FormControl>
                        </ThemeProvider>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={loading}
                    onClick={handleUpdate}
                    className={`block w-full ${bg} ${hoverbgColor} p-4 mt-2 rounded text-white font-semibold transition duration-300`}
                  >
                    Veränderungen bestätigen
                  </button>
                </div>
                <div className='lg:col-span-8 px-6 col-span-12 bg-gray-900 p-2 h-full rounded'>
                  <h2
                    className={`flex justify-center text-2xl font-bold ${text}`}
                  >
                    Meine Bestellungen
                  </h2>
                  <div className='flex justify-center'>
                    <OrderHistory />
                  </div>
                </div>
              </div>
              <div className='flex justify-center md:justify-end md:mt-4 mt-12'>
                <button
                  onClick={() => setShowModal(!showModal)}
                  className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-red-700 rounded'
                >
                  Account löschen
                </button>
                {showModal && (
                  <>
                    <div
                      className='backdrop'
                      onClick={(e) => {
                        if (e.target.className === 'backdrop') {
                          setShowModal(false);
                        }
                      }}
                    >
                      <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                        <div className=' rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                          <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-gray-600'>
                            <h3 className='text-3xl font-semibold text-red-500'>
                              Account löschen
                            </h3>
                          </div>
                          <div className='relative p-6 flex-auto bg-gray-600'>
                            <p className='my-4 text-white text-lg leading-relaxed'>
                              Bist du dir sicher, dass du deinen Account bei uns
                              löschen möchtest? Solltest du dich dazu
                              entscheiden deinen Account zu löschen, werden wir
                              alle deine accountbezogenen, persönlichen Daten
                              für immer löschen. Es besteht keine Möglichkeit,
                              diesen Schritt rückgängig zu machen.
                            </p>
                          </div>
                          <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b bg-gray-600'>
                            <button
                              className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                              type='button'
                              onClick={() => setShowModal(!showModal)}
                            >
                              Abbrechen
                            </button>
                            <button
                              className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                              type='button'
                              onClick={() => {
                                handleSelfDelete(user._id);
                                setShowModal(!showModal);
                              }}
                            >
                              Account löschen
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
