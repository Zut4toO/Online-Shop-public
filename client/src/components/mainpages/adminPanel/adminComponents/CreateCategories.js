import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reload_category } from '../../../../redux/actions/dishesAction';
import { useSelector, useDispatch } from 'react-redux';
import '../adminStyles/modal.css';

const CreateCategories = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;

  const token = useSelector((state) => state.token);

  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  const [category, setCategory] = useState('');
  const [categoryNumber, setCategoryNumber] = useState('');
  const [id, setID] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState();

  const dispatch = useDispatch();

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { value: categoryNumber, label: category },
          {
            headers: { Authorization: token },
          }
        );
        dispatch(reload_category());
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        const res = await axios.post(
          '/api/category',
          { value: categoryNumber, label: category },
          {
            headers: { Authorization: token },
          }
        );
        dispatch(reload_category());
        toast.success(res.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      setOnEdit(false);
      setCategory('');
      setCategoryNumber('');
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const editCategory = async (id, value, label) => {
    setID(id);
    setCategoryNumber(value);
    setCategory(label);
    setOnEdit(true);
    setTimeout(() => {
      dispatch(reload_category());
    }, 1000);
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/category');
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      dispatch(reload_category());
      toast.info(res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setCallback(!callback);
      setCategory('');
      setCategoryNumber('');
    } catch (err) {
      toast.error(err.res.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const byId = (a, b) => {
    return parseInt(a.category[0]?.value) - parseInt(b.category[0]?.value);
  };
  return (
    <div className='text-white'>
      {showModal && <div className='backdrop'></div>}
      <div className='justify-around mx-auto max-w-[400px] m-7 xl:col-span-4 col-span-12'>
        <h2 className={`flex justify-center font-bold text-xl ${text} pb-4`}>
          Kategorien bearbeiten
        </h2>
        <form onSubmit={createCategory} className='pb-4'>
          <div className='flex'>
            <input
              className={`h-8 w-8 pl-1 focus:outline-none bg-gray-700 border-b-2 border-r-2 ${border}`}
              type='number'
              min='1'
              step='1'
              name='categoryNumber'
              value={categoryNumber}
              placeholder='#'
              required
              onChange={(e) => setCategoryNumber(e.target.value)}
            />
            <input
              className={`h-8 w-56 pl-2 focus:outline-none bg-gray-700 border-b-2 ${border}`}
              type='text'
              name='category'
              value={category}
              placeholder='Name der Kategorie'
              required
              onChange={(e) => setCategory(e.target.value)}
            />

            <button
              type='submit'
              className={`h-8 w-24 ${bg} font-bold border-b rounded-r-md ${border} text-white`}
            >
              {onEdit ? 'Anpassen' : 'Hinzufügen'}
            </button>
          </div>
        </form>

        <div className='col'>
          {categories.sort(byId).map((category, index) => (
            <div
              className={`flex justify-between items-center font-bold p-2 mb-2 min-w-56 border-2 ${border}`}
              key={category._id}
            >
              <div className='flex'>
                <div className='pr-4'>#{category.category[0]?.value}</div>
                <div>{category.category[0]?.label}</div>
              </div>

              <div className='flex justify-between items-center'>
                <button
                  onClick={() =>
                    editCategory(
                      category._id,
                      category.category[0]?.value,
                      category.category[0]?.label
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
                    setCategoryId(category._id);
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
                {showModal && category._id === categoryId && (
                  <>
                    <div
                      className='backdrop'
                      onClick={(e) => {
                        if (e.target.className === 'backdrop') {
                          setShowModal(false);
                        }
                        console.log(e);
                      }}
                      style={{ background: 'none' }}
                    >
                      <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                        <div className=' rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                          <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-gray-600'>
                            <h3 className='text-3xl font-semibold text-red-500'>
                              Kategorie löschen
                            </h3>
                          </div>
                          <div className='relative p-6 flex-auto bg-gray-600'>
                            <p className='my-4 text-white text-lg leading-relaxed'>
                              Möchtest du diese Kategorie wirklich löschen?
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
                                deleteCategory(categoryId);
                                setShowModal(!showModal);
                              }}
                            >
                              Kategorie löschen
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

export default CreateCategories;
