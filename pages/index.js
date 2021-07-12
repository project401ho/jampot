import React, {useState, useEffect} from 'react'
import {Auth, DataStore, Predicates, SortDirection, Storage } from "aws-amplify"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MenuExpand from '../components/home/MenuExpand'
import Product from '../components/home/Product'
import SignIn from '../components/home/Signin'
import SignUp from '../components/home/SignUp'
import Navigation from '../components/Navigation'
import {Product as ProductDS, User as UserDS} from '../src/models'

import { SignOut } from '../lib/signin'


export const siteTitle = "잼팟"


export async function getServerSideProps() {
 
  let productlist = await DataStore.query(ProductDS, c=>c.type("eq","open"), {
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
  const [isMenuExpand,setisMenuExpand] = useState(false)
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
    
    async function fetchProductList_2() {
      let productlist = await DataStore.query(ProductDS, c=>c.type("eq","open"), {
        sort: item => item.createdAt(SortDirection.ASCENDING)
      })      
      setproductList(productlist)      
    }
      
    console.log("set subscription");

    userData_subscription = DataStore.observe(UserDS).subscribe(() => fetchUserData(test))
    console.log("done set");
    const productList_subscription = DataStore.observe(ProductDS).subscribe(() => fetchProductList_2())

    return () => {
      userData_subscription.unsubscribe()
      productList_subscription.unsubscribe()

    }
  },[])
  


  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="online event apply website" />
        <meta name="og:title" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet"/>
      </Head>
      
      <Navigation
        expandMenu={()=>setisMenuExpand(true)}
      />
      {/* <button onClick={SignOut}>로그아웃</button> */}
      

      <Product 
        url={_url} 
        user={user}  
        isSignInModalOpen={()=>setIsSignInModalOpen(true)}
        productList = {productList}
        userData={userData}        
      />
      {
        isMenuExpand
        ?
        <MenuExpand          
          user={user}
          isSignInModalOpen={()=>setIsSignInModalOpen(true)}
          close={()=>setisMenuExpand(false)}
        />
        :null
      }
      <SignIn 
        isOpen={isSignInModalOpen} 
        setUser={(_user)=>setUser(_user)} 
        close={()=>setIsSignInModalOpen(false)}
        openSignUp={()=>setIsSignUpModalOpen(true)}
        setUserData={(userData)=>setUserData(userData)}
      />
      <SignUp
        isOpen={isSignUpModalOpen} 
        setUser={(_user)=>setUser(_user)} 
        close={()=>setIsSignUpModalOpen(false)}
      />
      
    </div>
  )
}

export default Home
