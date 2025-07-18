import React, { useContext } from 'react';
import { UserContext } from '../Context/userContext';

const ChildrenComponent = () => {
    const data = useContext(UserContext)
    console.log(data);
    const {name, age, email} = data;
  return (
    <div>
        <h1>{name}</h1>
        <p>{age}</p>
        <h5>{email}</h5>
    </div>
  )
}

export default ChildrenComponent
