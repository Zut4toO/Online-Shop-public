import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GiveAdmin = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const code = settings[0]?.color[0]?.code;

  const { id } = useParams();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState([]);
  console.log(editUser);

  const users = useSelector((state) => state.users);
  console.log(users);
  const token = useSelector((state) => state.token);

  const [checkRole, setCheckRole] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);
  console.log(num);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          switch (user.role) {
            case 0:
              setCheckRole(0);
              break;
            case 1:
              setCheckRole(1);
              break;
            case 2:
              setCheckRole(2);
              break;
            default:
              setCheckRole(0);
          }
        }
      });
    } else {
      setTimeout(() => {
        if (users?.length !== 0) {
          navigate('/userlist');
        }
      }, 2000);
    }
  }, [users, id, navigate]);

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `/user/update_role/${editUser._id}`,
        {
          role: num,
        },
        {
          headers: { Authorization: token },
        }
      );

      setSuccess(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheck = (e) => {
    setSuccess('');
    setErr('');
    /* setCheckRole(!checkRole); */
    setNum(e.value);
  };

  const selectRole = [
    { value: 0, label: 'Nutzer' },
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Support' },
  ];
  const animatedComponents = makeAnimated();

  function customThemeRole(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 5,
      backgroundColor: code,
      colors: {
        ...theme.colors,
        primary25: code,
        primary: code,
      },
    };
  }
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.1 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  success &&
    toast.success(success, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  err &&
    toast.info(err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  return (
    <div>
      <div className='h-screen bg-gray-700 pt-8 text-white font-medium'>
        <div className='max-w-md mx-auto bg-gray-900 shadow-lg rounded-lg md:max-w-7xl'>
          <div className='md:flex '>
            <div className='w-full p-4 px-4'>
              <div className='bg-gray-800 p-2'>
                <div className='flex'>
                  <button
                    onClick={() => navigate(-1)}
                    className='flex items-center pb-9'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className={`h-5 w-5 ${text}`}
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
                        clip-rule='evenodd'
                      />
                    </svg>
                    <div className={`${text}`}>Zurück</div>
                  </button>

                  <h2 className='mx-auto text-2xl pb-8'>Edit User</h2>
                </div>
                <div className='px-[30%]'>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Vorname</label>
                    <input
                      type='text'
                      name='firstName'
                      defaultValue={editUser.firstName}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Nachname</label>
                    <input
                      type='text'
                      name='lastName'
                      defaultValue={editUser.lastName}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Firma</label>
                    <input
                      type='text'
                      name='companyName'
                      defaultValue={editUser.companyName}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Straße</label>
                    <input
                      type='text'
                      name='street'
                      defaultValue={editUser.street}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Hausnummer</label>
                    <input
                      type='text'
                      name='streetNumber'
                      defaultValue={editUser.streetNumber}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Postleitzahl</label>
                    <input
                      type='text'
                      name='zipCode'
                      defaultValue={editUser.zipCode}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Stadt</label>
                    <input
                      type='text'
                      name='city'
                      defaultValue={editUser.city}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Email</label>
                    <input
                      type='email'
                      name='email'
                      defaultValue={editUser.email}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <div className='flex justify-between my-1'>
                    <label htmlFor='name'>Telefon</label>
                    <input
                      type='text'
                      name='telefon'
                      defaultValue={editUser.telefon}
                      disabled
                      className='px-2 font-medium'
                    />
                  </div>
                  <Select
                    options={selectRole}
                    defaultValue={checkRole}
                    theme={customThemeRole}
                    styles={customStyles}
                    onChange={handleCheck}
                    components={animatedComponents}
                    isSearchable={false}
                  />
                  <button
                    onClick={handleUpdate}
                    className={`block w-full ${bg} ${hoverbgColor} p-4 mt-2 rounded text-white transition duration-300`}
                  >
                    Veränderungen bestätigen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveAdmin;
