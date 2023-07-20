import React from 'react';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LoadingMedium from '../../../utils/loading/LoadingMedium';
dayjs.extend(customParseFormat);

const PayPalSubscriptionButton = ({ token, planId }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {isPending ? (
        <div className='flex justify-center'>
          <LoadingMedium />
        </div>
      ) : null}
      <div>
        <PayPalButtons
          createSubscription={(data, actions) => {
            console.log(planId);
            return axios
              .post(
                '/api/subscription',
                {},
                {
                  headers: { Authorization: token },
                }
              )
              .then((response) => {
                return response.data.id;
              });
          }}
          onError={() => {
            toast.error('Zahlung nicht erfolgreich', {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }}
        />
      </div>
    </>
  );
};

export default PayPalSubscriptionButton;
