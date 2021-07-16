import React, {useState} from 'react'
import styles from "../../styles/ResultPopUp.module.css";
import Image from 'next/image'
import {sendLink as KakaosendLink, sendCustomLink as KakaosendCustomLink} from "../../lib/kakaotalkshare"

export default function ResultPopUp(props) {
  const [popup,setpopup] = useState(null)

  let title = ""
  let content = ""
  let buttonValue = ""
  let imageURL = ""

  if(popup === null) {
    if(props.isWinner){
      title = "🎉축하합니다!🎉"
      content = "🎉🎉추카포카해🎉🎉"
      buttonValue = "코드 받기!"
      imageURL = "/dangchumtrans.png"
      setpopup ( 
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.image}>            
            <Image
              src={imageURL}            
              layout='fill'
              objectFit='fill'
              alt={"image"}
              className={styles.image_rgb}
            />
          </div>
          <div className={styles.content}>
            {content}
          </div>

          <input 
            type="button" 
            className={styles.button} 
            value={"자랑하고 쿠키받기"}
            onClick={()=>{
              KakaosendCustomLink()
              
              props.close()
            }}

          />        
          <input 
            type="button" 
            className={styles.button} 
            value={buttonValue}
            onClick={()=>props.close()}

          />
        </div>
      </div>
      )
    }
    else{
      title = "아쉽지만.."
      content = "위로 선물은 너굴맨이 준비했으니 안심하라구!"
      buttonValue = "고마웡"
      imageURL = "/neogulman.webp"
      setpopup(
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.image}>            
            <Image
              src={imageURL}            
              layout='fill'
              objectFit='fill'
              alt={"image"}            
            />
          </div>
          <div className={styles.content}>
            {content}
          </div>

          <input 
            type="button" 
            className={styles.button} 
            value={"눈물젖은 쿠키받기"}
            onClick={()=>props.close()}
          />              
          
        </div>
      </div>
      )
      
    }
  }
  
  return (
    <>
      {popup}
    </>
  );
}