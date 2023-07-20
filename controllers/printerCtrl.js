const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;
const Settings = require('../models/settingsModel');
const PrinterIP = require('../models/printerIPModel');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
dayjs.locale('de');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const printerCtrl = {
  checkPrinterOnline: async (req, res) => {
    const printerip = await PrinterIP.find();
    console.log(printerip);
    let printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: printerip[0]?.ip,
      options: {
        timeout: 5000,
      },
    });
    try {
      let isConnected = await printer.isPrinterConnected();
      res.json(isConnected);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  printOut: async (req, res) => {
    const settings = await Settings.find();
    const printerip = await PrinterIP.find();

    let printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: printerip[0]?.ip,
      characterSet: 'SLOVENIA',
      removeSpecialCharacters: false,
      lineCharacter: '-',
      width: 42,
      options: {
        timeout: 1000,
      },
    });
    const order = req.body.order;

    console.log(req.body.order);
    try {
      if (await printer.isPrinterConnected()) {
        printer.alignCenter();
        printer.bold(true);
        printer.setTextSize(0, 0);
        printer.println(settings[0]?.brand);
        printer.println(settings[0]?.street + ' ' + settings[0]?.streetNumber);
        printer.println(settings[0]?.zipCode + ' ' + settings[0]?.city);
        printer.bold(false);
        printer.newLine();
        printer.alignLeft();
        printer.setTextSize(0, 0);
        printer.println(order?.paymentID);
        printer.println(
          capitalizeFirstLetter(order?.delivery) +
            ' ' +
            dayjs(order?.time).format('HH:mm') +
            ' Uhr'
        );
        printer.newLine();
        printer.println(order?.firstName + ' ' + order?.lastName);
        if (order?.delivery === 'lieferung') {
          printer.println(order?.street + ' ' + order?.streetNumber);
          printer.println(order?.zipCode + ' ' + order?.city);
        }
        printer.println(order?.telefon);
        printer.newLine();
        if (order.payment === 'PayPal') {
          printer.println(order.payment + ' (Bereits bezahlt)');
        } else if (order.payment === 'Bar') {
          printer.println(order.payment);
        }

        printer.drawLine();
        printer.alignRight();
        printer.println('EUR');
        printer.newLine();
        order?.cartItems.map((item) => {
          printer.alignLeft();
          printer.leftRight(
            item.quantity + 'x ' + item.name + ' ' + item.variantName,
            ((item.variant * 100) / 100).toFixed(2)
          );
          if (item.toppings.length >= 1) {
            printer.alignLeft();
            printer.println(' Extras');
            item.toppings.map((extra) => {
              printer.setTextSize(0, 0);
              printer.leftRight(
                '  + ' + extra.label,
                parseInt(extra.value).toFixed(2)
              );
              // printer.println(extra.label);
            });
          }
          if (item.removeIng.length >= 1) {
            printer.alignLeft();
            printer.println(' Ohne');
            item.removeIng.map((removeIngredient) => {
              printer.setTextSize(0, 0);
              printer.alignLeft();
              printer.println('  - ' + removeIngredient.label);
            });
          }
        });
        printer.drawLine();
        printer.newLine();
        printer.alignLeft();
        if (order.message) {
          printer.setTextSize(0, 0);
          printer.println('Kundenhinweis: ' + order.message);
          printer.drawLine();
        }
        if (order.delivery === 'lieferung') {
          printer.setTextSize(0, 1);
          printer.bold(true);
          printer.leftRight(
            'SUMME EUR: ',
            (Math.round(order.carttotal * 100) / 100).toFixed(2)
          );
          printer.bold(false);
          printer.setTextSize(0, 0);
          printer.leftRight(
            'Ware',
            (
              Math.round(
                order.cartItems.reduce((x, item) => x + item.price, 0) * 100
              ) / 100
            ).toFixed(2)
          );
          printer.leftRight(
            '+ Lieferung',
            (
              (Math.round(order.carttotal * 100) / 100).toFixed(2) -
              (
                Math.round(
                  order.cartItems.reduce((x, item) => x + item.price, 0) * 100
                ) / 100
              ).toFixed(2)
            ).toFixed(2)
          );
        } else {
          printer.setTextSize(0, 1);
          printer.bold(true);
          printer.leftRight(
            'Summe EUR: ',
            (Math.round(order.carttotal * 100) / 100).toFixed(2)
          );
          printer.bold(false);
        }

        printer.newLine();
        printer.setTextSize(0, 0);

        printer.leftRight(
          'MwSt.: ',
          ((Math.round(order.carttotal * 100) / 100).toFixed(2) * 0.07).toFixed(
            2
          )
        );
        printer.leftRight(
          'Netto: ',
          (
            (Math.round(order.carttotal * 100) / 100).toFixed(2) -
            (Math.round(order.carttotal * 100) / 100).toFixed(2) * 0.07
          ).toFixed(2)
        );

        printer.cut();
        printer.execute();
      } else {
        return res.status(500).json({ msg: 'Drucker offline' });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = printerCtrl;
