import React, {useState} from 'react'
import styles from "../styles/Footer.module.scss"
import Link from 'next/link'

export default function Footer(props) {

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        jampot-info
      </div>
      <div className={styles.laws}>
        <Link href="/privacy"><a>개인정보 처리방침</a></Link>
        {" | "}
        <Link href="/service_policy"><a>이용약관</a></Link>
      </div>
      <div className={styles.info}>
        잼팟 | 프로젝트401호 | 사업자 정보 확인 | 사업자 번호 <br/>
        주소: 서울 강남구 청담동 <br/>
        문의 주소: project401ho@gmail.com <br/>
        Copyright ⓒ 2021 Jampot <br/>
      </div>
    </div>
  );
}