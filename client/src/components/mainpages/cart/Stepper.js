import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const Stepper = ({ steps, currentStep }) => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const border = settings[0]?.color[0]?.borderColor;

  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      // current step

      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        };
        count++;
      }
      // step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      // step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    // create object
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          hightlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? 'w-full flex items-center'
            : 'flex items-center'
        }
      >
        <div className='relative flex flex-col items-center text-teeal-600'>
          <div
            className={`rounded-full transition duration-50 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
              step.selected ? `${bg} text-white` : ''
            }`}
          >
            {/* Display number */}
            {step.completed ? (
              <span className='text-white font-bold text-xl'>&#10003;</span>
            ) : (
              <div className='text-white'>{index + 1}</div>
            )}
          </div>
          <div
            className={`${text} absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.highlighted ? '' : 'hidden'
            }`}
          >
            {/* Display description */}
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? border : 'border-gray-300'
          }`}
        >
          {/* Display line */}
        </div>
      </div>
    );
  });

  return (
    <div className='mx-2 p-4 flex justify-between items-center'>
      {displaySteps}
    </div>
  );
};

export default Stepper;
