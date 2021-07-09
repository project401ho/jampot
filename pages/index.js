import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Product from '../components/home/Product'
import SignIn from '../components/home/Signin'
import SignUp from '../components/home/SignUp'
import Navigation from '../components/Navigation'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { uploadImage, createProduct, fetchProduct, fetchProductImage } from '../lib/products'
import { isLoggedIn} from '../lib/signin'


export const siteTitle = "잼팟"


export async function getServerSideProps() {
  const user = await isLoggedIn()
  const product = await fetchProduct()
  const _url = await fetchProductImage("neogulman.png")
  return {
    props: {
      product,
      _url,
      user
    }
  }
}


function Home(props) {
  const [file,setFile] = useState(null)
  const [user,setUser] = useState(props.user)
  const [isSignInModalOpen,setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen,setIsSignUpModalOpen] = useState(false)
  
  const product = props.product
  const _url = props._url
  

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
