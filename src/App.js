import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount(count - 1)}>
        -
      </button>
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
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
