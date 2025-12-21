import { Suspense } from "react";
import { ShoppingLists } from "./components/shopping-lists";
import { NewListModal } from "./components/new-list-modal";
import { ArchiveToggle } from "./components/archive-toggle";
import type { User } from "../../types";
import type { Translation } from "./translations";

type HomeProps = {
  showArchived: boolean;
  failed: boolean;
  me: User;
  users: User[];
  translation: Translation;
};

export function Home({ showArchived, failed, me, users, translation }: HomeProps) {
  return (
    <>
      <div className="list-header-layout">
        <h1>{translation.home.title}</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <ArchiveToggle showArchived={showArchived} translation={translation} />
          <NewListModal users={users} translation={translation} />
        </div>
      </div>
      <Suspense fallback={<div>{translation.home.loading}</div>}>
        <ShoppingLists showArchived={showArchived} failed={failed} me={me} translation={translation} />
      </Suspense>
    </>
  );
}
