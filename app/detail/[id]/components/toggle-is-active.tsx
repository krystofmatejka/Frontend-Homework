import Link from 'next/link';

export function ToggleIsActive({ listId, isActive }: { listId: string; isActive: boolean }) {
    const newIsActive = !isActive;
    return (
        <Link href={{
            pathname: `/detail/${listId}`,
            query: { isActive: newIsActive.toString() }
        }}>
            {isActive ? 'Show All Items' : 'Show Active Items'}
        </Link>
    )
}