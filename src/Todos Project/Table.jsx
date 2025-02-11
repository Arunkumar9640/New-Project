import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    try {
      axios.get('https://jsonplaceholder.typicode.com/users')
    .then(responce => setData(responce.data))
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {username, email}

    if(isEditing) {
      setData(data.map(user => (user.id === isEditing ? {...user, ...userData}:user)))
      setIsEditing(null)
    } else {
      const newId = data.length + 1;
      // axios.post('https://jsonplaceholder.typicode.com/users', {id:newId, ...userData})
      // .then(res => setData([...data, res.data]))
      setData([...data, {id:newId, ...userData}])
    }
    setUsername('');
    setEmail('');
  };
  const handleEditing = (id) => {
    const userEdit = data.find(useEd => useEd.id === id);
    setUsername(userEdit.username);
    setEmail(userEdit.email);
    setIsEditing(id)
  };
  const handleDelete = (id) => {
    setData(data.filter(userDelete => userDelete.id !== id))
  };

  return (
    <div>
      <h1>URL Todos</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">UseName</label>
        <input
          type="text"
          placeholder="Enter User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((userData, index) => (
            <tr key={index}>
              <td>{userData.id}</td>
              <td>{userData.username}</td>
              <td>{userData.email}</td>
              <td>
                <button onClick={() => handleEditing(userData.id)}>Edit</button>
                <button onClick={() => handleDelete(userData.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const FormComponent = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [data, setData] = useState([]); // Holds user data
//   const [editingId, setEditingId] = useState(null); // For tracking which user is being edited

//   // Fetching user data on component mount using useEffect
//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/users')
//       .then(response => setData(response.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   // Handle form submission (add or edit)
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const userData = { username, email };

//     if (editingId) {
//       // Edit existing user
//       setData(data.map(user => (user.id === editingId ? { ...user, ...userData } : user)));
//       setEditingId(null); // Reset after editing
//     } else {
//       // Add new user
//       const newId = data.length + 1;
//       axios.post('https://jsonplaceholder.typicode.com/users', { id: newId, ...userData })
//         .then(response => {
//           setData([...data, response.data]); // Add new user to the state
//         })
//         .catch(error => console.error('Error adding user:', error));
//     }

//     // Reset form fields
//     setUsername('');
//     setEmail('');
//   };

//   // Handle user editing
//   const handleEditing = (id) => {
//     const user = data.find(user => user.id === id);
//     setUsername(user.username);
//     setEmail(user.email);
//     setEditingId(id);
//   };

//   // Handle user deletion
//   const handleDelete = (id) => {
//     setData(data.filter(user => user.id !== id));
//   };

//   return (
//     <div>
//       <form style={{background:"violet", padding:"1rem"}} onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             style={{width:"250px", padding:"5px", borderRadius:"5px", border:"none", paddingLeft:"10px"}}
//             placeholder='Enter UserName...'
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             style={{width:"250px", padding:"5px", borderRadius:"5px", border:"none", paddingLeft:"10px"}}
//             placeholder='Enter Email...'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <button type="submit">{editingId ? 'Edit User' : 'Add User'}</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((user, index) => (
//             <tr key={index}>
//               <td>{user.id}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>
//                 <button onClick={() => handleEditing(user.id)}>Edit</button>
//                 <button onClick={() => handleDelete(user.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FormComponent;
