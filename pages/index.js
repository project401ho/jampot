import React, {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Product from '../components/home/Product'
import Navigation from '../components/home/Navigation'
import {withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { uploadImage, createProduct, fetchProduct, fetchProductImage } from '../lib/products'

export const siteTitle = "잼팟"


export async function getStaticProps() {
  const product = await fetchProduct()
  const _url = await fetchProductImage("neogulman.png")

  return {
    props: {
      product,
      _url,
    }
  }
}

function Home(props) {
  const [file,setFile] = useState(null)

  const product = props.product
  const _url = props._url

  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="online event apply website" />
        <meta name="og:title" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation/>

      <Product _url={_url}/>
    </div>
  )
}

export default Home
