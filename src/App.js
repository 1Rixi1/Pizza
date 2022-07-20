import React from 'react';
import './scss/app.scss';
import Header from './components/Header'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NotFond from './pages/NotFond';
import Cart from './pages/Cart';

import { useSelector, useDispatch } from 'react-redux'

import { decrement, increment, test } from './redux/slices/filterSlice.js'

export const SearchContext = React.createContext('')


function App() {

  const [searchValue, setSearchValue] = React.useState('')

  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()







  return (



    <div className="wrapper">

      <button
        aria-label="Increment value"
        onClick={() => dispatch(test())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFond />} />
          </Routes>

        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
