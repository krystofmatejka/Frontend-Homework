'use client';

import { useParams } from 'next/navigation';
import { detailPageTranslations } from './translations';

export default function DetailError({ error, reset }: { error: Error; reset: () => void }) {
  const params = useParams();
  const lang = params.lang as string;
  const translation = detailPageTranslations[lang as keyof typeof detailPageTranslations];

  return (
    <div>
      <h1>{translation.error.title}</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="primary-button">{translation.error.tryAgain}</button>
    </div>
  )
}
