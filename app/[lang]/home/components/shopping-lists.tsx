import Link from "next/link";
import { fetchAllLists } from "../actions";
import { ArchiveButton } from "./archive-button";
import type { ShoppingList, User } from "../../../types";
import type { Translation } from "../translations";

function ListTile({ list, me, translation }: { list: ShoppingList; me: User; translation: Translation }) {
  const isOwner = list.owner.id === me.id;
  const activeItemsCount = list.items.filter(item => item.isActive).length;
  const totalItemsCount = list.items.length;

  const body = (
    <>
      <h2 className={`list-tile-title ${list.isArchived ? 'archived' : ''}`}>{list.title}</h2>
      <div className="list-tile-info">
        <span className="list-tile-label">{translation.shoppingLists.activeItems}:</span>
        <span className="list-tile-value">{activeItemsCount}</span>
      </div>
      <div className="list-tile-info">
        <span className="list-tile-label">{translation.shoppingLists.totalItems}:</span>
        <span className="list-tile-value">{totalItemsCount}</span>
      </div>
      <div className="list-tile-owner">
        {translation.shoppingLists.owner}: {list.owner.name}
        {isOwner && <span className="list-tile-owner-badge">{translation.shoppingLists.youBadge}</span>}
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
          <ArchiveButton listId={list.id} isArchived={list.isArchived ?? false} translation={translation} />
        </div>
      )}
    </div>
  );
}

export async function ShoppingLists({ showArchived, failed, me, translation }: { showArchived: boolean; failed: boolean; me: User; translation: Translation }) {
  const lists = await fetchAllLists(showArchived, failed);

  if (lists.length === 0) {
    return <p>{translation.shoppingLists.noLists}</p>;
  }

  return (
    <div className="lists-grid">
      {lists.map((list) => (
        <ListTile key={list.id} list={list} me={me} translation={translation} />
      ))}
    </div>
  );
}
