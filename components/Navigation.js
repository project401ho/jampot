import React, {useState} from 'react'
import Link from "next/link"
import styles from "../styles/Home.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navigation(props) {
  const {user,isSignInModalOpen} = props

  return (
    <div className={styles.Navigation_container}>
      <Link href="/">
        <a>
          <h1>Jampot logo</h1>
        </a>
      </Link>
      {
        user!==null
        ?
        <Link href="/mypage">
          <a>
            <FontAwesomeIcon className="faIcons" icon={faUser} size="sm"></FontAwesomeIcon>
          </a>
        </Link>        
        :
        <a onClick={(e)=>{
          e.preventDefault()
          isSignInModalOpen()
        }}>
          <FontAwesomeIcon className="faIcons" icon={faUser} size="sm"></FontAwesomeIcon>
        </a>      
        }

      <FontAwesomeIcon className="faIcons" icon={faBars} size="sm"></FontAwesomeIcon>
    </div>
  );
}