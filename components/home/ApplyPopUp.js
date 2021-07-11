import React, {useState} from 'react'
import styles from "./ApplyPopUp.module.scss";

export default function ApplyPopUp(props) {
  const {isOpen, close} = props;
  let clickInside = false 
  return (
    <>
        {isOpen ? (  
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
                  <h1>응모 완료 ㅎㅎ</h1>
                  

                  <button className={styles.ApplyPopUpBtn} >
                    확인
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
  );
}