import React, { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from '../../redux/actions/authAction';
import ProductDropdown from './product/ProductDropdown';
import Login from './login/Login';
import Register from './register/Register';
import RegisterWatingRoom from './register/RegisterWatingRoom';
import ForgotPassword from './auth/ForgotPassword';
import Cart from './cart/CartScreen';
import NotFound from '../utils/notfound/NotFound';
import ActivationEmail from './auth/ActivationEmail';
import GiveAdmin from './adminPanel/adminComponents/GiveAdmin';
import GiveMasterAdmin from './adminPanel/adminComponents/GiveMasterAdmin';
import ResetPassword from './auth/ResetPassword';
import UserProfile from './profile/userEdit/UserProfile';
import Imprint from '../footer/footerComponents/Imprint';
import Privacy from '../footer/footerComponents/Privacy';
import Cookies from '../footer/footerComponents/Cookies';
import Agb from '../footer/footerComponents/Agb';
import AdminOrders from './adminPanel/admin/AdminOrders';
import AdminUserList from './adminPanel/admin/AdminUserList';
import AdminProducts from './adminPanel/admin/AdminProducts';
import AdminSettings from './adminPanel/admin/AdminSettings';
import AdminFeeSettings from './adminPanel/admin/AdminFeeSettings';
import AdminGalery from './adminPanel/admin/AdminGalery';
import Ambience from './ambience/Ambience';
import Location from './location/Location';
import EditProduct from './adminPanel/adminComponents/EditProduct';

const Pages = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isSupport, isAdmin, isMasterAdmin } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.get('/user/refresh_token', null);
        // console.log(res);
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Routes>
      <Route index path='/' exact element={<ProductDropdown />} />
      <Route
        path='/login'
        exact
        element={isLogged ? <NotFound /> : <Login />}
      />
      <Route
        path='/register'
        exact
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route
        path='/registerconfirm'
        exact
        element={isLogged ? <NotFound /> : <RegisterWatingRoom />}
      />
      <Route
        path='/forgot_password'
        exact
        element={isLogged ? <NotFound /> : <ForgotPassword />}
      />
      <Route
        path='/user/reset/:token'
        element={isLogged ? <NotFound /> : <ResetPassword />}
        exact
      />
      <Route
        path='/user/activate/:activation_token'
        exact
        element={<ActivationEmail />}
      />
      <Route
        path='/profile'
        element={isLogged ? <UserProfile /> : <NotFound />}
        exact
      >
        <Route
          path='page/:page'
          element={isLogged ? <UserProfile /> : <NotFound />}
          exact
        />
      </Route>
      {/* Weiter verschachteln nur ein edit_user */}
      <Route
        path='/edit_user/:id'
        element={
          isAdmin ? (
            <GiveAdmin />
          ) : isMasterAdmin ? (
            <GiveMasterAdmin />
          ) : (
            <NotFound />
          )
        }
        exact
      />
      <Route
        path='/edit_product/:id'
        element={isAdmin || isMasterAdmin ? <EditProduct /> : <NotFound />}
        exact
      />

      <Route
        path='/orders'
        element={
          isSupport || isAdmin || isMasterAdmin ? <AdminOrders /> : <NotFound />
        }
        exact
      >
        <Route
          path='search/:keyword'
          element={
            isSupport || isAdmin || isMasterAdmin ? (
              <AdminOrders />
            ) : (
              <NotFound />
            )
          }
          exact
        />
        <Route
          path='page/:page'
          element={
            isSupport || isAdmin || isMasterAdmin ? (
              <AdminOrders />
            ) : (
              <NotFound />
            )
          }
          exact
        />
        <Route
          path='search/:keyword/page/:page'
          element={
            isSupport || isAdmin || isMasterAdmin ? (
              <AdminOrders />
            ) : (
              <NotFound />
            )
          }
          exact
        />
      </Route>
      <Route
        path='userlist'
        element={isAdmin || isMasterAdmin ? <AdminUserList /> : <NotFound />}
        exact
      >
        <Route
          path='search/:keyword'
          element={isAdmin || isMasterAdmin ? <AdminUserList /> : <NotFound />}
          exact
        />
        <Route
          path='page/:page'
          element={isAdmin || isMasterAdmin ? <AdminUserList /> : <NotFound />}
          exact
        />
        <Route
          path='search/:keyword/page/:page'
          element={isAdmin || isMasterAdmin ? <AdminUserList /> : <NotFound />}
          exact
        />
      </Route>
      <Route
        path='products'
        element={isAdmin || isMasterAdmin ? <AdminProducts /> : <NotFound />}
        exact
      />
      <Route
        path='settings'
        element={isAdmin || isMasterAdmin ? <AdminSettings /> : <NotFound />}
        exact
      />
      <Route
        path='galery'
        element={isAdmin || isMasterAdmin ? <AdminGalery /> : <NotFound />}
        exact
      />
      <Route
        path='feesettings'
        element={isMasterAdmin ? <AdminFeeSettings /> : <NotFound />}
        exact
      />

      <Route path='/ambience' exact element={<Ambience />} />
      <Route path='/location' exact element={<Location />} />
      <Route path='/cart' exact element={<Cart />} />
      <Route path='/imprint' exact element={<Imprint />} />
      <Route path='/agb' exact element={<Agb />} />
      <Route path='/privacy' exact element={<Privacy />} />
      <Route path='/cookies' exact element={<Cookies />} />
      <Route path='*' exact element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
