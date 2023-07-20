import React from 'react';
import { useSelector } from 'react-redux';

const RegisterWatingRoom = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  return (
    <div class='min-h-screen  bg-gray-700 py-8'>
      <div class='max-w-md mx-auto bg-gray-700 rounded-lg md:max-w-5xl'>
        <div class='md:flex'>
          <div class='w-full'>
            <div class='col-span-2'></div>
            <div className=' bg-gray-800 p-6 rounded shadow-2xl '>
              <h2 class={`text-3xl font-bold mb-8 ${text} text-center`}>
                Registrierung abschließen
              </h2>
              <div className='text-white font-bold text-xl justify-center flex'>
                Bitte klicke auf den Bestätigungslink, welchen wir dir soeben
                per E-Mail zugeschickt haben.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterWatingRoom;
