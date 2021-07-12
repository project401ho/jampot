import React, {useState} from 'react'
import Image from 'next/image'
import styles from './UserInfo.module.css'
import { SignOut } from '../../lib/signin'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCandyCane,faCookieBite } from "@fortawesome/free-solid-svg-icons";

export default function UserInfo(props) {
  const {user,userData} = props

  return (
    <div className={styles.UserInfo_container}>
      <Image
        priority
        src="/defaultprofile.png"
        className={styles.borderCircle}
        height={80}
        width={80}
        alt="profile image"
        unoptimized={true}
      />    
      <p>{user && user.attributes.nickname}</p>
      <button onClick={SignOut}>로그아웃</button>
      <div className={styles.tickets_container}>
        <div className={styles.ticket_holder}>            
          <FontAwesomeIcon className="faIcons_tickets" icon={faCandyCane} ></FontAwesomeIcon>
          <p>{userData && userData.ticket}</p>   
        </div>
        <div className={styles.ticket_holder}>
          <FontAwesomeIcon className="faIcons_tickets" icon={faCookieBite} ></FontAwesomeIcon>  
          <p>{userData && userData.freeTicket}</p>   
        </div>
      </div>
    </div>
  );
}