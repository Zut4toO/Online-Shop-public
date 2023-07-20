import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
  const { page, pages, keyword = '' } = props;

  let minPageLimit;
  let maxPageLimit;
  minPageLimit =
    pages - page === 3
      ? page - 4
      : pages - page === 2
      ? page - 5
      : pages - page === 1
      ? page - 6
      : pages - page === 0
      ? page - 7
      : page - 3;
  maxPageLimit = page === 1 ? page + 4 : page + 3;

  return (
    pages > 1 && (
      <nav className='mt-8 flex justify-center'>
        <ul className='flex justify-content border rounded'>
          {page <= 1 ? (
            <div></div>
          ) : (
            <Link
              className='
            px-4'
              to={
                keyword
                  ? `search/${keyword}/page/${page - 1}`
                  : `page/${page - 1}`
              }
            >
              Zurück
            </Link>
          )}

          {[...Array(pages).keys()].map((x) =>
            x <= maxPageLimit && x > minPageLimit ? (
              <Link
                className={`${
                  x + 1 === page
                    ? 'border-x px-2 bg-yellow-500'
                    : 'px-2 bg-gray-800'
                } `}
                to={
                  keyword ? `search/${keyword}/page/${x + 1}` : `page/${x + 1}`
                }
              >
                <li key={x + 1}></li>
                {x + 1}
              </Link>
            ) : (
              <div></div>
            )
          )}
          {page >= pages ? (
            <div></div>
          ) : (
            <Link
              className='
            px-4'
              to={
                keyword
                  ? `search/${keyword}/page/${page + 1}`
                  : `page/${page + 1}`
              }
            >
              Weiter
            </Link>
          )}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
