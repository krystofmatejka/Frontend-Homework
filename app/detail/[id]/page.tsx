import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchList } from "./actions";
import { NewItemForm } from "./components/new-item-form";
import { ResetStateButton } from "./components/reset-state";
import { DetailItem } from "./components/detail-item";

async function DetailList({ id }: { id: string }) {
  const list = await fetchList(id);

  if (!list) {
    notFound();
  }

  return (
    <div>
      <h1>{list.title}</h1>
      {list.items.map((item) => {
        return <DetailItem key={item.id} id={item.id} title={item.title} isActive={item.isActive} listId={id} />;
      })}
        <NewItemForm listId={id} />
        <ResetStateButton listId={id} />
    </div>
  );
}

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;

  return (
    <div>
      <main>
        <h2>
          Detail Page for Item ID: {unwrappedParams.id}
        </h2>
      </main>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailList id={unwrappedParams.id} />
      </Suspense>
    </div>
  );
}
