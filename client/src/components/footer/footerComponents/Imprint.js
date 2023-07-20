import React from 'react';
import { useSelector } from 'react-redux';

const Imprint = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  return (
    <div className='min-h-screen bg-gray-700 py-8 select-none'>
      <div class='max-w-md mx-auto rounded-lg md:max-w-5xl'>
        <div class='md:flex '>
          <div class='w-full'>
            <div className=' bg-gray-800 p-6 rounded shadow-2xl '>
              <h2 class={`text-3xl font-bold mb-8 ${text} text-center`}>
                Impressum
              </h2>
              <div className='text-white font-semibold pl-4 pt-4'>
                <div>{settings[0]?.companyname}</div>
                <div className='flex'>
                  <div className='pr-1'>{settings[0]?.street}</div>
                  <div>{settings[0]?.streetNumber}</div>
                </div>
                <div className='flex'>
                  <div className='pr-1'>{settings[0]?.zipCode}</div>
                  <div>{settings[0]?.city}</div>
                </div>
                <div className='pt-4'>Kontakt:</div>
                <div>{settings[0]?.telefon}</div>
                <div>{settings[0]?.email}</div>
                <div className='pt-4'>Ust. ID: {settings[0]?.ustid}</div>
                <div>Geschäftsführer / Inhaber: {settings[0]?.ceo}</div>
                {settings[0]?.authority.length >= 1 ? (
                  <div>Aufsichtsbehörde: {settings[0]?.authority}</div>
                ) : (
                  <div></div>
                )}
                <div className='pt-8 font-normal'>
                  <div className='font-medium'>
                    Realisierung / Hosting / Administration
                  </div>
                  <div>Heisenberg Onlineshops, Inhaber Julien Chmelnik</div>
                  <div>Auf dem Brink 11</div>
                  <div>31737 Rinteln</div>
                </div>
                <div className='font-medium pt-8'>
                  Hinweis nach Verbraucherstreitbeilegungsgesetz
                </div>
                <div className='font-normal'>
                  Wir sind grundsätzlich nicht bereit und nicht verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                  Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO Die
                  Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit, die Sie unter
                  https://ec.europa.eu/consumers/odr/ finden.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imprint;
