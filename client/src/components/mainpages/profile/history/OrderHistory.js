import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/accordion';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/de';
import Pagination from '../../../utils/pagination/Pagination';
dayjs.extend(customParseFormat);
dayjs.locale('de');

function OrderHistory() {
  const [history, setHistory] = useState([]);

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;

  const { page } = useParams();

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;

  useEffect(() => {
    const getHistory = async () => {
      const res = await axios.get(`/user/history?pageNumber=${page}`, {
        headers: { Authorization: token },
        userid: user._id,
      });
      setHistory(res.data);
    };
    getHistory();
  }, [token, page]);

  return (
    <div className='h-full history-page w-[100%] pt-2'>
      <div className='bg-gray-800'>
        <Accordion allowToggle>
          {history?.history?.map((items, index) => (
            <AccordionItem>
              <AccordionButton>
                <div
                  className={`flex justify-between border-b ${border} py-2 px-4 w-[100%] font-semibold text-center`}
                >
                  <div className='pt-2'>
                    {dayjs(items.createdAt).format('DD.MM.YYYY')}
                  </div>
                  <div className='flex'>
                    <div className='pt-2 pr-1'>Summe</div>
                    <div className='pt-2 pr-6 text-orange-400'>
                      {((items.carttotal * 100) / 100).toFixed(2)}€
                    </div>
                    <div className={`${bg} rounded-2xl p-2`}>Mehr anzeigen</div>
                  </div>
                </div>
              </AccordionButton>
              <AccordionPanel>
                <div className='bg-gray-800 pb-2 md:flex flex-none'>
                  <div>
                    {items.cartItems.map((item) => {
                      return (
                        <div className='flex pt-2 pl-4 pr-2'>
                          <div className='flex w-full mr-2'>
                            <img
                              src={item.image}
                              alt='dishes.png'
                              className={`rounded w-20 h-20 border ${border}`}
                              onError={(event) =>
                                (event.target.style.display = 'none')
                              }
                            ></img>
                          </div>

                          <div className='pr-2'>
                            <div className='flex'>
                              <div className='pr-2'>{item.quantity}x</div>
                              <div className='pr-1'>{item.name}</div>
                              <div className='flex'>
                                <div>
                                  (
                                  {(Math.round(item.price * 100) / 100).toFixed(
                                    2
                                  )}
                                </div>
                                <div>€)</div>
                              </div>
                            </div>
                            {item.toppings.length > 0 ? (
                              <div>
                                <Accordion allowToggle>
                                  <AccordionItem>
                                    <AccordionButton>
                                      <div className='text-green-500'>
                                        Extras anzeigen
                                      </div>
                                    </AccordionButton>
                                    <AccordionPanel>
                                      <div>
                                        {item.toppings.map((topping) => {
                                          return <div>{topping.label}</div>;
                                        })}
                                      </div>
                                    </AccordionPanel>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            ) : (
                              ''
                            )}
                            {item.removeIng.length > 0 ? (
                              <div>
                                <Accordion allowToggle>
                                  <AccordionItem>
                                    <AccordionButton>
                                      <div className='text-orange-500'>
                                        Abwahl anzeigen
                                      </div>
                                    </AccordionButton>
                                    <AccordionPanel>
                                      <div>
                                        {item.removeIng.map((remove) => {
                                          return <div>{remove.label}</div>;
                                        })}
                                      </div>
                                    </AccordionPanel>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className='pt-2 pr-4 md:mx-0 mx-2'>
                    <div>
                      {items.firstName} {items.lastName}
                    </div>
                    <div>
                      {items.street} {items.streetNumber}
                    </div>

                    <div>
                      {items.zipCode} {items.city}
                    </div>
                    <div>Tel.-Nr. {items.telefon}</div>
                  </div>
                  <div className='pt-2 md:mx-0 mx-2'>
                    <div>E-Mail: {items.email}</div>
                    <div>Bestellnummer: {items.paymentID}</div>
                    {/* 
                    Für PayPal
                    {items.paymentID ? (
                      <div>Zahlungs ID: {items.paymentID}</div>
                    ) : (
                      <div></div>
                    )} */}
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Pagination pages={history?.pages} page={history?.page} />
    </div>
  );
}

export default OrderHistory;
