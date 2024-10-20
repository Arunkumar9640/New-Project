import React, { useState, useEffect } from "react";

function BroTodo() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  // Handle delete (single or all selected)
  const handleDelete = (idx, isDeleteAll = false) => {
    if (isDeleteAll) {
      setUserData(userData.filter((user) => !selectedUser.includes(user.id)));
      setSelectedUser([]);
    } else {
      setUserData(userData.filter((_, index) => index !== idx));
    }
  };

  // Handle checkbox selection
  const handleCheck = (isChecked, id) => {
    if (isChecked) {
      setSelectedUser([...selectedUser, id]);
    } else {
      setSelectedUser(selectedUser.filter((userId) => userId !== id));
    }
  };

  return (
    <div>
      <AddOrEditUser
        setUserData={setUserData}
        totalUserData={userData}
        selectedUser={selectedUser}
      />

      {/* Delete All Button */}
      {selectedUser.length > 0 && (
        <button onClick={() => handleDelete(0, true)}>Delete All</button>
      )}

      {/* Display user list */}
      <div>
        {userData.map((user, idx) => (
          <div key={idx} style={{ display: "flex", margin: "1rem" }}>
            <input
              type="checkbox"
              checked={selectedUser.includes(user.id)}
              onChange={(e) => handleCheck(e.target.checked, user.id)}
            />
            <span>{user.user}</span>
            <div>
              <button onClick={() => setSelectedUser([user])}>Edit</button>
              <button onClick={() => handleDelete(idx)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddOrEditUser({ setUserData, totalUserData, selectedUser }) {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(1);

  // Populate selected user data in the input for editing
  useEffect(() => {
    if (selectedUser.length > 0) {
      const userToEdit = totalUserData.find((u) => u.id === selectedUser[0].id);
      if (userToEdit) setUser(userToEdit.user);
    }
  }, [selectedUser, totalUserData]);

  // Add or update user
  const handleSubmit = () => {
    if (selectedUser.length > 0) {
      const updatedData = totalUserData.map((u) =>
        u.id === selectedUser[0].id ? { id: u.id, user } : u
      );
      setUserData(updatedData);
    } else {
      setUserData([{ id: userId, user }, ...totalUserData]);
      setUserId(userId + 1);
    }
    setUser("");
  };

  return (
    <div
      style={{
        background: "violet",
        width: "100%",
        height: "10vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        display: "flex",
      }}
    >
      <input
        type="text"
        placeholder="Enter New Todo..."
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button
        onClick={handleSubmit}
      >
        {selectedUser.length === 0 ? "Add" : "Update"}
      </button>
    </div>
  );
}

export default BroTodo;

// import AddOrEditUser from "./AddOrEditUser";
// import React, { useState, useEffect } from "react";

// function BroTodo() {
//   const [userData, setUserData] = useState([]);
//   // const [checkedUsers, setCheckedUsers] = useState([]);
//   const [selectedUser, setSelected] = useState();
//   const handleDelete = (idx, isDeleteAll = false) => {
//     if (!isDeleteAll) {
//       const data = userData?.filter((user, index) => index !== idx);
//       setUserData(data);
//     } else {
//       const data = userData?.filter(
//         (user) => !selectedUser?.includes(user.id)
//       );
//       setUserData(data);
//       setSelected([]);
//     }
//   };
//   useEffect(() => {
//     setSelected("");
//   }, [userData]);
//   const handleCheck = (isChecked, id) => {
//     if (isChecked) setSelected((p) => [...p, id]);
//     else {
//       const data = selectedUser?.filter((userId, index) => userId !== id);
//       setSelected(data);
//     }
//   };

//   return (
//     <div>
//       <AddOrEditUser
//         setUserData={setUserData}
//         totalUserData={userData}
//         selectedUser={selectedUser}
//       />
//       {selectedUser?.length > 0 && (
//         <div>
//           <button onClick={() => handleDelete(0, true)}>DeleteAll</button>
//         </div>
//       )}
//       {userData?.length > 0 &&
//         userData?.map((user, idx) => (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "50%",
//             }}
//             className="user-row"
//             key={idx}
//           >
//             <input
//               type="checkbox"
//               // checked={selectedUser?.includes(user.id)}
//               onChange={(e) => handleCheck(e.target.checked, user.id)}
//             />
//             <span>{user?.user}</span>
//             <div className="user-Action">
//               {" "}
//               <span>
//                 <button onClick={() => setSelected(user)}>Edit</button>
//               </span>
//               <span>
//                 <button onClick={() => handleDelete(idx, false)}>Delete</button>
//               </span>
//             </div>
//           </div>
//         ))}
//       {/* <button></b */}
//     </div>
//   );
// }

// export default BroTodo;
