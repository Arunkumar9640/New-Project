// import React from "react";
// import { UserContext } from "./Context/userContext";
// import ChildrenComponent from "./ContextComponents/ChildrenComponent";
// import SubChildrenComponent from "./ContextComponents/SubChildrenComponent";

// const App = () => {
//   const initialData = {
//     name:"arun",
//     age:25,
//     email:"email.gmail.com"
//   }
//   return (
//     <UserContext.Provider value={{initialData}}>
//       <ChildrenComponent />
//       <SubChildrenComponent />
//     </UserContext.Provider>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import Table from "./Todos Project/Table";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
// const URL = "https://jsonplaceholder.typicode.com/photos"

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, msg: "" });

  const getData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setData(data.drinks);
      if (!data.drinks || data.drinks == "no data found") {
        setError({ status: true, msg: "No Data Found" });
        setData([]);
      } else {
        setData(data.drinks);
        setError({ status: false, msg: "" });
      }
      setLoading(false);
    } catch (error) {
      setError({ status: true, msg: "Something went wrong..." });
      setLoading(false);
    }
  };

  useEffect(() => {
    const correctURL = `${URL}${searchTerm}`;
    getData(correctURL);
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const correctURL = `${URL}${searchTerm}`;
    getData(correctURL);
    setSearchTerm('')
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="serach"
          id="search"
          placeholder="Find New One"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <ul>
        <div style={{ textAlign: "center", color: "red" }}>
          {error.status && error.msg != "" && error.msg}
        </div>
        {data &&
          data?.map(({ idDrink, strDrink, strDrinkThumb }) => {
            return (
              <div key={idDrink}>
                <h2>{strDrink}</h2>
                <img src={strDrinkThumb} alt={strDrink} />
              </div>
            );
          })}
      </ul>
      {/* <Table /> */}
    </div>
  );
};

export default App;

// import React from "react";
// import FormComponent1 from "./Todos Project/Todo";
// import ReactApiMain from "./React API Project/ReactApiMain";

// const App = () => {
//   return (
//     <div className="movieContainer">
//       <ReactApiMain />
//       <FormComponent1 />

//     </div>
//   );
// };

// export default App;
