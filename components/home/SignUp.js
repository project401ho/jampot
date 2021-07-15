import React, { Component, useState } from "react";
import Link from "next/link"
import { SignIn as SignInLib, SignUp as SignUpLib, ConfirmSignUp as ConfirmSignUpLib } from '../../lib/signin'
import { createUser } from '../../lib/graphql'
import styles from "../../styles/SignIn.module.scss";


class SignUp extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    password_confirm:"",
    email_confirm_code:"",
    isVerifying: false,
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
                  {
                    this.state.isVerifying 
                    ?
                    <>
                    <p>이메일 인증번호를 입력해주세요</p>
                    <input
                      name="email_confirm_code"
                      className={styles.loginPw}
                      type="text"
                      placeholder="이메일 인증번호"
                      onChange={this.stateHandler}
                    />
                    <button className={styles.loginBtn} onClick={async ()=>
                    {                    
                      if(this.state.password === this.state.password_confirm){
                        if(await ConfirmSignUpLib(this.state.email,this.state.email_confirm_code)){
                          let _user = await SignInLib(this.state.email,this.state.password)
                          let temp = {
                            id:this.state.email,
                            email:this.state.email,
                            nickname: this.state.nickname,
                            ticket:0,
                            freeTicket:0,
                            appliedList:[],
                            checkedAppliedList:[],
                          }
                          await createUser(temp)
                          this.props.setUser(_user)
                          close()
                          window.location.reload()

                        }
                      }
                      else{
                        alert("패스워드를 확인해주세요")
                      }
                      
                      //link move
                    }}>
                      {" "}
                      가입하기{" "}
                    </button>
                    </>
                    :
                    <>
                    <input
                      name="nickname"
                      className={styles.loginPw}
                      type="text"
                      placeholder="유저 닉네임 (변경가능)"
                      onChange={this.stateHandler}
                    />
                    <input
                      name="email"
                      className={styles.loginPw}
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
                    <button className={styles.loginBtn} onClick={async ()=>
                    {                    
                      if(this.state.password === this.state.password_confirm){
                        if(await SignUpLib(this.state.nickname,this.state.email,this.state.password)){                          
                          this.setState({isVerifying:true})
                        }
                      }
                      else{
                        alert("패스워드를 확인해주세요")
                      }
                      
                      //link move
                    }}>
                      {" "}
                      가입하기{" "}
                    </button>
                    </>
                  }
                  
                  
                                   
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default SignUp;