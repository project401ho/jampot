import React, {useState, useEffect} from 'react'
import {Auth, DataStore, Predicates, SortDirection, Storage } from "aws-amplify"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MenuExpand from '../components/home/MenuExpand'
import Product from '../components/home/Product'
import ListExpand from '../components/home/ListExpand'
import SignIn from '../components/home/Signin'
import SignUp from '../components/home/SignUp'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PayModule from '../components/PayModule'

import {Product as ProductDS, User as UserDS} from '../src/models'

import { SignOut } from '../lib/signin'
import { DISCARD } from "@aws-amplify/datastore";


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
  const [allProductList,setallproductList] = useState([])
  const [isSignInModalOpen,setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen,setIsSignUpModalOpen] = useState(false)
  const [isMenuExpand,setisMenuExpand] = useState(false)
  const [isListExapnd,setisListExapnd] = useState(true)
  const [urlList, seturlList] = useState([{url:props._url,filename:props.productlist[0].image}])
  const [isApplyPopUpOpen, setisApplyPopUpOpen] = useState(false)
  const [page, setpage] = useState(0)

  const _url = props._url 


  useEffect(() => {
    if (window.Kakao.Auth == null) {
      window.Kakao.init("dd00de50a65b383ef223f46012f8d438");
    }
    let test = "test"


    DataStore.configure({
      errorHandler: (error) => {
        console.warn("Unrecoverable error", { error });
      },
      conflictHandler: async (data) => {
        // Example conflict handler
        const modelConstructor = data.modelConstructor;

        if(modelConstructor === ProductDS){
          let localModel = data.localModel
          let product = await DataStore.query(ProductDS, localModel.id)
          let email = null
          const newModel = modelConstructor.copyOf(localModel, (d) => {
            email = d.applicants.pop()
          });         
          let localUserData = await DataStore.query(UserDS,email)
          await DataStore.save(UserDS.copyOf(localUserData,updated => {
            if(product.isFree){
              updated.freeTicket += 1
            }
            else{
              updated.ticket += 1
            }
            if(!newModel.applicants.some(e=>updated.email === e)){
              updated.appliedList.pop()
            }
          }))
          setisApplyPopUpOpen(false)
          if(product.isFree){
            alert("동시요청으로 인해 환불처리 되었습니다. 😅 \n환불내역: 🍪쿠키 + 1개")
          }
          else{
            alert("동시요청으로 인해 환불처리 되었습니다. 😅 \n환불내역: ⭐스타 + 1개")
          }
        } 
        
        return DISCARD;
      },
    });

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
    fetchProductList_2()
    async function fetchProductList_2() {
      const productlist = await DataStore.query(ProductDS, c=>c.type("eq","open"), {
        sort: item => item.createdAt(SortDirection.ASCENDING)
      })      
      setproductList(productlist)      
    }    
    
    const userData_subscription = DataStore.observe(UserDS).subscribe(() => fetchUserData(test))
    const productList_subscription = DataStore.observe(ProductDS).subscribe((msg) =>{
      fetchProductList_2()
    })
    return () => {
      userData_subscription.unsubscribe()
      productList_subscription.unsubscribe()

    }
  },[])
  
  async function fetchAndSubscribeAllProductList(page){
    fetchAllProductList(page)
    async function fetchAllProductList(page){
      let allProductList = await DataStore.query(ProductDS, c=>c.type("eq","open"), {
        sort: item => item.createdAt(SortDirection.ASCENDING),
        page: page,
        limit: 4,        
      })
      if(allProductList.length < 1 ){
        page = 0;
        allProductList = await DataStore.query(ProductDS, c=>c.type("eq","open"), {
          sort: item => item.createdAt(SortDirection.ASCENDING),
          page: 0,
          limit: 4,        
        });
        
      }
      setallproductList(allProductList)      
      setpage(page);
    }

    const subscription = DataStore.observe(ProductDS).subscribe(() => {      
      fetchAllProductList(page)
    })
    
    return () => {
      subscription.unsubscribe()      
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="online event apply website" />
        <meta name="og:title" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Navigation
        expandMenu={()=>setisMenuExpand(true)}
        userData={userData}
      />

      {/* <button className={styles.signout} onClick={SignOut}/> */}
      
      

      {
        isListExapnd
        ?        
        <>
        <h2 className={styles.list_title}>👓</h2>
        <ListExpand
          user={user}  
          userData={userData} 
          urlList={urlList}
          isSignInModalOpen={()=>setIsSignInModalOpen(true)}
          seturlList={(list)=>seturlList(list)}
          isApplyPopUpOpen={isApplyPopUpOpen}
          setisApplyPopUpOpen={(bool)=>setisApplyPopUpOpen(bool)}
          page = {page}
          allProductList={allProductList}
          fetchAndSubscribeAllProductList={(page)=>fetchAndSubscribeAllProductList(page)}     

        />
        </>
        :
        <>
        <h2 className={styles.list_title}>🔥</h2>
        <Product 
          user={user}  
          userData={userData}
          urlList = {urlList}          
          isSignInModalOpen={()=>setIsSignInModalOpen(true)}
          setUrlList={(list)=>seturlList(list)}
          isApplyPopUpOpen={isApplyPopUpOpen}
          setisApplyPopUpOpen={(bool)=>setisApplyPopUpOpen(bool)}
          url={_url} 
          productList = {productList}                     
            
        />
        </>
      }
      <Footer/>
      {
        isMenuExpand === true
        ?
        <MenuExpand          
          user={user}
          isSignInModalOpen={()=>setIsSignInModalOpen(true)}
          close={()=>setisMenuExpand(false)}
          isListExapnd={isListExapnd}
          setisListExapnd={(bool)=>setisListExapnd(bool)}
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
