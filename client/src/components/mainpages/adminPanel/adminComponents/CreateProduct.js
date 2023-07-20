import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import LoadingMedium from '../../../utils/loading/LoadingMedium';

const initialState = {
  number: '',
  name: '',
  category: '',
  image: '',
};

const CreateProduct = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const reload = useSelector((state) => state.getAllDishesReducer.reload);
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
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([
    { label: '', price: '', value: '' },
  ]);
  const [extras, setExtras] = useState([]);
  const [remove, setRemove] = useState([]);
  const [additives, setAdditives] = useState([]);

  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedRemovedToppings, setSelectedRemovedToppings] = useState([]);
  const [selectedAdditives, setSelectedAdditives] = useState([]);

  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;
  const { isMasterAdmin } = auth;

  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);

  /* Get Categories */
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/category');
      setCategories(res.data);
    };

    getCategories();
  }, [callback, reload]);

  /* Get Products */
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/api/products');

      setProducts(res.data);

      //setResult(res.data.result);
    };
    getProducts();
  }, [callback, categories]);

  /* Get Extras */
  useEffect(() => {
    const getExtras = async () => {
      const res = await axios.get('/api/extratopping');
      setExtras(res.data);
    };

    getExtras();
  }, [callback, reload]);

  /* Get Remove Toppings */
  useEffect(() => {
    const getRemoveToppings = async () => {
      const res = await axios.get('/api/removetopping');
      setRemove(res.data);
    };

    getRemoveToppings();
  }, [callback, reload]);
  /* Get Additives */
  useEffect(() => {
    const getAdditives = async () => {
      const res = await axios.get('/api/additive');
      setAdditives(res.data);
    };

    getAdditives();
  }, [callback, reload]);

  /* OMGGG */

  const extrasById = (a, b) => {
    return (
      parseInt(a.extraNumber[0]?.value) - parseInt(b.extraNumber[0]?.value)
    );
  };
  const removedById = (a, b) => {
    return parseInt(a.removed[0]?.value) - parseInt(b.removed[0]?.value);
  };
  const additivesById = (a, b) => {
    return parseInt(a.additive[0]?.value) - parseInt(b.additive[0]?.value);
  };

  const extraOptions = extras.sort(extrasById).map((extra) => {
    return extra.extra[0];
  });

  const removeOptions = remove.sort(removedById).map((removed) => {
    return removed.removed[0];
  });
  const additiveOptions = additives.sort(additivesById).map((additive) => {
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

  /* Varianten Array */
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
    setProduct({
      ...product,
      [name]: e.target.name === 'image' ? e.target.files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!isAdmin && !isMasterAdmin)
        return toast.error('Du bist kein Admin', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      //console.log(product);
      let formData = new FormData();
      //console.log(product.image);
      formData.append('image', product.image);
      formData.append('product', JSON.stringify(product));
      formData.append('category', product.category);
      formData.append('variants', JSON.stringify(variants));
      formData.append('selectedToppings', JSON.stringify(selectedToppings));
      formData.append(
        'selectedRemovedToppings',
        JSON.stringify(selectedRemovedToppings)
      );
      formData.append('selectedAdditives', JSON.stringify(selectedAdditives));
      /* for (var key of formData.entries()) {
          console.log(key[0] + ', ' + key[1]);
        } */
      await axios.post('/api/products', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      toast.success('Produkt wurde erstellt', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      setTimeout(() => {
        setCallback(!callback);
        window.location.reload(true);
      }, 2000);
    } catch (err) {
      toast.info(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setLoading(false);
    }
  };

  const animatedComponents = makeAnimated();
  return (
    <div className='text-gray-100'>
      <h2 className={`flex justify-center font-bold text-2xl ${text} pb-4`}>
        Produkt hinzufügen
      </h2>
      <div className='flex justify-center'>
        {loading ? (
          <LoadingMedium />
        ) : (
          <div className='flex justify-center'>
            <form onSubmit={handleSubmit} enctype='multipart/form-data'>
              <input
                className={`h-8 w-12 p-2 focus:outline-none bg-gray-700 border-b-2 border-r-2 ${border}`}
                type='text'
                name='number'
                value={product.number}
                placeholder='#'
                required
                onChange={handleChangeInput}
              />
              <input
                className={`h-8 w-52 p-2 focus:outline-none bg-gray-700 border-b-2 ${border} font-semibold`}
                type='text'
                name='name'
                placeholder='Produktname'
                value={product.name}
                onChange={handleChangeInput}
                required
              ></input>

              <label
                class='block pt-2 text-sm font-medium text-gray-300'
                for='file_input'
              >
                Produktbild hochladen
              </label>
              <input
                className={`w-64 focus:outline-none bg-gray-700 border-b-2 ${border} font-semibold text-sm`}
                type='file'
                accept='image/gif, image/jpeg, image/png, image/heic, image/heif'
                name='image'
                onChange={handleChangeInput}
              ></input>
              <p class='mt-1 text-sm text-gray-300' id='file_input_help'>
                JPG, JPEG, PNG, HEIC, HEIF (max. 15mb)
              </p>

              <label className='block font-bold uppercase mt-2 mb-2'>
                <div>Kategorie</div>
                <select
                  className={`${bg} font-bold`}
                  name='category'
                  value={product.category}
                  onChange={handleChangeInput}
                >
                  <option value=''>Kategorie auswählen</option>
                  {categories.map((category) => (
                    <option
                      name='category'
                      value={product.setCategory}
                      key={category.name}
                      // key={category._id} Alternative
                      className='bg-gray-700 font-semibold'
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              {variants.map((variant, index) => (
                <div key={index} className=' mb-4'>
                  <div className='hidden'>{(variant.value = index)}</div>
                  <div>
                    <label className='block font-bold uppercase mb-2'>
                      <div className='flex'>
                        <div className='mr-2'>Variante {index + 1}</div>
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
                            onClick={() => handleRemoveVariants(index)}
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
                          required
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
                          required
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
              <div className={`text-gray-900 font-semibold`}>
                <div className='w-64 pb-3'>
                  <Select
                    isOptionSelected={(option, selectValue) =>
                      selectValue.some((i) => i === option)
                    }
                    options={extraOptions}
                    formatOptionLabel={formatExtras}
                    isMulti
                    placeholder='Extras auswählen'
                    theme={customThemeAdded}
                    onChange={setSelectedToppings}
                    components={animatedComponents}
                    isSearchable={false}
                  />
                </div>
                <div className='w-64 pb-3'>
                  <Select
                    options={removeOptions}
                    isMulti
                    placeholder='Abwahl auswählen'
                    theme={customThemeRemoved}
                    onChange={setSelectedRemovedToppings}
                    components={animatedComponents}
                    isSearchable={false}
                  />
                </div>
                <div className='w-64 pb-3'>
                  <Select
                    options={additiveOptions}
                    isMulti
                    formatOptionLabel={formatAdditives}
                    placeholder='Inhalsstoffe auswählen'
                    theme={customThemeAdditive}
                    onChange={setSelectedAdditives}
                    components={animatedComponents}
                    isSearchable={false}
                  />
                </div>
              </div>
              <button
                type='submit'
                className={`h-12 w-64 ${bg} ${border} font-bold rounded-md text-white flex flex-wrap mt-6 justify-center pt-3`}
              >
                Hinzufügen
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
