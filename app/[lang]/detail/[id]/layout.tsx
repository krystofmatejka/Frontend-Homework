import './detail.css';
import { detailPageTranslations } from './translations';

export default async function DetailLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const translation = detailPageTranslations[lang as keyof typeof detailPageTranslations];

  return (
    <div>
      <h1>{translation.layout.title}</h1>
      {children}
    </div>
  );
}