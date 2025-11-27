import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export const firestoreService = {
  async getItems() {
    const snapshot = await getDocs(collection(db, "items"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async addItem(text: string) {
    return addDoc(collection(db, "items"), { inputText: text });
  },

  async deleteItem(id: string) {
    return deleteDoc(doc(db, "items", id));
  },

  async updateItem(id: string, newText: string) {
    return updateDoc(doc(db, "items", id), { inputText: newText });
  },
};
