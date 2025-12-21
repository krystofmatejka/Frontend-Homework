'use client';

import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'cs', label: 'Čeština' },
  { code: 'de', label: 'Deutsch' },
];

export function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split('/')[1];

  const switchLanguage = (newLang: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const hasLangInPath = ['en', 'de', 'cs'].includes(pathSegments[0]);
    
    let newPath: string;
    if (hasLangInPath) {
      pathSegments[0] = newLang;
      newPath = '/' + pathSegments.join('/');
    } else {
      newPath = `/${newLang}${pathname}`;
    }
    
    router.push(newPath);
  };

  return (
    <div style={{
      padding: '20px 20px 20px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <label htmlFor="language-select" style={{ fontSize: '14px', fontWeight: '500' }}>
        Language:
      </label>
      <select
        id="language-select"
        value={currentLang}
        onChange={(e) => switchLanguage(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: 'white',
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
