import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className=' flex items-center justify-center min-h-screen bg-gray-700'>
      <div class='px-40 py-20 bg-gray-900 rounded-md shadow-xl'>
        <div class='flex flex-col items-center'>
          <h1 class='font-bold text-yellow-500 text-9xl'>404</h1>

          <h6 class='mb-2 text-2xl font-bold text-center text-gray-100 md:text-3xl mb-12'>
            <span class='text-red-600'>Oops!</span> Seite nicht gefunden
          </h6>
          <Link
            to='/'
            class='px-6 py-2 text-sm font-semibold text-yellow-500 bg-gray-800 rounded'
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
