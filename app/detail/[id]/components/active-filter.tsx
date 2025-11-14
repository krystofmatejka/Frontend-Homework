import Link from 'next/link';

export function ActiveFilter({ listId, isActive }: { listId: string; isActive: boolean }) {
    const newIsActive = !isActive;
    return (
        <Link
            href={{
                pathname: `/detail/${listId}`,
                query: !newIsActive ? { isActive: newIsActive.toString() } : {}
            }}
            className="toggle-active-link"
        >
            {isActive ? 'Show All Items' : 'Show Active Items'}
        </Link>
    )
}