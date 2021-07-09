import {Auth} from "aws-amplify"

export async function SingOut (){
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
    console.log(user);
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

