//X7AV261251

const mg = require('mailgun-js');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
dayjs.locale('de');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
    host: 'api.eu.mailgun.net',
  });

const sendMailRegister = (to, url, buttonText) => {
  mailgun()
    .messages()
    .send(
      {
        from: `${process.env.MAILGUN_NAME} ${process.env.MAILGUN_EMAIL}`,
        to: to,
        subject: `Herzlich Willkommen bei ${process.env.MAILGUN_NAME}`,
        html: `
        <div style="max-width: 100vw; min-height: 400px; background: #111827; margin:auto; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: #f59e0b;">willkommen bei ${
          process.env.MAILGUN_NAME
        }</h2>
        <p style="text-align: center; color: #fff; margin-top: 25px">Fast geschafft! Klicke einfach auf den Button um deinen Account freizuschalten.</p>
        
        <div style="text-align: center;"><a href=${
          'https://' + url
        } style="background: #f59e0b; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block; border-radius: 4px;">${buttonText}</a></div>
    
        <p style="text-align: center; color: #fff;">Falls der Button nicht funktioniert oder nicht angezeigt wird, kannst du einfach <a href="${
          'https://' + url
        }">hier klicken</a>.</p>
        <p style="text-align: center; color: #fff; font-size: 12px; margin-top: 25px;">Diese E-Mail wurde an ${to} geschickt. Du erhälst diese E-Mail, da du einen Account bei ${
          process.env.MAILGUN_NAME
        } erstellt hast.<p>
        <div style="text-align: center; color: #fff; font-size: 12px; margin-top: 120px; display: block">
        <div>${process.env.MAILGUN_NAME}</div>
        <div>${process.env.MAILGUN_STREET}</div>
        <div>${process.env.MAILGUN_ADDRESS}</div>
        </div>
        </div>
            `,
      },
      (error, body) => {
        if (error) {
        } else {
        }
      }
    );
};
const sendMailForgotPassword = (to, url, buttonText) => {
  mailgun()
    .messages()
    .send(
      {
        from: `${process.env.MAILGUN_NAME} ${process.env.MAILGUN_EMAIL}`,
        to: to,
        subject: `Passwort zurücksetzen`,
        html: `
        <div style="max-width: 100vw; min-height: 400px; background: #111827; margin:auto; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: #f59e0b;">${
          process.env.MAILGUN_NAME
        } Passwort zurücksetzen</h2>
        <p style="text-align: center; color: #fff; margin-top: 25px">Klicke einfach auf den Button um dein Passwort zurückzusetzen.</p>
        
        <div style="text-align: center;"><a href=${
          'https://' + url
        } style="background: #f59e0b; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block; border-radius: 4px;">${buttonText}</a></div>
    
        <p style="text-align: center; color: #fff;">Falls der Button nicht funktioniert oder nicht angezeigt wird, kannst du einfach <a href="${
          'https://' + url
        }">hier klicken</a>.</p>
        <p style="text-align: center; color: #fff; font-size: 12px; margin-top: 25px;">Diese E-Mail wurde an ${to} geschickt. Du erhälst diese E-Mail, da du dein Passwort bei ${
          process.env.MAILGUN_NAME
        } zurücksetzen möchtest.<p>
        <div style="text-align: center; color: #fff; font-size: 12px; margin-top: 120px; display: block">
        <div>${process.env.MAILGUN_NAME}</div>
        <div>${process.env.MAILGUN_STREET}</div>
        <div>${process.env.MAILGUN_ADDRESS}</div>
        </div>
        </div>
            `,
      },
      (error, body) => {
        if (error) {
        } else {
        }
      }
    );
};
const sendMailOrder = (
  to,
  firstName,
  lastName,
  street,
  streetNumber,
  zipCode,
  city,
  cartItems,
  time,
  deliveryMethod,
  paymentID,
  payment,
  carttotal
) => {
  mailgun()
    .messages()
    .send(
      {
        from: `${process.env.MAILGUN_NAME} ${process.env.MAILGUN_EMAIL}`,
        to: to,
        subject: `Bestellbestätigung ${paymentID}`,
        html: `
        <div
  style="
    max-width: 100vw;
    min-height: 400px;
    background: #111827;
    margin: auto;
    padding: 50px 20px;
    font-size: 110%;
  "
>
  <h2 style="text-align: center; text-transform: uppercase; color: #f59e0b">
    Bestellbestätigung ( ${paymentID} )
  </h2>
  <p style="text-align: center; color: #fff; margin-top: 25px">
    Hey ${firstName}, vielen Dank für deine Bestellung bei ${
          process.env.MAILGUN_NAME
        }.
  </p>

  <p style="text-align: center; color: #fff">
    ${
      deliveryMethod === 'abholung'
        ? `Du kannst deine Bestellung
    voraussichtlich um ${dayjs(time).format('HH:mm')} Uhr bei uns abholen.`
        : `Wir werden deine Bestellung voraussichtlich um ${dayjs(time).format(
            'HH:mm'
          )} Uhr zustellen.`
    }
  </p>

  <div style="text-align: center; color: #fff; display: block">
    <div>Deine Bestelldaten:</div>
    <div>${firstName} ${lastName}</div>
    <div>${street} ${streetNumber}</div>
    <div>${zipCode} ${city}</div>
  </div>

  
  <div style="text-align: center; color: #f59e0b"; margin-right: 4px;>
    <div>Summe: ${((carttotal * 100) / 100).toFixed(
      2
    )}€ per ${payment}-Zahlung</div>
  </div>
  
  <h3 style="text-align: center; color: #f59e0b">Bestellte Produkte:</h3>

  <div style="margin-top: 20px;"> 
    ${cartItems.map((item) => {
      return `
    <div style="text-align: center;">
      <div style="color: #fff;">${item.quantity}x ${item.name} ${
        item.variantName
      } ${((item.price * 100) / 100).toFixed(2)}€ ${item.toppings.map(
        (extra) => {
          return `
        <span style="color: #22c55e;">
        ${extra.label}
        </span>
        `;
        }
      )} ${item.removeIng.map((removeIngredient) => {
        return `
        <span style="color: #dc2626;">
        ${removeIngredient.label}
        </span>
        `;
      })}
      </div>
    </div>
    `;
    })}
  </div>
  <p style="text-align: center; color: #52525b; font-size: 12px; margin-top: 25px">
    Diese E-Mail wurde an ${to} geschickt. Du erhälst diese E-Mail, da du eine
    Bestellung bei ${process.env.MAILGUN_NAME} aufgeben hast.
  </p>
  <div
    style="
      text-align: center;
      color: #52525b;
      font-size: 12px;
      margin-top: 20px;
      display: block;
    "
  >
    <div>${process.env.MAILGUN_NAME}</div>
    <div>${process.env.MAILGUN_STREET}</div>
    <div>${process.env.MAILGUN_ADDRESS}</div>
  </div>
</div>
            `,
      },
      (error, body) => {
        if (error) {
          //console.log(error);
        } else {
          //console.log(body);
        }
      }
    );
};

