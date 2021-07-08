import React, {useState} from 'react'
import Link from "next/link"
import styles from '../../styles/Home.module.css'

export default function Navigation(props) {
  const [test,setTest] = useState("")

  return (
    <div className={styles.Navigation_container}>
      <Link href="/">
        <a>
          <h1>Jampot logo</h1>
        </a>
      </Link>
    </div>
  );
}