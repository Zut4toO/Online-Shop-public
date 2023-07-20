//
// Kann gelöscht werden wenn Profil anders aufgerufen werden kann
//
import React from 'react';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import AdminOrders from './adminPanel/Admin/AdminOrders';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const { isSupport, isAdmin, isMasterAdmin } = auth;

  console.log(isAdmin);
  console.log(isSupport);

  return (
    <div>
      {isAdmin ? (
        <AdminOrders />
      ) : isSupport ? (
        <AdminOrders />
      ) : isMasterAdmin ? (
        <AdminOrders />
      ) : (
        <UserProfile />
      )}
    </div>
  );
};

export default Profile;
