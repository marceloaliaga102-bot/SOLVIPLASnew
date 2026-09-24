import { useEffect } from 'react';

/**
 * Global bidirectional scroll reveal observer.
 * Automatically watches all elements with the class `.scroll-fade-item`.
 * - When an element enters the viewport, it adds `.is-visible` (fades in upward smoothly).
 * - When an element leaves the viewport, it removes `.is-visible` (fades out smoothly).
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const observeElements = () => {
      const items = document.querySelectorAll('.scroll-fade-item');
      items.forEach((item) => observer.observe(item));
    };

    // Initial observation
    observeElements();

    // Re-observe if DOM mutations happen (e.g., section switching, dynamic items)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
