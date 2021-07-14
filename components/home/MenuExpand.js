import React, {useState} from 'react'
import styles from "../../styles/MenuExpand.module.scss";
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faListUl,faSearch } from "@fortawesome/free-solid-svg-icons";

export default function MenuExpand(props) {
  const {
    user,
    isSignInModalOpen,
    close,
    isListExapnd,
    setisListExapnd,
  } = props
  let clickinside = false

  return (
    <div className={styles.MenuExpand_container} onClick={()=>{
      if(clickinside){
        clickinside = false
        return
      }
      close()
    }}>
      <div className={styles.MenuExpandModal} onClick={()=>clickinside=true}>        
        {/* <div className={styles.content_item}>
          <div className={styles.searchBox}>
            <input type="text" className={styles.searchBox_input}/>
            <FontAwesomeIcon className={styles.searchBox_faIcon} icon={faSearch} size="sm"></FontAwesomeIcon>
            
          </div>          
        </div> */}
        
            <div className={styles.content_item} onClick={()=>{
              setisListExapnd(!isListExapnd)
              close()
            }}>
              <FontAwesomeIcon className={styles.faIcon} icon={faListUl} size="sm"></FontAwesomeIcon>
              {isListExapnd ? "추천 보기 ": "리스트 보기"}              
            </div>
        
          {
            user!==null
            ?
            <Link href="/mypage" >
              <a className={styles.content_item}>
                <FontAwesomeIcon className={styles.faIcon} icon={faUser} size="sm"></FontAwesomeIcon>
                프로필
              </a>
            </Link>    
            :
            <div className={styles.content_item} onClick={(e)=>{
              e.preventDefault()
              console.log("open sign in");
              isSignInModalOpen()
            }}>
              <FontAwesomeIcon className={styles.faIcon} icon={faUser} size="sm"></FontAwesomeIcon>
     
            프로필
            </div>        
          }
          
        
      </div>
    </div>
  );
}