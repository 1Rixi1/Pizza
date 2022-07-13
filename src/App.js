import React from 'react';
import './scss/app.scss';
import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock';



const pizzas = [];

function App() {

  const [items, setItems] = React.useState([])


  React.useEffect(() => {
    fetch('https://62cd07e7a43bf78008509237.mockapi.io/items')
      .then(res => res.json())
      .then(res => {
        setItems(res)
      })

  }, [])



  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {

              items.map((item) => (
                <PizzaBlock {...item} />
              ))

            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
