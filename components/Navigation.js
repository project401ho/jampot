import React, {useState} from 'react'
import Link from "next/link"
import styles from "../styles/Home.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'

export default function Navigation(props) {
  const {expandMenu} = props
  return (
    <div className={styles.Navigation_container}>
      <Link href="/">
        <a className={styles.Navigation_logo}>
          
          <h1 className={styles.Navigation_logotxt}>jampot</h1>
        </a>
      </Link>
      
      <a 
        className={styles.Navigation_menu}
        onClick={(e)=>{
          e.preventDefault()
          expandMenu()
      }}>
        <FontAwesomeIcon className="faIcons" icon={faBars} size="sm"></FontAwesomeIcon>
      </a>
    </div>
  );
}