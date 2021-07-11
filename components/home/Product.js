import React, {useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchProductImage} from '../../lib/graphql'

import {Product as ProductDS, User as UserDS} from '../../src/models'
import { DataStore } from "aws-amplify"


export default function Product(props) {
  const [productIdx, setproductIdx] = useState(0)
  const [currentProduct,setcurrentProduct] = useState(props.productList[0])
  
  const [url, seturl] = useState(props.url)
  const [urlList, seturlList] = useState([{url:props.url,filename:props.productList[0].image}])
  
  
  return (
    <div className={styles.Product_container}>      
        {
          props.userData !== null 
          &&
          <div className={styles.Product_userdata_container}>
            <p className={styles.Product_userdata}>{props.userData.ticket}</p>     
            <p className={styles.Product_userdata}>{props.userData.freeTicket}</p>   
          </div>
        }              
      <h2 className = {styles.Product_title}>
        {currentProduct.title}
        <br/>
        {"( " + currentProduct.applicants.length+" / "+currentProduct.max_applicants + " )"}
      </h2>
      <div className={styles.Product_content_container}>
        <a onClick={async (e)=>{
          e.preventDefault()
          let tempidx = productIdx
          if(productIdx > 0){
            tempidx -= 1
          }
          else{
            tempidx = props.productList.length-1
          }
          if(props.productList[tempidx].image !== currentProduct.image){
            let urlListIdx =urlList.findIndex((item)=>item.filename===props.productList[tempidx].image)
            if(urlListIdx >= 0){
              seturl(urlList[urlListIdx].url)
            }
            else{
              let tempurl = await fetchProductImage(props.productList[tempidx].image)
              let temp = {url:tempurl,filename:props.productList[tempidx].image}
              let templist = [...urlList].concat(temp)
              seturl(tempurl)
              seturlList(templist)
            }            
          } 
          setproductIdx(tempidx)
          setcurrentProduct(props.productList[tempidx])
        }}>
          <FontAwesomeIcon className="faIcons" icon={faChevronLeft} size="sm"></FontAwesomeIcon>
        </a>
        <div className={styles.Product_image_container}>
          {/* <img src={props.url} alt="product image"></img> */}
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
          if(productIdx < props.productList.length-1){
            tempidx += 1
          }
          else{
            tempidx = 0
          }
          if(props.productList[tempidx].image !== currentProduct.image){
            let urlListIdx =urlList.findIndex((item)=>item.filename===props.productList[tempidx].image)
            if(urlListIdx >= 0){
              seturl(urlList[urlListIdx].url)
            }
            else{
              let tempurl = await fetchProductImage(props.productList[tempidx].image)
              let temp = {url:tempurl,filename:props.productList[tempidx].image}
              let templist = [...urlList].concat(temp)
              seturl(tempurl)
              seturlList(templist)
            }            
          }  
          setcurrentProduct(props.productList[tempidx])
          setproductIdx(tempidx)
        }}>
          <FontAwesomeIcon className="faIcons" icon={faChevronRight} size="sm"></FontAwesomeIcon>
        </a>
      </div>
      {
        currentProduct.applicants.length < currentProduct.max_applicants
        ?
        <button className={styles.Product_apply_button} onClick={ async ()=> {
          if(props.user === null) {
            props.isSignInModalOpen()
          }
          else{
            let tempProduct = await DataStore.query(ProductDS,props.productList[productIdx].id)
            if(tempProduct.isFree){
              if(props.userData.freeTicket > 0){
                await DataStore.save(ProductDS.copyOf(tempProduct,updated=>{
                  updated.applicants = [...tempProduct.applicants].concat(props.userData.id)
                }))
                await DataStore.save(UserDS.copyOf(props.userData, updated=>{
                  updated.freeTicket -= 1
                }))
                setcurrentProduct(props.productList[productIdx])
              }
              else{
                alert("not enough free ticket")
                return
              }
            }
            else{
              if(props.userData.ticket > 0){
                await DataStore.save(ProductDS.copyOf(tempProduct,updated=>{
                  updated.applicants = [...tempProduct.applicants].concat(props.userData.id)
                }))
                await DataStore.save(UserDS.copyOf(props.userData, updated=>{
                  updated.ticket -= 1
                }))
                setcurrentProduct(props.productList[productIdx])
              }
              else{
                alert("not enough ticket")

                return
              }
            }
          }
        
        }} >
          응모하기
        </button>
        :
        <button className={styles.Product_apply_button} onClick={()=> {}}>
          모집 완료
        </button>

      }
      
    </div>
  );
}