import React, {useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function Product(props) {
  const [test,setTest] = useState("")

  return (
    <div className={styles.Product_container}>
      <div className={styles.Product_image_container}>
        {/* left arrow */}
        <Image 
          priority
          src="/GOT IMAGE"
          className={styles.Product_image}
          height={100}
          width={100}
          alt={"image of product"}  
        />
        {/* right arrow */}
      </div>
      <button className={styles.Product_apply_button} onClick={()=> alert("응모가 완료되었습니다")} >
        응모하기
      </button>
    </div>
  );
}