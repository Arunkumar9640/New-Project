import React, { useContext } from 'react';
import { UserContext } from '../Context/userContext';

const SubChildrenComponent = () => {
    const data = useContext(UserContext)
    console.log(data);
    
  return (
    <div>SubChildrenComponent</div>
  )
}

export default SubChildrenComponent
