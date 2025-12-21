import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchList } from "./actions";
import { fetchMe, fetchAllUsers } from "../../../users/actions";
import { NewItem } from "./components/new-item";
import { ListItems } from "./components/list-items";
import { ActiveFilter } from "./components/active-filter";
import { ListHeader } from "./components/list-header";
import { Stats } from "./components/stats";
import { detailPageTranslations, type DetailTranslation } from "./translations";
import type { User } from "../../../types";

async function DetailList({ id, isActive, me, users, translation }: { id: string; isActive: boolean; me: User; users: User[]; translation: DetailTranslation }) {
  const list = await fetchList(id, isActive);

  if (!list) {
    notFound();
  }

  return (
    <>
      <ListHeader listId={id} currentTitle={list.title} owner={list.owner} members={list.members} me={me} users={users} translation={translation} />
      <NewItem listId={id} translation={translation} />
      <ActiveFilter listId={id} isActive={isActive} translation={translation} />
      <Stats items={list.items} translation={translation} />
      <ListItems listId={id} items={list.items} translation={translation} />
    </>
  );
}

export default async function DetailPage({ params, searchParams }: { params: Promise<{ lang: string; id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const unwrappedParams = await params;
  const unwrappedSearchParams = await searchParams;
  const isActiveParam = Boolean(unwrappedSearchParams.isActive === undefined || unwrappedSearchParams.isActive === 'true');
  const translation = detailPageTranslations[unwrappedParams.lang as keyof typeof detailPageTranslations];

  const [me, users] = await Promise.all([
    fetchMe(),
    fetchAllUsers(),
  ]);

  return (
    <Suspense fallback={<div>{translation.loading}</div>}>
      <DetailList id={unwrappedParams.id} isActive={Boolean(isActiveParam)} me={me} users={users} translation={translation} />
    </Suspense>
  );
}
