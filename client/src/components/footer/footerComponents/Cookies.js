import React from 'react';
import { useSelector } from 'react-redux';
const Cookies = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;
  const text = settings[0]?.color[0]?.textColor;
  return (
    <div className='min-h-screen bg-gray-700 py-8 select-none'>
      <div class='max-w-md mx-auto rounded-lg md:max-w-5xl'>
        <div class='md:flex '>
          <div class='w-full'>
            <div className=' bg-gray-800 p-6 rounded shadow-2xl '>
              <h2 class={`text-3xl font-bold mb-8 ${text} text-center`}>
                Hinweise zu Cookies
              </h2>
              <div className='text-white font-semibold pl-4 pt-4'>
                <p>
                  Wir verwenden Cookies für die hier unten beschriebenen Zwecke.
                </p>
                <p className='pt-4'>Unbedingt erforderlich um:</p>
                <ul className='font-normal'>
                  <li>- zu erkennen ob ein Nutzer angemeldet ist.</li>
                  <li>
                    - einem Nutzer die Möglichkeit zu geben eingeloggt zu
                    bleiben.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
