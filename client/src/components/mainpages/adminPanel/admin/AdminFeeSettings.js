// Tabs: https://www.youtube.com/watch?v=WkREeDy2WQ4

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AdminOrders = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const code = settings[0]?.color[0]?.code;

  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isSupport, isAdmin, isMasterAdmin } = auth;

  const [sidenav, setSidenav] = useState(false);
  const [fetchData, setFetchData] = useState('');
  const [subscription, setSubscription] = useState('');
  const [fetchDataIP, setFetchDataIP] = useState('');
  const [ip, setIp] = useState('');

  useEffect(() => {
    const getSubscriptionValue = async () => {
      const res = await axios.get('/api/subscriptionamount', {
        headers: { Authorization: token },
      });
      setFetchData(res.data);
      setSubscription(res.data[0]?.subscriptionAmount);
    };
    getSubscriptionValue();
  }, []);

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get('/api/printerip', {
        headers: { Authorization: token },
      });
      console.log(res.data);
      setFetchDataIP(res.data);
      setIp(res.data[0]?.ip);
    };
    getIp();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        '/api/subscriptionamount',
        {
          id: fetchData[0]?._id,
          subscriptionAmount: subscription
            ? subscription
            : subscription[0].subscription,
        },
        {
          headers: { Authorization: token },
        }
      );
      await axios.patch(
        '/api/printerip',
        {
          id: fetchDataIP[0]?._id,
          ip: ip ? ip : ip[0].ip,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast.success(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleChangeSubscription = (event) => {
    setSubscription(event.target.value);
  };
  const handleChangeIP = (event) => {
    setIp(event.target.value);
  };

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: code,
        contrastText: '#fff',
      },
      text: {
        primary: code,
        secondary: code,
        // disabled:
      },
    },
  });

  return (
    <div className='min-h-screen bg-gray-800 2xl:grid 2xl:grid-cols-7 2xl:gap-4'>
      <div className='hidden 2xl:flex 2xl:col-span-1 bg-gray-900'>
        <div className='w-60 h-full bg-gray-900 px-1'>
          <div className={`${text} font-bold text-xl ml-4 mb-2`}>
            Systemverwaltung
          </div>
          <ul className='mx-2'>
            {isSupport || isAdmin || isMasterAdmin ? (
              <li className='mb-1'>
                <Link
                  to='/orders'
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-5 w-5 mr-2 ${text}`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                  </svg>
                  <span className='text-gray-100 font-semibold'>
                    Bestellungen
                  </span>
                </Link>
              </li>
            ) : (
              ''
            )}
            {isAdmin || isMasterAdmin ? (
              <li className='relative mb-1'>
                <Link
                  to='/settings'
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-5 w-5 mr-2 ${text}`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  <span className='text-gray-100 font-semibold'>
                    Systemeinstellungen
                  </span>
                </Link>
              </li>
            ) : (
              ''
            )}
            {isAdmin || isMasterAdmin ? (
              <li className='relative mb-1'>
                <Link
                  to='/products'
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-5 w-5 mr-2 ${text}`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>
                  <span className='text-gray-100 font-semibold'>
                    Produkteinstellungen
                  </span>
                </Link>
              </li>
            ) : (
              ''
            )}
            {isAdmin || isMasterAdmin ? (
              <li className='relative mb-1'>
                <Link
                  to='/userlist'
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-5 w-5 mr-2 ${text}`}
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
                  </svg>
                  <span className='text-gray-100 font-semibold'>
                    Nutzerverwaltung
                  </span>
                </Link>
              </li>
            ) : (
              ''
            )}
            {isAdmin || isMasterAdmin ? (
              <li className='relative mb-1'>
                <Link
                  to='/galery'
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-5 w-5 mr-2 ${text}`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  <span className='text-gray-100 font-semibold'>Galerie</span>
                </Link>
              </li>
            ) : (
              ''
            )}
            {isMasterAdmin ? (
              <li className='relative mb-1'>
                <Link
                  to='/feesettings'
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-gray-700 hover:bg-gray-700 transition duration-300 ease-in-out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-5 w-5 mr-2 ${text}`}
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                    <path
                      fill-rule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  <span className='text-gray-100 font-semibold'>
                    Gebühreneinstellung
                  </span>
                </Link>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
      {/* mobile button goes here */}
      <div
        className='2xl:hidden flex items-center bg-gray-900 pl-2'
        onClick={() => setSidenav(!sidenav)}
      >
        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-6 w-6 ${text}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <div className={`${text} font-bold text-xl pt-1.5 ml-2 mb-2`}>
          Systemverwaltung
        </div>
      </div>
      {/* mobile menu */}
      <div className={'2xl:hidden' + (sidenav ? '' : ' hidden')}>
        <ul className='shadow-xl bg-gray-900 px-1 absolute relative pb-2'>
          {isSupport || isAdmin || isMasterAdmin ? (
            <li className='relative mb-1'>
              <Link
                to='/orders'
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-5 w-5 mr-2 ${text}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
                <span className='text-gray-100 font-semibold'>
                  Bestellungen
                </span>
              </Link>
            </li>
          ) : (
            ''
          )}
          {isAdmin || isMasterAdmin ? (
            <li className='relative mb-1'>
              <Link
                to='/settings'
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-5 w-5 mr-2 ${text}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                  />
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                <span className='text-gray-100 font-semibold'>
                  Systemeinstellungen
                </span>
              </Link>
            </li>
          ) : (
            ''
          )}
          {isAdmin || isMasterAdmin ? (
            <li className='relative mb-1'>
              <Link
                to='/products'
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-5 w-5 mr-2 ${text}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  />
                </svg>
                <span className='text-gray-100 font-semibold'>
                  Produkteinstellungen
                </span>
              </Link>
            </li>
          ) : (
            ''
          )}
          {isAdmin || isMasterAdmin ? (
            <li className='relative mb-1'>
              <Link
                to='/userlist'
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-5 w-5 mr-2 ${text}`}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
                </svg>
                <span className='text-gray-100 font-semibold'>
                  Nutzerverwaltung
                </span>
              </Link>
            </li>
          ) : (
            ''
          )}
          {isAdmin || isMasterAdmin ? (
            <li className='relative mb-1'>
              <Link
                to='/galery'
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-5 w-5 mr-2 ${text}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                  />
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                <span className='text-gray-100 font-semibold'>Galerie</span>
              </Link>
            </li>
          ) : (
            ''
          )}
          {isMasterAdmin ? (
            <li className='relative mb-1'>
              <Link
                to='/feesettings'
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-gray-700 hover:bg-gray-700 transition duration-300 ease-in-out'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-5 w-5 mr-2 ${text}`}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                  <path
                    fill-rule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z'
                    clip-rule='evenodd'
                  />
                </svg>
                <span className='text-gray-100 font-semibold'>
                  Gebühreneinstellung
                </span>
              </Link>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
      <div className='2xl:col-span-6 2xl:ml-4 2xl:bg-gray-800 bg-gray-900 text-white'>
        <h2 className={`mb-8 mt-8 pt-4 ${text} font-bold text-4xl text-center`}>
          Gebühren & Drucker
        </h2>
        <ThemeProvider theme={theme}>
          <Box sx={{ maxWidth: 384 }} className='mx-auto'>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Aboauswahl</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={subscription}
                label='Aboauswahl'
                onChange={handleChangeSubscription}
              >
                <MenuItem value={'P-9K7030785Y4662435MOLXFQA'}>
                  Basis 159,- 12 Monate, reduziert
                </MenuItem>
                <MenuItem value={'P-5RM704104J179915RMOLXGAI'}>
                  Pro 179,- 12 Monate, reduziert + Drucker
                </MenuItem>
                <MenuItem value={'P-03Y63134FL993443VMOLXGRY'}>
                  Ultra 199,- 12 Monate, reduziert + W-Lan Drucker
                </MenuItem>
                <MenuItem value={'P-73Y22350FT275332KMOLXIEA'}>
                  Basis 179,- 1 Monat, reduziert
                </MenuItem>
                <MenuItem value={'P-3A297231KD507844XMOLXISY'}>
                  Pro 199,- 1 Monat, reduziert + Drucker
                </MenuItem>
                <MenuItem value={'P-0T6441518H270063GMOLXJGI'}>
                  Ultra 219,- 1 Monat, reduziert + W-Lan Drucker
                </MenuItem>
                <MenuItem value={'P-73769502G9939843SMOLXJ2Q'}>
                  Basis 199,- 12 Monate
                </MenuItem>
                <MenuItem value={'P-3TY81134FC9178103MOLXODY'}>
                  Pro 229,- 12 Monate + Drucker
                </MenuItem>
                <MenuItem value={'P-6E87088656980425XMOLXOOA'}>
                  Ultra 249,- 12 Monate + W-Lan Drucker
                </MenuItem>
                <MenuItem value={'P-3D9224480J014212GMOLXOXA'}>
                  Basis 229,- 1 Monat
                </MenuItem>
                <MenuItem value={'P-8NV78828537875434MOLXO7I'}>
                  Pro 249,- 1 Monat + Drucker
                </MenuItem>
                <MenuItem value={'P-68814695FU3986318MOLXPGY'}>
                  Ultra 269,- 1 Monat + W-Lan Drucker
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </ThemeProvider>

        <div className='2xl:col-span-6  2xl:bg-gray-800 bg-gray-900 text-white mt-4'>
          {/* IP */}
          <div className='text-white flex justify-center mx-auto max-w-[384px]'>
            <ThemeProvider theme={theme}>
              <TextField
                id='standard-basic'
                label='Drucker IP'
                variant='outlined'
                defaultValue='Hello World'
                value={ip}
                onChange={handleChangeIP}
                fullWidth
              />
            </ThemeProvider>
          </div>
          <button
            onClick={handleUpdate}
            className={`block w-96 mx-auto ${bg} ${hoverbgColor} p-4 mt-2 rounded text-xl font-bold text-white transition duration-300`}
          >
            Veränderungen bestätigen
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
