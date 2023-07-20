import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { isLength, isMatch } from '../../utils/validation/Validation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingMedium from '../../utils/loading/LoadingMedium';

const initialState = {
  password: '',
  cf_password: '',
  err: '',
  success: '',
};

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const navigate = useNavigate();

  const { password, cf_password, err, success } = data;

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const focusBorder = settings[0]?.color[0]?.focusBorder;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  const handleResetPassword = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: 'Passwort muss mindestens 6 Stellen haben',
        success: '',
      });
    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: 'Passwörter müssen übereinstimmen',
        success: '',
      });
    try {
      setLoading(true);
      const res = await axios.post(
        '/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setData({
        ...data,
        err: '',
        success: res.data.msg,
      });
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (err) {
      setLoading(false) &&
        err.response.data.msg &&
        setData({
          ...data,
          err: err.response.data.msg,
          success: '',
        });
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
  return (
    <div className='h-screen bg-gray-700'>
      <div className='max-w-md mx-auto bg-gray-700 rounded-lg md:max-w-5xl'>
        <div className='md:flex'>
          <div className='w-full p-12 px-12 '>
            <div className='bg-gray-800 p-16 rounded shadow-2xl'>
              <h2 className={`text-3xl font-bold mb-10 ${text} text-center`}>
                Neues Passwort erstellen
              </h2>
              <div className='flex justify-center '>
                {loading ? (
                  <LoadingMedium />
                ) : (
                  <div className='w-[500px]'>
                    <label className='block mb-1 font-bold text-gray-100'>
                      Passwort
                    </label>
                    <input
                      type='password'
                      placeholder='Neues Passwort eingeben'
                      value={password}
                      required
                      className={`w-full border-2 text-white border-gray-500 bg-gray-700 p-3 rounded outline-none ${focusBorder}`}
                      name='password'
                      onChange={handleChangeInput}
                    ></input>
                    <label class='block mb-1 font-bold text-gray-100'>
                      Passwort bestätigen
                    </label>
                    <input
                      type='password'
                      placeholder='Neues Passwort wiederholen'
                      value={cf_password}
                      required
                      className={`w-full border-2 text-white border-gray-500 bg-gray-700 p-3 mb-4 rounded outline-none ${focusBorder}`}
                      name='cf_password'
                      onChange={handleChangeInput}
                    ></input>
                    <button
                      onClick={handleResetPassword}
                      className={`block w-full ${bg} ${hoverbgColor} p-4 rounded text-white transition duration-300`}
                    >
                      Neues Passwort erstellen
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
