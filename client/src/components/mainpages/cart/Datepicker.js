import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cart_state } from '../../../redux/actions/cartStateAction';
import { toast } from 'react-toastify';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@mui/lab/themeAugmentation';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/de';
dayjs.extend(customParseFormat);
dayjs.locale('de');

// https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette.secondary

const Datepicker = ({
  state,
  setState,
  minH,
  minM,
  maxM,
  maxH,
  // *60
  pauseStartMin,
  pauseEndMin,
  // Real Min / Hour
  pauseStartHour,
  pauseStartMinute,
  pauseEndHour,
  pauseEndMinute,
  pauseStartLabel,
  pauseEndLabel,
  deliveryTime,
}) => {
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    const minutes =
      parseInt(dayjs(date).format('HH') * 60) +
      parseInt(dayjs(date).format('m'));

    if (minutes > pauseStartMin && minutes < pauseEndMin) {
      setState(new Date(0, 0, 0, pauseEndHour, pauseEndMinute + deliveryTime));
      dispatch(
        cart_state({
          time: new Date(0, 0, 0, pauseEndHour, pauseEndMinute + deliveryTime),
        })
      );

      toast.error(
        `Zurzeit Pause. Bestellungen ab ${dayjs(
          newPauseEndHour.toString(),
          'H'
        ).format('HH')}:${dayjs((newPauseEndMin + 1).toString(), 'm').format(
          'mm'
        )} Uhr wieder möglich`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    } else {
      setState(date);
      dispatch(cart_state({ time: date }));
    }
  };

  const nowH = parseInt(dayjs(new Date()).format('HH'));
  const nowM = parseInt(dayjs(new Date()).format('m'));

  //console.log(parseInt(dayjs(state).format('HH')));
  //console.log(parseInt(dayjs(state).format('m')));

  const pauseEndDeliveryTime = pauseEndMin + deliveryTime;
  const reHourMin = pauseEndDeliveryTime / 60;
  const newPauseEndHour = Math.floor(reHourMin);
  const newPauseEndMin = (reHourMin - newPauseEndHour) * 60 - 1;

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }
  var hoursRange =
    pauseStartLabel != pauseEndLabel &&
    parseInt(pauseEndHour) * 60 +
      parseInt(pauseEndMinute) -
      parseInt(pauseStartHour) * 60 >=
      60
      ? range(parseInt(pauseStartHour) + 1, parseInt(pauseEndHour) - 1)
      : '';
  //console.log(hoursRange);

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;
  const code = settings[0]?.color[0]?.code;
  const bg = settings[0]?.color[0]?.bgColor;

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: code,
        contrastText: '#fff',
      },
      text: {
        primary: code,
        secondary: code,
        // disabled:
      },
    },
  });

  return (
    <div className='flex justify-center md:w-[239px] w-[180px] mx-auto p-2 relative'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <MobileTimePicker
            renderInput={(params) => <TextField {...params} />}
            value={state}
            onChange={handleDateChange}
            ampm={false}
            minutesStep={5}
            orientation='portrait'
            label={
              pauseStartLabel != pauseEndLabel
                ? `Pause: ${pauseStartLabel}-${dayjs(pauseEndLabel, 'HH:mm')
                    .add(deliveryTime, 'm')
                    .format('HH:mm')} Uhr`
                : 'Uhrzeit wählen'
            }
            okText='Ok'
            cancelText='Abbrechen'
            disableCloseOnSelect={true}
            disableMaskedInput={true}
            showToolbar={false}
            minTime={
              new Date(
                0,
                0,
                0,
                nowH * 60 + nowM > minH * 60 + minM ? nowH : minH,
                nowH * 60 + nowM > minH * 60 + minM
                  ? nowM + deliveryTime - 1
                  : minM + deliveryTime - 1
              )
            }
            maxTime={new Date(0, 0, 0, maxH, maxM)}
            shouldDisableTime={
              pauseStartLabel != pauseEndLabel &&
              parseInt(pauseEndHour) - parseInt(pauseStartHour) >= 1
                ? (timeValue, clockType) => {
                    const hoursArray = hoursRange.map((hour) => {
                      return clockType === 'hours' && timeValue === hour;
                    });
                    return parseInt(pauseEndHour) - parseInt(pauseStartHour) > 1
                      ? hoursArray[0] ||
                          hoursArray[1] ||
                          hoursArray[2] ||
                          hoursArray[3] ||
                          hoursArray[4] ||
                          hoursArray[5] ||
                          hoursArray[6] ||
                          hoursArray[7] ||
                          hoursArray[8] ||
                          hoursArray[9] ||
                          hoursArray[10] ||
                          hoursArray[11] ||
                          hoursArray[12] ||
                          hoursArray[13] ||
                          hoursArray[14] ||
                          hoursArray[15] ||
                          hoursArray[16] ||
                          hoursArray[17] ||
                          hoursArray[18] ||
                          hoursArray[19] ||
                          hoursArray[20] ||
                          hoursArray[21] ||
                          hoursArray[22] ||
                          hoursArray[23] ||
                          hoursArray[24] ||
                          (parseInt(dayjs(state).format('HH')) ===
                          parseInt(pauseStartHour)
                            ? clockType === 'minutes' &&
                              timeValue >= parseInt(pauseStartMinute)
                            : '') ||
                          (parseInt(dayjs(state).format('HH')) ===
                          parseInt(newPauseEndHour)
                            ? clockType === 'minutes' &&
                              timeValue <= parseInt(newPauseEndMin)
                            : '')
                      : (parseInt(dayjs(state).format('HH')) ===
                        parseInt(pauseStartHour)
                          ? clockType === 'minutes' &&
                            timeValue >= parseInt(pauseStartMinute)
                          : '') ||
                          (parseInt(dayjs(state).format('HH')) ===
                          parseInt(newPauseEndHour)
                            ? clockType === 'minutes' &&
                              timeValue <= parseInt(newPauseEndMin)
                            : '');
                  }
                : ''
            }
          />
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
};
export default Datepicker;
