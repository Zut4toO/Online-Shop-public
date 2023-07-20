import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { systemSettings } from '../../../../redux/actions/systemSettingsAction';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../adminStyles/toggleswitch.css';
import LoadingMedium from '../../../utils/loading/LoadingMedium';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const initialState = {
  brand: null,
  brandImage: null,
  bgImage: null,
  street: null,
  streetNumber: null,
  zipCode: null,
  city: null,
  telefon: null,
  companyname: null,
  ceo: null,
  // court: '',
  // courtnumber: '',
  authority: null,
  ustid: null,
  mapsLink: null,
  facebook: null,
  instagram: null,
  merchantID: null,
  notificationMail: null,
  minDeliveryAmount: null,
  minPayPalAmount: null,
  deliveryFirstDistance: null,
  deliveryFirstPrice: null,
  deliverySecondDistance: null,
  deliverySecondPrice: null,
  deliveryThirdDistance: null,
  deliveryThirdPrice: null,
  minBeforeClosing: null,
  minimalDeliveryTime: null,
  minimalCollectTime: null,
  /* Monday */
  openMonday: null,
  closeMonday: null,
  startPauseMonday: null,
  endPauseMonday: null,
  deliveryOpenMonday: null,
  deliveryCloseMonday: null,
  deliveryStartPauseMonday: null,
  deliveryEndPauseMonday: null,
  /* Tuesday */
  openTuesday: null,
  closeTuesday: null,
  startPauseTuesday: null,
  endPauseTuesday: null,
  deliveryOpenTuesday: null,
  deliveryCloseTuesday: null,
  deliveryStartPauseTuesday: null,
  deliveryEndPauseTuesday: null,
  /* Wednesday */
  openWednesday: null,
  closeWednesday: null,
  startPauseWednesday: null,
  endPauseWednesday: null,
  deliveryOpenWednesday: null,
  deliveryCloseWednesday: null,
  deliveryStartPauseWednesday: null,
  deliveryEndPauseWednesday: null,
  /* Thursday */
  openThursday: null,
  closeThursday: null,
  startPauseThursday: null,
  endPauseThursday: null,
  deliveryOpenThursday: null,
  deliveryCloseThursday: null,
  deliveryStartPauseThursday: null,
  deliveryEndPauseThursday: null,
  /* Friday  */
  openFriday: null,
  closeFriday: null,
  startPauseFriday: null,
  endPauseFriday: null,
  deliveryOpenFriday: null,
  deliveryCloseFriday: null,
  deliveryStartPauseFriday: null,
  deliveryEndPauseFriday: null,
  /* Saturday */
  openSaturday: null,
  closeSaturday: null,
  startPauseSaturday: null,
  endPauseSaturday: null,
  deliveryOpenSaturday: null,
  deliveryCloseSaturday: null,
  deliveryStartPauseSaturday: null,
  deliveryEndPauseSaturday: null,
  /* Sunday */
  openSunday: null,
  closeSunday: null,
  startPauseSunday: null,
  endPauseSunday: null,
  deliveryOpenSunday: null,
  deliveryCloseSunday: null,
  deliveryStartPauseSunday: null,
  deliveryEndPauseSunday: null,
  /* Printer */
  completeOrderTime: null,
};

