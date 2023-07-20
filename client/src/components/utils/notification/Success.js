import React from "react";

const Success = ({ successTitle, success }) => {
  return (
    <div role='alert'>
      <div className='bg-green-500 text-white font-bold rounded-t px-4 py-2'>
        <div className='font-medium'>{successTitle}</div>
      </div>
      <div className='border border-t-0 border-green-400 rounded-b bg-green-200 px-4 py-3 text-green-700'>
        <p>{success}</p>
      </div>
    </div>
  );
};

export default Success;
