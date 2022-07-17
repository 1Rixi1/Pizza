
import React from 'react'
import styles from './NotFound.module.scss'

console.log(styles);


export const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1 >
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>Страница отсутствует</p>
    </div>
  )
}

export default NotFound;
