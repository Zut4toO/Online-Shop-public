import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DeliveryPickupSlider from '../DeliveryPickupSlider';
import DeliveryData from '../DeliveryData';

const DeliveryMethod = () => {
  const cartstate = useSelector((state) => state.cartStateReducer);
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;
  const text = settings[0]?.color[0]?.textColor;

  const [sliderDeliveryValue, setSliderDeliveryValue] = useState(
    cartstate.sliderDeliveryValue
  );
  const [refresh, setRefresh] = useState(false);
  const [distance, setDistance] = useState({ text: '0 km', value: 0 });

  const auth = useSelector((state) => state.auth);
  const reload = useSelector((state) => state.auth.reload);

  const { isLogged } = auth;

  useEffect(async () => {
    if (isLogged) {
      if (sliderDeliveryValue === 'lieferung') {
        const res = await axios.get('/api/distance', {
          params: {
            storeAddress: `${settings[0]?.streetNumber} ${settings[0]?.street} ${settings[0]?.city} Germany`,
            customerAddress: `${auth.user.streetNumber} ${auth.user.street} ${auth.user.city} Germany`,
          },
        });
        setDistance({
          ...distance,
          text: res.data[0].distance.text,
          value: res.data[0].distance.value,
        });
      }
    }
  }, [sliderDeliveryValue, reload]);

  return (
    <div className={`h-[350px] text-lg font-semibold text-white pt-4`}>
      <div className='flex justify-center'>
        <DeliveryPickupSlider
          setState={setSliderDeliveryValue}
          state={sliderDeliveryValue}
        />
      </div>
      {sliderDeliveryValue === 'lieferung' ? (
        <div className='text-sm mt-8'>
          <div className=''>
            <div className='md:flex justify-center'>
              <div className='flex justify-center pr-1'>
                <div className='pr-1'>Lieferzeit</div>
                <div className={`${text}`}>
                  {settings[0]?.minimalDeliveryTime} min
                </div>
              </div>
              <div className='flex justify-center pr-1'>
                <div className='pr-1'>Lieferkosten</div>
                <div className={`${text}`}>
                  {distance.value === 0 ? (
                    <div>0.00€ (0 km)</div>
                  ) : distance.value / 1000 <=
                    settings[0]?.deliveryFirstDistance ? (
                    <div className='flex'>
                      <div className='pr-1'>
                        {(
                          Math.round(settings[0]?.deliveryFirstPrice * 100) /
                          100
                        ).toFixed(2)}
                        €
                      </div>
                      <div className='text-white'>({distance.text})</div>
                    </div>
                  ) : distance.value / 1000 <=
                    settings[0]?.deliverySecondDistance ? (
                    <div className='flex'>
                      <div className='pr-1'>
                        {(
                          Math.round(settings[0]?.deliverySecondPrice * 100) /
                          100
                        ).toFixed(2)}
                        €
                      </div>
                      <div className='text-white'>({distance.text})</div>
                    </div>
                  ) : distance.value / 1000 <=
                    settings[0]?.deliveryThirdDistance ? (
                    <div className='flex'>
                      <div className='pr-1'>
                        {(
                          Math.round(settings[0]?.deliveryThirdPrice * 100) /
                          100
                        ).toFixed(2)}
                        €
                      </div>
                      <div className='text-white'>({distance.text})</div>
                    </div>
                  ) : (
                    <div className='text-red-600'>
                      Zu weit (Max.{settings[0]?.deliveryThirdDistance}km)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DeliveryData
            distance={distance}
            setDistance={setDistance}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </div>
      ) : sliderDeliveryValue === 'abholung' ? (
        <div className='mt-8'>
          <div className='flex justify-center'>Abholaddresse</div>
          <div className='text-sm'>
            <div className='flex justify-center'>Rhodos</div>
            <div className='flex justify-center'>
              <div className='pr-1'>Ritterstraße</div>
              <div>5</div>
            </div>
            <div></div>
            <div className='flex justify-center'>
              <div className='pr-1'>31737</div>
              <div>Rinteln</div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DeliveryMethod;
