import { Suspense } from "react";
import { ShoppingLists } from "./shopping-lists";
import { NewListModal } from "./components/new-list-modal";
import { ArchiveToggle } from "./components/archive-toggle";
import "./home.css";

type HomeProps = {
  showArchived: boolean;
  failed: boolean;
};

export function Home({ showArchived, failed }: HomeProps) {
  return (
    <>
      <div className="list-header-layout">
        <h1>Shopping Lists</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <ArchiveToggle showArchived={showArchived} />
          <NewListModal />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShoppingLists showArchived={showArchived} failed={failed} />
      </Suspense>
    </>
  );
}
