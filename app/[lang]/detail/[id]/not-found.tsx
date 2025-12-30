'use client';

import { useParams } from 'next/navigation';
import { detailPageTranslations } from './translations';

export default function DetailNotFound() {
  const params = useParams();
  const lang = params.lang as string;
  const translation = detailPageTranslations[lang as keyof typeof detailPageTranslations] || detailPageTranslations['en'];

  return (
    <div>
      <h1>{translation.notFound.title}</h1>
      <p>{translation.notFound.message}</p>
    </div>
  );
} 