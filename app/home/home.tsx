import { Suspense } from "react";
import { ShoppingLists } from "./shopping-lists";
import { NewListModal } from "./components/new-list-modal";
import "./home.css";

export function Home() {
  return (
    <>
      <div className="list-header-layout">
        <h1>Shopping Lists</h1>
        <NewListModal />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShoppingLists />
      </Suspense>
    </>
  );
}
