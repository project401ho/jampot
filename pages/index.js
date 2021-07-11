import React, {useState, useEffect} from 'react'
import {Auth, DataStore, Predicates, SortDirection, Storage } from "aws-amplify"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Product from '../components/home/Product'
import SignIn from '../components/home/Signin'
import SignUp from '../components/home/SignUp'
import Navigation from '../components/Navigation'
import {Product as ProductDS, User as UserDS} from '../src/models'



export const siteTitle = "잼팟"


export async function getServerSideProps() {
 
  let productlist = await DataStore.query(ProductDS, Predicates.ALL, {
    sort: item => item.createdAt(SortDirection.ASCENDING)
  })
  let temp = await DataStore.query(UserDS)
  console.log(temp);
  // console.log(productlist);
  temp = JSON.parse(JSON.stringify(temp))
  productlist = JSON.parse(JSON.stringify(productlist))
  const _url = await Storage.get(productlist[0].image)

  return {
    props: {
      productlist,
      _url,
      temp,
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
    console.log("WTF");
    Auth.currentAuthenticatedUser()
    .then(async (e) => {        
      setUser(e)
      fetchUserData(e.id)
    }) 
    .catch((error)=>{console.log(error);}) 

    async function fetchUserData(id) {
      const userData = await DataStore.query(UserDS,id)      
      setUserData(userData[0])      
    }
    const userData_subscription = DataStore.observe(UserDS).subscribe(() => fetchUserData())
    
    async function fetchProductLists() {
      const productList = await DataStore.query(ProductDS, Predicates.ALL, {
        sort: item => item.createdAt(SortDirection.ASCENDING)
      })      
      // console.log(productList);
      setproductList(productList)      
    }

    const productList_subscription = DataStore.observe(ProductDS).subscribe(() => fetchProductLists())

    return () => {
      userData_subscription.unsubscribe()
      productList_subscription.unsubscribe()

    }
  },[])
  

  // testuserdata.map(user=>console.log(user.email))

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
      <button onClick={async ()=>{

        let tempProduct = await DataStore.query(ProductDS,productList[0].id)
        await DataStore.save(ProductDS.copyOf(tempProduct,updated=>{
          updated.title = "CHANGED"
        }))
        await DataStore.save(UserDS.copyOf(userData, updated=>{
          updated.ticket += 1
        }))
      }}> 
      구독 테스트
      </button>
      {
        userData !== null &&<p>
        email : {userData.email}
        <br/>
        ticket: {userData.ticket}
        
      </p>
      }
      
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
