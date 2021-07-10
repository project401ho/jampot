/* eslint-disable @next/next/no-img-element */
import React, {useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchProductImage } from '../../lib/graphql'

export default function Product({_url, user,isSignInModalOpen,_productList}) {
  const [productList,setProductList] = useState(_productList)
  const [productIdx, setproductIdx] = useState(0)
  const [currentProduct,setcurrentProduct] = useState(productList[0])
  const [url, seturl] = useState(_url)
  const [urlList, seturlList] = useState([{url:_url,filename:productList[0].image}])
  return (
    <div className={styles.Product_container}>
      <h2 className = {styles.Product_title}>
        {currentProduct.title}
      </h2>
      <div className={styles.Product_content_container}>
        <a onClick={async (e)=>{
          e.preventDefault()
          let tempidx = productIdx
          if(productIdx > 0){
            tempidx -= 1
          }
          else{
            tempidx = productList.length-1
          }
          if(productList[tempidx].image !== currentProduct.image){
            let urlListIdx =urlList.findIndex((item)=>item.filename===productList[tempidx].image)
            if(urlListIdx >= 0){
              seturl(urlList[urlListIdx].url)
            }
            else{
              let tempurl = await fetchProductImage(productList[tempidx].image)
              let temp = {url:tempurl,filename:productList[tempidx].image}
              let templist = [...urlList].concat(temp)
              seturl(tempurl)
              seturlList(templist)
            }            
          } 
          setproductIdx(tempidx)
          setcurrentProduct(productList[tempidx])
        }}>
          <FontAwesomeIcon className="faIcons" icon={faChevronLeft} size="sm"></FontAwesomeIcon>
        </a>
        <div className={styles.Product_image_container}>
          {/* <img src={_url} alt="product image"></img> */}
          <Image
            src={url}
            alt="test"
            width={"300"}
            height={"300"}
            unoptimized={true}
          />
        </div>
        <a onClick={async (e)=>{
          e.preventDefault()
          let tempidx = productIdx
          if(productIdx < productList.length-1){
            tempidx += 1
          }
          else{
            tempidx = 0
          }
          if(productList[tempidx].image !== currentProduct.image){
            let urlListIdx =urlList.findIndex((item)=>item.filename===productList[tempidx].image)
            if(urlListIdx >= 0){
              seturl(urlList[urlListIdx].url)
            }
            else{
              let tempurl = await fetchProductImage(productList[tempidx].image)
              let temp = {url:tempurl,filename:productList[tempidx].image}
              let templist = [...urlList].concat(temp)
              seturl(tempurl)
              seturlList(templist)
            }            
          }  
          setcurrentProduct(productList[tempidx])
          setproductIdx(tempidx)
        }}>
          <FontAwesomeIcon className="faIcons" icon={faChevronRight} size="sm"></FontAwesomeIcon>
        </a>
      </div>
      <button className={styles.Product_apply_button} onClick={()=> {

        if(user === null) {
          isSignInModalOpen()
        }
       
      }} >
        응모하기
      </button>
    </div>
  );
}