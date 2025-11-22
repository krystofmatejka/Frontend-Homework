import { Suspense } from "react";
import { ShoppingLists } from "./components/shopping-lists";

export default function Home() {
  return (
    <>
      <h1>Shopping Lists</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ShoppingLists />
      </Suspense>
    </>
  );
}
