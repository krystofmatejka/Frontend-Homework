import { Home } from "./home/home";

type PageProps = {
  searchParams: Promise<{ showArchived?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const showArchived = params.showArchived === 'true';
  
  return <Home showArchived={showArchived} />;
}
