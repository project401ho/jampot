import React, { Component } from "react";
import Link from "next/link"
import { SignIn as SignInLib, SignUp as SignUpLib } from '../../lib/signin'
import { createUser } from '../../lib/graphql'
import styles from "./SignIn.module.scss";


class SignUp extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    password_confirm:"",
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
                    name="nickname"
                    className={styles.loginPw}
                    type="text"
                    placeholder="유저 닉네임  "
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
                  
                  <button className={styles.loginBtn} onClick={async ()=>{
                    if(this.state.password === this.state.password_confirm){
                      if(await SignUpLib(this.state.nickname,this.state.email,this.state.password)){
                        console.log("signed up");
                        let _user = await SignInLib(this.state.email,this.state.password)
                        let temp = {
                          id:this.state.email,
                          email:this.state.email,
                          nickname: this.state.nickname,
                          ticket:0,
                          freeTicket:0,
                          appliedList:[],
                        }
                        await createUser(temp)
                        this.props.setUser(_user)
                        close()
                        
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