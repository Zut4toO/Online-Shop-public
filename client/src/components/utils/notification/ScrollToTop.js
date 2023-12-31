// https://www.youtube.com/watch?v=8c5eMyJR9Js
// https://v5.reactrouter.com/web/guides/scroll-restoration

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
