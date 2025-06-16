import type { Metadata } from 'next';
import AboutPage from '@/components/About';

export const metadata: Metadata = {
  title: 'Yoberty Alejandro - AI Augmented Developer & Tech Lead',
  description: 'Mi journey desde Senior Full Stack hasta liderar equipos en la era de la IA. Donde cada línea de código se potencia con inteligencia artificial.',
};

export default function Page() {
  return <AboutPage />;
}