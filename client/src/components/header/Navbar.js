import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { systemSettings } from '../../redux/actions/systemSettingsAction';

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(systemSettings());
  }, []);

  const cartstate = useSelector((state) => state.cartReducer);
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const hoverText = settings[0]?.color[0]?.hoverText;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const border = settings[0]?.color[0]?.borderColor;

  const auth = useSelector((state) => state.auth);

  const { user, isLogged, isSupport, isAdmin, isMasterAdmin } = auth;

  const handleLogout = async () => {
    try {
      await axios.get('/user/logout');
      localStorage.removeItem('firstLogin');
      window.location.href = '/';
    } catch (err) {
      window.location.href = '/';
    }
  };
  return (
    <div className='sticky top-0 z-50'>
      <nav className={`bg-gray-800 text-white border-b-4 ${border}`}>
        {/* navbar goes here */}
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex md:justify-between'>
            <div className='flex'>
              {/* logo */}

              <div>
                {settings[0]?.brandImage ? (
                  <Link
                    to='/'
                    onClick={() => window.scrollTo(0, 0)}
                    className='flex items-center py-5 px-2'
                  >
                    <img
                      src={settings[0]?.brandImage}
                      className=' w-9 h-9 mr-2'
                    />
                    <div className={`font-bold text-white ${hoverText}`}>
                      {settings[0]?.brand}
                    </div>
                  </Link>
                ) : (
                  <Link
                    to='/'
                    onClick={() => window.scrollTo(0, 0)}
                    className='flex items-center px-2'
                  >
                    <img
                      src='/images/navbaricon.png'
                      alt='navbaricon.png'
                      className='h-8 w-8 mr-1'
                    />
                    <span className={`font-bold text-white ${hoverText} py-5`}>
                      {settings[0]?.brand}
                    </span>
                  </Link>
                )}
              </div>
              {/* primary nav */}
              <div className='hidden md:flex items-center space-x-1'>
                <Link to='/location'>
                  <div className={`block py-2 px-4 text-white ${hoverText}`}>
                    Anfahrt
                  </div>
                </Link>
                <Link
                  to='/ambience'
                  className={`py-5 px-3 text-white ${hoverText}`}
                >
                  Unser Ambiente
                </Link>
                {/*  <Link
                  to='/'
                  className='py-5 px-3 text-white hover:text-yellow-500'
                >
                  Aktuelles
                </Link> */}
              </div>
            </div>
            {/* secondary nav */}
            <div className='md:flex md:ml-0 ml-auto md:mr-0 mr-4 items-center space-x-3 flex justify-center'>
              <Link to='cart' className='py-5 md:px-3 relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-6 w-6 text-white ${hoverText}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <div
                  className={`absolute md:top-3 md:right-1 md:left-6 top-3 left-3 w-4 h-4 ${bg} rounded-full font-semibold justify-center align-center flex items-center text-xs`}
                >
                  {cartstate?.cartItems?.length} {/* Amount of Items in Cart */}
                </div>
              </Link>

              {isLogged ? (
                <div className='relative hidden md:flex'>
                  <button
                    className={`block text-white ${hoverText} flex`}
                    onClick={() => setUserMenu(!userMenu)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                    {user.firstName} {user.lastName}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                  {/* https://youtu.be/TQFW3AtrDw4 Basic Dropdown
                 https://youtu.be/If6XdbBQqmY JavaScript State
                 https://youtu.be/DL_ziY383xg Mobile
                 */}
                  <div className={'hidden' + (userMenu ? 'hidden' : '')}>
                    <button
                      onClick={() => setUserMenu(!userMenu)}
                      className='fixed inset-0 bg-black opacity-50 h-full w-full cursor-default z-10'
                    ></button>
                  </div>
                  <div className={'hidden' + (userMenu ? 'hidden' : '')}>
                    <div
                      className='w-36 mt-12 absolute right-0 z-20'
                      onClick={() => setUserMenu(!userMenu)}
                    >
                      <Link
                        to={
                          isAdmin
                            ? '/orders'
                            : isSupport
                            ? '/orders'
                            : isMasterAdmin
                            ? '/orders'
                            : '/'
                        }
                        className={`${
                          isSupport || isAdmin || isMasterAdmin
                            ? null
                            : 'hidden'
                        } block px-4 py-2 bg-gray-700 text-gray-100 ${hoverText}`}
                      >
                        <div>Verwaltung</div>
                      </Link>
                      <Link
                        to={'/profile'}
                        className={`block px-4 py-2 bg-gray-700 text-gray-100 ${hoverText}`}
                      >
                        <div>Profil</div>
                      </Link>
                      <Link
                        to='/'
                        className={`block px-4 py-2 bg-gray-700 text-gray-100 ${hoverText} rounded-bl-lg rounded-br-lg`}
                        onClick={handleLogout}
                      >
                        <div>Abmelden</div>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex justify-center items-center space-x-3'>
                  <Link to='/login' className='py-5 px-3'>
                    <div className={`text-white ${hoverText}`}>Anmelden</div>
                  </Link>
                  <Link
                    to='/register'
                    className={`hidden md:flex font-semibold py-3 px-3 ${bg} ${hoverbgColor} text-white rounded transition duration-300`}
                  >
                    Registrieren
                  </Link>
                </div>
              )}
            </div>

            {/* mobile button goes here */}
            <div
              className='offcanvasButton md:hidden flex items-center'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <button>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
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
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <div className={'md:hidden' + (navbarOpen ? '' : ' hidden')}>
          <Link to='/location'>
            <div className={`block py-2 px-4 text-sm text-white ${hoverText}`}>
              Anfahrt
            </div>
          </Link>
          <Link to='/ambience'>
            <div className={`block py-2 px-4 text-sm text-white ${hoverText}`}>
              Unser Ambiente
            </div>
          </Link>
          {/* <Link to='#' className='block py-2 px-4 text-sm hover:bg-gray-300'>
            Aktuelles
          </Link> */}
          <div className='pl-3.5 py-2'>
            {isLogged ? (
              <div className='relative'>
                <button
                  className={`block flex text-white ${hoverText}`}
                  onClick={() => setUserMenu(!userMenu)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                  {user.firstName} {user.lastName}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>
                {/* https://youtu.be/TQFW3AtrDw4 Basic Dropdown
                 https://youtu.be/If6XdbBQqmY JavaScript State
                 https://youtu.be/DL_ziY383xg Mobile
                 */}
                <div className={'hidden' + (userMenu ? 'hidden' : '')}>
                  <button
                    onClick={() => setUserMenu(!userMenu)}
                    className='fixed inset-0 bg-black opacity-50 h-full w-full cursor-default z-10'
                  ></button>
                </div>
                <div className={'hidden' + (userMenu ? 'hidden' : '')}>
                  <div
                    className=' w-36 mt-2 absolute z-20'
                    onClick={() => {
                      setUserMenu(!userMenu);
                      setNavbarOpen(!navbarOpen);
                    }}
                  >
                    <Link
                      to={
                        isAdmin
                          ? '/orders'
                          : isSupport
                          ? '/orders'
                          : isMasterAdmin
                          ? '/orders'
                          : '/'
                      }
                      className={`${
                        isSupport || isAdmin || isMasterAdmin ? null : 'hidden'
                      } block px-4 py-2 bg-gray-700 text-gray-100  ${hoverText}`}
                    >
                      <div>Verwaltung</div>
                    </Link>
                    <Link
                      to={'/profile'}
                      className={`block px-4 py-2 bg-gray-700 text-gray-100 ${hoverText}`}
                    >
                      <div>Profil</div>
                    </Link>
                    <Link
                      to='/'
                      className={`block px-4 py-2 bg-gray-700 text-gray-100 ${hoverText} rounded-bl-lg rounded-br-lg`}
                      onClick={handleLogout}
                    >
                      <div>Abmelden</div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className='mb-2'>
                <Link
                  to='/register'
                  className={`py-1 px-2 ${bg} ${hoverbgColor} text-white rounded transition duration-300`}
                >
                  Registrieren
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
