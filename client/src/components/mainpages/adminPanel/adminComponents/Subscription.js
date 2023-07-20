import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalSubscriptionButton from './PayPalSubscriptionButton';

const initialOptions = {
  //'client-id': 'test',
  'client-id':
    'Ae52VE3BpkZmpWsqKR56DSQg8J2g_2Rfq0vvjamrjQiFfiTH2IB9W3Wyw6wGvJeMJNpxAciQrxF0nwTe',
  currency: 'EUR',
  intent: 'subscription',
  vault: true,
  'data-namespace': 'PayPalSDK',
  //'enable-funding': ['sofort', 'giropay'],
  'disable-funding': ['card', 'sepa'],
};

const Subscription = () => {
  const token = useSelector((state) => state.token);
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;
  const text = settings[0]?.color[0]?.textColor;

  const [planId, setPlanId] = useState();
  const [activeSub, setActiveSub] = useState([]);

  let activeSubscription = activeSub.filter(
    (data) => data.subscriptionStatus === 'BILLING.SUBSCRIPTION.ACTIVATED'
  );

  useEffect(() => {
    const getSubscriptionValue = async () => {
      const res = await axios.get('/api/subscriptionamount', {
        headers: { Authorization: token },
      });
      setPlanId(res.data[0]?.subscriptionAmount);
    };
    getSubscriptionValue();
  }, [token]);

  useEffect(() => {
    const getSubscriptionValue = async () => {
      const res = await axios.get('/api/activesubscription', {
        headers: { Authorization: token },
      });
      setActiveSub(res.data);
    };
    getSubscriptionValue();
  }, [token]);

  return (
    <div className='text-white bg-gray-900 h-full pb-4'>
      <div className='max-w-md mx-auto rounded-lg md:max-w-7xl'>
        <h2
          className={`flex justify-center text-2xl font-bold pb-4 ${text} pt-4`}
        >
          Vertrag
        </h2>
        <div class='flex justify-center md:mx-0 mx-2'>
          {/* H-Full Notwendigkeit überprüfen */}
          <div
            class={`min-h-[200px w-96 pb-0 md:pb-2 md:py-4 py:0 md:px-4 px-2 border-4 bg-gray-600 ${border} rounded-lg h-full justify-center`}
          >
            <div className='md:block flex  justify-center'>
              <div className='md:mx-5 md:mt-5 mx-1 mt-1 md:pl-[0px] pl-[1px]'></div>
            </div>
            <div className='flex justify-center pb-4'>
              <div className='pr-1 font-bold pt-2'>Status:</div>
              <div
                className={`${
                  activeSubscription.length >= 1
                    ? 'text-green-500'
                    : 'text-red-500'
                } font-bold text-2xl`}
              >
                {activeSubscription.length >= 1 ? (
                  <div>Aktiviert</div>
                ) : (
                  <div>Deaktiviert</div>
                )}
              </div>
            </div>
            <div
              class={`${
                activeSubscription.length >= 1 ? 'hidden' : null
              } w-full`}
            >
              <PayPalScriptProvider options={initialOptions}>
                <PayPalSubscriptionButton token={token} planId={planId} />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
