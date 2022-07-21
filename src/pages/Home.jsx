import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/Pizzablock';
import Skeleton from '../components/Pizzablock/Skeleton'
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";


const Home = () => {




  const dispatch = useDispatch();

  const { categoryId, sort } = useSelector((state) => state.filter)

  const sortType = sort.sortProperty











  const [items, setItems] = React.useState([])

  const [isLoading, setIsLoading] = React.useState(true)



  const [currentPage, setCurrentPage] = React.useState(1)

  const { searchValue } = React.useContext(SearchContext)



  const onClickCategory = (id) => {
    console.log(id)
    dispatch(setCategoryId(id))
  }



  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType.replace('-', '');
  const order = sortType.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue}` : '';


  React.useEffect(() => {
    setIsLoading(true)

    fetch(`https://62cd07e7a43bf78008509237.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`)



      .then(res => res.json())
      .then(res => {
        setItems(res)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  )
}

export default Home;


