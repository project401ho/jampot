import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Product from '../components/home/Product'
import Navigation from '../components/home/Navigation'

export const siteTitle = "잼팟"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="online event apply website" />
        <meta name="og:title" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation/>
      <Product/>
    </div>
  )
}
