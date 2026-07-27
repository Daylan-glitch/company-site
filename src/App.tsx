import { useEffect } from 'react';
import { IndexMarkup, indexTitle, indexDescription } from './pages/index';
import { AboutMarkup, aboutTitle, aboutDescription } from './pages/about';
import { ContactMarkup, contactTitle, contactDescription } from './pages/contact';

type PageDefinition = {
  markup: string;
  title: string;
  description: string;
};

const pages: Record<string, PageDefinition> = {
  '/': { markup: IndexMarkup, title: indexTitle, description: indexDescription },
  '/about': { markup: AboutMarkup, title: aboutTitle, description: aboutDescription },
  '/contact': { markup: ContactMarkup, title: contactTitle, description: contactDescription },
};

function normalizedPathname(pathname: string): string {
  if (pathname === '/index.html') return '/';
  if (pathname === '/about.html') return '/about';
  if (pathname === '/contact.html') return '/contact';
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function updateMetadata(page: PageDefinition): void {
  document.title = page.title;
  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.content = page.description;
}

export default function App() {
  const pathname = normalizedPathname(window.location.pathname);
  const page = pages[pathname] ?? pages['/'];

  useEffect(() => {
    updateMetadata(page);
    const script = document.createElement('script');
    script.src = '/script.js';
    script.onload = () => document.dispatchEvent(new Event('DOMContentLoaded'));
    document.body.appendChild(script);
    return () => script.remove();
  }, [page]);

  return <div dangerouslySetInnerHTML={{ __html: page.markup }} />;
}
