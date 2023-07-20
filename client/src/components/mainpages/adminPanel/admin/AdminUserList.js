// Tabs: https://www.youtube.com/watch?v=WkREeDy2WQ4

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from '../../../utils/pagination/Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../adminStyles/modal.css';

const initialState = {
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  streetNumber: '',
  zipCode: '',
  city: '',
  password: '',
  cf_password: '',
  err: '',
  success: '',
};

const AdminUserList = () => {
  const [sidenav, setSidenav] = useState(false);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [data, setData] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();

  const { user, isSupport, isAdmin, isMasterAdmin } = auth;

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;

  const { page } = useParams();

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get(
        `/user/alluserspage?keyword=${searchKeyword}&pageNumber=${page}`,
        {
          headers: { Authorization: token },
        }
      );
      setUsers(res.data);
    };
    getAllUsers();
  }, [token, isAdmin, isMasterAdmin, callback, page, searchKeyword]);

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`search/${searchKeyword}`);
    } else {
      navigate('/orders');
    }
  };
  console.log(user);
  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        console.log('role', user.role !== 0);
        if (user.role !== 0) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        } else {
          console.log('test');
          toast.error(
            'Supporter und Admins können nicht gelöscht werden. Entferne zuerst die Rechte.',
            {
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        }
      } else {
        console.log('role', user.role !== 0);
        toast.error('Nutzer konnte nicht gelöscht werden.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  return (
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
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out'
                  href='#!'
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
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out'
                  to='/products'
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
                  className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-gray-700 hover:bg-gray-700 transition duration-300 ease-in-out'
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
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out'
                href='#!'
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
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out'
                to='/products'
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
                className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-gray-700 hover:bg-gray-700 transition duration-300 ease-in-out'
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
      <div className='2xl:col-span-6 2xl:ml-4 2xl:bg-gray-800 bg-gray-900 text-white'>
        <h2 className={`mb-8 mt-8 pt-4 ${text} font-bold text-4xl text-center`}>
          Nutzerverwaltung
        </h2>
        <form
          onSubmit={submitHandler}
          className='my-8 flex justify-center pt-2 relative text-gray-800'
        >
          <input
            type='search'
            className='border-2 bg-gray-100 h-10 px-5 pr-14 rounded-lg text-sm focus:outline-none'
            placeholder='Name, E-Mail'
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
            pages={users?.pages}
            page={users?.page}
            keyword={searchKeyword ? searchKeyword : ''}
          />
        </div>
        <div>
          <div
            style={{ overflowX: 'auto' }}
            className='flex justify-center pt-1'
          >
            <table className='border-spacing bg-gray-900'>
              <thead className={`${text}`}>
                <tr>
                  {/* <th className='border md:px-2'>ID</th> */}
                  <th className='border md:px-2'>Name</th>
                  <th className='border md:px-2'>Email</th>
                  <th className='border md:px-2'>Admin</th>
                  <th className='border md:px-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.user?.map((user) => (
                  <tr key={user._id}>
                    {/* <td className='border md:px-2'>{user.userID}</td> */}
                    <td className='border md:px-2 md:w-fit w-24 break-words md:break-keep'>
                      {user.firstName} {user.lastName}
                    </td>
                    <td className='border md:px-2 md:w-fit w-38 md:break-keep break-all'>
                      {user.email}
                    </td>
                    <td className='border md:px-2 md:w-fit w-14 break-words md:break-keep'>
                      {user.role === 1 ? (
                        <div
                          className='font-semibold text-orange-500'
                          title='Admin'
                        >
                          Admin
                        </div>
                      ) : user.role === 2 ? (
                        <div
                          className={`font-semibold ${text}`}
                          title='Support'
                        >
                          Support
                        </div>
                      ) : user.role === 3 ? (
                        <div
                          className='font-semibold text-red-500'
                          title='MasterAdmin'
                        >
                          Master Admin
                        </div>
                      ) : (
                        <div className='text-white' title='User'>
                          User
                        </div>
                      )}
                    </td>
                    <td className='items-center border md:px-2'>
                      <div className='md:flex md:justify-center'>
                        <div className='flex justify-center'>
                          <Link
                            to={`/edit_user/${user._id}`}
                            className='p-2 min-w-56 bg-yellow-500 md:rounded-l-md md:rounded-r-none rounded-t-md font-bold'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className={`h-6 w-6 text-white`}
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                              <path
                                fill-rule='evenodd'
                                d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                                clip-rule='evenodd'
                              />
                            </svg>
                          </Link>
                        </div>
                        <div className='flex justify-center'>
                          <button
                            onClick={() => {
                              setShowModal(!showModal);
                              setUserId(user._id);
                            }}
                            className='p-2 min-w-56 bg-red-500 md:rounded-r-md md:rounded-l-none rounded-b-md font-bold'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-white'
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
                          </button>
                          {showModal && user._id === userId && (
                            <>
                              <div
                                className='backdrop'
                                onClick={(e) => {
                                  if (e.target.className === 'backdrop') {
                                    setShowModal(false);
                                  }
                                  console.log(e);
                                }}
                              >
                                <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                                  <div className=' rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                                    <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-gray-600'>
                                      <h3 className='text-3xl font-semibold text-red-500'>
                                        Nutzer löschen
                                      </h3>
                                    </div>
                                    <div className='relative p-6 flex-auto bg-gray-600'>
                                      <p className='my-4 text-white text-lg leading-relaxed'>
                                        Möchtest du diesen Nutzer wirklich
                                        löschen?
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
                                          handleDelete(userId);
                                          setShowModal(!showModal);
                                        }}
                                      >
                                        Nutzer löschen
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