const sendNotification = (
  to,
  firstName,
  lastName,
  street,
  streetNumber,
  zipCode,
  city,
  telefon,
  cartItems,
  time,
  deliveryMethod,
  paymentID,
  payment,
  carttotal,
  message
) => {
  mailgun()
    .messages()
    .send(
      {
        from: `${process.env.MAILGUN_NAME} ${process.env.MAILGUN_EMAIL}`,
        to: to,
        subject: `Neue Bestellung - ${capitalizeFirstLetter(
          deliveryMethod
        )} um ${dayjs(time).format('HH:mm')} Uhr`,
        html: `
        <div
  style="
    max-width: 8cm;
    min-height: 1cm;
    background: #fff;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 200%;
  "
>
<div style="text-align:center;font-weight:bold;font-size:20px;">${
          capitalizeFirstLetter(deliveryMethod) +
          ' ' +
          dayjs(time).format('HH:mm') +
          ' Uhr'
        }</div>

  </div>
  <div style="text-align:left;font-size:16px; font-weight:bold;">${paymentID}</div>
  <div style="text-align:left;font-size:16px; font-weight:bold; margin-top: 10px; ">${
    firstName + ' ' + lastName
  }</div>  
  <div style="text-align:left;font-size:16px; font-weight:bold;">
  ${deliveryMethod === 'lieferung' ? street + ' ' + streetNumber : ''}
  </div>
  <div style="text-align:left;font-size:16px; font-weight:bold;">
  ${deliveryMethod === 'lieferung' ? zipCode + ' ' + city : ''}
  </div>
  <div style="text-align:left;font-size:16px; font-weight:bold; margin-top: 10px; ">${telefon}</div>
  <div style="text-align:left;font-size:18px;font-weight:bold; margin-top: 10px; ">
 <div style="text-align:left;font-size:16px;font-weight:bold;">${
   payment === 'Online' ? 'Online (bezahlt)' : 'Bar'
 }</div>
  SUMME EUR ${((carttotal * 100) / 100).toFixed(2)}</div>
 

  <div style="text-align:left;font-size:16px;font-weight:bold;">-------------------------------------------------------</div>
  <div style="text-align:left;font-size:16px;font-weight:bold; margin-top: 10px; ">



  ${cartItems
    .map((item) => {
      return `
    <div>${item.quantity + 'x ' + item.name + ' ' + item.variantName + ' '} 
${((item.price * 100) / 100).toFixed(2)}
<div style="margin-left: 15px">
${item.toppings.length >= 1 ? 'Extras' : ''}
${item.toppings
  .map((extra) => {
    return `
  <div style="margin-left: 20px">
  + ${extra.label}
  </div>
  `;
  })
  .join('')}
</div>
<div style="margin-left: 15px">
${item.removeIng.length >= 1 ? 'Ohne' : ''}
${item.removeIng
  .map((removeIngredient) => {
    return `
  <div style="margin-left: 20px">
  - ${removeIngredient.label}
  </div>
  `;
  })
  .join('')}
</div>
    </div>`;
    })
    .join('')}
  </div>
  <div style="text-align:left;font-size:16px;font-weight:bold;">${
    message.length > 0
      ? '-------------------------------------------------------'
      : ''
  }</div>
  <div style="text-align:left;font-size:16px; font-weight:bold; margin-top: 10px; ">${
    message.length > 0 ? message : ''
  }</div>
</div>
            `,
      },
      (error, body) => {
        if (error) {
          console.log(error);
        } else {
          console.log(body);
        }
      }
    );
};

module.exports = {
  sendMailRegister,
  sendMailForgotPassword,
  sendMailOrder,
  sendNotification,
};
