import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';

function App() {

  
  return (
    <>
      <BrowserRouter>

          <Routes>
            <Route exact path="*" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>

          </Routes>

      </BrowserRouter>
      
    </>
  );
}

export default App;
