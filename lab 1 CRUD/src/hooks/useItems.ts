import { useEffect, useState } from "react";
import { firestoreService } from "../services/firestore.service";
import { Item } from "../types/item";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  const loadItems = async () => {
    const data = await firestoreService.getItems();
    setItems(data as Item[]);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return { items, loadItems };
};
