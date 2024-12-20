import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOutComponent from './components/LayOutComponent';
import Home from './Pages/Home';
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBLLSSdMVP-_ZbQgqNTGQ5eb3eeYMzC2ZQ",
    authDomain: "daraz-32db0.firebaseapp.com",
    projectId: "daraz-32db0",
    storageBucket: "daraz-32db0.firebasestorage.app",
    messagingSenderId: "548548014391",
    appId: "1:548548014391:web:736044b5bbe8c67c842ab2",
    measurementId: "G-XK672HVWYE"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const router = createBrowserRouter([{
    path:'/',
    element:<LayOutComponent/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'/cart',
        element:<Home/>
      }
    ]
  }])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
