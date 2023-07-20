import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ActivationEmail = () => {
  const navigate = useNavigate();

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;

  const { activation_token } = useParams();

  const [err, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post('/user/activation', {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setError(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  /* success &&
    toast.success(success, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  err &&
    toast.info(err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    }); */

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 500);
  }, []);

  return (
    <div class='min-h-screen  bg-gray-700 py-8'>
      <div class='max-w-md mx-auto bg-gray-700 rounded-lg md:max-w-5xl'>
        <div class='md:flex'>
          <div class='w-full'>
            <div class='col-span-2'></div>
            <div className=' bg-gray-800 p-6 rounded shadow-2xl '>
              <h2 class={`text-3xl font-bold mb-8 ${text} text-center`}>
                Registrierung erfolgreich abgeschlossen
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationEmail;
