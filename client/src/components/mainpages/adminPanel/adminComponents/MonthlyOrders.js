// https://www.npmjs.com/package/react-paypal-button-v2

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'react-toastify/dist/ReactToastify.css';
import LoadingMedium from '../../../utils/loading/LoadingMedium';
import { jsPDF } from 'jspdf';

dayjs.extend(customParseFormat);

const MonthlyFee = ({ date }) => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;

  /* Fees */
  const [loaded, setLoaded] = useState(false);

  const token = useSelector((state) => state.token);
  useEffect(() => {
    const getHistory = async () => {
      const res = await axios.get('/api/calculatefee', {
        headers: { Authorization: token },
      });
      setHistory(res.data);
      setLoading(false);
    };
    getHistory();
  }, [token, setHistory]);

  const final = history.find(({ monthYear }) => monthYear === date)?.total;
  const finalObj = history.find(({ monthYear }) => monthYear === date);
  const id = finalObj?._id;

  const pdfGenerator = async () => {
    setLoading(true);

    // HIER ALLE MONATLICHEN BESTELLUNGEN LADEN

    const getHistory = async () => {
      let monthYearStart = new Date(dayjs(date, 'MM/YYYY').format('YYYY,MM'));
      let monthYearEnd = new Date(monthYearStart);

      monthYearEnd.setMonth(monthYearEnd.getMonth() + 1);
      monthYearEnd.setDate(monthYearEnd.getDate() - 1);

      const res = await axios.get('/api/monthlypayment', {
        params: {
          monthYearStart: monthYearStart.toISOString(),
          monthYearEnd: monthYearEnd.toISOString(),
        },
        headers: { Authorization: token },
      });
      const pdfhistory = res.data;

      console.log(pdfhistory);

      const doc = new jsPDF();

      doc.setFontSize(40);
      doc.setFont('helvetica', 'bold');
      //doc.setTextColor(63, 63, 70);
      doc.text('BESTELLÜBERSICHT', 10, 20);
      doc.addImage('/images/HeisenBergLogo.png', 'png', 162, 5, 24, 24);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text('Heisenberg Onlineshops, ', 150, 40);
      doc.text('Inhaber Julien Chmelnik', 150, 45);
      doc.text('Auf dem Brink 11', 150, 50);
      doc.text('31737 Rinteln', 150, 55);
      doc.text('Tel.: 0174 9171817', 150, 65);
      doc.text('E-Mail: info@hsnbg.de', 150, 70);

      doc.text('Automatisch generiert', 150, 80);
      doc.text(dayjs().format('DD.MMMM.YYYY'), 150, 85);

      doc.setFontSize(8);
      doc.text(
        'Heisenberg Onlineshops - Auf dem Brink 11 - 31737 Rinteln  ',
        10,
        40
      );
      doc.line(10, 41, 85, 41);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(settings[0]?.brand, 10, 48);
      doc.text(settings[0]?.street + ' ' + settings[0]?.streetNumber, 10, 53);
      doc.text(settings[0]?.city + ' ' + settings[0]?.zipCode, 10, 58);

      doc.setFont('helvetica', 'bold');
      doc.text(
        'Bestellübersicht' + ' ' + dayjs(date, 'MM/YYYY').format('MMMM YYYY'),
        10,
        90
      );
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Monatsumsatz', 10, 100);
      doc.text(
        String((Math.round(final * 100) / 100).toFixed(2)) + '€',
        70,
        100
      );

      doc.text('Monatsumsatz (abzgl. 7% MwSt.)', 10, 105);
      doc.text(
        String((Math.round((final * 100) / 100) * 0.93).toFixed(2)) + '€',
        70,
        105
      );

      doc.setFont('helvetica', 'bold');
      doc.text(
        'Bestllübersicht für' +
          ' ' +
          dayjs(date, 'MM/YYYY').format('MMMM YYYY'),
        10,
        125
      );

      //Datum Kunde Bestellnummer carttoal(brutto) carttotal(netto)

      doc.setFontSize(10);

      doc.text('Datum', 10, 135);
      doc.text('Kunde', 35, 135);
      doc.text('Bestellnummer', 72, 135);
      doc.text('Betrag', 105, 135);
      doc.text('Netto (abzgl. 7% MwSt.)', 125, 135);
      doc.text('Status', 170, 135);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      //console.log(1 + Math.floor((pdfhistory.length * 5) / 290));

      let amountOfPages = 1 + Math.floor((pdfhistory.length * 5) / 290);
      let counter = 2;
      let pageCounter = 1;
      //console.log(amountOfPages);

      pdfhistory.map((order, index) => {
        if (amountOfPages === 1 + Math.floor((pdfhistory.length * 5) / 290)) {
          doc.text(
            dayjs(order.time).format('DD.MM.YYYY'),
            10,
            (index + 28) * 5
          );
          doc.text(
            order.firstName + ' ' + order.lastName,
            35,
            (index + 28) * 5
          );
          doc.text(order.paymentID || '', 72, (index + 28) * 5);
          doc.text(
            String(order.carttotal.toFixed(2)) + '€',
            105,
            (index + 28) * 5
          );
          doc.text(
            String((order.carttotal * 0.93).toFixed(2)) + '€',
            125,
            (index + 28) * 5
          );
          doc.text(
            String(order.cancelation ? 'Storniert' : ''),
            170,
            (index + 28) * 5
          );
          if ((index + 28) * 5 >= 290) {
            doc.text(
              'Seite ' +
                pageCounter +
                '/' +
                (1 + Math.floor((pdfhistory.length * 5) / 290)),
              190,
              295
            );
            amountOfPages = amountOfPages - 1;
            pageCounter = pageCounter + 1;
            doc.addPage();
          }
        }
        if (
          amountOfPages >= 1 &&
          amountOfPages < 1 + Math.floor((pdfhistory.length * 5) / 290)
        ) {
          doc.text(dayjs(order.time).format('DD.MM.YYYY'), 10, counter * 5);
          doc.text(order.firstName + ' ' + order.lastName, 35, counter * 5);
          doc.text(order.paymentID, 72, counter * 5);
          doc.text(String(order.carttotal.toFixed(2)) + '€', 105, counter * 5);
          doc.text(
            String((order.carttotal * 0.93).toFixed(2)) + '€',
            125,
            counter * 5
          );
          doc.text(
            String(order.cancelation ? 'Storniert' : 'Abgeschlossen'),
            170,
            counter * 5
          );

          counter = counter + 1;
          if (counter > 58) {
            doc.text(
              'Seite ' +
                pageCounter +
                '/' +
                (1 + Math.floor((pdfhistory.length * 5) / 290)),
              190,
              295
            );
            amountOfPages = amountOfPages - 1;
            pageCounter = pageCounter + 1;
            counter = 2;
            doc.addPage();
            if (amountOfPages === 1) {
              doc.text(
                'Seite ' +
                  pageCounter +
                  '/' +
                  (1 + Math.floor((pdfhistory.length * 5) / 290)),
                190,
                295
              );
            }
          }
        }
      });

      doc.save(
        'Bestellübersicht ' + dayjs(date, 'MM/YYYY').format('MMMM YYYY')
      );
    };

    await getHistory();
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div className='ml-10'>
          <LoadingMedium />
        </div>
      ) : (
        <div>
          <div className='flex justify-content' onClick={pdfGenerator}>
            <div className={`font-semibold mr-1`}>Bestellübersicht</div>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={`${text} w-6 h-6`}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
              />
            </svg>
          </div>
          <div className='flex justify-between w-72'>
            <div className='pr-2 font-bold'>Monatsumsatz:</div>
            <div className='font-semibold flex justify-end'>
              {(Math.round(final * 100) / 100).toFixed(2)}€
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyFee;
