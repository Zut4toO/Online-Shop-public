// https://www.delftstack.com/de/howto/javascript/sum-array-of-objects-javascript/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import MonthlyOrders from './MonthlyOrders';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/accordion';
dayjs.extend(customParseFormat);
dayjs.locale('de');

const PayFees = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const decoration = settings[0]?.color[0]?.decoration;
  const border = settings[0]?.color[0]?.borderColor;

  const [history, setHistory] = useState([]);

  const token = useSelector((state) => state.token);
  useEffect(() => {
    const getHistory = async () => {
      const res = await axios.get('/api/calculatefee', {
        headers: { Authorization: token },
      });
      setHistory(res.data);
    };
    getHistory();
  }, [token, setHistory]);

  const getYears = new Set(
    history.map((date) => {
      const year = dayjs(date.monthYear, 'MM/YYYY').format('YYYY');
      return year;
    })
  );

  const getMonths = new Set(
    history.map((date) => {
      const monthYear = dayjs(date.monthYear, 'MM/YYYY').format('MM/YYYY');
      return monthYear;
    })
  );

  const yearsArr = [...getYears];
  const monthArr = [...getMonths];

  const monthArrFullDate = monthArr.map((date) => {
    return dayjs(date, 'MM/YYYY').format('YYYY-MM-DD');
  });

  const monthArrSorted = monthArrFullDate.sort((a, b) =>
    dayjs(a).isAfter(dayjs(b)) ? 1 : -1
  );

  if (monthArrSorted.includes(dayjs(new Date()).format('YYYY-MM-01'))) {
    monthArrSorted.pop();
  }

  const monthArrFiltered = monthArrSorted.map((date) => {
    return dayjs(date, 'YYYY-MM-DD').format('MM/YYYY');
  });

  console.log(history);

  return (
    <div className='text-white bg-gray-900 h-full'>
      <div className='max-w-md mx-auto rounded-lg md:max-w-7xl'>
        <div className='md:flex '>
          <div className='w-full p-4 px-4'>
            <div className='flex justify-center'>
              <h2
                className={`flex justify-center text-2xl font-bold pb-4 ${text}`}
              >
                Bestellübersicht
              </h2>
            </div>
            {/* <div>PDF Alle Bestellungen</div>
            <div>PDF Alle Rechnungen</div> */}

            {yearsArr.map((year) => {
              return (
                <div className='bg-gray-700'>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <div
                        className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}
                      >
                        <AccordionButton>{year}</AccordionButton>
                      </div>
                      <AccordionPanel>
                        <div>
                          <Accordion allowToggle>
                            {monthArrFiltered.map((month) => {
                              return dayjs(month, 'MM/YYYY').format('YYYY') ===
                                year ? (
                                <>
                                  <AccordionItem>
                                    <div
                                      className={`pl-8 py-2 bg-gray-700 text-lg underline ${decoration}`}
                                    >
                                      <AccordionButton>
                                        {dayjs(month, 'MM/YYYY').format('MMMM')}
                                      </AccordionButton>
                                    </div>
                                    <AccordionPanel>
                                      <div
                                        className={`pl-12 bg-gray-700 border-r-4 ${border}`}
                                      >
                                        <MonthlyOrders date={month} />
                                      </div>
                                    </AccordionPanel>
                                  </AccordionItem>
                                </>
                              ) : (
                                ''
                              );
                            })}
                          </Accordion>
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayFees;
