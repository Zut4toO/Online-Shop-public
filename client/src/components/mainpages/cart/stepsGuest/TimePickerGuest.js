import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cart_state } from '../../../../redux/actions/cartStateAction';
import Datepicker from '../Datepicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/de';
dayjs.extend(customParseFormat);
dayjs.locale('de');

const TimePickerGuest = () => {
  const cartstate = useSelector((state) => state.cartStateReducer);
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;
  const text = settings[0]?.color[0]?.textColor;

  const sliderDeliveryValue = cartstate.sliderDeliveryValue;

  const [time, setTime] = useState(cartstate.time ?? new Date().addMinutes(15));
  const [timeValidation, setTimeValidation] = useState(
    cartstate.timeValidation
  );
  console.log(sliderDeliveryValue);

  useEffect(() => {
    checkTime();
  }, [time, sliderDeliveryValue]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (timeValidation === cartstate.timeValidation) {
      return;
    }
    dispatch(cart_state({ timeValidation: timeValidation }));
  }, [timeValidation]);

  function timeSwitch() {
    switch (dayjs().day()) {
      case 0:
        return settings[0]?.isClosedSunday[0]?.value === true ? (
          <Datepicker
            state={time}
            setState={setTime}
            minH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openSunday, 'HH:m').format('HH'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format('HH')
                  )
                : null
            }
            minM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openSunday, 'HH:m').format('m'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format('m')
                  )
                : null
            }
            maxH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.closeSunday, 'HH:m').format('HH'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseSunday, 'HH:m').format('HH')
                  )
                : null
            }
            maxM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeSunday, 'HH:m').format('m')
                  ) - 1
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseSunday, 'HH:m').format('m')
                  ) - 1
                : null
            }
            pauseStartMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.startPauseSunday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.startPauseSunday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseSunday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseSunday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseEndMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.endPauseSunday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.endPauseSunday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryEndPauseSunday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.deliveryEndPauseSunday, 'HH, m').format(
                      'm'
                    )
                  )
                : null
            }
            pauseStartHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseSunday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryStartPauseSunday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseStartMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseSunday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryStartPauseSunday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseEndHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseSunday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseSunday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseEndMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseSunday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseSunday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseStartLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.startPauseSunday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryStartPauseSunday
                : null
            }
            pauseEndLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.endPauseSunday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryEndPauseSunday
                : null
            }
            deliveryTime={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.minimalCollectTime
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.minimalDeliveryTime
                : 0
            }
          />
        ) : (
          <div className='text-red-500 flex justify-center py-2'>
            Sonntags Ruhetag
          </div>
        );
      case 1:
        return settings[0]?.isClosedMonday[0]?.value === true ? (
          <Datepicker
            state={time}
            setState={setTime}
            minH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openMonday, 'HH:m').format('HH'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format('HH')
                  )
                : null
            }
            minM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openMonday, 'HH:m').format('m'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format('m')
                  )
                : null
            }
            maxH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.closeMonday, 'HH:m').format('HH'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseMonday, 'HH:m').format('HH')
                  )
                : null
            }
            maxM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeMonday, 'HH:m').format('m')
                  ) - 1
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseMonday, 'HH:m').format('m')
                  ) - 1
                : null
            }
            pauseStartMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.startPauseMonday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.startPauseMonday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseMonday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseMonday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseEndMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.endPauseMonday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.endPauseMonday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryEndPauseMonday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.deliveryEndPauseMonday, 'HH, m').format(
                      'm'
                    )
                  )
                : null
            }
            pauseStartHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseMonday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryStartPauseMonday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseStartMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseMonday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryStartPauseMonday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseEndHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseMonday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseMonday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseEndMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseMonday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseMonday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseStartLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.startPauseMonday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryStartPauseMonday
                : null
            }
            pauseEndLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.endPauseMonday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryEndPauseMonday
                : null
            }
            deliveryTime={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.minimalCollectTime
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.minimalDeliveryTime
                : 0
            }
          />
        ) : (
          <div className='text-red-500 flex justify-center py-2'>
            Montags Ruhetag
          </div>
        );
      case 2:
        return settings[0]?.isClosedTuesday[0]?.value === true ? (
          <Datepicker
            state={time}
            setState={setTime}
            minH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openTuesday, 'HH:m').format('HH'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format('HH')
                  )
                : null
            }
            minM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openTuesday, 'HH:m').format('m'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format('m')
                  )
                : null
            }
            maxH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeTuesday, 'HH:m').format('HH')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseTuesday, 'HH:m').format(
                      'HH'
                    )
                  )
                : null
            }
            maxM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeTuesday, 'HH:m').format('m')
                  ) - 1
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseTuesday, 'HH:m').format('m')
                  ) - 1
                : null
            }
            pauseStartMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.startPauseTuesday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.startPauseTuesday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseTuesday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseTuesday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseEndMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.endPauseTuesday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.endPauseTuesday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryEndPauseTuesday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.deliveryEndPauseTuesday, 'HH, m').format(
                      'm'
                    )
                  )
                : null
            }
            pauseStartHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseTuesday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryStartPauseTuesday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseStartMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseTuesday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryStartPauseTuesday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseEndHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseTuesday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseTuesday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseEndMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseTuesday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseTuesday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseStartLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.startPauseTuesday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryStartPauseTuesday
                : null
            }
            pauseEndLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.endPauseTuesday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryEndPauseTuesday
                : null
            }
            deliveryTime={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.minimalCollectTime
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.minimalDeliveryTime
                : 0
            }
          />
        ) : (
          <div className='text-red-500 flex justify-center py-2'>
            Dienstags Ruhetag
          </div>
        );
      case 3:
        return settings[0]?.isClosedWednesday[0]?.value === true ? (
          <Datepicker
            state={time}
            setState={setTime}
            minH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.openWednesday, 'HH:m').format('HH')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format(
                      'HH'
                    )
                  )
                : null
            }
            minM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.openWednesday, 'HH:m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format(
                      'm'
                    )
                  )
                : null
            }
            maxH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeWednesday, 'HH:m').format('HH')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseWednesday, 'HH:m').format(
                      'HH'
                    )
                  )
                : null
            }
            maxM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeWednesday, 'HH:m').format('m')
                  ) - 1
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseWednesday, 'HH:m').format(
                      'm'
                    )
                  ) - 1
                : null
            }
            pauseStartMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.startPauseWednesday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.startPauseWednesday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseWednesday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseWednesday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseEndMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.endPauseWednesday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.endPauseWednesday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryEndPauseWednesday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryEndPauseWednesday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseStartHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseWednesday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(
                    settings[0]?.deliveryStartPauseWednesday,
                    'HH, m'
                  ).format('HH')
                : null
            }
            pauseStartMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseWednesday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(
                    settings[0]?.deliveryStartPauseWednesday,
                    'HH, m'
                  ).format('m')
                : null
            }
            pauseEndHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseWednesday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseWednesday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseEndMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseWednesday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseWednesday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseStartLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.startPauseWednesday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryStartPauseWednesday
                : null
            }
            pauseEndLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.endPauseWednesday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryEndPauseWednesday
                : null
            }
            deliveryTime={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.minimalCollectTime
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.minimalDeliveryTime
                : 0
            }
          />
        ) : (
          <div className='text-red-500 flex justify-center py-2'>
            Mittwochs Ruhetag
          </div>
        );
      case 4:
        return settings[0]?.isClosedThursday[0]?.value === true ? (
          <Datepicker
            state={time}
            setState={setTime}
            minH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.openThursday, 'HH:m').format('HH')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                      'HH'
                    )
                  )
                : null
            }
            minM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openThursday, 'HH:m').format('m'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format('m')
                  )
                : null
            }
            maxH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeThursday, 'HH:m').format('HH')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseThursday, 'HH:m').format(
                      'HH'
                    )
                  )
                : null
            }
            maxM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeThursday, 'HH:m').format('m')
                  ) - 1
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseThursday, 'HH:m').format(
                      'm'
                    )
                  ) - 1
                : null
            }
            pauseStartMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.startPauseThursday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.startPauseThursday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseThursday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseThursday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseEndMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.endPauseThursday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.endPauseThursday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryEndPauseThursday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryEndPauseThursday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseStartHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseThursday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(
                    settings[0]?.deliveryStartPauseThursday,
                    'HH, m'
                  ).format('HH')
                : null
            }
            pauseStartMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseThursday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(
                    settings[0]?.deliveryStartPauseThursday,
                    'HH, m'
                  ).format('m')
                : null
            }
            pauseEndHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseThursday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseThursday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseEndMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseThursday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseThursday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseStartLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.startPauseThursday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryStartPauseThursday
                : null
            }
            pauseEndLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.endPauseThursday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryEndPauseThursday
                : null
            }
            deliveryTime={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.minimalCollectTime
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.minimalDeliveryTime
                : 0
            }
          />
        ) : (
          <div className='text-red-500 flex justify-center py-2'>
            Donnerstags Ruhetag
          </div>
        );
      case 5:
        return settings[0]?.isClosedFriday[0]?.value === true ? (
          <Datepicker
            state={time}
            setState={setTime}
            minH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openFriday, 'HH:m').format('HH'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format('HH')
                  )
                : null
            }
            minM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openFriday, 'HH:m').format('m'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format('m')
                  )
                : null
            }
            maxH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.closeFriday, 'HH:m').format('HH'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseFriday, 'HH:m').format('HH')
                  )
                : null
            }
            maxM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeFriday, 'HH:m').format('m')
                  ) - 1
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseFriday, 'HH:m').format('m')
                  ) - 1
                : null
            }
            pauseStartMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.startPauseFriday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.startPauseFriday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseFriday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseFriday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseEndMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.endPauseFriday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.endPauseFriday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryEndPauseFriday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.deliveryEndPauseFriday, 'HH, m').format(
                      'm'
                    )
                  )
                : null
            }
            pauseStartHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseFriday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryStartPauseFriday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseStartMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseFriday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryStartPauseFriday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseEndHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseFriday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseFriday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseEndMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseFriday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseFriday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseStartLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.startPauseFriday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryStartPauseFriday
                : null
            }
            pauseEndLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.endPauseFriday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryEndPauseFriday
                : null
            }
            deliveryTime={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.minimalCollectTime
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.minimalDeliveryTime
                : 0
            }
          />
        ) : (
          <div className='text-red-500 flex justify-center py-2'>
            Freitags Ruhetag
          </div>
        );
      case 6:
        return settings[0]?.isClosedSaturday[0]?.value === true ? (
          <Datepicker
            state={time}
            setState={setTime}
            minH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.openSaturday, 'HH:m').format('HH')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                      'HH'
                    )
                  )
                : null
            }
            minM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(dayjs(settings[0]?.openSaturday, 'HH:m').format('m'))
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format('m')
                  )
                : null
            }
            maxH={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeSaturday, 'HH:m').format('HH')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseSaturday, 'HH:m').format(
                      'HH'
                    )
                  )
                : null
            }
            maxM={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.closeSaturday, 'HH:m').format('m')
                  ) - 1
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(settings[0]?.deliveryCloseSaturday, 'HH:m').format(
                      'm'
                    )
                  ) - 1
                : null
            }
            pauseStartMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.startPauseSaturday, 'HH, m').format(
                      'HH'
                    ) * 60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.startPauseSaturday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseSaturday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryStartPauseSaturday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseEndMin={
              sliderDeliveryValue === 'abholung'
                ? parseInt(
                    dayjs(settings[0]?.endPauseSaturday, 'HH, m').format('HH') *
                      60
                  ) +
                  parseInt(
                    dayjs(settings[0]?.endPauseSaturday, 'HH, m').format('m')
                  )
                : sliderDeliveryValue === 'lieferung'
                ? parseInt(
                    dayjs(
                      settings[0]?.deliveryEndPauseSaturday,
                      'HH, m'
                    ).format('HH') * 60
                  ) +
                  parseInt(
                    dayjs(
                      settings[0]?.deliveryEndPauseSaturday,
                      'HH, m'
                    ).format('m')
                  )
                : null
            }
            pauseStartHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseSaturday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(
                    settings[0]?.deliveryStartPauseSaturday,
                    'HH, m'
                  ).format('HH')
                : null
            }
            pauseStartMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.startPauseSaturday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(
                    settings[0]?.deliveryStartPauseSaturday,
                    'HH, m'
                  ).format('m')
                : null
            }
            pauseEndHour={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseSaturday, 'HH, m').format('HH')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseSaturday, 'HH, m').format(
                    'HH'
                  )
                : null
            }
            pauseEndMinute={
              sliderDeliveryValue === 'abholung'
                ? dayjs(settings[0]?.endPauseSaturday, 'HH, m').format('m')
                : sliderDeliveryValue === 'lieferung'
                ? dayjs(settings[0]?.deliveryEndPauseSaturday, 'HH, m').format(
                    'm'
                  )
                : null
            }
            pauseStartLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.startPauseSaturday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryStartPauseSaturday
                : null
            }
            pauseEndLabel={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.endPauseSaturday
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.deliveryEndPauseSaturday
                : null
            }
            deliveryTime={
              sliderDeliveryValue === 'abholung'
                ? settings[0]?.minimalCollectTime
                : sliderDeliveryValue === 'lieferung'
                ? settings[0]?.minimalDeliveryTime
                : 0
            }
          />
        ) : (
          <div className='text-red-500 flex justify-center py-2'>
            Samstags Ruhetag
          </div>
        );
      default:
        return <div>Zurzeit haben wir leider geschlossen.</div>;
    }
  }

  const checkTime = () => {
    if (sliderDeliveryValue === 'abholung') {
      switch (dayjs().day()) {
        case 0:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(dayjs(settings[0]?.openSunday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.openSunday, 'HH:m').format('m')) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(dayjs(settings[0]?.closeSunday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.closeSunday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.startPauseSunday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.startPauseSunday, 'HH:m').format('m')
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.endPauseSunday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(dayjs(settings[0]?.endPauseSunday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openSunday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(dayjs(settings[0]?.openSunday, 'HH:m').format('m'))
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.openSunday, 'HH:m').format('HH')
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openSunday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(dayjs(settings[0]?.openSunday, 'HH:m').format('m'))
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.openSunday, 'HH:m').format('m')
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openSunday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openSunday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.openSunday, 'HH:m').format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openSunday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openSunday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.openSunday, 'HH:m').format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 1:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(dayjs(settings[0]?.openMonday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.openMonday, 'HH:m').format('m')) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(dayjs(settings[0]?.closeMonday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.closeMonday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.startPauseMonday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.startPauseMonday, 'HH:m').format('m')
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.endPauseMonday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(dayjs(settings[0]?.endPauseMonday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openMonday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(dayjs(settings[0]?.openMonday, 'HH:m').format('m'))
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.openMonday, 'HH:m').format('HH')
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openMonday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(dayjs(settings[0]?.openMonday, 'HH:m').format('m'))
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.openMonday, 'HH:m').format('m')
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openMonday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openMonday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.openMonday, 'HH:m').format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openMonday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openMonday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.openMonday, 'HH:m').format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);

        case 2:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(dayjs(settings[0]?.openTuesday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.openTuesday, 'HH:m').format('m')) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(dayjs(settings[0]?.closeTuesday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.closeTuesday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.startPauseTuesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.startPauseTuesday, 'HH:m').format('m')
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.endPauseTuesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.endPauseTuesday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openTuesday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.openTuesday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.openTuesday, 'HH:m').format('HH')
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openTuesday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.openTuesday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.openTuesday, 'HH:m').format('m')
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openTuesday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openTuesday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.openTuesday, 'HH:m').format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openTuesday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openTuesday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.openTuesday, 'HH:m').format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 3:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(dayjs(settings[0]?.openWednesday, 'HH:m').format('HH')) *
                60 +
                parseInt(
                  dayjs(settings[0]?.openWednesday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.closeWednesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(dayjs(settings[0]?.closeWednesday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.startPauseWednesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.startPauseWednesday, 'HH:m').format('m')
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.endPauseWednesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.endPauseWednesday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openWednesday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.openWednesday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.openWednesday, 'HH:m').format('HH')
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openWednesday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.openWednesday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.openWednesday, 'HH:m').format('m')
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openWednesday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openWednesday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.openWednesday, 'HH:m').format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openWednesday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openWednesday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.openWednesday, 'HH:m').format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 4:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(dayjs(settings[0]?.openThursday, 'HH:m').format('HH')) *
                60 +
                parseInt(
                  dayjs(settings[0]?.openThursday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(dayjs(settings[0]?.closeThursday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.closeThursday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.startPauseThursday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.startPauseThursday, 'HH:m').format('m')
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.endPauseThursday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.endPauseThursday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openThursday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.openThursday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.openThursday, 'HH:m').format('HH')
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openThursday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.openThursday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.openThursday, 'HH:m').format('m')
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openThursday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openThursday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.openThursday, 'HH:m').format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openThursday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openThursday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.openThursday, 'HH:m').format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 5:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(dayjs(settings[0]?.openFriday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.openFriday, 'HH:m').format('m')) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(dayjs(settings[0]?.closeFriday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.closeFriday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.startPauseFriday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.startPauseFriday, 'HH:m').format('m')
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.endPauseFriday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(dayjs(settings[0]?.endPauseFriday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openFriday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(dayjs(settings[0]?.openFriday, 'HH:m').format('m'))
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.openFriday, 'HH:m').format('HH')
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openFriday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(dayjs(settings[0]?.openFriday, 'HH:m').format('m'))
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.openFriday, 'HH:m').format('m')
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openFriday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openFriday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.openFriday, 'HH:m').format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openFriday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openFriday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.openFriday, 'HH:m').format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 6:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(dayjs(settings[0]?.openSaturday, 'HH:m').format('HH')) *
                60 +
                parseInt(
                  dayjs(settings[0]?.openSaturday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(dayjs(settings[0]?.closeSaturday, 'HH:m').format('HH')) *
                60 +
                parseInt(dayjs(settings[0]?.closeSaturday, 'HH:m').format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.startPauseSaturday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.startPauseSaturday, 'HH:m').format('m')
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.endPauseSaturday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.endPauseSaturday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openSaturday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.openSaturday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.openSaturday, 'HH:m').format('HH')
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.openSaturday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.openSaturday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.openSaturday, 'HH:m').format('m')
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openSaturday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openSaturday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.openSaturday, 'HH:m').format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.openSaturday, 'HH:m').format('HH')
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.openSaturday, 'HH:m').format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.openSaturday, 'HH:m').format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
      }
      /* checkTime() for delivery */
    } else if (sliderDeliveryValue === 'lieferung') {
      switch (dayjs().day()) {
        case 0:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryCloseSunday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryCloseSunday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryStartPauseSunday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryStartPauseSunday, 'HH:m').format(
                    'm'
                  )
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryEndPauseSunday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryEndPauseSunday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format(
                          'HH'
                        )
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalDeliveryTime
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format(
                          'm'
                        )
                      ) -
                      1 +
                      settings[0]?.minimalDeliveryTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format(
                            'HH'
                          )
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalDeliveryTime
                      : parseInt(
                          dayjs(settings[0]?.deliveryOpenSunday, 'HH:m').format(
                            'm'
                          )
                        ) -
                        1 +
                        settings[0]?.minimalDeliveryTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 1:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryCloseMonday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryCloseMonday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryStartPauseMonday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryStartPauseMonday, 'HH:m').format(
                    'm'
                  )
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryEndPauseMonday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryEndPauseMonday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format(
                          'HH'
                        )
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format(
                          'm'
                        )
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format(
                            'HH'
                          )
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.deliveryOpenMonday, 'HH:m').format(
                            'm'
                          )
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);

        case 2:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryCloseTuesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryCloseTuesday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryStartPauseTuesday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryStartPauseTuesday, 'HH:m').format(
                    'm'
                  )
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryEndPauseTuesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryEndPauseTuesday, 'HH:m').format(
                    'm'
                  )
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format(
                        'm'
                      )
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format(
                          'HH'
                        )
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format(
                        'm'
                      )
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format(
                          'm'
                        )
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(
                            settings[0]?.deliveryOpenTuesday,
                            'HH:m'
                          ).format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenTuesday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(
                            settings[0]?.deliveryOpenTuesday,
                            'HH:m'
                          ).format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 3:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryCloseWednesday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryCloseWednesday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryStartPauseWednesday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(
                    settings[0]?.deliveryStartPauseWednesday,
                    'HH:m'
                  ).format('m')
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryEndPauseWednesday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryEndPauseWednesday, 'HH:m').format(
                    'm'
                  )
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format(
                      'HH'
                    )
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format(
                        'm'
                      )
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(
                          settings[0]?.deliveryOpenWednesday,
                          'HH:m'
                        ).format('HH')
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format(
                      'HH'
                    )
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format(
                        'm'
                      )
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(
                          settings[0]?.deliveryOpenWednesday,
                          'HH:m'
                        ).format('m')
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(
                          settings[0]?.deliveryOpenWednesday,
                          'HH:m'
                        ).format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(
                            settings[0]?.deliveryOpenWednesday,
                            'HH:m'
                          ).format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenWednesday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(
                          settings[0]?.deliveryOpenWednesday,
                          'HH:m'
                        ).format('m')
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(
                            settings[0]?.deliveryOpenWednesday,
                            'HH:m'
                          ).format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 4:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryCloseThursday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryCloseThursday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryStartPauseThursday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryStartPauseThursday, 'HH:m').format(
                    'm'
                  )
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryEndPauseThursday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryEndPauseThursday, 'HH:m').format(
                    'm'
                  )
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                      'HH'
                    )
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                        'm'
                      )
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                          'HH'
                        )
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                      'HH'
                    )
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                        'm'
                      )
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                          'm'
                        )
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(
                            settings[0]?.deliveryOpenThursday,
                            'HH:m'
                          ).format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenThursday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(
                            settings[0]?.deliveryOpenThursday,
                            'HH:m'
                          ).format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 5:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryCloseFriday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryCloseFriday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryStartPauseFriday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryStartPauseFriday, 'HH:m').format(
                    'm'
                  )
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryEndPauseFriday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryEndPauseFriday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format(
                          'HH'
                        )
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format('HH')
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format('m')
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format(
                          'm'
                        )
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format(
                            'HH'
                          )
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(settings[0]?.deliveryOpenFriday, 'HH:m').format(
                            'm'
                          )
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
        case 6:
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format('m')
                ) ||
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryCloseSaturday, 'HH:m').format('HH')
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryCloseSaturday, 'HH:m').format('m')
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              2 <
            parseInt(dayjs(new Date()).format('HH')) * 60 +
              parseInt(dayjs(new Date()).format('m'))
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 <
              parseInt(
                dayjs(settings[0]?.deliveryStartPauseSaturday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryStartPauseSaturday, 'HH:m').format(
                    'm'
                  )
                ) &&
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('m')) -
              1 >
              parseInt(
                dayjs(settings[0]?.deliveryEndPauseSaturday, 'HH:m').format(
                  'HH'
                )
              ) *
                60 +
                parseInt(
                  dayjs(settings[0]?.deliveryEndPauseSaturday, 'HH:m').format(
                    'm'
                  )
                )
          ) {
            setTimeValidation(false);
            return false;
          }
          if (
            parseInt(dayjs(time).format('HH')) * 60 +
              parseInt(dayjs(time).format('mm')) <
            parseInt(
              dayjs(
                new Date(
                  0,
                  0,
                  0,
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                      'HH'
                    )
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                        'm'
                      )
                    )
                    ? parseInt(dayjs(new Date()).format('HH'))
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                          'HH'
                        )
                      ),
                  parseInt(dayjs(new Date()).format('HH')) * 60 +
                    parseInt(dayjs(new Date()).format('m')) >
                  parseInt(
                    dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                      'HH'
                    )
                  ) *
                    60 +
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                        'm'
                      )
                    )
                    ? parseInt(dayjs(new Date()).format('m')) -
                      1 +
                      settings[0]?.minimalCollectTime
                    : parseInt(
                        dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                          'm'
                        )
                      ) -
                      1 +
                      settings[0]?.minimalCollectTime
                )
              ).format('HH')
            ) *
              60 +
              parseInt(
                dayjs(
                  new Date(
                    0,
                    0,
                    0,
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('HH'))
                      : parseInt(
                          dayjs(
                            settings[0]?.deliveryOpenSaturday,
                            'HH:m'
                          ).format('HH')
                        ),
                    parseInt(dayjs(new Date()).format('HH')) * 60 +
                      parseInt(dayjs(new Date()).format('m')) >
                    parseInt(
                      dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                        'HH'
                      )
                    ) *
                      60 +
                      parseInt(
                        dayjs(settings[0]?.deliveryOpenSaturday, 'HH:m').format(
                          'm'
                        )
                      )
                      ? parseInt(dayjs(new Date()).format('m')) -
                        1 +
                        settings[0]?.minimalCollectTime
                      : parseInt(
                          dayjs(
                            settings[0]?.deliveryOpenSaturday,
                            'HH:m'
                          ).format('m')
                        ) -
                        1 +
                        settings[0]?.minimalCollectTime
                  )
                ).format('mm')
              )
          ) {
            console.log('hier ist der error');
            setTimeValidation(false);
            return false;
          }
          return setTimeValidation(true);
      }
    }
  };

  return (
    <div
      className={`h-[350px] flex items-center justify-center text-lg font-semibold overflow-y-hidden ${text}`}
    >
      {timeSwitch()}
    </div>
  );
};

export default TimePickerGuest;
