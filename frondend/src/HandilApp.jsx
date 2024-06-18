import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import userRouter from './UserRouter';


const App = () => {
 
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>

      <RouterProvider router={userRouter} />
      

    </div>
  );
};

export default App;
