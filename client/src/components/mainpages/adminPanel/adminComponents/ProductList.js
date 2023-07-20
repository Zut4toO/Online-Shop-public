import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDishes } from '../../../../redux/actions/dishesAction';
import LoadingMedium from '../../../utils/loading/LoadingMedium';
import Error from '../../../utils/notification/Error';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../adminStyles/modal.css';

const ProductList = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;

  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState();

  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const dishesstate = useSelector((state) => state.getAllDishesReducer);

  const byId = (a, b) => {
    return parseInt(a.number) - parseInt(b.number);
  };

  // add dishes beside error, result in multiple fetches / second
  const { error } = dishesstate;

  useEffect(() => {
    setLoading(true);
    dispatch(getAllDishes());
    setLoading(false);
  }, [callback]);

  const deleteProduct = async (id) => {
    try {
      setLoading(true);

      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      await deleteProduct;
      toast.success('Produkt erfolgreich entfernt', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setTimeout(() => {
        setCallback(!callback);
        setLoading(false);
      }, 1000);
    } catch (err) {
      toast.info(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className='text-gray-100'>
      <h2 className={`flex justify-center font-bold text-2xl ${text} pb-4`}>
        Produktliste
      </h2>
      <div className='flex justify-center'></div>

      {error && <Error error='Etwas ist schiefgelaufen.' />}
      <div className={`${loading ? 'flex justify-center' : ''}`}>
        {loading ? (
          <LoadingMedium />
        ) : (
          <div className='flex justify-center'>
            <table className='border'>
              <thead className='border'>
                <tr>
                  <th className='border md:px-2'>Name</th>
                  <th className='border md:px-2'>Varianten</th>
                  <th className='border md:px-2'>Kategorie</th>
                  <th className='md:px-2'>
                    <div className='md:hidden'>Edit</div>
                    <div className='md:block hidden'>Bearbeiten</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dishesstate.dishes.sort(byId).map((product) => {
                  return (
                    <tr>
                      <td className='border md:px-2'>{product.name}</td>
                      <td className='border md:px-2'>
                        {product.variants.map((variant) => {
                          //console.log(variant);
                          return <div>{variant.label}</div>;
                        })}
                      </td>
                      <td className='border md:px-2'>{product.category}</td>
                      <td className='items-center border md:px-2'>
                        <div className='md:flex md:justify-center'>
                          <div className='flex justify-center'>
                            <Link
                              to={`/edit_product/${product._id}`}
                              className='p-2 min-w-56 bg-yellow-500  md:rounded-l-md md:rounded-r-none rounded-t-md font-bold'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className={`h-6 w-6 text-white cursor-pointer `}
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
                            </Link>
                          </div>
                          <div className='flex justify-center'>
                            <button
                              onClick={() => {
                                setShowModal(!showModal);
                                setProductId(product._id);
                              }}
                              className='p-2 min-w-56 bg-red-500 md:rounded-r-md md:rounded-l-none rounded-b-md font-bold'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6 text-white cursor-pointer'
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
                            {showModal && product._id === productId && (
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
                                          Produkt löschen
                                        </h3>
                                      </div>
                                      <div className='relative p-6 flex-auto bg-gray-600'>
                                        <p className='my-4 text-white text-lg leading-relaxed'>
                                          Möchtest du dieses Produkt wirklich
                                          löschen?
                                        </p>
                                      </div>
                                      <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b bg-gray-600'>
                                        <button
                                          className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                          type='button'
                                          onClick={() =>
                                            setShowModal(!showModal)
                                          }
                                        >
                                          Abbrechen
                                        </button>
                                        <button
                                          className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                          type='button'
                                          onClick={() =>
                                            deleteProduct(productId)
                                          }
                                        >
                                          Produkt löschen
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
