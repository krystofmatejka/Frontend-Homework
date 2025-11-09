import { Suspense } from "react";

type List = {
  id: string;
  title: string;
  items: Item[];
}

type Item = {
  id: string;
  title: string;
  isActive: boolean;
}

async function fetchList(id: string): Promise<List> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (id === "1") {
    return {
      id: "1",
      title: "Fruits",
      items: [
      { id: "1", title: "Apple", isActive: true },
      { id: "2", title: "Banana", isActive: false },
    ]
    };
  }
  if (id === "2") {
    return {
      id: "2",
      title: "Vegetables",
      items: [
      { id: "3", title: "Corn", isActive: true },
      { id: "4", title: "Tomato", isActive: true },
      { id: "5", title: "Guacamole", isActive: false },
    ]
    };
  }
  if (id === "failed") {
    throw new Error("Failed to fetch items.");
  }
  return {
    id,
    title: "Unknown",
    items: [],
  };
}

async function DetailList({ id }: { id: string }) {
  try {
    const list = await fetchList(id);

    return (
      <div>
        <h1>{list.title}</h1>
        {list.items.map((item) => {
          return (<div key={item.id} className={`p-4 mb-2 border ${item.isActive ? 'bg-green-100' : 'bg-red-100'}`}>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>Status: {item.isActive ? 'Active' : 'Inactive'}</p>
          </div>);
        })}
      </div>
    );
  } catch (error) {
    return <div className="text-red-500">Error loading items: {(error as Error).message}</div>;
  }
}

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Detail Page for Item ID: {unwrappedParams.id}
        </h1>
      </main>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailList id={unwrappedParams.id} />
      </Suspense>
    </div>
  );
}
