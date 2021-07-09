import React, { Component } from "react";
import Link from "next/link"
import { SignIn as SignInLib } from '../../lib/signin'
import styles from "./SignIn.module.scss";


class SignIn extends Component {
  state = {
    email: "",
    password: "",
    password_confimr:"",
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
        {isOpen ? (  
          <div className={styles.modal}  onClick={()=>{
              if(clickInside){
                clickInside = false
                return
              }
              close()
            }}>
            <div>
              <div className={styles.loginModal} onClick={()=>clickInside=true}>
                <span className={styles.close} onClick={()=>close()}>
                  &times;
                </span>
                <h1>가입하기</h1>

                <div className={styles.modalContents} >

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
                  <input
                    name="password_confirm"
                    className={styles.loginPw}
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={this.stateHandler}
                  />
                  
                  <button className={styles.loginBtn} onClick={async ()=>{
                    if(await SignInLib(this.state.email,this.state.password,(_user)=>this.props.setUser(_user))){
                      close()
                    }
                    
                    //link move
                  }}>
                    {" "}
                    가입하기{" "}
                  </button>                 
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default SignIn;