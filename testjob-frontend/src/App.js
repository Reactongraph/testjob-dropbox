import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './view/Login'
import Signup from './view/Signup';
import {
Routes, Route
 } from "react-router-dom";

function App() {
  return (
    
      <Routes >
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>

  );
}

export default App;
