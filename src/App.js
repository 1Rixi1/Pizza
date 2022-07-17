import React from 'react';
import './scss/app.scss';
import Header from './components/Header'

import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NotFond from './pages/NotFond';
import Cart from './pages/Cart';


function App() {








  return (
    <div className="wrapper">
      <Header />
      <div className="content">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFond />} />

        </Routes>



      </div>
    </div>
  );
}

export default App;
