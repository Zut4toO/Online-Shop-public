import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const hoverText = settings[0]?.color[0]?.hoverText;
  const border = settings[0]?.color[0]?.borderColor;

  return (
    <div
      className={`bg-gray-800 py-4 border-t ${border} md:text-left text-center object-center`}
    >
      <div className='md:flex justify-center text-white'>
        <div className='mx-10 text-center'>
          <div className={`py-1 text-md font-bold ${text}`}>Öffnungszeiten</div>
          <div className='flex justify-between w-72'>
            <div>Montag</div>
            {settings[0]?.isClosedMonday.value === true ? (
              <div>Ruhetag</div>
            ) : (
              <div>
                {settings[0]?.endPauseMonday ===
                settings[0]?.startPauseMonday ? (
                  <div className='flex'>
                    <div>{settings[0]?.openMonday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeMonday}</div>
                  </div>
                ) : (
                  <div className='flex'>
                    <div>{settings[0]?.openMonday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.startPauseMonday}</div>
                    <div className='px-1'>{' & '}</div>
                    <div>{settings[0]?.endPauseMonday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeMonday}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex justify-between w-72'>
            <div>Dienstag</div>
            {settings[0]?.isClosedTuesday.value === true ? (
              <div>Ruhetag</div>
            ) : (
              <div>
                {settings[0]?.endPauseTuesday ===
                settings[0]?.startPauseTuesday ? (
                  <div className='flex'>
                    <div>{settings[0]?.openTuesday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeTuesday}</div>
                  </div>
                ) : (
                  <div className='flex'>
                    <div>{settings[0]?.openTuesday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.startPauseTuesday}</div>
                    <div className='px-1'>{' & '}</div>
                    <div>{settings[0]?.endPauseTuesday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeTuesday}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex justify-between w-72'>
            <div>Mittwoch</div>
            {settings[0]?.isClosedWednesday.value === true ? (
              <div>Ruhetag</div>
            ) : (
              <div>
                {settings[0]?.endPauseWednesday ===
                settings[0]?.startPauseWednesday ? (
                  <div className='flex'>
                    <div>{settings[0]?.openWednesday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeWednesday}</div>
                  </div>
                ) : (
                  <div className='flex'>
                    <div>{settings[0]?.openWednesday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.startPauseWednesday}</div>
                    <div className='px-1'>{' & '}</div>
                    <div>{settings[0]?.endPauseWednesday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeWednesday}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex justify-between w-72'>
            <div>Donnerstag</div>
            {settings[0]?.isClosedThursday.value === true ? (
              <div>Ruhetag</div>
            ) : (
              <div>
                {settings[0]?.endPauseThursday ===
                settings[0]?.startPauseThursday ? (
                  <div className='flex'>
                    <div>{settings[0]?.openThursday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeThursday}</div>
                  </div>
                ) : (
                  <div className='flex'>
                    <div>{settings[0]?.openThursday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.startPauseThursday}</div>
                    <div className='px-1'>{' & '}</div>
                    <div>{settings[0]?.endPauseThursday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeThursday}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex justify-between w-72'>
            <div>Freitag</div>
            {settings[0]?.isClosedFriday.value === true ? (
              <div>Ruhetag</div>
            ) : (
              <div>
                {settings[0]?.endPauseFriday ===
                settings[0]?.startPauseFriday ? (
                  <div className='flex'>
                    <div>{settings[0]?.openFriday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeFriday}</div>
                  </div>
                ) : (
                  <div className='flex'>
                    <div>{settings[0]?.openFriday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.startPauseFriday}</div>
                    <div className='px-1'>{' & '}</div>
                    <div>{settings[0]?.endPauseFriday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeFriday}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex justify-between w-72'>
            <div>Samstag</div>
            {settings[0]?.isClosedSaturday.value === true ? (
              <div>Ruhetag</div>
            ) : (
              <div>
                {settings[0]?.endPauseSaturday ===
                settings[0]?.startPauseSaturday ? (
                  <div className='flex'>
                    <div>{settings[0]?.openSaturday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeSaturday}</div>
                  </div>
                ) : (
                  <div className='flex'>
                    <div>{settings[0]?.openSaturday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.startPauseSaturday}</div>
                    <div className='px-1'>{' & '}</div>
                    <div>{settings[0]?.endPauseSaturday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeSaturday}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex justify-between w-72'>
            <div>Sonntag</div>
            {settings[0]?.isClosedSunday.value === true ? (
              <div>Ruhetag</div>
            ) : (
              <div>
                {settings[0]?.endPauseSunday ===
                settings[0]?.startPauseSunday ? (
                  <div className='flex'>
                    <div>{settings[0]?.openSunday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeSunday}</div>
                  </div>
                ) : (
                  <div className='flex'>
                    <div>{settings[0]?.openSunday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.startPauseSunday}</div>
                    <div className='px-1'>{' & '}</div>
                    <div>{settings[0]?.endPauseSunday}</div>
                    <div>{' - '}</div>
                    <div>{settings[0]?.closeSunday}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='mx-10'>
          <div className={`py-1 text-md font-bold ${text}`}>
            {settings[0]?.brand}
          </div>
          <div className={`text-semibold ${hoverText}`}>
            <Link to='/imprint'>Impressum</Link>
          </div>
          <div className={`text-semibold ${hoverText}`}>
            <Link to='/agb'>AGB</Link>
          </div>
          <div className={`text-semibold ${hoverText}`}>
            <Link to='/privacy'>Datenschutzerklärung</Link>
          </div>
          <div className={`text-semibold ${hoverText}`}>
            <Link to='/cookies'>Hinweise Cookies</Link>
          </div>
        </div>
        <div className='mx-10'>
          <div className={`py-1 text-md font-bold ${text}`}>
            Zahlungsmethoden
          </div>
          {settings[0]?.payments[0]?.value === 'bargeld' ? (
            <div>
              <img
                src='/images/bargeld.png'
                alt='bargeld.png'
                className='w-14 mx-auto'
              />
            </div>
          ) : (
            ''
          )}

          {settings[0]?.payments[0]?.value === 'paypal' &&
          settings[0]?.merchantID.length > 1 ? (
            <div>
              <img
                src='/images/paypal.png'
                alt='paypal.png'
                className='w-14 mx-auto'
              />
              <img
                src='/images/sofort.png'
                alt='sofort.png'
                className='w-14 mx-auto'
              />
              <img
                src='/images/giropay.png'
                alt='giropay.png'
                className='w-14 mx-auto'
              />
            </div>
          ) : (
            ''
          )}
          {settings[0]?.payments[1]?.value === 'bargeld' ? (
            <div>
              <img
                src='/images/bargeld.png'
                alt='bargeld.png'
                className='w-14 mx-auto'
              />
            </div>
          ) : (
            ''
          )}
          {settings[0]?.payments[1]?.value === 'paypal' &&
          settings[0]?.merchantID.length > 1 ? (
            <div>
              <img
                src='/images/paypal.png'
                alt='paypal.png'
                className='w-14 mx-auto'
              />
              <img
                src='/images/sofort.png'
                alt='sofort.png'
                className='w-14 mx-auto'
              />
              <img
                src='/images/giropay.png'
                alt='giropay.png'
                className='w-14 mx-auto'
              />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className='mx-10'>
          <div>
            {settings[0]?.facebook === undefined ||
            settings[0]?.facebook === '' ? (
              settings[0]?.instagram === undefined ||
              settings[0]?.instagram === '' ? (
                ''
              ) : (
                <div className={`py-1 text-md font-bold ${text}`}>
                  Folge uns hier:
                </div>
              )
            ) : (
              <div className={`py-1 text-md font-bold ${text}`}>
                Folge uns hier:
              </div>
            )}
            {settings[0]?.facebook === undefined ||
            settings[0]?.facebook === '' ? (
              ''
            ) : (
              <div>
                <a target='_blank' href={`${settings[0]?.facebook}`}>
                  <img
                    src='/images/facebook.png'
                    alt='facebook.png'
                    className='w-14 mx-auto'
                  />
                </a>
              </div>
            )}
            {settings[0]?.instagram === undefined ||
            settings[0]?.instagram === '' ? (
              ''
            ) : (
              <div>
                <a target='_blank' href={`${settings[0]?.instagram}`}>
                  <img
                    src='/images/instagram.png'
                    alt='instagram.png'
                    className='w-14 mx-auto'
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
