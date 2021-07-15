import React, {useState} from 'react'
import styles from '../../styles/VerifyEmail.module.scss';
import { ConfirmSignUp as ConfirmSignUpLib, SignIn as SignInLib, resendConfirmationCode as resendConfirmationCodeLib} from '../../lib/signin'
import { createUser } from '../../lib/graphql'

export default function VerifyEmail(props) {
  const[confirmCode,setconfirmCode] = useState("")

  async function confirmEmail(email, code){
    console.log(code);
    if(await ConfirmSignUpLib(email, code)){
      
      window.location.reload()

    }
  }
  let clickInside = false
  return (
    <div className={styles.container} onClick={()=>{
      if(clickInside){
        clickInside = false
        return
      }
      props.close()
    }}>
      <div className={styles.item_container} onClick={()=>clickInside=true}>
        <span className={styles.close} onClick={()=>props.close()}>
          &times;
        </span>
        <div className={styles.item_wrapper}>
          <h1 className={styles.title}>이메일 인증</h1>          
          <p>이메일 인증을 하셔야 <br/> 서비스를 이용 할 수 있습니다 😀</p>
          <p>이메일 주소: {props.email}</p>
          <div className={styles.sendcode_container}>
            <input className={styles.codeinput} type="text" placeholder="인증번호 입력란" onChange={(e)=>setconfirmCode(e.target.value)}/>
            <button className={styles.sendcode} onClick={()=>{
              resendConfirmationCodeLib(props.email)          
            }}>
              인증번호 받기
            </button>          
          </div>
        </div>
        <button className={styles.submit} onClick={()=>{
          confirmEmail(props.email,confirmCode)
        }}>
          인증 확인
        </button>
      </div>
      <span className={styles.close} onClick={()=>close()}>
        &times;
      </span>
    </div>
  );
}