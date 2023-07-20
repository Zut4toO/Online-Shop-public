import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reload_additives } from '../../../../redux/actions/dishesAction';
import { useSelector, useDispatch } from 'react-redux';
import '../adminStyles/modal.css';

const AddAdditive = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;

  const token = useSelector((state) => state.token);

  const [additives, setAdditives] = useState([]);
  const [callback, setCallback] = useState(false);

  const [additive, setAdditive] = useState('');
  const [additiveNumber, setAdditiveNumber] = useState('');
  const [id, setID] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [additiveId, setAdditiveId] = useState();

  const dispatch = useDispatch();

  const createAdditive = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.patch(
          `/api/additive/${id}`,
          { value: additiveNumber, label: additive },
          {
            headers: { Authorization: token },
          }
        );
        dispatch(reload_additives());
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        const res = await axios.post(
          '/api/additive',
          { value: additiveNumber, label: additive },
          {
            headers: { Authorization: token },
          }
        );
        dispatch(reload_additives());
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      setOnEdit(false);
      setAdditive('');
      setAdditiveNumber('');
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const editAdditive = async (id, value, label) => {
    setID(id);
    setAdditiveNumber(value);
    setAdditive(label);
    setOnEdit(true);
    setTimeout(() => {
      dispatch(reload_additives());
    }, 1000);
  };

  useEffect(() => {
    const getAdditives = async () => {
      const res = await axios.get('/api/additive');
      setAdditives(res.data);
    };

    getAdditives();
  }, [callback]);
  const deleteAdditive = async (id) => {
    try {
      const res = await axios.delete(`/api/additive/${id}`, {
        headers: { Authorization: token },
      });
      toast.info(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(reload_additives());
      setCallback(!callback);
      setAdditive('');
      setAdditiveNumber('');
    } catch (err) {
      toast.success(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const byId = (a, b) => {
    return parseInt(a.additive[0].value) - parseInt(b.additive[0].value);
  };
  return (
    <div>
      <div className='justify-around mx-auto max-w-[400px] m-7 xl:col-span-4 col-span-12'>
        <h2 className={`flex justify-center font-bold text-xl ${text} pb-4`}>
          Zusatzstoffe bearbeiten
        </h2>
        <form onSubmit={createAdditive} className='pb-4'>
          <div className='flex'>
            <input
              className={`h-8 w-8 pl-1 focus:outline-none bg-gray-700 border-b-2 border-r-2 ${border}`}
              type='number'
              min='1'
              step='1'
              name='additiveNumber'
              value={additiveNumber}
              placeholder='#'
              required
              onChange={(e) => setAdditiveNumber(e.target.value)}
            />
            <input
              className={`h-8 w-56 pl-1 focus:outline-none bg-gray-700 border-b-2 ${border}`}
              type='text'
              name='additive'
              value={additive}
              placeholder='Name Zusatzstoff'
              required
              onChange={(e) => setAdditive(e.target.value)}
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
          {additives.sort(byId).map((additive) => (
            <div
              className={`flex justify-between items-center font-bold p-2 mb-2 min-w-56 border-2 ${border}`}
              key={additive._id}
            >
              <div className='flex'>
                <div className='pr-4'>#{additive.additive[0]?.value}</div>
                <div>{additive.additive[0]?.label}</div>
              </div>

              <div className='flex justify-between items-center'>
                <button
                  onClick={() =>
                    editAdditive(
                      additive._id,
                      additive.additive[0]?.value,
                      additive.additive[0]?.label
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
                    setAdditiveId(additive._id);
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
                {showModal && additive._id === additiveId && (
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
                              Inhaltsstoff löschen
                            </h3>
                          </div>
                          <div className='relative p-6 flex-auto bg-gray-600'>
                            <p className='my-4 text-white text-lg leading-relaxed'>
                              Möchtest du diesen Inhaltsstoff wirklich löschen?
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
                                deleteAdditive(additiveId);
                                setShowModal(!showModal);
                              }}
                            >
                              Inhaltsstoff löschen
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

export default AddAdditive;
