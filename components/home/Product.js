import React, {useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Product(props) {
  const [test,setTest] = useState("")

  return (
    <div className={styles.Product_container}>
      <h2 className = {styles.Product_title}>구글 기프트 카드 5천원 (1/6)</h2>
      <div className={styles.Product_content_container}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg"></FontAwesomeIcon>
        <div className={styles.Product_image_container}>
          <Image 
            priority
            src="/GOT IMAGE"
            className={styles.Product_image}
            height={100}
            width={100}
            alt={"image of product"}  
          />
        </div>
        <FontAwesomeIcon icon={faChevronRight} size="lg"></FontAwesomeIcon>
      </div>
      <button className={styles.Product_apply_button} onClick={()=> {
        if(confirm("응모하시겠습니까?")){
          alert("응모가 완료되었습니다.")
          //응모 함수
        }
        
      }} >
        응모하기
      </button>
    </div>
  );
}