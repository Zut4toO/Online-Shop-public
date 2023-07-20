import React from "react";

const Error = ({ errorTitle, error }) => {
  return (
    <div role='alert'>
      <div className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
        <div className='font-medium'>{errorTitle}</div>
      </div>
      <div class='border border-t-0 border-red-400 rounded-b bg-red-200 px-4 py-3 text-red-700'>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Error;
