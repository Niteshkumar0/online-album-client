import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import Gallery from './gallery/Gallery';
import FullPic from './gallery/FullPic';


function App() {
  let router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
      },      
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/gallery/:id',
        element:<FullPic/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/gallery',
        element:<Gallery/>
      }
      ,
      // {
      //   path:'/pic',
      //   element:<FullPic/>
      // }
    ])

    
    return (
   <>   
        <RouterProvider router={router} />
   </>
  );
}
export default App;

