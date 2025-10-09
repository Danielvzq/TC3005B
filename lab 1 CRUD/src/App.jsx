import { useEffect, useState } from "react";
import { supabase } from "./assets/supabase-client";


export default function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const fetchTodos = async () => {
    setLoading(true);
    setErrMsg("");
    const { data, error } = await supabase
      .from("TodoList")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("Error fetching: ", error);
      setErrMsg(error.message);
    } else {
      setTodoList(data || []);
    }
    setLoading(false);
  };

  const addTodo = async () => {
    const text = newTodo.trim();
    if (!text) return;

    const newTodoData = { name: text, isCompleted: false };

    // Inserta y devuelve la fila creada:
    const { data, error } = await supabase
      .from("TodoList")
      .insert(newTodoData)
      .select()
      .single();

    if (error) {
      console.log("Error adding todo: ", error);
      setErrMsg(error.message);
    } else {
      setTodoList((prev) => [data, ...prev]);
      setNewTodo("");
    }
  };

  const completeTask = async (id, isCompleted) => {
    // Actualiza y solicita la fila modificada
    const { data, error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.log("error toggling task: ", error);
      setErrMsg(error.message);
    } else {
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === id ? data : todo))
      );
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("TodoList").delete().eq("id", id);
    if (error) {
      console.log("error deleting task: ", error);
      setErrMsg(error.message);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ maxWidth: 520, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Todo List</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="New Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {errMsg && (
        <p style={{ color: "crimson", marginTop: 8 }}>
          ⚠️ {errMsg}
        </p>
      )}

      {loading ? (
        <p style={{ marginTop: 16 }}>Cargando…</p>
      ) : (
        <ul style={{ marginTop: 16, padding: 0, listStyle: "none" }}>
          {todoList.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <p
                style={{
                  margin: 0,
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  opacity: todo.isCompleted ? 0.6 : 1,
                }}
              >
                {todo.name}
              </p>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => completeTask(todo.id, todo.isCompleted)}
                  title={todo.isCompleted ? "Undo" : "Complete Task"}
                >
                  {todo.isCompleted ? "Undo" : "Complete"}
                </button>
                <button onClick={() => deleteTask(todo.id)} style={{ color: "crimson" }}>
                  Delete
                </button>
              </div>
            </li>
          ))}

          {todoList.length === 0 && <p>No hay tareas todavía.</p>}
        </ul>
      )}
    </div>
  );
}
