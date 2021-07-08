/* eslint-disable @next/next/no-img-element */
import React, {useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";



export default function Product({_url}) {
  const [productList,setProductList] = useState([])
  return (
    <div className={styles.Product_container}>
      <h2 className = {styles.Product_title}>구글 기프트 카드 5천원 (1/6)</h2>
      <div className={styles.Product_content_container}>
        <FontAwesomeIcon className="faIcons" icon={faChevronLeft} size="sm"></FontAwesomeIcon>
        <div className={styles.Product_image_container}>
          <img src={_url} alt="product image"></img>
          
        </div>
        <FontAwesomeIcon className="faIcons" icon={faChevronRight} size="sm"></FontAwesomeIcon>
      </div>
      <button className={styles.Product_apply_button} onClick={()=> {
        console.log(test);
       
      }} >
        응모하기
      </button>
    </div>
  );
}