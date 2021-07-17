import React, {useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/UserInfo.module.css'
import { SignOut } from '../../lib/signin'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar,faCookieBite,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import PayModule from '../PayModule';

export default function UserInfo(props) {
  const {user,userData} = props
  const [showShop, setshowShop] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profile_item_container}>
          <Image
            priority
            src="/defaultprofile.png"
            className={styles.borderCircle}
            height={75}
            width={75}
            alt="profile image"
            unoptimized={true}
          />              
          <button className={styles.signout} onClick={SignOut}>          
            로그아웃
          </button>
        </div>
        
        <div className={styles.nickname_container}>
          <h2 className={styles.nickname}>{user && user.attributes.nickname}</h2>
          <button className={styles.change_nickname}>닉네임 변경</button>
        </div>

      </div>      

      <div className={styles.tickets_container}>
        <div className={styles.ticket_holder}>            
          <span className={styles.tickets} >⭐</span>
          {userData && userData.ticket}   
        </div>
        <div className={styles.ticket_holder}>
          <span className={styles.tickets} >🍪</span>  
          {userData && userData.freeTicket}
        </div>
      </div>
      
      <button className={"starcharge"+showShop.toString()} onClick={(e)=>{
        console.log(e.target.className);
        setshowShop(!showShop)
        
      }}>
        {"⭐ 스타 충전 ⭐"}
      </button>
      {
        showShop &&
        <div className={styles.shop}>
          <PayModule
            quantity={10}
            bonus = {0}
          />
          <PayModule
            quantity={30}
            bonus = {3}
          />
          <PayModule
            quantity={50}
            bonus = {8}
          />
        </div>
      }
    </div>
  );
}