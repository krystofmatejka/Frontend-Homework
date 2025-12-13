import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchList } from "./actions";
import { fetchMe, fetchAllUsers } from "../../users/actions";
import { NewItem } from "./components/new-item";
import { ListItems } from "./components/list-items";
import { ActiveFilter } from "./components/active-filter";
import { ListHeader } from "./components/list-header";
import type { User } from "../../types";

async function DetailList({ id, isActive, me, users }: { id: string; isActive: boolean; me: User; users: User[] }) {
  const list = await fetchList(id, isActive);

  if (!list) {
    notFound();
  }

  return (
    <>
      <ListHeader listId={id} currentTitle={list.title} owner={list.owner} members={list.members} me={me} users={users} />
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

  const [me, users] = await Promise.all([
    fetchMe(),
    fetchAllUsers(),
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailList id={unwrappedParams.id} isActive={Boolean(isActiveParam)} me={me} users={users} />
    </Suspense>
  );
}
