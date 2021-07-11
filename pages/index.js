import React, {useState, useEffect} from 'react'
import {Auth, DataStore, Predicates, SortDirection, Storage } from "aws-amplify"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Product from '../components/home/Product'
import SignIn from '../components/home/Signin'
import SignUp from '../components/home/SignUp'
import Navigation from '../components/Navigation'
import {Product as ProductDS, User as UserDS} from '../src/models'

import { SignOut } from '../lib/signin'


export const siteTitle = "잼팟"


export async function getServerSideProps() {
 
  let productlist = await DataStore.query(ProductDS, Predicates.ALL, {
    sort: item => item.createdAt(SortDirection.ASCENDING)
  })
  productlist = JSON.parse(JSON.stringify(productlist))
  const _url = await Storage.get(productlist[0].image)

  return {
    props: {
      productlist,
      _url,
    }    
  }
}

function Home(props) {
  const [user,setUser] = useState(null)
  const [userData,setUserData] = useState(null)
  const [productList,setproductList] = useState(props.productlist)
  const [isSignInModalOpen,setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen,setIsSignUpModalOpen] = useState(false)
  const _url = props._url


  useEffect(() => {
    
    let test = "test"
    let userData_subscription = null

    Auth.currentAuthenticatedUser()
    .then((e) => {        
      setUser(e)      
      fetchUserData(e.attributes.email)      
      test = e.attributes.email
    }) 
    .catch((error)=>{console.log(error);})
   
    async function fetchUserData(id) {
      const userData = await DataStore.query(UserDS,id)      
      setUserData(userData)      
    }
    

    async function fetchProductLists() {
      const productList = await DataStore.query(ProductDS, Predicates.ALL, {
        sort: item => item.createdAt(SortDirection.ASCENDING)
      })      
      setproductList(productList)      
    }
      
    console.log("set subscription");

    userData_subscription = DataStore.observe(UserDS).subscribe(() => fetchUserData(test))
    console.log("done set");
    const productList_subscription = DataStore.observe(ProductDS).subscribe(() => fetchProductLists())

    return () => {
      userData_subscription.unsubscribe()
      productList_subscription.unsubscribe()

    }
  },[])
  


  const signInModalClose = () => {
    setIsSignInModalOpen(false)
  }
  const signInModalOpen = () => {
    
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
      <button onClick={SignOut}>로그아웃</button>

      <Product 
        url={_url} 
        user={user}  
        isSignInModalOpen={signInModalOpen}
        productList = {productList}
        userData={userData}        
      />
     
      <SignIn 
        isOpen={isSignInModalOpen} 
        setUser={(_user)=>setUser(_user)} 
        close={signInModalClose}
        openSignUp={signUpModalOpen}
        setUserData={(userData)=>setUserData(userData)}
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
