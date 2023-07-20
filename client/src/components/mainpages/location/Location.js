import React from 'react';
import { useSelector } from 'react-redux';
const Location = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  return (
    <div className='min-h-screen bg-gray-700 py-8'>
      <h2 className={`text-3xl font-bold mb-8 ${text} text-center`}>Anfahrt</h2>
      <div className='flex justify-center'>
        <iframe
          src={settings[0]?.mapsLink}
          style={{
            border: 0,
            width: window.innerWidth < 700 ? '90%' : 1230,
            height: window.innerWidth < 700 ? 500 : 675,
          }}
          allowfullscreen=''
          loading='lazy'
          referrerpolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
