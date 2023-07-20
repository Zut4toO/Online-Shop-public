import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from '../../utils/validation/Validation';
import LoadingMedium from '../../utils/loading/LoadingMedium';
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

const Register = () => {
  const navigate = useNavigate();
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const code = settings[0]?.color[0]?.code;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialState);
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

  const {
    firstName,
    lastName,
    companyName,
    street,
    streetNumber,
    zipCode,
    email,
    city,
    telefon,
    password,
    cf_password,
    err,
  } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(street) ||
      isEmpty(streetNumber) ||
      isEmpty(zipCode) ||
      isEmpty(city) ||
      isEmpty(telefon) ||
      isEmpty(password)
    ) {
      return setUser({
        ...user,
        err: 'Bitte alle Pflichtfelder ausfüllen',
        success: '',
      });
    }

    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: 'Ungültige E-Mail',
        success: '',
      });
    }

    if (isLength(password)) {
      return setUser({
        ...user,
        err: 'Wähle ein Passwort mit mindestens 6 Zeichen',
        success: '',
      });
    }

    if (!isMatch(password, cf_password)) {
      return setUser({
        ...user,
        err: 'Passwörter stimmen nicht üverein',
        success: '',
      });
    }
    try {
      setLoading(true);
      const res = await axios.post('/user/register', {
        firstName,
        lastName,
        companyName,
        street,
        streetNumber,
        zipCode,
        city,
        telefon,
        email,
        password,
      });
      setTimeout(() => {
        navigate('/registerconfirm');
      }, 3000);
      toast.success(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      setLoading(false);
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' });
    }
  };

  err &&
    toast.error(err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

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
    <div class='min-h-screen  bg-gray-700 py-8'>
      <div class='max-w-md mx-auto bg-gray-700 rounded-lg md:max-w-5xl'>
        <div class='md:flex'>
          <div class='w-full'>
            <div class='col-span-2'></div>
            <div className=' bg-gray-800 p-6 rounded shadow-2xl '>
              <h2 class={`text-3xl font-bold mb-8 ${text} text-center`}>
                Registrieren
              </h2>
              <div className='flex justify-center'>
                {loading ? (
                  <LoadingMedium />
                ) : (
                  <Box
                    component='form'
                    noValidate
                    className='space-y-5'
                    onSubmit={handleSubmit}
                    sx={{ width: '100%' }}
                  >
                    {/* First name */}

                    <div className='flex justify-center'>
                      <div className='mr-4 md:mb-0'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Vorname*'
                            name='firstName'
                            variant='outlined'
                            value={firstName}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      {/* Last name */}
                      <div className='md:mb-0'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Nachname*'
                            name='lastName'
                            variant='outlined'
                            value={lastName}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    {/* Company */}
                    <div className='md:flex justify-center'>
                      <div className='md:mr-8 mr:0 md:mb-0 mb-4 bg-gray-600 rounded-[5px]'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Firmenname'
                            name='companyName'
                            variant='outlined'
                            value={companyName}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='md:w-[209px]'></div>
                    </div>
                    {/* Street */}
                    <div className='flex justify-center'>
                      <div className='mr-4 md:mb-0'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Straße*'
                            name='street'
                            variant='outlined'
                            value={street}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      {/* Street number */}
                      <div className='md:mb-0 justify-center'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Hausnummer*'
                            name='streetNumber'
                            variant='outlined'
                            value={streetNumber}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    {/* Zipcode */}
                    <div className='flex justify-center'>
                      <div className='mr-4 md:mb-0'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Postleitzahl*'
                            name='zipCode'
                            variant='outlined'
                            value={zipCode}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      {/* City */}
                      <div className='md:mb-0'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Stadt*'
                            name='city'
                            variant='outlined'
                            value={city}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    {/* Email */}
                    <div className='md:flex justify-center'>
                      <div className='md:mr-4 md:mb-0 mb-4'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='email'
                            id='textfield'
                            label='Email*'
                            name='email'
                            variant='outlined'
                            value={email}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      {/* Telefon */}
                      <div className='md:mb-0 mb-4 justify-center'>
                        <ThemeProvider theme={theme}>
                          <TextField
                            type='tel'
                            id='textfield'
                            label='Telefon Nr.*'
                            name='telefon'
                            variant='outlined'
                            value={telefon}
                            onChange={handleChangeInput}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    {/* Password*/}
                    <div className='flex justify-center'>
                      <div className='mr-4 md:mb-0 mb-4 md:w-[223px]'>
                        <ThemeProvider theme={theme}>
                          <FormControl variant='outlined' fullWidth>
                            <InputLabel htmlFor='password-textfield'>
                              Passwort*
                            </InputLabel>
                            <OutlinedInput
                              id='textfield'
                              type={values.showPassword ? 'text' : 'password'}
                              value={password}
                              name='password'
                              onChange={handleChangeInput}
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
                      {/* Password confirmation*/}
                      <div className='md:mb-0 mb-4 md:w-[223px]'>
                        <ThemeProvider theme={theme}>
                          <FormControl variant='outlined' fullWidth>
                            <InputLabel htmlFor='cf-password-textfield'>
                              Bestätigen*
                            </InputLabel>
                            <OutlinedInput
                              id='textfield'
                              type={values.showPassword ? 'text' : 'password'}
                              value={cf_password}
                              name='cf_password'
                              onChange={handleChangeInput}
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

                    <button
                      type='submit'
                      className={`mx-auto md:w-[464px] w-[259px] block text-xl font-bold ${bg} ${hoverbgColor} p-4 rounded text-white transition duration-300`}
                    >
                      Registrieren!
                    </button>
                  </Box>
                )}
              </div>
              <Link to='/login'>
                <div className='text-center mt-4'>
                  <span className='text-white'>Account vorhanden? </span>
                  <span className={`${text}`}>Einloggen</span>
                </div>
              </Link>
              <div className='text-white text-center mt-4'>* Pflichtfelder</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
