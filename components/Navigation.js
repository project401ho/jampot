import React, {useState} from 'react'
import Link from "next/link"
import styles from "../styles/Home.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navigation(props) {
  const {expandMenu} = props
  return (
    <div className={styles.Navigation_container}>
      <Link href="/">
        <a>
          <h1>Jampot logo</h1>
        </a>
      </Link>
      
      <a onClick={(e)=>{
        e.preventDefault()
        expandMenu()
      }}>
        <FontAwesomeIcon className="faIcons" icon={faBars} size="sm"></FontAwesomeIcon>
      </a>
    </div>
  );
}