import { Item } from "../types/item";

interface Props {
  items: Item[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ItemList({ items, onEdit, onDelete }: Props) {
  return (
    <ul className="mt-4">
      {items.map((item: Item) => (
        <li key={item.id} className="flex gap-4 items-center">
          {item.inputText}

          <button
            className="p-2 bg-yellow-500 text-white"
            onClick={() => onEdit(item.id)}
          >
            Edit
          </button>

          <button
            className="p-2 bg-red-500 text-white"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
