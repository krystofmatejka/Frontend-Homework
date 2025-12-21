import Link from 'next/link';
import type { DetailTranslation } from '../translations';

export function ActiveFilter({ listId, isActive, translation }: { listId: string; isActive: boolean; translation: DetailTranslation }) {
  const newIsActive = !isActive;
  return (
    <Link
      href={{
        pathname: `/detail/${listId}`,
        query: !newIsActive ? { isActive: newIsActive.toString() } : {}
      }}
      className="active-filter-link"
    >
      {isActive ? translation.activeFilter.showAll : translation.activeFilter.showActive}
    </Link>
  )
}