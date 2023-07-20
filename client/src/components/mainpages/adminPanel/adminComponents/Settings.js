import React from 'react';
import AdminDataEdit from './AdminDataEdit';
import PayFees from './PayFees';
import SystemSettings from './SystemSettings';

const Settings = () => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='xl:col-span-4 col-span-12'>
        <AdminDataEdit />
      </div>
      <div className='xl:col-span-4 col-span-12'>
        <PayFees />
      </div>
      <div className='xl:col-span-4 col-span-12'>
        <SystemSettings />
      </div>
    </div>
  );
};

export default Settings;
