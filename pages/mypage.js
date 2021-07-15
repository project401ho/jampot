import React, {useState, useEffect} from 'react'
import Link from "next/link"
import Head from 'next/head'
import styles from '../styles/Profile.module.css'
import UserInfo from '../components/mypage/UserInfo'
import AppliedList from '../components/mypage/AppliedList'
import {Auth, DataStore, SortDirection} from "aws-amplify"
import {Product as ProductDS, User as UserDS} from '../src/models'
import { faUserAltSlash } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'

export const siteTitle = "잼팟"

function MyPage() {
  const [user,setUser] = useState(null)
  const [userData,setUserData] = useState(null)
  const [appliedProductList,setappliedProductList] = useState([])
  const [page, setpage] = useState(0)
  
  async function fetchappliedProductList(id,page) {
    let newpage = page
    let productlist = await DataStore.query(ProductDS, c=>c.applicants("contains",id), {
      sort: item => item.createdAt(SortDirection.DESCENDING),
      page: page,
      limit: 4,  
    })      
    if(productlist.length < 1){
      productlist = await DataStore.query(ProductDS, c=>c.applicants("contains",id), {
        sort: item => item.createdAt(SortDirection.DESCENDING),
        page: 0,
        limit: 4,        
      });
      newpage = 0
    }
    setappliedProductList(productlist)      
    return newpage
  }

  useEffect(() => {
    
    let test = "test"
    let userData_subscription = null

    Auth.currentAuthenticatedUser()
    .then((e) => {        
      setUser(e)      
      fetchUserData(e.attributes.email)  
      console.log(e.attributes.email);
      fetchappliedProductList(e.attributes.email,page)    
      test = e.attributes.email
    }) 
    .catch((error)=>{console.log(error);})
   
    async function fetchUserData(id) {

      const userData = await DataStore.query(UserDS,id)      
      setUserData(userData)      
    }
    
    
      

    userData_subscription = DataStore.observe(UserDS).subscribe(() => fetchUserData(test))
    const appliedProductList_subscription = DataStore.observe(ProductDS).subscribe(() => fetchappliedProductList(test,page))

    return () => {
      userData_subscription.unsubscribe()
      appliedProductList_subscription.unsubscribe()

    }
  },[]) 

  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Link className={styles.logo} href="/">
        <a >
          <h1 className={styles.logotxt}>jampot</h1>
        </a>
      </Link>
      <UserInfo 
        user = {user}
        userData={userData}
      />
      <AppliedList
        appliedProductList={appliedProductList}
        userData={userData}
        page={page}
        setpage={(newpage)=>setpage(newpage)}
        fetchappliedProductList={(email,page)=>fetchappliedProductList(email,page)}
      />
      {/* <Footer/> */}
    </div>
  );
}

export default MyPage
