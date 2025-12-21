'use client';

import { toggleArchiveAction } from "../actions";

type ArchiveButtonProps = {
  listId: string;
  isArchived: boolean;
};

export function ArchiveButton({ listId, isArchived }: ArchiveButtonProps) {
  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleArchiveAction(listId);
  };

  return (
    <button
      onClick={handleToggle}
      className="archive-list-button"
      title={isArchived ? "Unarchive list" : "Archive list"}
    >
      {isArchived ? "Unarchive" : "Archive"}
    </button>
  );
}
