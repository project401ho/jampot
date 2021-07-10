import React, {useState, useEffect} from 'react'
import {Auth} from "aws-amplify"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Product from '../components/home/Product'
import SignIn from '../components/home/Signin'
import SignUp from '../components/home/SignUp'
import Navigation from '../components/Navigation'
import { fetchProduct, fetchProductImage, fetchProductListByDate } from '../lib/graphql'



export const siteTitle = "잼팟"


export async function getServerSideProps() {
  const productlist = await fetchProductListByDate(null)
  const _url = await fetchProductImage(productlist[0].image)

  return {
    props: {
      productlist,
      _url,
    }
  }
}

function Home(props) {
  const [user,setUser] = useState(null)
  const [productList,setproductList] = useState(props.productlist)
  const [isSignInModalOpen,setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen,setIsSignUpModalOpen] = useState(false)
  const _url = props._url


  Auth.currentAuthenticatedUser()
    .then((e) => {        
      if(user === null || user.username !== e.username){
        setUser(e)
      }
    }) 
    .catch(()=>{
      console.log("guest user");
    }) 
  
  const signInModalClose = () => {
    setIsSignInModalOpen(false)
  }
  const signInModalOpen = () => {
    console.log(isSignInModalOpen);
    setIsSignInModalOpen(true)
  }
  const signUpModalClose = () => {
    setIsSignUpModalOpen(false)
  }
  const signUpModalOpen = () => {
    setIsSignUpModalOpen(true)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="online event apply website" />
        <meta name="og:title" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation
        user={user}
        isSignInModalOpen={signInModalOpen}
      />
      

      <Product 
        _url={_url} 
        user={user}  
        isSignInModalOpen={signInModalOpen}
        _productList = {productList}
      />
     
      <SignIn 
        isOpen={isSignInModalOpen} 
        setUser={(_user)=>setUser(_user)} 
        close={signInModalClose}
        openSignUp={signUpModalOpen}
      />
      <SignUp
        isOpen={isSignUpModalOpen} 
        setUser={(_user)=>setUser(_user)} 
        close={signUpModalClose}
      />
    </div>
  )
}

export default Home
