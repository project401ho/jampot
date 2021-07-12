import React, {useState, useEffect} from 'react'
import Link from "next/link"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UserInfo from '../components/mypage/UserInfo'
import AppliedList from '../components/mypage/AppliedList'
import {Auth, DataStore, SortDirection} from "aws-amplify"
import {Product as ProductDS, User as UserDS} from '../src/models'

export const siteTitle = "잼팟"

export default function MyPage() {
  const [user,setUser] = useState(null)
  const [userData,setUserData] = useState(null)
  const [appliedProductList,setappliedProductList] = useState([])

  useEffect(() => {
    
    let test = "test"
    let userData_subscription = null

    Auth.currentAuthenticatedUser()
    .then((e) => {        
      setUser(e)      
      fetchUserData(e.attributes.email)  
      fetchappliedProductList(e.attributes.email)    
      test = e.attributes.email
    }) 
    .catch((error)=>{console.log(error);})
   
    async function fetchUserData(id) {
      const userData = await DataStore.query(UserDS,id)      
      setUserData(userData)      
    }
    
    async function fetchappliedProductList(id) {
      let productlist = await DataStore.query(ProductDS, c=>c.applicants("contains",id), {
        sort: item => item.createdAt(SortDirection.DESCENDING)
      })      
      setappliedProductList(productlist)      
    }
      

    userData_subscription = DataStore.observe(UserDS).subscribe(() => fetchUserData(test))
    console.log("done set");
    const appliedProductList_subscription = DataStore.observe(ProductDS).subscribe(() => fetchappliedProductList(test))

    return () => {
      userData_subscription.unsubscribe()
      appliedProductList_subscription.unsubscribe()

    }
  },[]) 

  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="online event apply website" />
        <meta name="og:title" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Link href="/">
        <a>
          <h1>Jampot logo</h1>
        </a>
      </Link>
      <UserInfo 
        user = {user}
        userData={userData}
      />
      <AppliedList
        appliedProductList={appliedProductList}
        userData={userData}
      />
    </div>
  );
}