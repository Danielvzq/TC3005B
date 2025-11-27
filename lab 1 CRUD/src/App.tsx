import { useState } from "react";
import { useItems } from "./hooks/useItems";
import ItemList from "./components/ItemList";
import { firestoreService } from "./services/firestore.service";

export default function App() {
  const [inputText, setInputText] = useState("");
  const { items, loadItems } = useItems();

  const handleAdd = async () => {
    if (!inputText.trim()) return;
    await firestoreService.addItem(inputText);
    setInputText("");
    loadItems();
  };

  const handleEdit = async (id: string) => {
    const newText = prompt("Nuevo texto:");
    if (!newText) return;
    await firestoreService.updateItem(id, newText);
    loadItems();
  };

  const handleDelete = async (id: string) => {
    await firestoreService.deleteItem(id);
    loadItems();
  };

  return (
    <div className="app-container">
      <h1>React + Firebase CRUD</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe algo..."
        />

        <button className="button-primary" onClick={handleAdd}>
          Agregar
        </button>
      </div>

      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
