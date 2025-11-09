import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchList } from "./actions";
import { NewItemForm } from "./components/new-item-form";
import { ResetStateButton } from "./components/reset-state";
import { DetailItem } from "./components/detail-item";
import { ToggleIsActive } from "./components/toggle-is-active";

async function DetailList({ id, isActive }: { id: string; isActive: boolean }) {
  const list = await fetchList(id, isActive);

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

export default async function DetailPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const unwrappedParams = await params;
  const unwrappedSearchParams = await searchParams;
  const isActiveParam = (unwrappedSearchParams.isActive ?? 'true').toString().toLocaleLowerCase() === 'true';

  return (
    <div>
      <main>
        <h2>
          Detail Page for Item ID: {unwrappedParams.id}
        </h2>
      </main>
      <ToggleIsActive listId={unwrappedParams.id} isActive={isActiveParam} />
      <Suspense fallback={<div>Loading...</div>}>
        <DetailList id={unwrappedParams.id} isActive={Boolean(isActiveParam)} />
      </Suspense>
    </div>
  );
}
