import { notFound } from "next/navigation";
import { fetchList } from "../actions";
import { NewItemForm } from "./new-item-form";
import { ResetStateButton } from "./reset-state";

export async function DetailList({ id }: { id: string }) {
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
        <NewItemForm listId={id} />
        <ResetStateButton listId={id} />
    </div>
  );
}