import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingMedium from '../../../utils/loading/LoadingMedium';
import '../adminStyles/modal.css';

const initialState = {
  image: '',
};

const CreateGalery = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;

  const token = useSelector((state) => state.token);

  const [loading, setLoading] = useState(false);

  const [galeries, setGaleries] = useState([]);
  const [callback, setCallback] = useState(false);
  const [galeryImage, setGaleryImage] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [galeryId, setGaleryId] = useState();

  const [galery, setGalery] = useState('');
  const [id, setID] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setGaleryImage({
      ...galeryImage,
      [name]: e.target.name === 'image' ? e.target.files[0] : value,
    });
  };

  const createGalery = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let formData = new FormData();
      //console.log(galeryImage.image);
      formData.append('image', galeryImage.image);
      const res = await axios.post('/api/galery', formData, {
        'content-type': 'multipart/form-data',
        headers: { Authorization: token },
      });
      toast.success(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setGalery('');
      setTimeout(() => {
        setCallback(!callback);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    const getGaleries = async () => {
      setLoading(true);
      const res = await axios.get('/api/galery');
      setGaleries(res.data);
      setLoading(false);
    };

    getGaleries();
  }, [callback]);
  const deleteGalery = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/galery/${id}`, {
        headers: { Authorization: token },
      });
      toast.info(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setTimeout(() => {
        setCallback(!callback);
        setLoading(false);
      }, 500);
    } catch (err) {
      setLoading(false);
      toast.error(err.res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  return (
    <div className='pb-4 flex justify-center'>
      <div className='text-white'>
        <div className='justify-around mx-auto max-w-[400px] m-7 xl:col-span-4 col-span-12'>
          <h2 className={`flex justify-center font-bold text-xl ${text} pb-4`}>
            Galerie bearbeiten
          </h2>
          <form onSubmit={createGalery} className='pb-4'>
            <input
              className={`w-64 focus:outline-none bg-gray-700 border-b-2 ${border} text-sm`}
              type='file'
              accept='image/gif, image/jpeg, image/png, image/heic, image/heif'
              name='image'
              required
              onChange={handleChange}
            />

            <button
              type='submit'
              className={`w-24 ${bg} font-bold border-b-4 rounded-r-md ${border} text-white`}
            >
              Hinzufügen
            </button>
          </form>
          <div className='flex justify-center'>
            {loading ? (
              <LoadingMedium />
            ) : (
              <div className='col'>
                {galeries.map((galery) => (
                  <div
                    className={`flex justify-between items-center font-bold p-2 mb-2 w-[352px] border-2 ${border}`}
                    key={galery._id}
                  >
                    <div className='pr-2 truncate'>
                      <img
                        src={galery.image}
                        alt='Galerie'
                        className=' w-24 h-15'
                      />
                    </div>
                    <div className='flex justify-between items-center'>
                      <button
                        onClick={() => {
                          setShowModal(!showModal);
                          setGaleryId(galery._id);
                        }}
                        className='p-2 min-w-56 bg-red-500 rounded-md font-bold'
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
                      {showModal && galery._id === galeryId && (
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
                                    Bild löschen
                                  </h3>
                                </div>
                                <div className='relative p-6 flex-auto bg-gray-600'>
                                  <p className='my-4 text-white text-lg leading-relaxed'>
                                    Möchtest du dieses Bild wirklich löschen?
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
                                      deleteGalery(galeryId);
                                      setShowModal(!showModal);
                                    }}
                                  >
                                    Bild löschen
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGalery;
