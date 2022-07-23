import React from 'react'
import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/Pizzablock';
import Skeleton from '../components/Pizzablock/Skeleton'
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import axios from 'axios'

import qs from 'qs';
import { useNavigate } from 'react-router-dom';


const Home = () => {



  const navigate = useNavigate()


  const dispatch = useDispatch();

  const isSearch = React.useRef(false)

  const isMounted = React.useRef(false)



  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

  const sortType = sort.sortProperty





  const [items, setItems] = React.useState([])

  const [isLoading, setIsLoading] = React.useState(true)




  const { searchValue } = React.useContext(SearchContext)



  const onClickCategory = (id) => {
    console.log(id)
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }


  const fetchPizzas = () => {

    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios.get(`https://62cd07e7a43bf78008509237.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })

  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))


      const sort = list.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )

      isSearch.current = true

    }
  }, [])

  React.useEffect(() => {

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false

    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage]);


  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })


      navigate(`?${queryString}`)
    }

    isMounted.current = true


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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;


