import React, {useState} from 'react'
import Image from 'next/image'
import styles from './UserInfo.module.css'

export default function UserInfo(props) {
  const [userData,setUserData] = useState(null)
  const {user} = props

  return (
    <div className='UserInfo_container'>
      <Image
        priority
        src="/images/profile.png"
        className={styles.borderCircle}
        height={80}
        width={80}
        alt="profile image"
        unoptimized={true}
      />    
      <p>{user && user.attributes.nickname}</p>
    </div>
  );
}