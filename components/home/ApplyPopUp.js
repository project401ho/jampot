import React, {useState} from 'react'
import styles from "../../styles/ApplyPopUp.module.scss";
import {sendLink as KakaosendLink, sendCustomLink as KakaosendCustomLink} from "../../lib/kakaotalkshare"

import {Product as ProductDS, User as UserDS, Prize as PrizeDS} from '../../src/models'
import { DataStore } from "aws-amplify"

export default function ApplyPopUp(props) {
  const {close} = props;
  let clickInside = false 
  return (
    <div className={styles.ApplyPopUp_container}  onClick={()=>{
        if(clickInside){ 
          clickInside=false
          return
        }
        close()
      }}>
      <div onClick={()=>{
        clickInside=true
      }}>
        <div className={styles.ApplyPopUpModal}  >
          <span className={styles.close} onClick={()=>close()}>
            &times;
          </span>
          <div className={styles.modalContents}>
            <h1>응모 완료 🤑</h1>
            <p>친구들과 공유해주세요!<br/> 너굴맨이 좋아하는 쿠키를 받을 수 있어요!</p>
            {
              !props.isFree 
              &&
              <button 
              className={styles.katalkShare}
              onClick={async ()=>{
                KakaosendCustomLink()
                
                close()
              }
              }>홍보하고 쿠키드쉴?</button>
            }
            

            <button className={styles.ApplyPopUpBtn} onClick={()=>close()}>
              확인
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}