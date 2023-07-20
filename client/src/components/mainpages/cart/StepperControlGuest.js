import React from 'react';
import { useSelector } from 'react-redux';

const StepperControl = ({
  handleClickDirectionGuest,
  currentStepGuest,
  stepsGuest,
}) => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;

  return (
    <div className='container flex justify-between mt-4 mb-8'>
      {/* back button */}
      <button
        onClick={() => handleClickDirectionGuest('')}
        className={` text-white uppercase ml-4 py-2 px-5 rounded-xl font-semibold cursor-pointer  transiotion duration-200 ease-in-out ${
          currentStepGuest === 1
            ? 'bg-gray-600 opacity-[45%] cursor-not-allowed '
            : 'bg-red-600 hover:bg-red-500 hover:gray-100'
        }`}
      >
        Zurück
      </button>
      {/* next button */}

      <button
        onClick={() => handleClickDirectionGuest('next')}
        className={`text-white uppercase mr-4 py-2 px-5 rounded-xl font-semibold cursor-pointer  transiotion duration-200 ease-in-out ${
          currentStepGuest === stepsGuest.length
            ? 'bg-gray-600 opacity-[45%] cursor-not-allowed'
            : `${bg} ${hoverbgColor} hover:text-gray-100`
        }`}
      >
        {currentStepGuest === 1 ? 'Weiter als Gast' : 'Weiter'}
      </button>
    </div>
  );
};

export default StepperControl;
