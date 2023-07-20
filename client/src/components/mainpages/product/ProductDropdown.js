import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { systemSettings } from '../../../redux/actions/systemSettingsAction';
import { showToast } from '../../../redux/actions/toastAction';
import DishesOverview from './DishesOverview';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/accordion';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingLarge from '../../utils/loading/LoadingLarge';
import $ from 'jquery';
import 'dayjs/locale/de';
dayjs.extend(customParseFormat);
dayjs.locale('de');

const ids = [];

function ProductDropdown() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(systemSettings());
  }, []);

  const token = useSelector((state) => state.token);
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const border = settings[0]?.color[0]?.borderColor;

  const auth = useSelector((state) => state.auth);
  const { isAdmin, isMasterAdmin } = auth;

  const [activeSub, setActiveSub] = useState(['PLACEHOLDER']);

  useEffect(() => {
    const getSubscriptionValue = async () => {
      const res = await axios.get('/api/activesubscription', {
        headers: { Authorization: token },
      });
      setActiveSub(
        res.data.filter(
          (data) => data.subscriptionStatus === 'BILLING.SUBSCRIPTION.ACTIVATED'
        )
      );
    };
    getSubscriptionValue();
  }, [token]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/category');
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);

  const byId = (a, b) => {
    return parseInt(a.category[0].value) - parseInt(b.category[0].value);
  };

  const category = useMemo(() => {
    return categories.sort(byId).map((category) => {
      return category.name;
    });
  }, [categories]);

  const toaststate = useSelector((state) => state.toastReducer);
  const { status } = toaststate;

  useEffect(() => {
    dispatch(showToast(false));
  }, []);
  status === 'added' &&
    toast.success('Erfolgreich hinzugeüfgt', {
      position: toast.POSITION.BOTTOM_RIGHT,
    }) &&
    dispatch(showToast(false));

  status === 'alreadyadded' &&
    toast.info('Bereits im Warenkorb', {
      position: toast.POSITION.BOTTOM_RIGHT,
    }) &&
    dispatch(showToast(false));

  let initialBgUrl = settings[0]?.bgImage;
  let splitBgUrl = initialBgUrl && initialBgUrl.split('/upload');
  let newBgUrl =
    splitBgUrl &&
    splitBgUrl[0] +
      '/upload/e_gradient_fade,y_-0.3,b_rgb:374151' +
      splitBgUrl[1];

  useEffect(() => {
    if (category.length > 0) {
      //console.log(category);
      category.map((element, index) => {
        setTimeout(() => {
          $(function () {
            $('#accordion-button-accordinng-' + index).on(
              'click',
              function (e) {
                $('html,body').animate(
                  {
                    scrollTop:
                      $('#accordion-button-accordinng-' + index).offset().top -
                      68,
                  },
                  400
                );
                setTimeout(() => {
                  $('html,body').animate(
                    {
                      scrollTop:
                        $('#accordion-button-accordinng-' + index).offset()
                          .top - 68,
                    },
                    400
                  );
                }, 300);
                //console.log('clicked', category);
              }
            );
          });
        }, 300);
      });
    }

    return () => {
      category.map(
        (element) => {
          $('#accordion-button-accordinng-' + element).unbind('click');
        },
        [category]
      );
    };
  }, [category]);

  /*   useEffect(() => {
    if (category.length > 0) {
      category.map((ele, index) => {
        let element = document.querySelector(
          '#accordion-button-accordinng-' + index
        );
        element.addEventListener('click', () => {
          var headerOffset = 68;
          var elementPosition = element.getBoundingClientRect().top;
          var offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        });
      });
    }
  }, [category]); */

  useEffect(() => {
    if (initialBgUrl === '') {
      return;
    }
    setLoading(true);
    if (newBgUrl) {
      var src = newBgUrl;
      var image = new Image();
      image.addEventListener('load', function () {
        setLoading(false);
      });
      image.src = src;
    }
  }, [newBgUrl]);

  // Smooth scroll
  // Page works best but bcs accordion changes the site height it fail

  return (
    <div className='bg-gray-700'>
      <div className={`${loading ? 'flex justify-center' : ''}`}>
        {loading ? (
          <div className='justify-center min-h-screen select-none bg-scroll pb-36 flex items-center'>
            <LoadingLarge />
          </div>
        ) : (
          <div
            className='min-h-screen pt-10 select-none bg-scroll bg-no-repeat pb-10 mx-auto'
            style={{
              backgroundImage:
                activeSub.length < 1 || settings[0]?.isClosed[0]?.value != 'off'
                  ? ''
                  : `url(${newBgUrl})`,
              backgroundPosition: '50% 0',
              //backgroundAttachment: 'fixed',
            }}
          >
            <div className='text-center grid grid-cols-1 md:grid-cols-1 2xl:w-[65%] xl:w-[80%] w-[98%] mx-auto'>
              {activeSub.length < 1 ? (
                <div className={`mx-auto pt-52 text-4xl ${text}`}>
                  Wir überarbeiten zurzeit unsere Webseite. Wir freuen uns
                  darauf, dich bald wieder bedienen zu dürfen.
                </div>
              ) : settings[0]?.isClosed[0]?.value === 'holiday' ? (
                <div className={`flex justify-center pt-52 text-4xl ${text}`}>
                  Wir haben zurzeit Urlaub. Wir freuen uns darauf, dich bald
                  wieder bedienen zu dürfen.
                </div>
              ) : settings[0]?.isClosed[0]?.value === 'soldout' ? (
                <div className={`flex justify-center pt-52 text-4xl ${text}`}>
                  Für Heute sind wir leider ausverkauft. Wir freuen uns darauf,
                  dich bald wieder bedienen zu dürfen.
                </div>
              ) : settings[0]?.isClosed[0]?.value === 'maintance' ? (
                <div className={`flex justify-center pt-52 text-4xl ${text}`}>
                  Wir überarbeiten zurzeit unsere Webseite. Wir freuen uns
                  darauf, dich bald wieder bedienen zu dürfen.
                </div>
              ) : (
                <Accordion allowToggle>
                  {category.map((items, index) => {
                    return (
                      <AccordionItem id={'accordinng-' + index}>
                        <div
                          className={`2xl:min-w-[65%] xl:min-w-[80%] min-w-[90%] mx-auto bg-gray-800 border-b-2 ${border} bg-opacity-[.94]`}
                        >
                          <AccordionButton>
                            <div className='text-white mx-auto text-xl font-bold p-7'>
                              {items}
                            </div>
                          </AccordionButton>

                          <AccordionPanel className='py-8 '>
                            {<DishesOverview categoryFilter={items} />}
                          </AccordionPanel>
                        </div>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDropdown;
