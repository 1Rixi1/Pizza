import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/Pizzablock';
import Skeleton from '../components/Pizzablock/Skeleton'



const Home = () => {

  const [items, setItems] = React.useState([])

  const [isLoading, setIsLoading] = React.useState(true)

  const [categoryId, setCategoryId] = React.useState(0)

  const [sortType, setSortType] = React.useState({
    name: 'Популярности',
    sortProperty: 'rating'
  })


  const category = categoryId > 0 ? `category=${categoryId}` : ''
  const sortBy = sortType.sortProperty.replace('-', '')
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'


  React.useEffect(() => {
    setIsLoading(true)

    fetch(`https://62cd07e7a43bf78008509237.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)



      .then(res => res.json())
      .then(res => {
        setItems(res)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} OnClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ?
            [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            :
            items.map(pizza =>
              <PizzaBlock key={pizza.id} {...pizza} />
            )
        }
      </div>
    </div>
  )
}

export default Home;


