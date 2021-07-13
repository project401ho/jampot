import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar,faCookieBite } from "@fortawesome/free-solid-svg-icons";

import {Product as ProductDS, User as UserDS} from '../../src/models'
import { DataStore,Storage } from "aws-amplify"
import ApplyPopUp from './ApplyPopUp'

export default function ListExpand(props) {
  const {
    fetchAndSubscribeAllProductList,
    allProductList,
    urlList,
    seturlList,
  } = props

  const[imageList,setimageList] = useState([])
  const [isApplyPopUpOpen, setisApplyPopUpOpen] = useState(false)


  useEffect(()=>{
    fetchAndSubscribeAllProductList()
    // generateProductList()
  },[])

  async function applyProduct (item) {
    if(props.user === null) {
      props.isSignInModalOpen()
    }
    else{      
      
      if(item.isFree){
        if(props.userData.freeTicket > 0){
          await DataStore.save(ProductDS.copyOf(item,updated=>{
            updated.applicants = [...item.applicants].concat(props.userData.id)
            if(updated.applicants.length === updated.max_applicants){
              updated.type = "close"
            }
          })).then(await DataStore.save(UserDS.copyOf(props.userData, updated=>{
            updated.freeTicket -= 1
            updated.appliedList = [...props.userData.appliedList].concat(item.id)
          })))
        }
        else{
          alert("not enough free ticket")
          return
        }
      }
      else{
        if(props.userData.ticket > 0){
          await DataStore.save(ProductDS.copyOf(item,updated=>{
            updated.applicants = [...item.applicants].concat(props.userData.id)
            if(updated.applicants.length === updated.max_applicants){
              updated.type = "close"              
            }
          })).then(await DataStore.save(UserDS.copyOf(props.userData, updated=>{
            updated.ticket -= 1
            updated.appliedList = [...props.userData.appliedList].concat(item.id)
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

  async function generateProductList(){
    if(imageList.length === allProductList.length) return
    let templist = allProductList.concat()
    let tempimageList = []

    if(!templist.length > 0) return
    for(let i = 0; i < templist.length; i++){
      let urlListIdx = urlList.findIndex((item)=>item.filename === templist[i].image)
      if(urlListIdx >= 0){
        tempimageList[i] = urlList[urlListIdx].url
      }
      else{
        let tempurl = await Storage.get(templist[i].image)
        let temp = {url:tempurl,filename:templist[i].image}
        let tempurllist = [...urlList].concat(temp)
        tempimageList[i] = tempurl
        seturlList(tempurllist)
      }  
    }
    tempimageList = tempimageList.map((item, i)=>{
      return(
        <div key={i} className={styles.ListExpand_item_container}>
          <Image
            src={item}
            alt="test"
            width={"90"}
            height={"90"}
            unoptimized={true}
          />
          <div key={i} className={styles.ListExpand_content_container}>
            <div className={styles.ListExpand_text_container}>
              <h3 className={styles.ListExpand_title}>
                {allProductList[i].title}
              </h3>
              {
                allProductList[i].applicants.length >= Math.floor(allProductList[i].max_applicants)
                ?
                <>
                {
                    allProductList[i].applicants.length < allProductList[i].max_applicants
                  ?
                    <div className={styles.ListExpand_urgent}>마감 임박!</div>
                  :
                    null
                }
                </>
                
                :
                <div className={styles.ListExpand_applycount}>{ "( " + allProductList[i].applicants.length +" / "+ allProductList[i].max_applicants + " )" }</div>
                
              }
              
            </div>
            {
              allProductList[i].applicants.length < allProductList[i].max_applicants
              ?
              <button className={styles.ListExpand_apply} onClick={()=>applyProduct(allProductList[i])} >
                {
                allProductList[i].isFree
                ?
                  <FontAwesomeIcon className="faIcons_tickets" icon={faCookieBite} ></FontAwesomeIcon>
                :
                  <FontAwesomeIcon className="faIcons_tickets" icon={faStar} ></FontAwesomeIcon>
                }
                응모하기
                {
                allProductList[i].isFree
                ?
                  <FontAwesomeIcon className="faIcons_tickets" icon={faCookieBite} ></FontAwesomeIcon>
                :
                  <FontAwesomeIcon className="faIcons_tickets" icon={faStar} ></FontAwesomeIcon>
                }
              </button>
              :
              <button className={styles.ListExpand_apply, styles.ListExpand_apply_done  } disabled>
                모집 완료
              </button>
            }
          </div>
        </div>
      )
    })
    console.log(tempimageList);
    setimageList(tempimageList)
  }
  
  if(allProductList.length > 0){
    generateProductList()
  }

  return (
    <div className={styles.ListExpand_container}>
      {imageList}
      <ApplyPopUp
        isOpen={isApplyPopUpOpen}
        close={()=>setisApplyPopUpOpen(false)}
      />
    </div>
  );
}