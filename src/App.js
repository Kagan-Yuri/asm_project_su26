import { React } from 'react';
import { Container } from 'react-bootstrap';
// import File from './components/File';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import Home from './components/Home';
// import View from './components/View'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        {/* <Route path="/home" element={<Home />}/>
        <Route path="/view-user/:id" element={<View />}/>
        <Route path="/" element={<Login />}/>
        <Route path="/" element={<Login />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
