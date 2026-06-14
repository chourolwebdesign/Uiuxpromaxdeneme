import { useCallback, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/**
 * Theme controller. Defaults to dark (the brand's native mode), persists the
 * choice, and keeps the <html> class + meta theme-color in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('aurora-theme') as Theme | null;
    const initial: Theme = stored ?? 'dark';
    apply(initial);
    setTheme(initial);
  }, []);

  const apply = (t: Theme) => {
    const root = document.documentElement;
    root.classList.toggle('dark', t === 'dark');
    root.classList.toggle('light', t === 'light');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', t === 'dark' ? '#07070a' : '#f8fafc');
  };

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      apply(next);
      localStorage.setItem('aurora-theme', next);
      return next;
    });
  }, []);

  return { theme, toggle };
}
