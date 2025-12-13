import { Home } from "./home";
import { fetchMe, fetchAllUsers } from "../users/actions";

type PageProps = {
  searchParams: Promise<{ showArchived?: string; failed?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const showArchived = params.showArchived === 'true';
  const failed = params.failed === 'true';
  
  const [me, users] = await Promise.all([
    fetchMe(),
    fetchAllUsers(),
  ]);
  
  return <Home showArchived={showArchived} failed={failed} me={me} users={users} />;
}
