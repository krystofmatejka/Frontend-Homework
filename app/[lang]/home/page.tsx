import { Home } from "./home";
import { fetchMe, fetchAllUsers } from "../../users/actions";

//type PageProps = {
//  searchParams: Promise<{ showArchived?: string; failed?: string }>;
//};

export default async function Page(props: PageProps<'/[lang]/home'>) {
  const lang = await props.params;
  const params = await props.searchParams;
  const showArchived = params.showArchived === 'true';
  const failed = params.failed === 'true';

  console.log("Language param:", lang);
  
  const [me, users] = await Promise.all([
    fetchMe(),
    fetchAllUsers(),
  ]);
  
  return <Home showArchived={showArchived} failed={failed} me={me} users={users} />;
}
