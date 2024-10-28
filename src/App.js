import React, { useEffect, useState } from "react";
const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const [loading, setLoading] = useState(false)

  const getData = async (url) => {
    try {
      setLoading(true)
      const response = await fetch(url);
      const data = await response.json();
      // setData(data.drinks);
      if (!data.drinks || data.drinks == "no data found") {
        setIsError({ status: true, msg: "No Data Fount" });
        setData([]);
        // setData(data.drinks);
      } else {
        setIsError({ status: false, msg: "" });
        setData(data.drinks);
      }
      setLoading(false)
    } catch (error) {
      setIsError({ status: true, msg: "Error Occured" });
      setData([]);
      setLoading(false)
    }
  };

  useEffect(() => {
    getData(`${URL}${search}`);
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }

  const handleSubmit = (e) => {
    
    e.preventDefault();
    getData(`${URL}${search}`);
    setSearch('');
  }
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Find New One"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
      {isError.status && isError.msg != "" && isError.msg}

        {data.map(({ idDrink, strDrink, strDrinkThumb }) => {
          return (
            <div key={idDrink}>
              <img src={strDrinkThumb} alt={strDrink} />
              <h3>{strDrink}</h3>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default App;

// import React, { useEffect, useState } from "react";

// const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
// // const URL = "https://jsonplaceholder.typicode.com/photos"

// const App = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState({ status: false, msg: "" });

//   const getData = async (url) => {
//     try {
//       setLoading(true);
//       const response = await fetch(url);
//       const data = await response.json();
//       setData(data.drinks);
//       if (!data.drinks || data.drinks == "no data found") {
//         setError({ status: true, msg: "No Data Found" });
//         setData([]);
//       } else {
//         setData(data.drinks);
//         setError({ status: false, msg: "" });
//       }
//       setLoading(false);
//     } catch (error) {
//       setError({ status: true, msg: "Something went wrong..." });
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const correctURL = `${URL}${searchTerm}`;
//     getData(correctURL);
//   }, []);

//   if (loading) {
//     return <h1>Loading....</h1>;
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const correctURL = `${URL}${searchTerm}`;
//     getData(correctURL);
//     setSearchTerm('')
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="serach"
//           id="search"
//           placeholder="Find New One"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <br />
//       <ul>
//         <div style={{ textAlign: "center", color: "red" }}>
//           {error.status && error.msg != "" && error.msg}
//         </div>
//         {data &&
//           data?.map(({ idDrink, strDrink, strDrinkThumb }) => {
//             return (
//               <div key={idDrink}>
//                 <h2>{strDrink}</h2>
//                 <img src={strDrinkThumb} alt={strDrink} />
//               </div>
//             );
//           })}
//       </ul>
//     </div>
//   );
// };

// export default App;

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
