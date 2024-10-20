import { useState, useEffect } from 'react';
import './Todos.css'
import BroTodo from './BroTodo';
import Table from './Table';

const FormComponent1 = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]); // Holds user data
  const [editingId, setEditingId] = useState(null); // For tracking which user is being edited

  // Manually populate data on component mount (mock data)
  useEffect(() => {
    const initialData = [
      { id: 1, username: "JohnDoe", email: "john@example.com" },
      { id: 2, username: "JaneSmith", email: "jane@example.com" }
    ];
    setData(initialData);
  }, []);

  // Handle form submission (add or edit)
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { username, email };

    if (editingId) {
      // Edit existing user
      setData(data.map(user => (user.id === editingId ? { ...user, ...userData } : user)));
      setEditingId(null); // Reset after editing
    } else {
      // Add new user
      const newId = data.length + 1;
      setData([...data, { id: newId, ...userData }]); // Manually add new user to the state
    }

    // Reset form fields
    setUsername('');
    setEmail('');
  };

  // Handle user editing
  const handleEditing = (id) => {
    const user = data.find(user => user.id === id);
    setUsername(user.username);
    setEmail(user.email);
    setEditingId(id);
  };

  // Handle user deletion
  const handleDelete = (id) => {
    setData(data.filter(user => user.id !== id));
  };

  return (
    <>
    <div style={{fontFamily:"sans-serif"}}>
      <form style={{ background: "violet", padding: "1rem", margin:"1rem" }} onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            style={{ width: "250px", padding: "5px", borderRadius: "5px", border: "none", paddingLeft: "10px" }}
            placeholder="Enter UserName..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            style={{ width: "250px", padding: "5px", borderRadius: "5px", border: "none", paddingLeft: "10px", margin:"1rem" }}
            placeholder="Enter Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" style={{background:"orange", color:"white", padding:"8px", border:"none", borderRadius:"5PX", cursor:"pointer"}}>{editingId ? 'Edited Save' : 'Add User'}</button>
      </form>

      <table style={{background:"#023047", color:"white", fontFamily:"sans-serif", padding:"5px"}}>
        <thead>
          <tr style={{margin:"1rem"}}>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} style={{margin:"1rem"}}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td style={{margin:"1rem"}}>
                <button style={{background:"orange", color:"white", padding:"8px", border:"none", borderRadius:"5PX", cursor:"pointer"}} onClick={() => handleEditing(user.id)}>Edit</button>
                <button style={{background:"orange", color:"white", padding:"8px", border:"none", borderRadius:"5PX", cursor:"pointer"}} onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <BroTodo /> */}
    {/* <Table /> */}
    </>
  );
};

export default FormComponent1;


// import React, { useState } from "react";
// import "./Todos.css";


// const TodoApp = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTodo, setCurrentTodo] = useState({});

//   // Add a new todo
//   const handleAddTodo = () => {
//     if (newTodo.trim() === "") return;
//     setTodos([...todos, { id: Date.now(), text: newTodo }]);
//     setNewTodo("");
//   };

//   // Delete a todo
//   const handleDeleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   // Enable edit mode
//   const handleEditTodo = (todo) => {
//     setIsEditing(true);
//     setCurrentTodo({ ...todo });
//   };

//   // Save the edited todo
//   const handleSaveTodo = () => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === currentTodo.id ? currentTodo : todo
//       )
//     );
//     setIsEditing(false);
//     setCurrentTodo({});
//   };

//   // Handle input change for edit mode
//   const handleChangeEditInput = (e) => {
//     setCurrentTodo({ ...currentTodo, text: e.target.value });
//   };

//   return (
//     <div>
//       <h2>Todo List</h2>

//       {/* Add new todo */}
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         placeholder="Add a new todo"
//       />
//       <button onClick={handleAddTodo}>Add</button>

//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             {isEditing && currentTodo.id === todo.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={currentTodo.text}
//                   onChange={handleChangeEditInput}
//                 />
//                 <button onClick={handleSaveTodo}>Save</button>
//               </>
//             ) : (
//               <>
//               <div style={{background:"lightgreen", justifyContent:"space-evenly", padding:"5px", borderRadius:"1rem"}}>
//                 {todo.text}
//                 <button onClick={() => handleEditTodo(todo)} style={{margin:"10px 20px"}}>Edit</button>
//                 <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoApp;

