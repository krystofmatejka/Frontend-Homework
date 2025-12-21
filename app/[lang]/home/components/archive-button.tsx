'use client';

import { toggleArchiveAction } from "../actions";
import type { Translation } from "../translations";

type ArchiveButtonProps = {
  listId: string;
  isArchived: boolean;
  translation: Translation;
};

export function ArchiveButton({ listId, isArchived, translation }: ArchiveButtonProps) {
  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleArchiveAction(listId);
  };

  return (
    <button
      onClick={handleToggle}
      className="archive-list-button"
      title={isArchived ? translation.archiveButton.unarchive : translation.archiveButton.archive}
    >
      {isArchived ? translation.archiveButton.unarchive : translation.archiveButton.archive}
    </button>
  );
}
