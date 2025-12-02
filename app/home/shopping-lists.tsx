import Link from "next/link";
import { fetchAllLists } from "./actions";
import { me } from "../types";
import type { ShoppingList } from "../types";
import { ArchiveButton } from "./components/archive-button";

function ListTile({ list }: { list: ShoppingList }) {
  const isOwner = list.owner.id === me.id;
  const activeItemsCount = list.items.filter(item => item.isActive).length;
  const totalItemsCount = list.items.length;

  const body = (
    <>
      <h2 className={`list-tile-title ${list.isArchived ? 'archived' : ''}`}>{list.title}</h2>
      <div className="list-tile-info">
        <span className="list-tile-label">Active items:</span>
        <span className="list-tile-value">{activeItemsCount}</span>
      </div>
      <div className="list-tile-info">
        <span className="list-tile-label">Total items:</span>
        <span className="list-tile-value">{totalItemsCount}</span>
      </div>
      <div className="list-tile-owner">
        Owner: {list.owner.name}
        {isOwner && <span className="list-tile-owner-badge">You</span>}
      </div>
    </>
  )

  return (
    <div className="list-tile">
      {list.isArchived ? (body) : (
        <Link href={`/detail/${list.id}`} className="list-tile-link">
          {body}
        </Link>
      )}
      {isOwner && (
        <div className="list-tile-actions">
          <ArchiveButton listId={list.id} isArchived={list.isArchived ?? false} />
        </div>
      )}
    </div>
  );
}

export async function ShoppingLists({ showArchived, failed }: { showArchived: boolean; failed: boolean }) {
  const lists = await fetchAllLists(showArchived, failed);

  if (lists.length === 0) {
    return <p>No shopping lists available.</p>;
  }

  return (
    <div className="lists-grid">
      {lists.map((list) => (
        <ListTile key={list.id} list={list} />
      ))}
    </div>
  );
}
