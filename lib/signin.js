import {Auth} from "aws-amplify"
export async function SignUp(nickname,email,password){
  await Auth.signUp({
    username: email, 
    password: password, 
    attributes:{
      email: email, 
      nickname: nickname
    }
  })
  .then(()=>{
    return true
  })
  .catch((error)=>{
    if(error['code'] === "UsernameExistsException"){ 
      alert("이미 등록된 유저입니다.")
    }
    else{
      console.log(error);
    }
  })
}

export async function SignOut (){
  await Auth.signOut()
  console.log("log out");
}

export async function isLoggedIn (){
  let user = null
  Auth.currentAuthenticatedUser()
    .then((_user)=> user = _user)
    .catch(()=>console.log("no user"))
  console.log(user);
  return user
}

export async function SignIn (email, password, setUser) {
  try{
    let user = await Auth.signIn(email, password)    
    setUser(user)
    return true
  } catch(error){
    
    if(error.code === "UserNotFoundException"){
      alert("등록되지 않은 유저 입니다.")
    }
    if(error.code === "NotAuthorizedException"){
      alert("ID 혹은 비밀번호를 다시 확인해주세요")
    }
    console.log("error in signing in 123", error);
  }
}

