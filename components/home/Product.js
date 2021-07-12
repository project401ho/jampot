import React, {useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faChevronLeft,faStar,faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { fetchProductImage} from '../../lib/graphql'

import {Product as ProductDS, User as UserDS} from '../../src/models'
import { DataStore } from "aws-amplify"
import ApplyPopUp from './ApplyPopUp'

export default function Product(props) {
  const [productIdx, setproductIdx] = useState(0)  
  const [url, seturl] = useState(props.url)
  const [urlList, seturlList] = useState([{url:props.url,filename:props.productList[0].image}])
  const [isApplyPopUpOpen, setisApplyPopUpOpen] = useState(false)

  const applyProduct = async ()=> {
    if(props.user === null) {
      props.isSignInModalOpen()
    }
    else{
      console.log("1");
      let tempProduct = await DataStore.query(ProductDS,props.productList[productIdx].id)
      if(tempProduct.isFree){
        if(props.userData.freeTicket > 0){
          await DataStore.save(ProductDS.copyOf(tempProduct,updated=>{
            updated.applicants = [...tempProduct.applicants].concat(props.userData.id)
            
          })).then(await DataStore.save(UserDS.copyOf(props.userData, updated=>{
            updated.freeTicket -= 1
            updated.appliedList = [...props.userData.appliedList].concat(props.productList[productIdx].id)
          })))
          
          
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
          })).then(await DataStore.save(UserDS.copyOf(props.userData, updated=>{
            updated.ticket -= 1
            updated.appliedList = [...props.userData.appliedList].concat(props.productList[productIdx].id)
          })))
          
          
        }
        else{
          alert("not enough ticket")

          return
        }
      }
      setisApplyPopUpOpen(true)
    }
  
  }
  
  return (
    <div className={styles.Product_container}>      
      
      <div className={styles.Product_userdata_container}>
        {
          props.userData !== null 
          &&
          <>
          <div className={styles.Product_userdata}>            
            <FontAwesomeIcon className="faIcons_tickets" icon={faStar} ></FontAwesomeIcon>
            <p className={styles.Product_userdata}>{props.userData && props.userData.ticket}</p>   
          </div>
          <div className={styles.Product_userdata}>
            <FontAwesomeIcon className="faIcons_tickets" icon={faCookieBite} ></FontAwesomeIcon>  
            <p className={styles.Product_userdata}>{props.userData && props.userData.freeTicket}</p>   
          </div>
          </>
        }      
      </div>
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
          if(props.productList[tempidx].image !== props.productList[productIdx].image){
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
        }}>
          <FontAwesomeIcon className="faIcons" icon={faChevronLeft} ></FontAwesomeIcon>
        </a>
        <div className={styles.Product_image_container}>
          <div className={styles.Product_productdata_container}>
            {
              (props.productList[productIdx].applicants.length >= Math.ceil(props.productList[productIdx].max_applicants*0.7)
              &&
              props.productList[productIdx].applicants.length < props.productList[productIdx].max_applicants
              )
              ?
              <div className={styles.Product_urgent}>
                마감 임박!
              </div>
              :
              null
            }        
            <h2 className = {styles.Product_title}>
              {props.productList[productIdx].title}
              <br/>
              {"( " + props.productList[productIdx].applicants.length+" / "+props.productList[productIdx].max_applicants + " )"}
            </h2>
          </div>
          
          <Image
            src={url}
            alt="test"
            width={"200"}
            height={"200"}
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
          if(props.productList[tempidx].image !== props.productList[productIdx].image){
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
        }}>
          <FontAwesomeIcon className="faIcons" icon={faChevronRight}></FontAwesomeIcon>
        </a>
      </div>
      {
        props.productList[productIdx].applicants.length < props.productList[productIdx].max_applicants
        ?
        <button className={styles.Product_apply_button} onClick={applyProduct} >
          {
          props.productList[productIdx].isFree
          ?
            <FontAwesomeIcon className="faIcons_tickets" icon={faCookieBite} ></FontAwesomeIcon>
          :
            <FontAwesomeIcon className="faIcons_tickets" icon={faStar} ></FontAwesomeIcon>
          }
          응모하기
          {
          props.productList[productIdx].isFree
          ?
            <FontAwesomeIcon className="faIcons_tickets" icon={faCookieBite} ></FontAwesomeIcon>
          :
            <FontAwesomeIcon className="faIcons_tickets" icon={faStar} ></FontAwesomeIcon>
          }
        </button>
        :
        <button className={styles.Product_apply_button} disabled>
          모집 완료
        </button>

      }
      <ApplyPopUp
        isOpen={isApplyPopUpOpen}
        close={()=>setisApplyPopUpOpen(false)}
      />
    </div>
  );
}