const SystemSettings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(systemSettings());
  }, []);

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const decoration = settings[0]?.color[0]?.decoration;
  const bg = settings[0]?.color[0]?.bgColor;
  const hoverbgColor = settings[0]?.color[0]?.hoverbgColor;
  const border = settings[0]?.color[0]?.borderColor;
  const code = settings[0]?.color[0]?.code;

  function infoTheme(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 5,
      backgroundColor: code,
      colors: {
        ...theme.colors,
        primary25: '#93c5fd',
        primary: '#93c5fd',
      },
    };
  }

  const texttheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: code ?? '#fff',
        contrastText: '#fff',
      },
      text: {
        primary: '#fff',
        secondary: '#fff',
      },
    },
  });

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const token = useSelector((state) => state.token);

  //let restaurantSettings = [];
  const [data, setData] = useState(initialState);
  //console.log(data);
  const {
    brand,
    brandImage,
    bgImage,
    street,
    streetNumber,
    zipCode,
    city,
    email,
    telefon,
    companyname,
    ceo,
    // court,
    // courtnumber,
    authority,
    ustid,
    mapsLink,
    facebook,
    instagram,
    merchantID,
    notificationMail,
    minDeliveryAmount,
    minPayPalAmount,
    deliveryFirstDistance,
    deliveryFirstPrice,
    deliverySecondDistance,
    deliverySecondPrice,
    deliveryThirdDistance,
    deliveryThirdPrice,
    minBeforeClosing,
    minimalDeliveryTime,
    minimalCollectTime,
    /* Monday */
    openMonday,
    closeMonday,
    startPauseMonday,
    endPauseMonday,
    deliveryOpenMonday,
    deliveryCloseMonday,
    deliveryStartPauseMonday,
    deliveryEndPauseMonday,
    /* Tuesday */
    openTuesday,
    closeTuesday,
    startPauseTuesday,
    endPauseTuesday,
    deliveryOpenTuesday,
    deliveryCloseTuesday,
    deliveryStartPauseTuesday,
    deliveryEndPauseTuesday,
    /* Wednesday */
    openWednesday,
    closeWednesday,
    startPauseWednesday,
    endPauseWednesday,
    deliveryOpenWednesday,
    deliveryCloseWednesday,
    deliveryStartPauseWednesday,
    deliveryEndPauseWednesday,
    /* Thursday */
    openThursday,
    closeThursday,
    startPauseThursday,
    endPauseThursday,
    deliveryOpenThursday,
    deliveryCloseThursday,
    deliveryStartPauseThursday,
    deliveryEndPauseThursday,
    /* Friday  */
    openFriday,
    closeFriday,
    startPauseFriday,
    endPauseFriday,
    deliveryOpenFriday,
    deliveryCloseFriday,
    deliveryStartPauseFriday,
    deliveryEndPauseFriday,
    /* Saturday */
    openSaturday,
    closeSaturday,
    startPauseSaturday,
    endPauseSaturday,
    deliveryOpenSaturday,
    deliveryCloseSaturday,
    deliveryStartPauseSaturday,
    deliveryEndPauseSaturday,
    /* Sunday */
    openSunday,
    closeSunday,
    startPauseSunday,
    endPauseSunday,
    deliveryOpenSunday,
    deliveryCloseSunday,
    deliveryStartPauseSunday,
    deliveryEndPauseSunday,
    /* Printer */
    completeOrderTime,
  } = data;
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const animatedComponents = makeAnimated();

  const [payments, setPayments] = useState(settings[0]?.payments);
  const [defaultPayments, setDefaultPayments] = useState(null);

  useEffect(() => {
    if (settings[0]?.payments.length === 0) {
      return;
    }
    setDefaultPayments(settings[0]?.payments.map((element) => element));
  }, []);

  const selectPayments = [
    { value: 'bargeld', label: 'Bargeld' },
    { value: 'paypal', label: 'PayPal' },
  ];

  const [delivery, setDelivery] = useState(settings[0]?.delivery);
  const [defaultDelivery, setDefaultDelivery] = useState(null);
  const selectDelivery = [
    { value: 'abholung', label: 'Abholung' },
    { value: 'lieferung', label: 'Lieferung' },
  ];

  useEffect(() => {
    if (settings[0]?.delivery.length === 0) {
      return;
    }
    setDefaultDelivery(settings[0]?.delivery.map((element) => element));
  }, []);

  const [color, setColor] = useState(settings[0]?.color);
  const selectColors = [
    {
      label: 'Rot',
      textColor: 'text-red-600',
      hoverText: 'hover:text-red-600',
      borderColor: 'border-red-600',
      focusBorder: 'focus:border-red-600',
      bgColor: 'bg-red-600',
      hoverbgColor: 'hover:bg-red-500',
      accentColor: 'accent-red-600',
      fillColor: 'fill-red-600',
      decoration: 'decoration-red-600',
      code: '#dc2626',
    },
    {
      label: 'Orange',
      textColor: 'text-orange-600',
      hoverText: 'hover:text-orange-600',
      borderColor: 'border-orange-600',
      focusBorder: 'focus:border-orange-600',
      bgColor: 'bg-orange-600',
      hoverbgColor: 'hover:bg-orange-500',
      accentColor: 'accent-orange-600',
      fillColor: 'fill-orange-600',
      decoration: 'decoration-orange-600',
      code: '#ea580c',
    },
    {
      label: 'Gelb',
      textColor: 'text-yellow-500',
      hoverText: 'hover:text-yellow-500',
      borderColor: 'border-yellow-500',
      focusBorder: 'focus:border-yellow-500',
      bgColor: 'bg-yellow-500',
      hoverbgColor: 'hover:bg-yellow-400',
      accentColor: 'accent-yellow-500',
      fillColor: 'fill-yellow-500',
      decoration: 'decoration-yellow-500',
      code: '#eab308',
    },
    {
      label: 'Hellgrün',
      textColor: 'text-lime-400',
      hoverText: 'hover:text-lime-400',
      borderColor: 'border-lime-400',
      focusBorder: 'focus:border-lime-400',
      bgColor: 'bg-lime-400',
      hoverbgColor: 'hover:bg-lime-300',
      accentColor: 'accent-lime-400',
      fillColor: 'fill-lime-400',
      decoration: 'decoration-lime-400',
      code: '#4ade80',
    },
    {
      label: 'Grün',
      textColor: 'text-green-600',
      hoverText: 'hover:text-green-600',
      borderColor: 'border-green-600',
      focusBorder: 'focus:border-green-600',
      bgColor: 'bg-green-600',
      hoverbgColor: 'hover:bg-green-500',
      accentColor: 'accent-green-600',
      fillColor: 'fill-green-600',
      decoration: 'decoration-green-600',
      code: '#16a34a',
    },
    {
      label: 'Türkis',
      textColor: 'text-teal-400',
      hoverText: 'hover:text-teal-400',
      borderColor: 'border-teal-400',
      focusBorder: 'focus:border-teal-400',
      bgColor: 'bg-teal-400',
      hoverbgColor: 'hover:bg-teal-300',
      accentColor: 'accent-teal-400',
      fillColor: 'fill-teal-400',
      decoration: 'decoration-teal-400',
      code: '#14b8a6',
    },
    {
      label: 'Rose',
      textColor: 'text-rose-300',
      hoverText: 'hover:text-rose-300',
      borderColor: 'border-rose-300',
      focusBorder: 'focus:border-rose-300',
      bgColor: 'bg-rose-300',
      hoverbgColor: 'hover:bg-rose-200',
      accentColor: 'accent-rose-300',
      fillColor: 'fill-rose-300',
      decoration: 'decoration-rose-300',
      code: '#fda4af',
    },
    {
      label: 'Himmel',
      textColor: 'text-sky-400',
      hoverText: 'hover:text-sky-400',
      borderColor: 'border-sky-400',
      focusBorder: 'focus:border-sky-400',
      bgColor: 'bg-sky-400',
      hoverbgColor: 'hover:bg-sky-300',
      accentColor: 'accent-sky-400',
      fillColor: 'fill-sky-400',
      decoration: 'decoration-sky-400',
      code: '#38bdf8',
    },
    {
      label: 'Blau',
      textColor: 'text-blue-600',
      hoverText: 'hover:text-blue-600',
      borderColor: 'border-blue-600',
      focusBorder: 'focus:border-blue-600',
      bgColor: 'bg-blue-600',
      hoverbgColor: 'hover:bg-blue-500',
      accentColor: 'accent-blue-600',
      fillColor: 'fill-blue-600',
      decoration: 'decoration-blue-600',
      code: '#2563eb',
    },
    {
      label: 'Lila',
      textColor: 'text-purple-400',
      hoverText: 'hover:text-purple-400',
      borderColor: 'border-purple-400',
      focusBorder: 'focus:border-purple-400',
      bgColor: 'bg-purple-400',
      hoverbgColor: 'hover:bg-purple-300',
      accentColor: 'accent-purple-400',
      fillColor: 'fill-purple-400',
      decoration: 'decoration-purple-400',
      code: '#a855f7',
    },
  ];
  const [notification, setNotification] = useState(settings[0]?.notification);
  const selectNotification = [
    { value: true, label: 'An' },
    { value: false, label: 'Aus' },
  ];
  const [isClosed, setIsClosed] = useState(settings[0]?.isClosed);
  const selectIsClosed = [
    { value: 'off', label: 'Aus' },
    { value: 'holiday', label: 'Urlaub' },
    { value: 'soldout', label: 'Ausverkauft' },
    { value: 'maintance', label: 'Wartungsmodus' },
  ];

  const [isClosedMonday, setIsClosedMonday] = useState(
    settings[0]?.isClosedMonday
  );
  const selectIsClosedMonday = [
    { value: true, label: 'Geöffnet' },
    { value: false, label: 'Geschlossen' },
  ];
  const [isClosedTuesday, setIsClosedTuesday] = useState(
    settings[0]?.isClosedTuesday
  );
  const selectIsClosedTuesday = [
    { value: true, label: 'Geöffnet' },
    { value: false, label: 'Geschlossen' },
  ];
  const [isClosedWednesday, setIsClosedWednesday] = useState(
    settings[0]?.isClosedWednesday
  );
  const selectIsClosedWednesday = [
    { value: true, label: 'Geöffnet' },
    { value: false, label: 'Geschlossen' },
  ];
  const [isClosedThursday, setIsClosedThursday] = useState(
    settings[0]?.isClosedThursday
  );
  const selectIsClosedThursday = [
    { value: true, label: 'Geöffnet' },
    { value: false, label: 'Geschlossen' },
  ];
  const [isClosedFriday, setIsClosedFriday] = useState(
    settings[0]?.isClosedFriday
  );
  const selectIsClosedFriday = [
    { value: true, label: 'Geöffnet' },
    { value: false, label: 'Geschlossen' },
  ];
  const [isClosedSaturday, setIsClosedSaturday] = useState(
    settings[0]?.isClosedSaturday
  );
  const selectIsClosedSaturday = [
    { value: true, label: 'Geöffnet' },
    { value: false, label: 'Geschlossen' },
  ];
  const [isClosedSunday, setIsClosedSunday] = useState(
    settings[0]?.isClosedSunday
  );
  const selectIsClosedSunday = [
    { value: true, label: 'Geöffnet' },
    { value: false, label: 'Geschlossen' },
  ];

  /* Toggle Printer */

  const [printerStatus, setPrinterStatus] = useState(
    settings[0]?.printerStatus
  );

  const togglePrinter = [
    { value: 'off', label: 'Aus' },
    { value: 'onlyStore', label: 'Nur Restaurant' },
    { value: 'doubleStore', label: 'Restaurant doppelt' },
    { value: 'storeCustomer', label: 'Restaurant + Kunde' },
  ];

  const [autoComplete, setAutoComplete] = useState(settings[0]?.autoComplete);

  const toggleAutoComplete = [
    { value: true, label: 'An' },
    { value: false, label: 'Aus' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    setData({
      ...data,
      [name]:
        e.target.name === 'brandImage' || e.target.name === 'bgImage'
          ? e.target.files[0]
          : value,
      err: '',
      success: '',
    });
  };

  const handleUpdate = () => {
    if (
      brand ||
      brandImage ||
      bgImage ||
      color ||
      street ||
      streetNumber ||
      zipCode ||
      city ||
      telefon ||
      companyname ||
      ceo ||
      // court ||
      // courtnumber ||
      authority ||
      ustid ||
      mapsLink ||
      facebook ||
      instagram ||
      notification ||
      notificationMail ||
      payments ||
      delivery ||
      merchantID ||
      minDeliveryAmount ||
      minPayPalAmount ||
      deliveryFirstDistance ||
      deliveryFirstPrice ||
      deliverySecondDistance ||
      deliverySecondPrice ||
      deliveryThirdDistance ||
      deliveryThirdPrice ||
      isClosed ||
      minBeforeClosing ||
      minimalDeliveryTime ||
      minimalCollectTime ||
      /* Monday */
      isClosedMonday ||
      openMonday ||
      closeMonday ||
      startPauseMonday ||
      endPauseMonday ||
      deliveryOpenMonday ||
      deliveryCloseMonday ||
      deliveryStartPauseMonday ||
      deliveryEndPauseMonday ||
      /* Tuesday */
      isClosedTuesday ||
      openTuesday ||
      closeTuesday ||
      startPauseTuesday ||
      endPauseTuesday ||
      deliveryOpenTuesday ||
      deliveryCloseTuesday ||
      deliveryStartPauseTuesday ||
      deliveryEndPauseTuesday ||
      /* Wednesday */
      isClosedWednesday ||
      openWednesday ||
      closeWednesday ||
      startPauseWednesday ||
      endPauseWednesday ||
      deliveryOpenWednesday ||
      deliveryCloseWednesday ||
      deliveryStartPauseWednesday ||
      deliveryEndPauseWednesday ||
      /* Thursday */
      isClosedThursday ||
      openThursday ||
      closeThursday ||
      startPauseThursday ||
      endPauseThursday ||
      deliveryOpenThursday ||
      deliveryCloseThursday ||
      deliveryStartPauseThursday ||
      deliveryEndPauseThursday ||
      /* Friday  */
      isClosedFriday ||
      openFriday ||
      closeFriday ||
      startPauseFriday ||
      endPauseFriday ||
      deliveryOpenFriday ||
      deliveryCloseFriday ||
      deliveryStartPauseFriday ||
      deliveryEndPauseFriday ||
      /* Saturday */
      isClosedSaturday ||
      openSaturday ||
      closeSaturday ||
      startPauseSaturday ||
      endPauseSaturday ||
      deliveryOpenSaturday ||
      deliveryCloseSaturday ||
      deliveryStartPauseSaturday ||
      deliveryEndPauseSaturday ||
      /* Sunday */
      isClosedSunday ||
      openSunday ||
      closeSunday ||
      startPauseSunday ||
      deliveryOpenSunday ||
      deliveryCloseSunday ||
      deliveryStartPauseSunday ||
      deliveryEndPauseSunday ||
      endPauseSunday ||
      /* Printer */
      printerStatus ||
      autoComplete ||
      completeOrderTime
    )
      updateInfor();
  };

  const updateInfor = () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('_id', JSON.stringify(settings[0]?._id));
      formData.append(
        'brand',
        brand ? JSON.stringify(brand) : JSON.stringify(settings[0]?.brand)
      );
      formData.append('brandImage', brandImage);
      formData.append('bgImage', bgImage);
      formData.append(
        'color',
        color ? JSON.stringify(color) : JSON.stringify(settings[0]?.color)
      );
      formData.append(
        'street',
        street ? JSON.stringify(street) : JSON.stringify(settings[0]?.street)
      );
      formData.append(
        'streetNumber',
        streetNumber
          ? JSON.stringify(streetNumber)
          : JSON.stringify(settings[0]?.streetNumber)
      );
      formData.append(
        'city',
        city ? JSON.stringify(city) : JSON.stringify(settings[0]?.city)
      );
      formData.append(
        'zipCode',
        zipCode ? JSON.stringify(zipCode) : JSON.stringify(settings[0]?.zipCode)
      );
      formData.append(
        'email',
        email ? JSON.stringify(email) : JSON.stringify(settings[0]?.email)
      );
      formData.append(
        'telefon',
        telefon ? JSON.stringify(telefon) : JSON.stringify(settings[0]?.telefon)
      );
      formData.append(
        'companyname',
        companyname
          ? JSON.stringify(companyname)
          : JSON.stringify(settings[0]?.companyname)
      );
      formData.append(
        'ceo',
        ceo ? JSON.stringify(ceo) : JSON.stringify(settings[0]?.ceo)
      );
      formData.append(
        'authority',
        authority
          ? JSON.stringify(authority)
          : JSON.stringify(settings[0]?.authority)
      );
      formData.append(
        'ustid',
        ustid ? JSON.stringify(ustid) : JSON.stringify(settings[0]?.ustid)
      );
      formData.append(
        'mapsLink',
        mapsLink
          ? JSON.stringify(mapsLink)
          : JSON.stringify(settings[0]?.mapsLink)
      );
      formData.append(
        'facebook',
        facebook
          ? JSON.stringify(facebook)
          : JSON.stringify(settings[0]?.facebook)
      );
      formData.append(
        'instagram',
        instagram
          ? JSON.stringify(instagram)
          : JSON.stringify(settings[0]?.instagram)
      );
      formData.append(
        'merchantID',
        merchantID
          ? JSON.stringify(merchantID)
          : JSON.stringify(settings[0]?.merchantID)
      );
      formData.append(
        'notification',
        notification
          ? JSON.stringify(notification)
          : JSON.stringify(settings[0]?.notification)
      );
      formData.append(
        'notificationMail',
        notificationMail
          ? JSON.stringify(notificationMail)
          : JSON.stringify(settings[0]?.notificationMail)
      );
      formData.append(
        'payments',
        payments
          ? JSON.stringify(payments)
          : JSON.stringify(settings[0]?.payments)
      );
      formData.append(
        'delivery',
        delivery
          ? JSON.stringify(delivery)
          : JSON.stringify(settings[0]?.delivery)
      );
      formData.append(
        'minDeliveryAmount',
        minDeliveryAmount
          ? JSON.stringify(minDeliveryAmount)
          : JSON.stringify(settings[0]?.minDeliveryAmount)
      );
      formData.append(
        'minPayPalAmount',
        minPayPalAmount
          ? JSON.stringify(minPayPalAmount)
          : JSON.stringify(settings[0]?.minPayPalAmount)
      );
      formData.append(
        'deliveryFirstDistance',
        deliveryFirstDistance
          ? JSON.stringify(deliveryFirstDistance)
          : JSON.stringify(settings[0]?.deliveryFirstDistance)
      );
      formData.append(
        'deliveryFirstPrice',
        deliveryFirstDistance
          ? JSON.stringify(deliveryFirstPrice)
          : JSON.stringify(settings[0]?.deliveryFirstPrice)
      );
      formData.append(
        'deliverySecondDistance',
        deliverySecondDistance
          ? JSON.stringify(deliverySecondDistance)
          : JSON.stringify(settings[0]?.deliverySecondDistance)
      );
      formData.append(
        'deliverySecondPrice',
        deliverySecondPrice
          ? JSON.stringify(deliverySecondPrice)
          : JSON.stringify(settings[0]?.deliverySecondPrice)
      );
      formData.append(
        'deliveryThirdDistance',
        deliveryThirdDistance
          ? JSON.stringify(deliveryThirdDistance)
          : JSON.stringify(settings[0]?.deliveryThirdDistance)
      );
      formData.append(
        'deliveryThirdPrice',
        deliveryThirdPrice
          ? JSON.stringify(deliveryThirdPrice)
          : JSON.stringify(settings[0]?.deliveryThirdPrice)
      );
      formData.append(
        'isClosed',
        isClosed
          ? JSON.stringify(isClosed)
          : JSON.stringify(settings[0]?.isClosed)
      );
      formData.append(
        'minBeforeClosing',
        minBeforeClosing
          ? JSON.stringify(minBeforeClosing)
          : JSON.stringify(settings[0]?.minBeforeClosing)
      );
      formData.append(
        'minimalDeliveryTime',
        minimalDeliveryTime
          ? JSON.stringify(minimalDeliveryTime)
          : JSON.stringify(settings[0]?.minimalDeliveryTime)
      );
      formData.append(
        'minimalCollectTime',
        minimalCollectTime
          ? JSON.stringify(minimalCollectTime)
          : JSON.stringify(settings[0]?.minimalCollectTime)
      );
      /* Monday */
      formData.append(
        'isClosedMonday',
        isClosedMonday
          ? JSON.stringify(isClosedMonday)
          : JSON.stringify(settings[0]?.isClosedMonday)
      );
      formData.append(
        'openMonday',
        openMonday
          ? JSON.stringify(openMonday)
          : JSON.stringify(settings[0]?.openMonday)
      );
      formData.append(
        'closeMonday',
        closeMonday
          ? JSON.stringify(closeMonday)
          : JSON.stringify(settings[0]?.closeMonday)
      );
      formData.append(
        'startPauseMonday',
        startPauseMonday
          ? JSON.stringify(startPauseMonday)
          : JSON.stringify(settings[0]?.startPauseMonday)
      );
      formData.append(
        'endPauseMonday',
        endPauseMonday
          ? JSON.stringify(endPauseMonday)
          : JSON.stringify(settings[0]?.endPauseMonday)
      );
      formData.append(
        'deliveryOpenMonday',
        deliveryOpenMonday
          ? JSON.stringify(deliveryOpenMonday)
          : JSON.stringify(settings[0]?.deliveryOpenMonday)
      );
      formData.append(
        'deliveryCloseMonday',
        deliveryCloseMonday
          ? JSON.stringify(deliveryCloseMonday)
          : JSON.stringify(settings[0]?.deliveryCloseMonday)
      );
      formData.append(
        'deliveryStartPauseMonday',
        deliveryStartPauseMonday
          ? JSON.stringify(deliveryStartPauseMonday)
          : JSON.stringify(settings[0]?.deliveryStartPauseMonday)
      );
      formData.append(
        'deliveryEndPauseMonday',
        deliveryEndPauseMonday
          ? JSON.stringify(deliveryEndPauseMonday)
          : JSON.stringify(settings[0]?.deliveryEndPauseMonday)
      );
      /* Tuesday */
      formData.append(
        'isClosedTuesday',
        isClosedTuesday
          ? JSON.stringify(isClosedTuesday)
          : JSON.stringify(settings[0]?.isClosedTuesday)
      );
      formData.append(
        'openTuesday',
        openTuesday
          ? JSON.stringify(openTuesday)
          : JSON.stringify(settings[0]?.openTuesday)
      );
      formData.append(
        'closeTuesday',
        closeTuesday
          ? JSON.stringify(closeTuesday)
          : JSON.stringify(settings[0]?.closeTuesday)
      );
      formData.append(
        'startPauseTuesday',
        startPauseTuesday
          ? JSON.stringify(startPauseTuesday)
          : JSON.stringify(settings[0]?.startPauseTuesday)
      );
      formData.append(
        'endPauseTuesday',
        endPauseTuesday
          ? JSON.stringify(endPauseTuesday)
          : JSON.stringify(settings[0]?.endPauseTuesday)
      );
      formData.append(
        'deliveryOpenTuesday',
        deliveryOpenTuesday
          ? JSON.stringify(deliveryOpenTuesday)
          : JSON.stringify(settings[0]?.deliveryOpenTuesday)
      );
      formData.append(
        'deliveryCloseTuesday',
        deliveryCloseTuesday
          ? JSON.stringify(deliveryCloseTuesday)
          : JSON.stringify(settings[0]?.deliveryCloseTuesday)
      );
      formData.append(
        'deliveryStartPauseTuesday',
        deliveryStartPauseTuesday
          ? JSON.stringify(deliveryStartPauseTuesday)
          : JSON.stringify(settings[0]?.deliveryStartPauseTuesday)
      );
      formData.append(
        'deliveryEndPauseTuesday',
        deliveryEndPauseTuesday
          ? JSON.stringify(deliveryEndPauseTuesday)
          : JSON.stringify(settings[0]?.deliveryEndPauseTuesday)
      );
      /* Wednesday */
      formData.append(
        'isClosedWednesday',
        isClosedWednesday
          ? JSON.stringify(isClosedWednesday)
          : JSON.stringify(settings[0]?.isClosedWednesday)
      );
      formData.append(
        'openWednesday',
        openWednesday
          ? JSON.stringify(openWednesday)
          : JSON.stringify(settings[0]?.openWednesday)
      );
      formData.append(
        'closeWednesday',
        closeWednesday
          ? JSON.stringify(closeWednesday)
          : JSON.stringify(settings[0]?.closeWednesday)
      );
      formData.append(
        'startPauseWednesday',
        startPauseWednesday
          ? JSON.stringify(startPauseWednesday)
          : JSON.stringify(settings[0]?.startPauseWednesday)
      );
      formData.append(
        'endPauseWednesday',
        endPauseWednesday
          ? JSON.stringify(endPauseWednesday)
          : JSON.stringify(settings[0]?.endPauseWednesday)
      );
      formData.append(
        'deliveryOpenWednesday',
        deliveryOpenWednesday
          ? JSON.stringify(deliveryOpenWednesday)
          : JSON.stringify(settings[0]?.deliveryOpenWednesday)
      );
      formData.append(
        'deliveryCloseWednesday',
        deliveryCloseWednesday
          ? JSON.stringify(deliveryCloseWednesday)
          : JSON.stringify(settings[0]?.deliveryCloseWednesday)
      );
      formData.append(
        'deliveryStartPauseWednesday',
        deliveryStartPauseWednesday
          ? JSON.stringify(deliveryStartPauseWednesday)
          : JSON.stringify(settings[0]?.deliveryStartPauseWednesday)
      );
      formData.append(
        'deliveryEndPauseWednesday',
        deliveryEndPauseWednesday
          ? JSON.stringify(deliveryEndPauseWednesday)
          : JSON.stringify(settings[0]?.deliveryEndPauseWednesday)
      );
      /* Thursday */
      formData.append(
        'isClosedThursday',
        isClosedThursday
          ? JSON.stringify(isClosedThursday)
          : JSON.stringify(settings[0]?.isClosedThursday)
      );
      formData.append(
        'openThursday',
        openThursday
          ? JSON.stringify(openThursday)
          : JSON.stringify(settings[0]?.openThursday)
      );
      formData.append(
        'closeThursday',
        closeThursday
          ? JSON.stringify(closeThursday)
          : JSON.stringify(settings[0]?.closeThursday)
      );
      formData.append(
        'startPauseThursday',
        startPauseThursday
          ? JSON.stringify(startPauseThursday)
          : JSON.stringify(settings[0]?.startPauseThursday)
      );
      formData.append(
        'endPauseThursday',
        endPauseThursday
          ? JSON.stringify(endPauseThursday)
          : JSON.stringify(settings[0]?.endPauseThursday)
      );
      formData.append(
        'deliveryOpenThursday',
        deliveryOpenThursday
          ? JSON.stringify(deliveryOpenThursday)
          : JSON.stringify(settings[0]?.deliveryOpenThursday)
      );
      formData.append(
        'deliveryCloseThursday',
        deliveryCloseThursday
          ? JSON.stringify(deliveryCloseThursday)
          : JSON.stringify(settings[0]?.deliveryCloseThursday)
      );
      formData.append(
        'deliveryStartPauseThursday',
        deliveryStartPauseThursday
          ? JSON.stringify(deliveryStartPauseThursday)
          : JSON.stringify(settings[0]?.deliveryStartPauseThursday)
      );
      formData.append(
        'deliveryEndPauseThursday',
        deliveryEndPauseThursday
          ? JSON.stringify(deliveryEndPauseThursday)
          : JSON.stringify(settings[0]?.deliveryEndPauseThursday)
      );
      /* Friday */
      formData.append(
        'isClosedFriday',
        isClosedFriday
          ? JSON.stringify(isClosedFriday)
          : JSON.stringify(settings[0]?.isClosedFriday)
      );
      formData.append(
        'openFriday',
        openFriday
          ? JSON.stringify(openFriday)
          : JSON.stringify(settings[0]?.openFriday)
      );
      formData.append(
        'closeFriday',
        closeFriday
          ? JSON.stringify(closeFriday)
          : JSON.stringify(settings[0]?.closeFriday)
      );
      formData.append(
        'startPauseFriday',
        startPauseFriday
          ? JSON.stringify(startPauseFriday)
          : JSON.stringify(settings[0]?.startPauseFriday)
      );
      formData.append(
        'endPauseFriday',
        endPauseFriday
          ? JSON.stringify(endPauseFriday)
          : JSON.stringify(settings[0]?.endPauseFriday)
      );
      formData.append(
        'deliveryOpenFriday',
        deliveryOpenFriday
          ? JSON.stringify(deliveryOpenFriday)
          : JSON.stringify(settings[0]?.deliveryOpenFriday)
      );
      formData.append(
        'deliveryCloseFriday',
        deliveryCloseFriday
          ? JSON.stringify(deliveryCloseFriday)
          : JSON.stringify(settings[0]?.deliveryCloseFriday)
      );
      formData.append(
        'deliveryStartPauseFriday',
        deliveryStartPauseFriday
          ? JSON.stringify(deliveryStartPauseFriday)
          : JSON.stringify(settings[0]?.deliveryStartPauseFriday)
      );
      formData.append(
        'deliveryEndPauseFriday',
        deliveryEndPauseFriday
          ? JSON.stringify(deliveryEndPauseFriday)
          : JSON.stringify(settings[0]?.deliveryEndPauseFriday)
      );
      /* Saturday */
      formData.append(
        'isClosedSaturday',
        isClosedSaturday
          ? JSON.stringify(isClosedSaturday)
          : JSON.stringify(settings[0]?.isClosedSaturday)
      );
      formData.append(
        'openSaturday',
        openSaturday
          ? JSON.stringify(openSaturday)
          : JSON.stringify(settings[0]?.openSaturday)
      );
      formData.append(
        'closeSaturday',
        closeSaturday
          ? JSON.stringify(closeSaturday)
          : JSON.stringify(settings[0]?.closeSaturday)
      );
      formData.append(
        'startPauseSaturday',
        startPauseSaturday
          ? JSON.stringify(startPauseSaturday)
          : JSON.stringify(settings[0]?.startPauseSaturday)
      );
      formData.append(
        'endPauseSaturday',
        endPauseSaturday
          ? JSON.stringify(endPauseSaturday)
          : JSON.stringify(settings[0]?.endPauseSaturday)
      );
      formData.append(
        'deliveryOpenSaturday',
        deliveryOpenSaturday
          ? JSON.stringify(deliveryOpenSaturday)
          : JSON.stringify(settings[0]?.deliveryOpenSaturday)
      );
      formData.append(
        'deliveryCloseSaturday',
        deliveryCloseSaturday
          ? JSON.stringify(deliveryCloseSaturday)
          : JSON.stringify(settings[0]?.deliveryCloseSaturday)
      );
      formData.append(
        'deliveryStartPauseSaturday',
        deliveryStartPauseSaturday
          ? JSON.stringify(deliveryStartPauseSaturday)
          : JSON.stringify(settings[0]?.deliveryStartPauseSaturday)
      );
      formData.append(
        'deliveryEndPauseSaturday',
        deliveryEndPauseSaturday
          ? JSON.stringify(deliveryEndPauseSaturday)
          : JSON.stringify(settings[0]?.deliveryEndPauseSaturday)
      );
      /* Sunday */
      formData.append(
        'isClosedSunday',
        isClosedSunday
          ? JSON.stringify(isClosedSunday)
          : JSON.stringify(settings[0]?.isClosedSunday)
      );
      formData.append(
        'openSunday',
        openSunday
          ? JSON.stringify(openSunday)
          : JSON.stringify(settings[0]?.openSunday)
      );
      formData.append(
        'closeSunday',
        closeSunday
          ? JSON.stringify(closeSunday)
          : JSON.stringify(settings[0]?.closeSunday)
      );
      formData.append(
        'startPauseSunday',
        startPauseSunday
          ? JSON.stringify(startPauseSunday)
          : JSON.stringify(settings[0]?.startPauseSunday)
      );
      formData.append(
        'endPauseSunday',
        endPauseSunday
          ? JSON.stringify(endPauseSunday)
          : JSON.stringify(settings[0]?.endPauseSunday)
      );
      formData.append(
        'deliveryOpenSunday',
        deliveryOpenSunday
          ? JSON.stringify(deliveryOpenSunday)
          : JSON.stringify(settings[0]?.deliveryOpenSunday)
      );
      formData.append(
        'deliveryCloseSunday',
        deliveryCloseSunday
          ? JSON.stringify(deliveryCloseSunday)
          : JSON.stringify(settings[0]?.deliveryCloseSunday)
      );
      formData.append(
        'deliveryStartPauseSunday',
        deliveryStartPauseSunday
          ? JSON.stringify(deliveryStartPauseSunday)
          : JSON.stringify(settings[0]?.deliveryStartPauseSunday)
      );
      formData.append(
        'deliveryEndPauseSunday',
        deliveryEndPauseSunday
          ? JSON.stringify(deliveryEndPauseSunday)
          : JSON.stringify(settings[0]?.deliveryEndPauseSunday)
      );

      /* Printer */
      formData.append(
        'printerStatus',
        printerStatus
          ? JSON.stringify(printerStatus)
          : JSON.stringify(settings[0]?.printerStatus)
      );
      formData.append(
        'autoComplete',
        autoComplete
          ? JSON.stringify(autoComplete)
          : JSON.stringify(settings[0]?.autoComplete)
      );
      formData.append(
        'completeOrderTime',
        completeOrderTime
          ? JSON.stringify(completeOrderTime)
          : JSON.stringify(settings[0]?.completeOrderTime)
      );
      /* for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
      } */
      if (window.innerWidth < 700) {
        window.scrollTo(0, window.screen.height / 2);
      }

      axios
        .patch('/api/settings', formData, {
          'content-type': 'multipart/form-data',
          headers: { Authorization: token },
        })
        .then(() => {
          setData({
            ...data,
            err: '',
            success: 'Profil erfolgreich aktualisiert',
          });
          toast.success('Profil erfolgreich aktualisiert', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            setLoading(false);
            window.location.reload(true);
          }, 500);
        })
        .catch(() => {
          toast.error('upload failed', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    } catch (err) {
      toast.error(err, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setLoading(false);
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  const checkPrinter = async () => {
    const res = await axios.get('/api/checkprinteronline', {
      headers: { Authorization: token },
    });
    if (res.data === true) {
      toast.success('Drucker online', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (res.data === false) {
      toast.error('Drucker offline', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  return (
    <div className='text-white bg-gray-900 h-full select-none'>
      <div className='max-w-md mx-auto rounded-lg md:max-w-7xl'>
        <div className='md:flex '>
          <div className='w-full p-4 px-4'>
            <h2
              className={`flex justify-center text-2xl font-bold ${text} pb-4`}
            >
              Systemeinstellungen
            </h2>
            <div className='flex justify-center'>
              {loading ? <LoadingMedium /> : <div></div>}
            </div>
            <div className={`${loading ? 'hidden' : ''}`}>
              {/* <div>Öffnungszeiten (Tag und Zeit) + Feiertage</div> */}
              {/* Restaurant Infos */}
              <Accordion allowToggle>
                {/* Mainsettings */}
                <AccordionItem>
                  <div
                    className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}
                  >
                    <AccordionButton>Haupteinstellungen</AccordionButton>
                  </div>
                  <AccordionPanel>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          type='text'
                          id='textfield'
                          label='Restaurant Name'
                          name='brand'
                          variant='outlined'
                          value={brand ?? settings[0]?.brand}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            accept:
                              'image/gif, image/jpeg, image/png, image/heic, image/heif',
                          }}
                          type='file'
                          id='textfield'
                          label='Logo'
                          name='brandImage'
                          variant='outlined'
                          value={brandImage}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            accept:
                              'image/gif, image/jpeg, image/png, image/heic, image/heif',
                          }}
                          type='file'
                          id='textfield'
                          label='bgImage'
                          name='Hintergrundbild'
                          variant='outlined'
                          value={bgImage}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex justify-between '>
                      <label>Farbschema</label>
                      <div className='text-gray-900 pb-1 pr-8'>
                        <Select
                          options={selectColors}
                          defaultValue={color}
                          theme={infoTheme}
                          onChange={setColor}
                          components={animatedComponents}
                          isSearchable={false}
                        />
                      </div>
                    </div>
                    <div className='flex justify-center'>
                      <div className='flex justify-between my-4 mr-4 w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Straße'
                            name='street'
                            variant='outlined'
                            value={street ?? settings[0]?.street}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between my-4 w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Hausnummer'
                            name='streetNumber'
                            variant='outlined'
                            value={streetNumber ?? settings[0]?.streetNumber}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    <div className='flex justify-center'>
                      <div className='flex justify-between mr-4 w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Postleitzahl'
                            name='zipCode'
                            variant='outlined'
                            value={zipCode ?? settings[0]?.zipCode}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Stadt'
                            name='city'
                            variant='outlined'
                            value={city ?? settings[0]?.city}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>

                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          type='email'
                          id='textfield'
                          label='Restaurant E-Mail'
                          name='email'
                          variant='outlined'
                          value={email ?? settings[0]?.email}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          type='tel'
                          id='textfield'
                          label='Telefonnummer'
                          name='telefon'
                          variant='outlined'
                          value={telefon ?? settings[0]?.telefon}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex my-4'>
                      <div className='flex justify-between mr-4 w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Firmenname'
                            name='companyname'
                            variant='outlined'
                            value={companyname ?? settings[0]?.companyname}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Geschäftsführer'
                            name='ceo'
                            variant='outlined'
                            value={ceo ?? settings[0]?.ceo}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>

                    <div className='flex my-4'>
                      <div className='flex justify-between mr-4 w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Aufsichtsbehörde'
                            name='authority'
                            variant='outlined'
                            value={authority ?? settings[0]?.authority}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Ust.ID'
                            name='ustid'
                            variant='outlined'
                            value={ustid ?? settings[0]?.ustid}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          type='text'
                          id='textfield'
                          label='Google Maps Link ohne HTML'
                          name='mapsLink'
                          variant='outlined'
                          value={mapsLink ?? settings[0]?.mapsLink}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex my-4'>
                      <div className='flex justify-between mr-4 w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Facebook Link'
                            name='facebook'
                            variant='outlined'
                            value={facebook ?? settings[0]?.facebook}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Instagram Link'
                            name='instagram'
                            variant='outlined'
                            value={instagram ?? settings[0]?.instagram}
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
                {/* Payment & Delivery */}
                <AccordionItem>
                  <div
                    className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}
                  >
                    <AccordionButton>
                      Zahlungs- & Liefereinstellungen
                    </AccordionButton>
                  </div>
                  <AccordionPanel>
                    <div className='text-gray-900 pb-3'>
                      <Select
                        key={defaultPayments}
                        options={selectPayments}
                        isMulti
                        defaultValue={defaultPayments}
                        theme={infoTheme}
                        onChange={setPayments}
                        placeholder='Zahlungsmethoden aktivieren'
                        //components={animatedComponents}
                        isSearchable={false}
                        noOptionsMessage={() =>
                          'Keine weiteren Zahlungsmöglichkeiten verfügbar'
                        }
                      />
                    </div>
                    <div className='text-gray-900 pb-3'>
                      <Select
                        key={defaultDelivery}
                        options={selectDelivery}
                        isMulti
                        defaultValue={defaultDelivery}
                        autoFocus
                        theme={infoTheme}
                        onChange={setDelivery}
                        placeholder='Übergabemethoden aktivieren'
                        //components={animatedComponents}
                        isSearchable={false}
                      />
                    </div>
                    <div className='flex justify-between my-1'>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          type='text'
                          id='textfield'
                          label='PayPal Händler ID'
                          name='merchantID'
                          variant='outlined'
                          value={merchantID ?? settings[0]?.merchantID}
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                      <a
                        href='https://www.paypal.com/businessmanage/account/aboutBusiness'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex justify-center items-center'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke-width='1.5'
                          stroke='currentColor'
                          className={`w-8 h-8 mx-2 ${text}`}
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
                          />
                        </svg>
                      </a>
                    </div>
                    <div className='flex justify-between'>
                      <div className=''>E-Mail Benachrichtigung:</div>
                      <div className='text-gray-900 pb-1'>
                        <Select
                          options={selectNotification}
                          defaultValue={notification}
                          autoFocus
                          theme={infoTheme}
                          onChange={setNotification}
                          components={animatedComponents}
                          isSearchable={false}
                        />
                      </div>
                    </div>
                    <div className='flex justify-between my-4'>
                      <ThemeProvider theme={texttheme}>
                        <TextField
                          type='text'
                          id='textfield'
                          label='E-Mail für Bestellungen'
                          name='notificationMail'
                          variant='outlined'
                          value={
                            notificationMail ?? settings[0]?.notificationMail
                          }
                          onChange={handleChange}
                          fullWidth
                        />
                      </ThemeProvider>
                    </div>
                    <div className='flex justify-center'>
                      <div className='w-full mr-4'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label='Lieferung Mindestbestellwert EUR'
                            name='minDeliveryAmount'
                            variant='outlined'
                            value={
                              minDeliveryAmount ??
                              settings[0]?.minDeliveryAmount
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label='PayPal Mindestbestellwert EUR'
                            name='minPayPalAmount'
                            variant='outlined'
                            value={
                              minPayPalAmount ?? settings[0]?.minPayPalAmount
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    <div className='flex justify-center my-4'>
                      <div className='w-full mr-4'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label='Liefergebiet 1 in km'
                            name='deliveryFirstDistance'
                            variant='outlined'
                            value={
                              deliveryFirstDistance ??
                              settings[0]?.deliveryFirstDistance
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label='Liefergebiet 1 Preis in EUR'
                            name='deliveryFirstPrice'
                            variant='outlined'
                            value={
                              deliveryFirstPrice ??
                              settings[0]?.deliveryFirstPrice
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    <div className='flex justify-center my-4'>
                      <div className='w-full mr-4'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label='Liefergebiet 2 in km'
                            name='deliverySecondDistance'
                            variant='outlined'
                            value={
                              deliverySecondDistance ??
                              settings[0]?.deliverySecondDistance
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label='Liefergebiet 2 Preis in EUR'
                            name='deliverySecondPrice'
                            variant='outlined'
                            value={
                              deliverySecondPrice ??
                              settings[0]?.deliverySecondPrice
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    <div className='flex justify-center my-4'>
                      <div className='w-full mr-4'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label='Liefergebiet 3 in km'
                            name='deliveryThirdDistance'
                            variant='outlined'
                            value={
                              deliveryThirdDistance ??
                              settings[0]?.deliveryThirdDistance
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='w-full'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label='Liefergebiet 3 Preis in EUR'
                            name='deliveryThirdPrice'
                            variant='outlined'
                            value={
                              deliveryThirdPrice ??
                              settings[0]?.deliveryThirdPrice
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
                {/* Opening times */}
                <AccordionItem>
                  <div
                    className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}
                  >
                    <AccordionButton>Öffnungszeiten</AccordionButton>
                  </div>
                  <AccordionPanel>
                    <div>
                      <div className='flex justify-between bg-gray-700 pt-4'>
                        <div className='pl-8'>Urlaubsmodus:</div>
                        <div className='text-gray-900 pb-1 pr-8'>
                          <Select
                            options={selectIsClosed}
                            defaultValue={isClosed}
                            autoFocus
                            theme={infoTheme}
                            onChange={setIsClosed}
                            components={animatedComponents}
                            isSearchable={false}
                          />
                        </div>
                      </div>
                      <div className='flex justify-between my-4'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            id='textfield'
                            label=' Annahmestop vor Ladenschluss in min'
                            name='minBeforeClosing'
                            variant='outlined'
                            value={
                              minBeforeClosing ?? settings[0]?.minBeforeClosing
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between my-4'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            inputProps={{
                              min: 0,
                              max: 120,
                              step: 1,
                            }}
                            id='textfield'
                            label='Lieferzeit in Minuten'
                            name='minimalDeliveryTime'
                            variant='outlined'
                            value={
                              minimalDeliveryTime ??
                              settings[0]?.minimalDeliveryTime
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex justify-between my-4'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='number'
                            inputProps={{
                              min: 0,
                              max: 120,
                              step: 1,
                            }}
                            s
                            id='textfield'
                            label='Abholzeit in Minuten'
                            name='minimalCollectTime'
                            variant='outlined'
                            value={
                              minimalCollectTime ??
                              settings[0]?.minimalCollectTime
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      {/* Monday */}
                      <Accordion allowToggle>
                        <AccordionItem>
                          <div
                            className={`pl-8 py-2 bg-gray-700 text-lg underline ${decoration}`}
                          >
                            <AccordionButton>Montag</AccordionButton>
                          </div>
                          <AccordionPanel>
                            <div className='pl-8 py-2 bg-gray-600 '>
                              <div className='flex justify-between pt-4'>
                                <div>Montags:</div>
                                <div className='text-gray-900 pb-1 pr-8'>
                                  <Select
                                    options={selectIsClosedMonday}
                                    defaultValue={isClosedMonday}
                                    autoFocus
                                    theme={infoTheme}
                                    onChange={setIsClosedMonday}
                                    components={animatedComponents}
                                    isSearchable={false}
                                  />
                                </div>
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Montag ab</label>
                                <input
                                  type='time'
                                  name='openMonday'
                                  defaultValue={settings[0]?.openMonday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700 '
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Montag bis</label>
                                <input
                                  type='time'
                                  name='closeMonday'
                                  defaultValue={settings[0]?.closeMonday}
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause von</label>
                                <input
                                  type='time'
                                  name='startPauseMonday'
                                  defaultValue={settings[0]?.startPauseMonday}
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause bis</label>
                                <input
                                  type='time'
                                  name='endPauseMonday'
                                  defaultValue={settings[0]?.endPauseMonday}
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Montag Lieferung ab
                                </label>
                                <input
                                  type='time'
                                  name='deliveryOpenMonday'
                                  defaultValue={settings[0]?.deliveryOpenMonday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700 '
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Montag Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryCloseMonday'
                                  defaultValue={
                                    settings[0]?.deliveryCloseMonday
                                  }
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung von
                                </label>
                                <input
                                  type='time'
                                  name='deliveryStartPauseMonday'
                                  defaultValue={
                                    settings[0]?.deliveryStartPauseMonday
                                  }
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryEndPauseMonday'
                                  defaultValue={
                                    settings[0]?.deliveryEndPauseMonday
                                  }
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      {/* Tuesday */}
                      <Accordion allowToggle>
                        <AccordionItem>
                          <div
                            className={`pl-8 py-2 bg-gray-700 text-lg underline ${decoration}`}
                          >
                            <AccordionButton>Dienstag</AccordionButton>
                          </div>
                          <AccordionPanel>
                            <div className='pl-8 py-2 bg-gray-600 '>
                              <div className='flex justify-between pt-4'>
                                <div>Dienstags:</div>
                                <div className='text-gray-900 pb-1 pr-8'>
                                  <Select
                                    options={selectIsClosedTuesday}
                                    defaultValue={isClosedTuesday}
                                    autoFocus
                                    theme={infoTheme}
                                    onChange={setIsClosedTuesday}
                                    components={animatedComponents}
                                    isSearchable={false}
                                  />
                                </div>
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Dienstag ab</label>
                                <input
                                  type='time'
                                  name='openTuesday'
                                  defaultValue={settings[0]?.openTuesday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Dienstag bis</label>
                                <input
                                  type='time'
                                  name='closeTuesday'
                                  defaultValue={settings[0]?.closeTuesday}
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause von</label>
                                <input
                                  type='time'
                                  name='startPauseTuesday'
                                  defaultValue={settings[0]?.startPauseTuesday}
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause bis</label>
                                <input
                                  type='time'
                                  name='endPauseTuesday'
                                  defaultValue={settings[0]?.endPauseTuesday}
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Dienstag Lieferung ab
                                </label>
                                <input
                                  type='time'
                                  name='deliveryOpenTuesday'
                                  defaultValue={
                                    settings[0]?.deliveryOpenTuesday
                                  }
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Dienstag Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryCloseTuesday'
                                  defaultValue={
                                    settings[0]?.deliveryCloseTuesday
                                  }
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung von
                                </label>
                                <input
                                  type='time'
                                  name='deliveryStartPauseTuesday'
                                  defaultValue={
                                    settings[0]?.deliveryStartPauseTuesday
                                  }
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryEndPauseTuesday'
                                  defaultValue={
                                    settings[0]?.deliveryEndPauseTuesday
                                  }
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      {/* Wednesday */}
                      <Accordion allowToggle>
                        <AccordionItem>
                          <div
                            className={`pl-8 py-2 bg-gray-700 text-lg underline ${decoration}`}
                          >
                            <AccordionButton>Mittwoch</AccordionButton>
                          </div>
                          <AccordionPanel>
                            <div className='pl-8 py-2 bg-gray-600 '>
                              <div className='flex justify-between pt-4'>
                                <div>Mittwochs:</div>
                                <div className='text-gray-900 pb-1 pr-8'>
                                  <Select
                                    options={selectIsClosedWednesday}
                                    defaultValue={isClosedWednesday}
                                    autoFocus
                                    theme={infoTheme}
                                    onChange={setIsClosedWednesday}
                                    components={animatedComponents}
                                    isSearchable={false}
                                  />
                                </div>
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Mittwoch ab</label>
                                <input
                                  type='time'
                                  name='openWednesday'
                                  defaultValue={settings[0]?.openWednesday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Mittwoch bis</label>
                                <input
                                  type='time'
                                  name='closeWednesday'
                                  defaultValue={settings[0]?.closeWednesday}
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause von</label>
                                <input
                                  type='time'
                                  name='startPauseWednesday'
                                  defaultValue={
                                    settings[0]?.startPauseWednesday
                                  }
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause bis</label>
                                <input
                                  type='time'
                                  name='endPauseWednesday'
                                  defaultValue={settings[0]?.endPauseWednesday}
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Mittwoch Lieferung ab
                                </label>
                                <input
                                  type='time'
                                  name='deliveryOpenWednesday'
                                  defaultValue={
                                    settings[0]?.deliveryOpenWednesday
                                  }
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Mittwoch Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryCloseWednesday'
                                  defaultValue={
                                    settings[0]?.deliveryCloseWednesday
                                  }
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung von
                                </label>
                                <input
                                  type='time'
                                  name='deliveryStartPauseWednesday'
                                  defaultValue={
                                    settings[0]?.deliveryStartPauseWednesday
                                  }
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryEndPauseWednesday'
                                  defaultValue={
                                    settings[0]?.deliveryEndPauseWednesday
                                  }
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      {/* Thursday */}
                      <Accordion allowToggle>
                        <AccordionItem>
                          <div
                            className={`pl-8 py-2 bg-gray-700 text-lg underline ${decoration}`}
                          >
                            <AccordionButton>Donnerstag</AccordionButton>
                          </div>
                          <AccordionPanel>
                            <div className='pl-8 py-2 bg-gray-600 '>
                              <div className='flex justify-between pt-4'>
                                <div>Donnerstags:</div>
                                <div className='text-gray-900 pb-1 pr-8'>
                                  <Select
                                    options={selectIsClosedThursday}
                                    defaultValue={isClosedThursday}
                                    autoFocus
                                    theme={infoTheme}
                                    onChange={setIsClosedThursday}
                                    components={animatedComponents}
                                    isSearchable={false}
                                  />
                                </div>
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Donnerstag ab</label>
                                <input
                                  type='time'
                                  name='openThursday'
                                  defaultValue={settings[0]?.openThursday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Donnerstag bis</label>
                                <input
                                  type='time'
                                  name='closeThursday'
                                  defaultValue={settings[0]?.closeThursday}
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause von</label>
                                <input
                                  type='time'
                                  name='startPauseThursday'
                                  defaultValue={settings[0]?.startPauseThursday}
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause bis</label>
                                <input
                                  type='time'
                                  name='endPauseThursday'
                                  defaultValue={settings[0]?.endPauseThursday}
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Donnerstag Lieferung ab
                                </label>
                                <input
                                  type='time'
                                  name='deliveryOpenThursday'
                                  defaultValue={
                                    settings[0]?.deliveryOpenThursday
                                  }
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Donnerstag Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryCloseThursday'
                                  defaultValue={
                                    settings[0]?.deliveryCloseThursday
                                  }
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung von
                                </label>
                                <input
                                  type='time'
                                  name='deliveryStartPauseThursday'
                                  defaultValue={
                                    settings[0]?.deliveryStartPauseThursday
                                  }
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryEndPauseThursday'
                                  defaultValue={
                                    settings[0]?.deliveryEndPauseThursday
                                  }
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      {/* Friday */}
                      <Accordion allowToggle>
                        <AccordionItem>
                          <div
                            className={`pl-8 py-2 bg-gray-700 text-lg underline ${decoration}`}
                          >
                            <AccordionButton>Freitag</AccordionButton>
                          </div>
                          <AccordionPanel>
                            <div className='pl-8 py-2 bg-gray-600 '>
                              <div className='flex justify-between pt-4'>
                                <div>Freitags:</div>
                                <div className='text-gray-900 pb-1 pr-8'>
                                  <Select
                                    options={selectIsClosedFriday}
                                    defaultValue={isClosedFriday}
                                    autoFocus
                                    theme={infoTheme}
                                    onChange={setIsClosedFriday}
                                    components={animatedComponents}
                                    isSearchable={false}
                                  />
                                </div>
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Freitag ab</label>
                                <input
                                  type='time'
                                  name='openFriday'
                                  defaultValue={settings[0]?.openFriday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Freitag bis</label>
                                <input
                                  type='time'
                                  name='closeFriday'
                                  defaultValue={settings[0]?.closeFriday}
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause von</label>
                                <input
                                  type='time'
                                  name='startPauseFriday'
                                  defaultValue={settings[0]?.startPauseFriday}
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause bis</label>
                                <input
                                  type='time'
                                  name='endPauseFriday'
                                  defaultValue={settings[0]?.endPauseFriday}
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Freitag Lieferung ab
                                </label>
                                <input
                                  type='time'
                                  name='deliveryOpenFriday'
                                  defaultValue={settings[0]?.deliveryOpenFriday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Freitag Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryCloseFriday'
                                  defaultValue={
                                    settings[0]?.deliveryCloseFriday
                                  }
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung von
                                </label>
                                <input
                                  type='time'
                                  name='deliveryStartPauseFriday'
                                  defaultValue={
                                    settings[0]?.deliveryStartPauseFriday
                                  }
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryEndPauseFriday'
                                  defaultValue={
                                    settings[0]?.deliveryEndPauseFriday
                                  }
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      {/* Saturday */}
                      <Accordion allowToggle>
                        <AccordionItem>
                          <div
                            className={`pl-8 py-2 bg-gray-700 text-lg underline ${decoration}`}
                          >
                            <AccordionButton>Samstag</AccordionButton>
                          </div>
                          <AccordionPanel>
                            <div className='pl-8 py-2 bg-gray-600 '>
                              <div className='flex justify-between pt-4'>
                                <div>Samstags:</div>
                                <div className='text-gray-900 pb-1 pr-8'>
                                  <Select
                                    options={selectIsClosedSaturday}
                                    defaultValue={isClosedSaturday}
                                    autoFocus
                                    theme={infoTheme}
                                    onChange={setIsClosedSaturday}
                                    components={animatedComponents}
                                    isSearchable={false}
                                  />
                                </div>
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Samstag ab</label>
                                <input
                                  type='time'
                                  name='openSaturday'
                                  defaultValue={settings[0]?.openSaturday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Samstag bis</label>
                                <input
                                  type='time'
                                  name='closeSaturday'
                                  defaultValue={settings[0]?.closeSaturday}
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause von</label>
                                <input
                                  type='time'
                                  name='startPauseSaturday'
                                  defaultValue={settings[0]?.startPauseSaturday}
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause bis</label>
                                <input
                                  type='time'
                                  name='endPauseSaturday'
                                  defaultValue={settings[0]?.endPauseSaturday}
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Samstag Lieferung ab
                                </label>
                                <input
                                  type='time'
                                  name='deliveryOpenSaturday'
                                  defaultValue={
                                    settings[0]?.deliveryOpenSaturday
                                  }
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Samstag Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryCloseSaturday'
                                  defaultValue={
                                    settings[0]?.deliveryCloseSaturday
                                  }
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung von
                                </label>
                                <input
                                  type='time'
                                  name='deliveryStartPauseSaturday'
                                  defaultValue={
                                    settings[0]?.deliveryStartPauseSaturday
                                  }
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryEndPauseSaturday'
                                  defaultValue={
                                    settings[0]?.deliveryEndPauseSaturday
                                  }
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      {/* Sunday */}
                      <Accordion allowToggle>
                        <AccordionItem>
                          <div
                            className={`pl-8 py-2 bg-gray-700 text-lg underline ${decoration}`}
                          >
                            <AccordionButton>Sonntag</AccordionButton>
                          </div>
                          <AccordionPanel>
                            <div className='pl-8 py-2 bg-gray-600 '>
                              <div className='flex justify-between pt-4'>
                                <div>Sonntags:</div>
                                <div className='text-gray-900 pb-1 pr-8'>
                                  <Select
                                    options={selectIsClosedSunday}
                                    defaultValue={isClosedSunday}
                                    autoFocus
                                    theme={infoTheme}
                                    onChange={setIsClosedSunday}
                                    components={animatedComponents}
                                    isSearchable={false}
                                  />
                                </div>
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Sonntag ab</label>
                                <input
                                  type='time'
                                  name='openSunday'
                                  defaultValue={settings[0]?.openSunday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Sonntag bis</label>
                                <input
                                  type='time'
                                  name='closeSunday'
                                  defaultValue={settings[0]?.closeSunday}
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause von</label>
                                <input
                                  type='time'
                                  name='startPauseSunday'
                                  defaultValue={settings[0]?.startPauseSunday}
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>Pause bis</label>
                                <input
                                  type='time'
                                  name='endPauseSunday'
                                  defaultValue={settings[0]?.endPauseSunday}
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Sonntag Lieferung ab
                                </label>
                                <input
                                  type='time'
                                  name='deliveryOpenSunday'
                                  defaultValue={settings[0]?.deliveryOpenSunday}
                                  placeholder='11:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Sonntag Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryCloseSunday'
                                  defaultValue={
                                    settings[0]?.deliveryCloseSunday
                                  }
                                  placeholder='23:00'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung von
                                </label>
                                <input
                                  type='time'
                                  name='deliveryStartPauseSunday'
                                  defaultValue={
                                    settings[0]?.deliveryStartPauseSunday
                                  }
                                  placeholder='14:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                              <div className='flex justify-between my-1'>
                                <label htmlFor='name'>
                                  Pause Lieferung bis
                                </label>
                                <input
                                  type='time'
                                  name='deliveryEndPauseSunday'
                                  defaultValue={
                                    settings[0]?.deliveryEndPauseSunday
                                  }
                                  placeholder='17:30'
                                  onChange={handleChange}
                                  className='px-2 font-medium bg-gray-700'
                                />
                              </div>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
                {/* Printer Settings */}
                {/*      <AccordionItem>
                  <div
                    className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}
                  >
                    <AccordionButton>Druckereinstellungen</AccordionButton>
                  </div>
                  <AccordionPanel>
                    <div className='pl-8 py-2 bg-gray-900 '>
                      <div className='flex justify-between pt-4'>
                        <div>Drucker einschalten:</div>
                        <div className='text-gray-900 pb-1 pr-8 min-w-[160px]'>
                          <Select
                            options={togglePrinter}
                            defaultValue={printerStatus}
                            autoFocus
                            theme={infoTheme}
                            onChange={setPrinterStatus}
                            components={animatedComponents}
                            isSearchable={false}
                          />
                        </div>
                      </div>
                      <div className='flex justify-between pt-4'>
                        <div>Bestellung auto. abschließen:</div>
                        <div className='text-gray-900 pb-1 pr-8 min-w-[160px]'>
                          <Select
                            options={toggleAutoComplete}
                            defaultValue={autoComplete}
                            autoFocus
                            theme={infoTheme}
                            onChange={setAutoComplete}
                            components={animatedComponents}
                            isSearchable={false}
                          />
                        </div>
                      </div>
                      <div className='flex justify-between my-4 mr-8'>
                        <ThemeProvider theme={texttheme}>
                          <TextField
                            type='text'
                            id='textfield'
                            label='Bestellung abschließen in Minuten'
                            name='completeOrderTime'
                            variant='outlined'
                            value={
                              completeOrderTime ??
                              settings[0]?.completeOrderTime
                            }
                            onChange={handleChange}
                            fullWidth
                          />
                        </ThemeProvider>
                      </div>
                      <div className='flex mb-10 mt-10'>
                        <div
                          className={`px-2 rounded ${bg} ${border}`}
                          onClick={checkPrinter}
                        >
                          Drucker Testen
                        </div>
                      </div>
                    </div>

                  </AccordionPanel>
                </AccordionItem> */}
                <button
                  onClick={handleUpdate}
                  className={`block w-full ${bg} ${hoverbgColor} p-4 mt-2 rounded text-white transition duration-300`}
                >
                  Veränderungen bestätigen
                </button>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
