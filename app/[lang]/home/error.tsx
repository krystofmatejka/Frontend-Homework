'use client';

import { useParams } from 'next/navigation';
import { homePageTranslations } from './translations';

export default function HomeError({ error, reset }: { error: Error; reset: () => void }) {
  const params = useParams();
  const lang = params.lang as string;
  const translation = homePageTranslations[lang as keyof typeof homePageTranslations];

  return (
    <div>
      <h1>{translation.error.title}</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="primary-button">{translation.error.tryAgain}</button>
    </div>
  )
}
