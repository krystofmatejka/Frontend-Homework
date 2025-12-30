import Link from 'next/link';
import type { Translation } from '../translations';

type ArchiveToggleProps = {
  showArchived: boolean;
  translation: Translation;
};

export function ArchiveToggle({ showArchived, translation }: ArchiveToggleProps) {
  return (
    <Link 
      href={showArchived ? '/' : '/?showArchived=true'} 
      className="archive-toggle-button"
    >
      {showArchived ? translation.archiveToggle.showActive : translation.archiveToggle.showAll}
    </Link>
  );
}
