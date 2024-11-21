import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export const useScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        const href = target.getAttribute('href') || target.closest('a')?.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('/')) {
          scrollToTop();
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return scrollToTop;
};

const ScrollToTopButton = () => {
  const scrollToTop = useScrollToTop();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-800 dark:bg-gray-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
