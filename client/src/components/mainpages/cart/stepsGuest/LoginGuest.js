import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dispatchLogin } from '../../../../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingMedium from '../../../utils/loading/LoadingMedium';
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
  email: null,
  password: null,
};

const LoginGuest = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const focusBorder = settings[0]?.color[0]?.focusBorder;
  const code = settings[0]?.color[0]?.code;

  const { email, password } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/user/login', { email, password });
      localStorage.setItem('firstLogin', true);

      setTimeout(() => {
        dispatch(dispatchLogin());
        navigate('/cart');
      }, 500);
      toast.success(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
  return (
    <div className='h-[350px]'>
      <div className='flex justify-center'>
        {loading ? (
          <div className='mx-auto'>
            <LoadingMedium />
          </div>
        ) : (
          <Box
            component='form'
            noValidate
            className='space-y-5'
            onSubmit={handleSubmit}
            sx={{ width: '85%' }}
          >
            <div className='justify-center'>
              <div className='md:mr-4 mb-4 w-full'>
                <ThemeProvider theme={theme}>
                  <TextField
                    type='text'
                    id='textfield'
                    label='E-Mail'
                    name='email'
                    variant='outlined'
                    value={email}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </ThemeProvider>
              </div>
              {/* Passwort*/}
              <div className='md:mb-0 mb-4 w-full'>
                <ThemeProvider theme={theme}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel htmlFor='password-textfield'>
                      Passwort
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
            </div>

            <button
              type='submit'
              className={`mx-auto w-full block text-white text-xl font-bold ${bg} ${hoverbgColor} p-4 rounded transition duration-300`}
            >
              Jetzt anmelden!
            </button>
          </Box>
        )}
      </div>
      <Link to='/forgot_password' className='text-red-500'>
        <div className='text-center my-2'>Passwort vergessen?</div>
      </Link>
      <Link to='/register'>
        <div className='text-center'>
          <span className='text-white'>Noch nicht registriert? </span>
          <span className={`${text}`}>Jetzt Account erstellen</span>
        </div>
      </Link>
    </div>
  );
};

export default LoginGuest;
