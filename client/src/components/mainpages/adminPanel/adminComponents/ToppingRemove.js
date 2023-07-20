import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reload_remove } from '../../../../redux/actions/dishesAction';
import { useSelector, useDispatch } from 'react-redux';
import '../adminStyles/modal.css';

const ToppingRemove = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;

  const token = useSelector((state) => state.token);

  const [toppings, setToppings] = useState([]);
  const [callback, setCallback] = useState(false);

  const [topping, setTopping] = useState('');
  const [toppingNumber, setToppingNumber] = useState('');
  const [id, setID] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toppingId, setToppingId] = useState();

  const dispatch = useDispatch();

  const createTopping = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.patch(
          `/api/removetopping/${id}`,
          { value: toppingNumber, label: topping },
          {
            headers: { Authorization: token },
          }
        );
        dispatch(reload_remove());
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        const res = await axios.post(
          '/api/removetopping',
          { value: toppingNumber, label: topping },
          {
            headers: { Authorization: token },
          }
        );
        dispatch(reload_remove());
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      setOnEdit(false);
      setTopping('');
      setToppingNumber('');
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const editTopping = async (id, value, label) => {
    console.log(value);
    setID(id);
    setToppingNumber(value);
    setTopping(label);
    setOnEdit(true);
    setTimeout(() => {
      dispatch(reload_remove());
    }, 1000);
  };

  useEffect(() => {
    const getToppings = async () => {
      const res = await axios.get('/api/removetopping');
      setToppings(res.data);
    };

    getToppings();
  }, [callback]);
  const deleteTopping = async (id) => {
    try {
      const res = await axios.delete(`/api/removetopping/${id}`, {
        headers: { Authorization: token },
      });
      toast.info(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(reload_remove());
      setCallback(!callback);
      setTopping('');
      setToppingNumber('');
    } catch (err) {
      toast.error(err.res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const byId = (a, b) => {
    return parseInt(a.removed[0]?.value) - parseInt(b.removed[0]?.value);
  };
  return (
    <div>
      <div className='justify-around mx-auto max-w-[400px] m-7 xl:col-span-4 col-span-12'>
        <h2 className={`flex justify-center font-bold text-xl ${text} pb-4`}>
          Abwahl bearbeiten
        </h2>
        <form onSubmit={createTopping} className='pb-4'>
          <div className='flex'>
            <input
              className={`h-8 w-8 pl-1 focus:outline-none bg-gray-700 border-b-2 border-r-2 ${border}`}
              type='number'
              min='1'
              step='1'
              name='toppingNumber'
              value={toppingNumber}
              placeholder='#'
              required
              onChange={(e) => setToppingNumber(e.target.value)}
            />
            <input
              className={`h-8 w-56 pl-1 focus:outline-none bg-gray-700 border-b-2 ${border}`}
              type='text'
              name='topping'
              value={topping}
              placeholder='Name Abwahlmöglichkeit'
              required
              onChange={(e) => setTopping(e.target.value)}
            />

            <button
              type='submit'
              className={`h-8 w-24 ${bg} border-b ${border} font-bold rounded-r-md text-white`}
            >
              {onEdit ? 'Anpassen' : 'Hinzufügen'}
            </button>
          </div>
        </form>

        <div className='col'>
          {toppings.sort(byId).map((topping) => (
            <div
              className={`flex justify-between items-center font-bold p-2 mb-2 min-w-56 border-2 ${border}`}
              key={topping._id}
            >
              <div className='flex'>
                <div className='pr-4'>#{topping.removed[0]?.value}</div>
                <div>{topping.removed[0]?.label}</div>
              </div>
              <div className='flex justify-between items-center'>
                <button
                  onClick={() =>
                    editTopping(
                      topping._id,
                      topping.removed[0]?.value,
                      topping.removed[0]?.label
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
                    setToppingId(topping._id);
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
                {showModal && topping._id === toppingId && (
                  <>
                    <div
                      className='backdrop'
                      onClick={(e) => {
                        if (e.target.className === 'backdrop') {
                          setShowModal(false);
                        }
                        console.log(e);
                      }}
                    >
                      <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                        <div className=' rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                          <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-gray-600'>
                            <h3 className='text-3xl font-semibold text-red-500'>
                              Abwahl löschen
                            </h3>
                          </div>
                          <div className='relative p-6 flex-auto bg-gray-600'>
                            <p className='my-4 text-white text-lg leading-relaxed'>
                              Möchtest du diese Abwahl wirklich löschen?
                            </p>
                          </div>
                          <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b bg-gray-600'>
                            <button
                              className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                              type='button'
                              onClick={() => setShowModal(!showModal)}
                            >
                              Abbrechen
                            </button>
                            <button
                              className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                              type='button'
                              onClick={() => {
                                deleteTopping(toppingId);
                                setShowModal(!showModal);
                              }}
                            >
                              Abwahl löschen
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

export default ToppingRemove;
