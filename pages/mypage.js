import React, {useState} from 'react'
import Link from "next/link"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { SignOut } from '../lib/signin'
import UserInfo from '../components/mypage/UserInfo'
import AppliedList from '../components/mypage/AppliedList'
import {Auth} from "aws-amplify"
import { fetchProductList, fetchProductImage } from '../lib/graphql'

export const siteTitle = "잼팟"

export async function getServerSideProps() {
  // const product = await fetchProductList(null)
  // const _url = await fetchProductImage("neogulman.png")
  // 
  return {
    props: {
      // productList,      
      // 
    }
  }
}

export default function MyPage(props) {
  const [user,setUser] = useState(null)
  const [productList,setProductList] = useState(null)

  Auth.currentAuthenticatedUser()
    .then((e) => {        
      if(user === null || user.username !== e.username){
        setUser(e)
      }
    })
    .catch(()=>{
      console.log("guest user");
    }) 
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
      />
      <AppliedList
        productList={productList}
      />
      <button onClick={SignOut}>로그아웃</button>
    </div>
  );
}