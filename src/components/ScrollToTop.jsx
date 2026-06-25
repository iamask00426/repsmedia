import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset window scroll position to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Immediately jump to top without scrolling delay
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
