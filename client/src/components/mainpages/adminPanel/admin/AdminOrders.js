// Tabs: https://www.youtube.com/watch?v=WkREeDy2WQ4

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { systemSettings } from '../../../../redux/actions/systemSettingsAction';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Pagination from '../../../utils/pagination/Pagination';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TextField from '@mui/material/TextField';
//import { connect } from 'node:net';r
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../adminStyles/modal.css';
import 'dayjs/locale/de';
dayjs.extend(customParseFormat);
dayjs.locale('de');

const initialState = {
  minimalDeliveryTime: null,
  minimalCollectTime: null,
  notificationMail: null,
};

const AdminOrders = () => {
  const [sidenav, setSidenav] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [openOrders, setOpenOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  let navigate = useNavigate();

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const reduxreload = useSelector((state) => state.cartReducer);
  const { reload } = reduxreload;

  const text = settings[0]?.color[0]?.textColor;
  const border = settings[0]?.color[0]?.borderColor;
  const bgColor = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const code = settings[0]?.color[0]?.code;

  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isSupport, isAdmin, isMasterAdmin } = auth;

  const [notification, setNotification] = useState(settings[0]?.notification);
  const selectNotification = [
    { value: true, label: 'An' },
    { value: false, label: 'Aus' },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(systemSettings());
  }, []);

  const [data, setData] = useState(initialState);
  const { minimalDeliveryTime, minimalCollectTime, notificationMail } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  const handleUpdate = () => {
    if (
      minimalDeliveryTime ||
      minimalCollectTime ||
      notification ||
      notificationMail
    )
      updateInfor();
  };

  const updateInfor = () => {
    try {
      axios.patch(
        '/api/deliveryTimeSettings',
        {
          id: settings[0]?._id,
          minimalDeliveryTime: minimalDeliveryTime
            ? minimalDeliveryTime
            : settings.minimalDeliveryTime,
          minimalCollectTime: minimalCollectTime
            ? minimalCollectTime
            : settings.minimalCollectTime,
          notification: notification ? notification : settings.notification,
          notificationMail: notificationMail
            ? notificationMail
            : settings.notificationMail,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, err: '', success: 'Profil erfolgreich aktualisiert' });
      window.location.reload(true);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  /*  */

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`search/${searchKeyword}`);
    } else {
      navigate('/orders');
    }
  };

  // Refresh all 30 seconds for future it should only fetch when new order com

  // Need 2 useeffect atm bcs of setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      const getOpenOrders = async () => {
        const res = await axios.get('/api/openorders', {
          headers: { Authorization: token },
        });
        setOpenOrders(res.data);
      };
      getOpenOrders();
    }, 30000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const getOpenOrders = async () => {
      const res = await axios.get('/api/openorders', {
        headers: { Authorization: token },
      });
      setOpenOrders(res.data);
    };
    getOpenOrders();
  }, [token, delivered]);

  // Hier oben einfügen

  const { page } = useParams();

  useEffect(() => {
    const getDeliveredOrders = async () => {
      const res = await axios.get(
        `/api/completedorders?keyword=${searchKeyword}&pageNumber=${page}`,
        {
          headers: { Authorization: token },
        }
      );
      setDeliveredOrders(res.data);
    };
    getDeliveredOrders();
  }, [token, delivered, page, searchKeyword]);

  // Hinweis Offene Rechnung nach 7 Tagen im neuen Monat (Einfach wie bei Sperrung)

  const [animation, setAnimation] = useState(false);
  const [checkIndex, setCheckIndex] = useState(0);

  const handleDelivery = async (id) => {
    try {
      await axios.post(
        '/api/deliverorder',
        { id },
        {
          headers: { Authorization: token },
        }
      );
      toast.success('Bestellung abgeschlossen', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setDelivered(true);
      setDelivered(false);
    } catch (error) {
      toast.error('Bestellung nicht abgeschlossen', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleCancellation = async (deleteId) => {
    try {
      await axios.post(
        '/api/cancelorder',
        { deleteId },
        {
          headers: { Authorization: token },
        }
      );
      toast.info('Bestellung storniert', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setDelivered(true);
      setDelivered(false);
    } catch (error) {
      toast.error('Fehler beim storniert', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const animatedComponents = makeAnimated();

  function infoTheme(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 5,
      backgroundColor: code,
      colors: {
        ...theme.colors,
        primary25: '#93c5fd',
        primary: '#93c5fd',
      },
    };
  }
  const texttheme = createTheme({
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

  const handlePrint = async (order) => {
    const res = axios
      .post(
        '/api/printOut',
        {
          order,
        },
        {
          headers: { Authorization: token },
        }
      )
      .catch(function (err) {
        if (err.response) {
          toast.error(err.response.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  };

  const checkPrinter = async () => {
    const res = await axios.get('/api/checkprinteronline', {
      headers: { Authorization: token },
    });
    if (res.data === true) {
      toast.success('Drucker online', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (res.data === false) {
      toast.error('Drucker offline', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div>
      <div className='min-h-screen bg-gray-800 2xl:grid 2xl:grid-cols-7 2xl:gap-4'>
        <div className='hidden 2xl:flex 2xl:col-span-1 bg-gray-900'>
          <div className='w-60 h-full bg-gray-900 px-1'>
            <div className={`${text} font-bold text-xl ml-4 mb-2`}>
              Systemverwaltung
            </div>
            <ul className='mx-2'>
              {isSupport || isAdmin || isMasterAdmin ? (
                <li className='relative mb-1'>
                  <Link
                    to='/orders'
                    className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-gray-700 hover:bg-gray-700 transition duration-300 ease-in-out'
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
                    className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
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
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-gray-700 hover:bg-gray-700 transition duration-300 ease-in-out'
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
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-700 transition duration-300 ease-in-out'
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
        <div className='2xl:col-span-6 2xl:ml-4 2xl:bg-gray-800 bg-gray-900'>
          {(settings[0]?.payments[0]?.value === 'paypal' &&
            settings[0]?.merchantID.length < 2) ||
          (settings[0]?.payments[1]?.value === 'paypal' &&
            settings[0]?.merchantID.length < 1) ? (
            <div
              className={`w-full bg-red-800 text-white font-semibold text-center`}
            >
              PayPal deaktiviert, da Händlernummer fehlt!
            </div>
          ) : null}

          <h2
            className={`mb-8 mt-8 pt-4 ${text} font-bold text-4xl text-center`}
          >
            Bestellungen
          </h2>
          <div>
            <Accordion allowToggle className='md:ml-0 ml-1 w-64'>
              <AccordionItem>
                <AccordionButton className='text-white text-xl font-semibold'>
                  Einstellungen
                </AccordionButton>
                <AccordionPanel>
                  {/* Deliverytime */}
                  {settings[0]?.delivery.some(
                    (methode) => methode.value === 'lieferung'
                  ) ? (
                    <div className='flex my-4 w-64 ml-6 items-center'>
                      <div>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Lieferzeit in Minuten'
                            name='minimalDeliveryTime'
                            variant='outlined'
                            value={
                              minimalDeliveryTime ??
                              settings[0]?.minimalDeliveryTime
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                  ) : null}
                  {/* Collecting Time */}
                  {settings[0]?.delivery.some(
                    (methode) => methode.value === 'lieferung'
                  ) ? (
                    <div className='flex my-4 w-64 ml-6 items-center'>
                      <div>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Abholzeit in Minuten'
                            name='minimalCollectTime'
                            variant='outlined'
                            value={
                              minimalCollectTime ??
                              settings[0]?.minimalCollectTime
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                  ) : null}
                  {/* E-Mail for Notification */}
                  <div className='flex py-2'>
                    <div className='text-white pr-1 ml-6 '>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          type='text'
                          id='textfield'
                          label='E-Mail für Bestellungen'
                          name='notificationMail'
                          variant='outlined'
                          value={
                            notificationMail ?? settings[0]?.notificationMail
                          }
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                  </div>

                  {/* Notification */}
                  <div className='flex my-4 w-64 ml-6 items-center'>
                    <div className='flex justify-between'>
                      <div className='text-gray-900 pb-1 m-1'>
                        <Select
                          menuPortalTarget={document.querySelector('body')}
                          options={selectNotification}
                          defaultValue={notification}
                          autoFocus
                          theme={infoTheme}
                          onChange={setNotification}
                          components={animatedComponents}
                          isSearchable={false}
                        />
                      </div>
                    </div>
                  </div>
                  {/*                   <div className='flex ml-6 mb-8 text-white font-semibold'>
                    <div
                      className={`px-2 rounded ${bgColor} ${border}`}
                      onClick={checkPrinter}
                    >
                      Drucker Testen
                    </div>
                  </div> */}
                  <button
                    onClick={handleUpdate}
                    className={`block w-full ${bgColor} ${hoverbgColor} p-2 mt-2 rounded-t text-white transition duration-300`}
                  >
                    Veränderungen bestätigen
                  </button>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Accordion allowToggle className='bg-gray-900' defaultIndex={0}>
              <AccordionItem>
                <AccordionButton
                  className={`py-6 px-4 bg-gray-900 font-bold ${text} text-xl border-t ${border} justify-center`}
                >
                  <div className=''>Offene Bestellungen</div>
                  <div className='pl-4'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-6 h-6 stroke-2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5'
                      />
                    </svg>
                  </div>
                  <div
                    className={`text-white ${
                      openOrders?.length > 0 ? 'animate-bounce' : ''
                    } `}
                  >
                    {openOrders?.length}
                  </div>
                </AccordionButton>
                <AccordionPanel>
                  <table className='bg-gray-900 text-gray-100 mx-auto mb-4 w-[100%]'>
                    <thead className='border '>
                      <tr>
                        <th className='border md:px-2'>Bestellung</th>
                        <th className='border md:px-2'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {openOrders.map((order, index) => {
                        return (
                          <tr
                            className={`${
                              animation &&
                              index === checkIndex &&
                              'animate-vflip'
                            } `}
                            onAnimationEnd={() => {
                              setAnimation(false);
                            }}
                            key={index}
                          >
                            <td
                              className={`border md:pl-4 pl-0 ${
                                order.delivery === 'lieferung'
                                  ? 'bg-teal-800'
                                  : 'bg-lime-900'
                              }`}
                            >
                              {order.delivery === 'abholung' ? (
                                <div className='px-2 font-semibold text-sm'>
                                  <div className='flex justify-between text-xl font-semibold'>
                                    <div className='flex'>
                                      <div className='pr-1'>
                                        {order.firstName}
                                      </div>
                                      <div>{order.lastName}</div>
                                    </div>
                                    <div className='flex'>
                                      <div className='pr-1'>
                                        {dayjs(order.time).format('HH:mm')}
                                      </div>
                                      <div>Uhr</div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className='px-2 font-semibold text-sm text-gray-300'>
                                  <div className='flex justify-between text-xl font-semibold text-gray-100'>
                                    <div className='flex'>
                                      <div className='pr-1'>
                                        {order.firstName}
                                      </div>
                                      <div>{order.lastName}</div>
                                    </div>
                                    <div className='flex'>
                                      <div className='pr-1'>
                                        {dayjs(order.time).format('HH:mm')}
                                      </div>
                                      <div>Uhr</div>
                                    </div>
                                  </div>
                                  <div className='flex'>
                                    <div className='pr-1'>{order.street}</div>
                                    <div>{order.streetNumber}</div>
                                  </div>
                                  <div className='flex'>
                                    <div className='pr-1'>{order.zipCode}</div>
                                    <div>{order.city}</div>
                                  </div>
                                  <div className='flex'>
                                    <div className='pr-1'>Tel Nr.:</div>
                                    <div>{order.telefon}</div>
                                  </div>
                                </div>
                              )}
                              <div className='px-2'>
                                {/* Bestellnummer */}
                                <div className='flex justify-between text-sm font-semibold mt-2'>
                                  <div className='text-gray-300'>
                                    {order.paymentID}
                                  </div>
                                </div>
                                <div className='flex justify-between mt-4'>
                                  <div>
                                    {order.cartItems.map((item) => {
                                      return (
                                        <div className='flex mb-2 items-center text-lg font-bold ml-2'>
                                          <img
                                            src={item.image}
                                            className='md:inline hidden rounded w-20 h-20 border-10 mr-1 '
                                            onError={(event) =>
                                              (event.target.style.display =
                                                'none')
                                            }
                                          ></img>
                                          <div>
                                            <div className='flex'>
                                              <div className='pr-1'>
                                                {item.quantity}x {item.name}{' '}
                                                {item.variantName}
                                              </div>
                                              <div className='md:flex hidden'>
                                                <div>
                                                  {(
                                                    Math.round(
                                                      item.variant * 100
                                                    ) / 100
                                                  ).toFixed(2)}{' '}
                                                </div>
                                                <div>€</div>
                                              </div>
                                            </div>
                                            {item.toppings.length > 0 ? (
                                              <div className='text-green-500 pl-2'>
                                                {item.toppings.map(
                                                  (topping) => {
                                                    return (
                                                      <div className='flex'>
                                                        <div className='mr-1'>
                                                          {topping.label}
                                                        </div>
                                                        <div>
                                                          {parseInt(
                                                            topping.value
                                                          ).toFixed(2)}
                                                          €
                                                        </div>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            ) : (
                                              ''
                                            )}
                                            {item.removeIng.length > 0 ? (
                                              <div className='text-red-500 pl-2'>
                                                {item.removeIng.map(
                                                  (remove) => {
                                                    return (
                                                      <div>{remove.label}</div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            ) : (
                                              ''
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div>
                                    <div className='text-xl font-semibold text-red-400'>
                                      {(
                                        Math.round(order.carttotal * 100) / 100
                                      ).toFixed(2)}
                                      €
                                    </div>
                                    {/* <button
                                      className={`flex mt-4 ${bgColor} rounded p-2`}
                                      onClick={() => test()}
                                    >
                                      <div>Beleg</div>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke-width='1.5'
                                        stroke='currentColor'
                                        class='w-6 h-6'
                                      >
                                        <path
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                          d='M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z'
                                        />
                                      </svg>
                                    </button> */}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td
                              onClick={() => {
                                setAnimation(true);
                                setCheckIndex(index);
                                handleDelivery(order._id);
                              }}
                              className='bg-orange-500 text-center cursor-pointer border-b font-bold md:text-2xl md:text-2xl md:w-72 w-20'
                            >
                              {order.delivery === 'abholung'
                                ? 'Jetzt übergeben'
                                : 'Jetzt liefern'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Accordion className={`border-b ${border} bg-gray-900`} allowToggle>
              <AccordionItem>
                <AccordionButton
                  className={`py-6 px-4 bg-gray-900 font-bold ${text} text-xl border-t ${border} justify-center`}
                >
                  Abgeschlossene Bestellungen
                </AccordionButton>
                <AccordionPanel>
                  <form
                    onSubmit={submitHandler}
                    className='my-8 flex justify-center pt-2 relative text-gray-800'
                  >
                    <input
                      type='search'
                      className='border-2 bg-gray-100 h-10 px-5 pr-14 rounded-lg text-sm focus:outline-none'
                      placeholder='#OrderID, Name, Stadt'
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button type='submit' className='absolute top-0 mt-4 ml-48'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        stroke-width='2'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                      </svg>
                    </button>
                  </form>
                  <div className='my-8 text-white'>
                    <Pagination
                      pages={deliveredOrders?.pages}
                      page={deliveredOrders?.page}
                      keyword={searchKeyword ? searchKeyword : ''}
                    />
                  </div>
                  <table className='bg-gray-900 mx-auto text-gray-100 mb-4 w-[100%]'>
                    <thead className='border '>
                      <tr>
                        <th className='border md:px-2'>Bestellung</th>
                        <th className='border md:px-2'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveredOrders?.delivered?.map((order) => {
                        return (
                          <tr className='font-semibold'>
                            <td
                              className={`border md:px-2 pl-0 md:pl-4 pl-0 ${
                                order.delivery === 'lieferung'
                                  ? 'bg-blue-500'
                                  : 'bg-gray-900'
                              }`}
                            >
                              {order.delivery === 'abholung' ? (
                                <div className='flex justify-between'>
                                  <div>
                                    <div className='flex'>
                                      <div className='pr-1'>
                                        {order.firstName}
                                      </div>
                                      <div>{order.lastName}</div>
                                    </div>

                                    {/* Bestellnummer */}
                                  </div>
                                  <div className='md:flex'>
                                    <div className='pr-1'>
                                      {dayjs(order.time).format('DD.MM.YYYY')}
                                    </div>
                                    <div className='flex'>
                                      <div className='pr-1'>
                                        {dayjs(order.time).format('HH:mm')}
                                      </div>
                                      <div>Uhr</div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div className='flex justify-between text-xl font-semibolds'>
                                    <div className='flex'>
                                      <div className='pr-1'>
                                        {order.firstName}
                                      </div>
                                      <div>{order.lastName}</div>
                                    </div>
                                    <div className='md:flex'>
                                      <div className='pr-1'>
                                        {dayjs(order.time).format('DD.MM.YYYY')}
                                      </div>
                                      <div className='flex'>
                                        <div className='pr-1'>
                                          {dayjs(order.time).format('HH:mm')}
                                        </div>
                                        <div>Uhr</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='flex justify-between'>
                                    <div>
                                      <div className='flex font-semibold text-sm text-gray-300'>
                                        <div className='pr-1'>
                                          {order.street}
                                        </div>
                                        <div>{order.streetNumber}</div>
                                      </div>
                                      <div className='flex font-semibold text-sm text-gray-300'>
                                        <div className='pr-1'>
                                          {order.zipCode}
                                        </div>
                                        <div>{order.city}</div>
                                      </div>
                                      <div className='flex font-semibold text-sm text-gray-300'>
                                        <div className='pr-1'>Tel Nr.:</div>
                                        <div>{order.telefon}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className='flex justify-between'>
                                <div>{order.paymentID}</div>
                                <div className='mr-2'>
                                  {order.delivery === 'lieferung' ? (
                                    <div>
                                      <div className='flex justify-end'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          stroke-width='1.5'
                                          stroke='currentColor'
                                          class='w-6 h-6'
                                        >
                                          <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                                          />
                                        </svg>

                                        <div className='flex justify-end'>
                                          {(
                                            Math.round(
                                              order.cartItems.reduce(
                                                (x, item) => x + item.price,
                                                0
                                              ) * 100
                                            ) / 100
                                          ).toFixed(2)}
                                          €
                                        </div>
                                      </div>
                                      <div className='flex justify-end'>
                                        +{' '}
                                        {(
                                          (
                                            Math.round(order.carttotal * 100) /
                                            100
                                          ).toFixed(2) -
                                          (
                                            Math.round(
                                              order.cartItems.reduce(
                                                (x, item) => x + item.price,
                                                0
                                              ) * 100
                                            ) / 100
                                          ).toFixed(2)
                                        ).toFixed(2)}
                                        €
                                      </div>
                                      <div>
                                        <div>
                                          Summe:{' '}
                                          {(
                                            Math.round(order.carttotal * 100) /
                                            100
                                          ).toFixed(2)}
                                          €
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div>
                                      Summe:{' '}
                                      {(
                                        Math.round(
                                          order.cartItems.reduce(
                                            (x, item) => x + item.price,
                                            0
                                          ) * 100
                                        ) / 100
                                      ).toFixed(2)}
                                      €
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className='flex justify-between'>
                                <div>
                                  {order.cartItems.map((item) => {
                                    return (
                                      <div className='flex my-2 items-center'>
                                        <img
                                          src={item.image}
                                          className='md:inline hidden rounded w-20 h-20 border-10 mr-1'
                                          onError={(event) =>
                                            (event.target.style.display =
                                              'none')
                                          }
                                        ></img>
                                        <div>
                                          <div className='flex'>
                                            <div className='pr-1'>
                                              {item.quantity}x {item.name}{' '}
                                              {item.variantName}
                                            </div>
                                            <div className='flex'>
                                              <div>
                                                {(
                                                  Math.round(
                                                    item.variant * 100
                                                  ) / 100
                                                ).toFixed(2)}
                                              </div>
                                              <div>€</div>
                                            </div>
                                          </div>
                                          {item.toppings.length > 0 ? (
                                            <div className='text-green-500'>
                                              {item.toppings.map((topping) => {
                                                return (
                                                  <div>{topping.label}</div>
                                                );
                                              })}
                                            </div>
                                          ) : (
                                            ''
                                          )}
                                          {item.removeIng.length > 0 ? (
                                            <div className='text-red-500'>
                                              {item.removeIng.map((remove) => {
                                                return (
                                                  <div>{remove.label}</div>
                                                );
                                              })}
                                            </div>
                                          ) : (
                                            ''
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div>
                                  <button
                                    className={`text-md font-semibold text-red-300 mt-2 ${
                                      order.cancelation ? 'hidden' : null
                                    }`}
                                    onClick={() => {
                                      setShowModal(!showModal);
                                      setDeleteId(order._id);
                                    }}
                                  >
                                    Stornieren
                                  </button>
                                  {showModal && order._id === deleteId && (
                                    <>
                                      <div
                                        className='backdrop'
                                        onClick={(e) => {
                                          if (
                                            e.target.className === 'backdrop'
                                          ) {
                                            setShowModal(false);
                                          }
                                        }}
                                      >
                                        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                                          <div className=' rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                                            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-gray-600'>
                                              <h3 className='text-3xl font-semibold text-red-500'>
                                                Bestellung stornieren
                                              </h3>
                                            </div>
                                            <div className='relative p-6 flex-auto bg-gray-600'>
                                              <p className='my-4 text-white text-lg leading-relaxed'>
                                                Möchtest du diese Bestellung
                                                wirklich stornieren? Du kannst
                                                dies nicht rückgängig machen.
                                              </p>
                                            </div>
                                            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b bg-gray-600'>
                                              <button
                                                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                type='button'
                                                onClick={() =>
                                                  setShowModal(!showModal)
                                                }
                                              >
                                                Abbrechen
                                              </button>
                                              <button
                                                className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                type='button'
                                                onClick={() => {
                                                  handleCancellation(deleteId);
                                                  setShowModal(!showModal);
                                                }}
                                              >
                                                Bestellung stornieren
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  {/* <button
                                    className={`flex mt-4 ${bgColor} rounded p-2`}
                                    onClick={() => handlePrint(order)}
                                  >
                                    <div>Beleg</div>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      stroke-width='1.5'
                                      stroke='currentColor'
                                      class='w-6 h-6'
                                    >
                                      <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z'
                                      />
                                    </svg>
                                  </button> */}
                                </div>
                              </div>
                            </td>
                            <td className='border md:px-2 md:w-72 w-20'>
                              <div className='flex justify-center'>
                                <div className='md:inline hidden text-green-500'>
                                  {order?.cancelation === true ? (
                                    <div className='text-red-600'>
                                      Storniert
                                    </div>
                                  ) : (
                                    <div className='text-green-500'>
                                      Abgeschlossen
                                    </div>
                                  )}
                                </div>
                                {order?.cancelation === true ? (
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    class='w-6 h-6 text-red-600'
                                  >
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 text-green-500'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    stroke-width='2'
                                  >
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                                    />
                                  </svg>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
