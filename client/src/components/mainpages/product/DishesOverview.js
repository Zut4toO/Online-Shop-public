import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dishes from './Dishes';
import { getAllDishes } from '../../../redux/actions/dishesAction';
import LoadingLarge from '../../utils/loading/LoadingLarge';
import Error from '../../utils/notification/Error';

const DishesOverview = ({ categoryFilter }) => {
  const dispatch = useDispatch();

  const dishesstate = useSelector((state) => state.getAllDishesReducer);

  const { dishes, error, loading } = dishesstate;

  useEffect(() => {
    dispatch(getAllDishes());
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-12 gap-4'>
        {loading ? (
          <div className='col-span-12'>
            <LoadingLarge />
          </div>
        ) : error ? (
          <div className='col-span-12'>
            <Error error={'Etwas ist schiefgelaufen.'} />
          </div>
        ) : (
          dishes
            .filter((dish) => dish.category === categoryFilter)
            .map((dish) => {
              return (
                <div
                  className='2xl:col-span-4 md:col-span-6 col-span-12'
                  key={
                    dish._id /* To fix error: Each child in a list should ha ve unique "key" prop. */
                  }
                >
                  <div>
                    <Dishes dish={dish} />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default DishesOverview;
