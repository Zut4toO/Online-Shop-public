import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/Navbar';
import Pages from './components/mainpages/Pages';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/utils/notification/ScrollToTop';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialOptions = {
  'client-id': 'test',
  currency: 'EUR',
  intent: 'capture',
  'enable-funding': ['sofort', 'giropay'],
  'disable-funding': ['card', 'sepa'],
  components: 'buttons',
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Pages />
      <Footer />
      <ToastContainer
        transition={Flip}
        draggable={true}
        autoClose={5000}
        theme={'colored'}
      />
      <CookieConsent
        location='bottom'
        buttonText='Akzeptieren'
        enableDeclineButton={true}
        declineButtonText='Ablehnen'
        expires={365}
        style={{ background: '#1f2937' }}
        buttonStyle={{
          color: '#fff',
          background: 'orange',
          fontSize: '16px',
          fontWeight: '700',
          borderRadius: '25px',
        }}
        declineButtonStyle={{
          color: '#fff',
          background: '#c12a2a',
          fontSize: '16px',
          fontWeight: '700',
          borderRadius: '25px',
        }}
      >
        <div className='xl:flex font-semibold justify-center'>
          <div className='pr-1'>
            Wir verwenden Cookies um Ihnen die bestmöglich Nutzererfahrung zu
            bieten. Wenn Sie ausschließlich funktionale Cookies nutzen möchten,
            klicken Sie einfach auf ablehnen.
          </div>
          <Link to='/cookies' className='text-yellow-500'>
            Weitere Informationen hier.
          </Link>
        </div>
      </CookieConsent>
    </Router>
  );
}

export default App;
