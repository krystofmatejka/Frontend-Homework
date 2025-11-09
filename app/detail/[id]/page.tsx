import { Suspense } from "react";
import { notFound } from "next/navigation";

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

async function fetchList(id: string): Promise<List | null | undefined> {
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

  null;
}

async function DetailList({ id }: { id: string }) {
  const list = await fetchList(id);

  if (!list) {
    notFound();
  }

  return (
    <div>
      <h1>{list.title}</h1>
      {list.items.map((item) => {
        return (<div key={item.id}>
          <h3>{item.title}</h3>
          <p>Status: {item.isActive ? 'Active' : 'Inactive'}</p>
        </div>);
      })}
    </div>
  );
}

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;

  return (
    <div>
      <main>
        <h2>
          Detail Page for Item ID: {unwrappedParams.id}
        </h2>
      </main>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailList id={unwrappedParams.id} />
      </Suspense>
    </div>
  );
}
