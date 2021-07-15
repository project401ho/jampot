import React, { Component } from "react";
import Link from "next/link"
import {  SignIn as SignInLib} from '../../lib/signin'
import styles from "../../styles/SignIn.module.scss";
import VerifyEmail from "./VerifyEmail";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    isOpenVerify: false,
  };



  stateHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };   ////계산된 속성명 사용

  render() {
    const { isOpen, close } = this.props;   //아까 버튼에서 props로 가져온것
    let clickInside = false
    return (
      <>
        {
        isOpen 
        ?         
          <div className={styles.modal}  onClick={()=>{
              if(clickInside){
                clickInside = false
                return
              }
              close()
            }}>
            <div>
              <div className={styles.loginModal}  onClick={()=>clickInside=true}>
                <span className={styles.close} onClick={()=>close()}>
                  &times;
                </span>
                <h1>로그인</h1>
                <div className={styles.modalContents}>

                  <input
                    name="email"
                    className={styles.loginId}
                    type="text"
                    placeholder="이메일"
                    onChange={this.stateHandler}
                  />
                  <input
                    name="password"
                    className={styles.loginPw}
                    type="password"
                    placeholder="비밀번호"
                    onChange={this.stateHandler}
                  />
                  <div className={styles.loginMid}>
                    <div className={styles.autoLogin}>아이디/비밀번호 찾기</div>
                  </div>
                  <button className={styles.loginBtn} onClick={async ()=>{
                    let res = await SignInLib(this.state.email,this.state.password)
                    console.log(res);
                    if(res === "UserNotConfirmedException"){
                      this.setState({isOpenVerify:true})
                    }
                    else if(res !== null){
                      window.location.reload()
                    }
                                        
                    //link move
                  }}>
                    {" "}
                    로그인{" "}
                  </button>
                  <div className={styles.loginEnd}>
                    <div className={styles.loginLine}>
                      {"회원이 아니신가요? "}
                      <a onClick={(e)=>{
                          e.preventDefault()
                          close()
                          this.props.openSignUp()
                        }}>
                        회원가입
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        : 
          null
        }
        {
          this.state.isOpenVerify &&
          <VerifyEmail
            email={this.state.email}
            password={this.state.password}
            close={()=>this.setState({isOpenVerify:false})}
          />
        }
      </>
    );
  }
}

export default SignIn;