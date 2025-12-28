import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addOrUpdateTodo = async () => {
    if (!title) return;

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/todos/${editId}`,
        { title }
      );
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/todos", { title });
    }

    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setEditId(todo._id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo App</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <button onClick={addOrUpdateTodo}>
        {editId ? "Update" : "Add"}
      </button>

      {editId && (
        <button onClick={() => {
          setEditId(null);
          setTitle("");
        }}>
          Cancel
        </button>
      )}

      {todos.map(todo => (
        <div key={todo._id}>
          {todo.title}

          <button onClick={() => editTodo(todo)}>
            Edit
          </button>

          <button onClick={() => deleteTodo(todo._id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
