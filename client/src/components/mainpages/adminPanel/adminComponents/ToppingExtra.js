import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reload_extras } from '../../../../redux/actions/dishesAction';
import { useSelector, useDispatch } from 'react-redux';
import '../adminStyles/modal.css';

const ToppingExtra = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;

  const token = useSelector((state) => state.token);

  const [extras, setExtras] = useState([]);
  const [callback, setCallback] = useState(false);

  const [extra, setExtra] = useState('');
  const [extraPrice, setExtraPrice] = useState('');
  const [extraNumber, setExtraNumber] = useState('');
  const [id, setID] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [extraId, setExtraId] = useState();

  const dispatch = useDispatch();

  const createExtra = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.patch(
          `/api/extratopping/${id}`,
          { value: extraPrice, label: extra, number: extraNumber },
          {
            headers: { Authorization: token },
          }
        );
        dispatch(reload_extras());
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        const res = await axios.post(
          '/api/extratopping',
          { value: extraPrice, label: extra, number: extraNumber },
          {
            headers: { Authorization: token },
          }
        );
        dispatch(reload_extras());
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      setOnEdit(false);
      setExtra('');
      setExtraPrice('');
      setExtraNumber('');
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const editExtra = async (id, value, label, number) => {
    console.log(number);
    setID(id);
    setExtraPrice(value);
    setExtra(label);
    setExtraNumber(number);
    setOnEdit(true);
    setTimeout(() => {
      dispatch(reload_extras());
    }, 1000);
  };

  useEffect(() => {
    const getExtras = async () => {
      const res = await axios.get('/api/extratopping');
      setExtras(res.data);
    };

    getExtras();
  }, [callback]);

  const deleteExtra = async (id) => {
    try {
      const res = await axios.delete(`/api/extratopping/${id}`, {
        headers: { Authorization: token },
      });
      toast.info(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(reload_extras());
      setCallback(!callback);
      setExtra('');
      setExtraPrice('');
      setExtraNumber('');
    } catch (err) {
      toast.success(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const byId = (a, b) => {
    return parseInt(a.extraNumber) - parseInt(b.extraNumber);
  };
  return (
    <div>
      <div className='justify-around mx-auto max-w-[400px] m-7 xl:col-span-4 col-span-12'>
        <h2 className={`flex justify-center font-bold text-xl ${text} pb-4`}>
          Extras bearbeiten
        </h2>
        <form onSubmit={createExtra} className='pb-4'>
          <div className='flex'>
            <input
              className={`h-8 w-8 pl-1 focus:outline-none bg-gray-700 border-b-2 border-r-2 ${border}`}
              type='number'
              min='1'
              step='1'
              name='extraNumber'
              value={extraNumber}
              placeholder='#'
              required
              onChange={(e) => setExtraNumber(e.target.value)}
            />
            <input
              className={`h-8 w-40 pl-1 focus:outline-none bg-gray-700 border-b-2 border-r-2 ${border}`}
              type='text'
              name='extra'
              value={extra}
              placeholder='Name des Extras'
              required
              onChange={(e) => setExtra(e.target.value)}
            />
            <input
              className={`h-8 w-12 pl-1 focus:outline-none bg-gray-700 border-b-2 ${border}`}
              type='number'
              min='0.00'
              step='0.01'
              name='extraPrice'
              value={extraPrice}
              placeholder='0.00€'
              required
              onChange={(e) => setExtraPrice(e.target.value)}
            />
            <button
              type='submit'
              className={`h-8 w-24 ${bg} border-b-2 ${border} font-bold rounded-r-md text-white`}
            >
              {onEdit ? 'Anpassen' : 'Hinzufügen'}
            </button>
          </div>
        </form>

        <div className='col'>
          {extras.sort(byId).map((extra) => (
            <div
              className={`flex justify-between items-center font-bold p-2 mb-2 min-w-56 border-2 ${border}`}
            >
              <div className='flex'>
                <div className='pr-3'>#{extra.extraNumber[0]?.value}</div>
                <div className='pr-3'>{extra.extra[0]?.label}</div>
                <div>
                  {(Math.round(extra.extra[0]?.value * 100) / 100).toFixed(2)}€
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <button
                  onClick={() =>
                    editExtra(
                      extra._id,
                      extra.extra[0]?.value,
                      extra.extra[0]?.label,
                      extra.extraNumber[0]?.value
                    )
                  }
                  className={`p-2 min-w-56 bg-yellow-500 rounded-l-md font-bold`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-white'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                    <path
                      fill-rule='evenodd'
                      d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setShowModal(!showModal);
                    setExtraId(extra._id);
                  }}
                  className='p-2 min-w-56 bg-red-500 rounded-r-md font-bold'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    />
                  </svg>
                </button>
                {showModal && extra._id === extraId && (
                  <>
                    <div
                      className='backdrop'
                      onClick={(e) => {
                        if (e.target.className === 'backdrop') {
                          setShowModal(false);
                        }
                      }}
                    >
                      <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                        <div className=' rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                          <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-gray-600'>
                            <h3 className='text-3xl font-semibold text-red-500'>
                              Extra löschen
                            </h3>
                          </div>
                          <div className='relative p-6 flex-auto bg-gray-600'>
                            <p className='my-4 text-white text-lg leading-relaxed'>
                              Möchtest du dieses Extra wirklich löschen?
                            </p>
                          </div>
                          <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b bg-gray-600'>
                            <button
                              className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                              type='button'
                              onClick={() => {
                                setShowModal(!showModal);
                              }}
                            >
                              Abbrechen
                            </button>
                            <button
                              className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                              type='button'
                              onClick={() => {
                                deleteExtra(extraId);
                                setShowModal(!showModal);
                              }}
                            >
                              Extra löschen
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToppingExtra;
