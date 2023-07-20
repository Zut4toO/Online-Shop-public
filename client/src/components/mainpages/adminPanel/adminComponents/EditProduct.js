import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingMedium from '../../../utils/loading/LoadingMedium';

const initialState = {
  number: '',
  name: '',
  category: '',
  image: '',
};

const initialVariants = [{ label: '', price: '', value: '' }];

const EditProduct = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  const bg = settings[0]?.color[0]?.bgColor;
  const border = settings[0]?.color[0]?.borderColor;
  const code = settings[0]?.color[0]?.code;

  function customThemeAdded(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 5,
      backgroundColor: code,
      colors: {
        ...theme.colors,
        primary25: '#86efac',
        primary: '#6b7280',
      },
    };
  }

  function customThemeRemoved(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 5,
      backgroundColor: code,
      colors: {
        ...theme.colors,
        primary25: '#fca5a5',
        primary: '#6b7280',
      },
    };
  }
  function customThemeAdditive(theme) {
    return {
      ...theme,
      text: '#000',
      borderRadius: 5,
      backgroundColor: code,
      colors: {
        ...theme.colors,
        primary25: '#93c5fd',
        primary: '#93c5fd',
      },
    };
  }

  const { id } = useParams();
  const [callback, setCallback] = useState(false);
  const token = useSelector((state) => state.token);

  const [loading, setLoading] = useState(false);

  const [editProduct, setEditProduct] = useState(initialState);
  const products = useSelector((state) => state.getAllDishesReducer);
  //console.log(products.dishes);
  //console.log(editProduct);

  const [categories, setCategories] = useState([]);
  /* Get Categories */
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/category');
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);

  /* Get Extras */
  useEffect(() => {
    const getExtras = async () => {
      const res = await axios.get('/api/extratopping');
      setExtras(res.data);
    };

    getExtras();
  }, [callback]);

  /* Get Remove Toppings */
  useEffect(() => {
    const getRemove = async () => {
      const res = await axios.get('/api/removetopping');
      setRemove(res.data);
    };

    getRemove();
  }, [callback]);
  /* Get Additives */
  useEffect(() => {
    const getAdditives = async () => {
      const res = await axios.get('/api/additive');
      setAdditives(res.data);
    };

    getAdditives();
  }, [callback]);

  const [variants, setVariants] = useState(initialVariants);
  const [defaultToppings, setDefaultToppings] = useState(null);
  const [defaultRemove, setDefaultRemove] = useState(null);
  const [defaultAdditives, setDefaultAdditives] = useState(null);

  console.log(defaultRemove);

  //console.log(defaultRemove);

  useEffect(() => {
    setVariants(
      editProduct?.variants?.map((variant, value) => ({
        ...variant,
        value,
      })) ?? initialVariants
    );
  }, [editProduct]); // maybe more dependencies

  /* Toppings */

  useEffect(() => {
    setDefaultToppings(
      editProduct?.selectedToppings?.map((topping) => ({
        ...topping,
      }))
    );
  }, [editProduct]);

  /* Removed toppings */

  useEffect(() => {
    setDefaultRemove(
      editProduct?.selectedRemovedToppings?.map((removedTopping) => ({
        ...removedTopping,
      }))
    );
  }, [editProduct]);

  /* Additives */

  useEffect(() => {
    setDefaultAdditives(
      editProduct?.selectedAdditives?.map((additive) => ({
        ...additive,
      }))
    );
  }, [editProduct]);

  const [extras, setExtras] = useState([]);
  const [remove, setRemove] = useState([]);
  const [additives, setAdditives] = useState([]);

  const [selectedToppings, setSelectedToppings] = useState('');
  const [selectedRemovedToppings, setSelectedRemovedToppings] = useState('');
  const [selectedAdditives, setSelectedAdditives] = useState('');

  //console.log(typeof selectedToppings);
  //console.log(selectedToppings === '');
  // console.log(selectedRemovedToppings);
  // console.log(selectedAdditives);

  //console.log('default:' + defaultToppings);
  // console.log(defaultRemove);
  // console.log(defaultAdditives);

  const extraOptions = extras.map((extra) => {
    return extra.extra[0];
  });
  const removeOptions = remove.map((removed) => {
    return removed.removed[0];
  });
  const additiveOptions = additives.map((additive) => {
    return additive.additive[0];
  });

  const formatExtras = ({ label, value }) => (
    <div className='flex font-semibold'>
      <div>{label}</div>
      <div className='pl-2'>{(Math.round(value * 100) / 100).toFixed(2)}€</div>
    </div>
  );
  const formatAdditives = ({ label, value }) => (
    <div className='flex font-semibold'>
      <div className='mr-1'>#{value}</div>
      <div>{label}</div>
    </div>
  );

  const handleVariantsChangeInput = (index, event) => {
    const values = [...variants];
    values[index][event.target.name] = event.target.value;
    setVariants(values);
  };

  const handleAddVariants = () => {
    setVariants([...variants, { label: '', price: '', value: '' }]);
  };
  const handleRemoveVariants = (index) => {
    const values = [...variants];
    values.splice(index, 1);
    values.length > 0
      ? setVariants(values)
      : toast.error('Du kannst keine weitere Variante entfernen', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
  };

  /* Handle Change Input */
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: e.target.name === 'image' ? e.target.files[0] : value,
    });
  };

  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (products.dishes.length !== 0) {
      products.dishes.forEach((product) => {
        if (product._id === id) {
          setEditProduct(product);
        }
      });
    } else {
      setTimeout(() => {
        if (products.dishes.length !== 0) {
          navigate('/products');
        }
      }, 2000);
    }
  }, [products.dishes, id, navigate]);

  console.log(editProduct.image);
  console.log(typeof editProduct.image);
  console.log(typeof editProduct.image == 'string' ? 'ja' : 'nein');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('image', editProduct.image);
      /* formData.append(
        'image',
        typeof editProduct.image != 'string'
          ? JSON.stringify(editProduct.image)
          : null
      ); */
      formData.append('product', JSON.stringify(editProduct));

      formData.append('category', editProduct.category);
      formData.append('variants', JSON.stringify(variants));
      formData.append(
        'selectedToppings',
        selectedToppings === ''
          ? JSON.stringify(defaultToppings)
          : JSON.stringify(selectedToppings)
      );
      formData.append(
        'selectedRemovedToppings',
        selectedRemovedToppings === ''
          ? JSON.stringify(defaultRemove)
          : JSON.stringify(selectedRemovedToppings)
      );
      formData.append(
        'selectedAdditives',
        selectedAdditives === ''
          ? JSON.stringify(defaultAdditives)
          : JSON.stringify(selectedAdditives)
      );
      /* for (var key of formData.entries()) {
        console.log('Form', key[0] + ', ' + key[1]);
      } */

      await axios.patch(`/api/products/${editProduct._id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setSuccess(true);
      setTimeout(() => {
        setCallback(!callback);
        navigate('/products');
      }, 2000);
    } catch (err) {
      setLoading(false);
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const animatedComponents = makeAnimated();

  success &&
    toast.success('Produkt erfolgreich aktualisiert', {
      position: toast.POSITION.BOTTOM_RIGHT,
    }) &&
    setSuccess(false);
  err &&
    toast.info(err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  //console.log(success);

  return (
    <div>
      <div className='min-h-screen bg-gray-700 pt-8 text-white font-medium'>
        <div className='max-w-md mx-auto bg-gray-900 shadow-lg rounded-lg md:max-w-7xl'>
          <div className='md:flex '>
            <div className='w-full p-4 px-4'>
              <div className='bg-gray-800 p-2'>
                <div className=''>
                  <button
                    onClick={() => navigate(-1)}
                    className='flex items-center'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className={`h-5 w-5 ${text}`}
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
                        clip-rule='evenodd'
                      />
                    </svg>
                    <div className={`${text}`}>Zurück</div>
                  </button>

                  <h2
                    className={`flex justify-center font-bold text-2xl ${text} pb-4`}
                  >
                    Produkt anpassen
                  </h2>
                </div>
                <div className='flex justify-center'>
                  {loading ? (
                    <LoadingMedium />
                  ) : (
                    <div className='flex justify-center'>
                      <div>
                        <input
                          className={`h-8 w-12 p-2 focus:outline-none bg-gray-700 border-b-2 border-r-2 ${border}`}
                          type='text'
                          name='number'
                          value={editProduct.number}
                          placeholder='#'
                          required
                          onChange={handleChangeInput}
                        />
                        <input
                          className={`h-8 w-52 p-2 focus:outline-none bg-gray-700 border-b-2 ${border} font-semibold`}
                          type='text'
                          name='name'
                          placeholder='Produktname'
                          value={editProduct.name}
                          onChange={handleChangeInput}
                        ></input>
                        {/* Image */}
                        <label
                          class='block pt-2 text-sm font-medium text-gray-300'
                          for='file_input'
                        >
                          Produktbild ändern
                        </label>
                        <input
                          className={`w-64 focus:outline-none bg-gray-700 border-b-2 ${border} font-semibold text-sm`}
                          type='file'
                          accept='image/gif, image/jpeg, image/png, image/heic, image/heif'
                          name='image'
                          onChange={handleChangeInput}
                        ></input>
                        <p
                          class='mt-1 text-sm text-gray-300'
                          id='file_input_help'
                        >
                          JPG, JPEG, PNG, HEIC, HEIF (max. 15mb)
                        </p>
                        {/* Category */}
                        <label className='block font-bold uppercase mt-2 mb-2'>
                          <div>Kategorie</div>
                          <select
                            className={`${bg} font-bold`}
                            name='category'
                            value={editProduct.category}
                            onChange={handleChangeInput}
                          >
                            <option value=''>Kategorie auswählen</option>
                            {categories.map((category) => (
                              <option
                                name='category'
                                value={editProduct.setCategory}
                                key={category.name}
                                // key={category._id} Alternative
                                className='bg-gray-700 font-semibold'
                              >
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        {/* Variant */}
                        {variants.map((variant, index) => (
                          <div key={index} className=' mb-4'>
                            <div className='hidden'>
                              {(variant.value = index)}
                            </div>
                            <div>
                              <label className='block font-bold uppercase mb-2'>
                                <div className='flex'>
                                  <div className='mr-2'>
                                    Variante {index + 1}
                                  </div>
                                  <div className='flex justify-center items-center'>
                                    <svg
                                      onClick={() => handleAddVariants()}
                                      xmlns='http://www.w3.org/2000/svg'
                                      className='h-5 w-5'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                    >
                                      <path
                                        fill-rule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                                        clip-rule='evenodd'
                                      />
                                    </svg>
                                    <svg
                                      onClick={() =>
                                        handleRemoveVariants(index)
                                      }
                                      xmlns='http://www.w3.org/2000/svg'
                                      className='h-5 w-5'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                    >
                                      <path
                                        fill-rule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z'
                                        clip-rule='evenodd'
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div className='flex'>
                                  <input
                                    className={`mr-4 p-2 h-8 w-36 focus:outline-none bg-gray-700 border-b-2 ${border} font-semibold`}
                                    type='text'
                                    name='label'
                                    placeholder={'Name Variante ' + (index + 1)}
                                    value={variant.label}
                                    onChange={(event) =>
                                      handleVariantsChangeInput(index, event)
                                    }
                                  />

                                  <input
                                    className={`h-8 w-20 p-2 focus:outline-none bg-gray-700 border-b-2 ${border} font-semibold`}
                                    type='number'
                                    step='.01'
                                    min='0'
                                    name='price'
                                    placeholder={'Preis ' + (index + 1)}
                                    value={variant.price}
                                    onChange={(event) =>
                                      handleVariantsChangeInput(index, event)
                                    }
                                  />
                                  <div className='mt-1 relative right-4 font-semibold'>
                                    €
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        ))}
                        <div className='text-gray-900 font-semibold'>
                          <div className='w-64 pb-4'>
                            <Select
                              key={defaultToppings}
                              options={extraOptions}
                              formatOptionLabel={formatExtras}
                              isMulti
                              placeholder='Extras auswählen'
                              defaultValue={defaultToppings}
                              theme={customThemeAdded}
                              onChange={setSelectedToppings}
                              components={animatedComponents}
                              isSearchable={false}
                              isOptionSelected={(option, selectValue) =>
                                selectValue.some((i) => i === option)
                              }
                              noOptionsMessage={() =>
                                'Keine weiteren Extras verfügbar'
                              }
                            />
                          </div>
                          <div className='w-64 pb-4'>
                            {console.log({ defaultRemove, removeOptions })}
                            <Select
                              key={defaultRemove}
                              options={removeOptions}
                              isMulti
                              placeholder='Abwahl auswählen'
                              defaultValue={defaultRemove}
                              theme={customThemeRemoved}
                              onChange={setSelectedRemovedToppings}
                              components={animatedComponents}
                              isSearchable={false}
                              noOptionsMessage={() =>
                                'Keine weiteren Abwahlmöglichkeiten verfügbar'
                              }
                            />
                          </div>
                          <div className='w-64 pb-4'>
                            <Select
                              key={defaultAdditives}
                              options={additiveOptions}
                              isMulti
                              formatOptionLabel={formatAdditives}
                              placeholder='Inhalsstoffe auswählen'
                              defaultValue={defaultAdditives}
                              theme={customThemeAdditive}
                              onChange={setSelectedAdditives}
                              components={animatedComponents}
                              isSearchable={false}
                              noOptionsMessage={() =>
                                'Keine weiteren Zusatzstoffe verfügbar'
                              }
                            />
                          </div>
                        </div>
                        <button
                          onClick={handleSubmit}
                          className={`h-12 w-64 ${bg} ${border} font-bold rounded-md text-white flex flex-wrap mt-6 justify-center pt-3`}
                        >
                          Veränderungen bestätigen
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
