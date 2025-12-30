import { Home } from "./home";
import { fetchMe, fetchAllUsers } from "../../users/actions";
import { homePageTranslations } from "./translations";

export default async function Page(props: PageProps<'/[lang]/home'>) {
  const lang = (await props.params).lang;
  const params = await props.searchParams;
  const showArchived = params.showArchived === 'true';
  const failed = params.failed === 'true';

  console.log("Language param:", lang);
  const translation = homePageTranslations[lang as keyof typeof homePageTranslations];

  const [me, users] = await Promise.all([
    fetchMe(),
    fetchAllUsers(),
  ]);

  return <Home showArchived={showArchived} failed={failed} me={me} users={users} translation={translation} />;
}
