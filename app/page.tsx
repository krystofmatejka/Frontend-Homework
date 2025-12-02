import { Home } from "./home/home";

type PageProps = {
  searchParams: Promise<{ showArchived?: string; failed?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const showArchived = params.showArchived === 'true';
  const failed = params.failed === 'true';
  
  return <Home showArchived={showArchived} failed={failed} />;
}
