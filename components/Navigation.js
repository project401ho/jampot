import React, {useState} from 'react'
import Link from "next/link"
import styles from "../styles/Home.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faStar,faCookieBite } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'

export default function Navigation(props) {
  const {expandMenu, userData} = props
  return (
    <>
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
        <FontAwesomeIcon className={styles.menu} icon={faBars}></FontAwesomeIcon>
      </a>
    </div>
    {
      userData 
      &&
      <div className={styles.Navigation_userdata_container}>
        {
          userData !== null 
          &&
          <>
          <div className={styles.Navigation_userdata}>            
            
            <span className={styles.nav_tickets} >⭐</span>

            <p className={styles.Navigation_userdata}>{userData && userData.ticket}</p>   
          </div>
          <div className={styles.Navigation_userdata}>

            <span className={styles.nav_tickets} >🍪</span>

            <p className={styles.Navigation_userdata}>{props.userData && userData.freeTicket}</p>   
          </div>
          </>
        }      
      </div>
    }
    
    </>
  );
}