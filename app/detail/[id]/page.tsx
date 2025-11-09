import { Suspense } from "react";
import { DetailList } from "./components/detail-list";

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
