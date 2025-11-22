import { Suspense } from "react";
import { ShoppingLists } from "./shopping-lists";

export function Home() {
  return (
    <>
      <h1>Shopping Lists</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ShoppingLists />
      </Suspense>
    </>
  );
}
