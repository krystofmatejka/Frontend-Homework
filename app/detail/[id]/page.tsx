import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchList } from "./actions";
import { NewItem } from "./components/new-item";
import { ListItems } from "./components/list-items";
import { ActiveFilter } from "./components/active-filter";
import { ListHeader } from "./components/list-header";

async function DetailList({ id, isActive }: { id: string; isActive: boolean }) {
  const list = await fetchList(id, isActive);

  if (!list) {
    notFound();
  }

  return (
    <>
      <ListHeader listId={id} currentTitle={list.title} owner={list.owner} members={list.members} />
      <NewItem listId={id} />
      <ActiveFilter listId={id} isActive={isActive} />
      <ListItems listId={id} items={list.items} />
    </>
  );
}

export default async function DetailPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const unwrappedParams = await params;
  const unwrappedSearchParams = await searchParams;
  const isActiveParam = Boolean(unwrappedSearchParams.isActive === undefined || unwrappedSearchParams.isActive === 'true');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailList id={unwrappedParams.id} isActive={Boolean(isActiveParam)} />
    </Suspense>
  );
}
