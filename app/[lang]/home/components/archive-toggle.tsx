import Link from 'next/link';

type ArchiveToggleProps = {
  showArchived: boolean;
};

export function ArchiveToggle({ showArchived }: ArchiveToggleProps) {
  return (
    <Link 
      href={showArchived ? '/' : '/?showArchived=true'} 
      className="archive-toggle-button"
    >
      {showArchived ? 'Show Active Only' : 'Show All'}
    </Link>
  );
}
