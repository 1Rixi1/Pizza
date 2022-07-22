import React from 'react'
import { SearchContext } from '../../App'

import styles from './search.module.scss'
import debounce from "lodash.debounce";


const Search = () => {


  const [value, setValue] = React.useState('')

  const { setSearchValue } = React.useContext(SearchContext)

  const inputRef = React.useRef()


  const onClickClear = () => {
    setSearchValue('')
    setValue('')
    inputRef.current.focus()
  }


  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str)
    }, 1000),
    []
  )

  const onChangeInput = (e) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }





  return (
    <div className={styles.root}>

      <svg className={styles.icon} fill="#000000" viewBox="0 0 30 30" width="90px" height="90px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" /></svg>

      <input ref={inputRef} onChange={onChangeInput} className={styles.input} placeholder='Поиск пиццы...' value={value} />


      {value && <svg onClick={onClickClear} className={styles.clearIcon} fill="#000000" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" /></svg>}

    </div>

  )
}

export default Search;