import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { isEmail } from '../../utils/validation/Validation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const initialState = {
  email: '',
  err: '',
  success: '',
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const focusBorder = settings[0]?.color[0]?.focusBorder;
  const code = settings[0]?.color[0]?.code;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: 'Ungültiges E-Mail Format', success: '' });

    try {
      const res = await axios.post('/user/forgot', { email });

      return setData({ ...data, err: '', success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  success &&
    toast.success(success, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  err &&
    toast.info(err, {
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
        primary: code ?? '#fff',
        secondary: '#fff',
      },
    },
  });
  return (
    <div className='min-h-screen bg-gray-700 py-8'>
      <div className='max-w-md mx-auto bg-gray-700 rounded-lg md:max-w-5xl'>
        <div className='md:flex '>
          <div className='w-full'>
            <div className='bg-gray-800 p-6 rounded shadow-2xl'>
              <h2 className={`text-3xl font-bold mb-10 ${text} text-center`}>
                Hast du dein Passwort vergessen?
              </h2>
              <div className='md:w-1/2 w-full mx-auto'>
                <ThemeProvider theme={theme}>
                  <TextField
                    id='email-textfield'
                    label='E-Mail'
                    name='email'
                    variant='outlined'
                    value={email}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </ThemeProvider>
                <button
                  onClick={forgotPassword}
                  className={`block w-full ${bg} ${hoverbgColor} p-4 rounded font-semibold text-white transition duration-300 mt-4`}
                >
                  Neues Passwort anfragen.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
