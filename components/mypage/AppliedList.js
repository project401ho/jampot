import React, {useEffect, useState} from 'react'
import {DataStore, SortDirection} from "aws-amplify"
import {Product as ProductDS, User as UserDS, Prize as PrizeDS} from '../../src/models'
import styles from "../../styles/AppliedList.module.css";
import ResultPopUp from './ResultPopUp';
import ApplyPopUp from '../home/ApplyPopUp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faChevronLeft,faStar,faCookieBite,faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function AppliedList(props) {
  const {appliedProductList, userData, page} = props
  const [appliedlist, setappliedlist] = useState([])
  const [isResultPopUp, setisResultPopUp] = useState(false)
  const [isWinner, setisWinner] = useState(false)
  const [isApplied, setisApplied] = useState(false)
  const [isSharable, setIsSharable] = useState(false)

  async function checkWinner(e, winner, id){
    if(winner === userData.email){
      setisWinner(true)
    }
    else{
      setisWinner(false)
    }
    if(!userData.checkedAppliedList.some(e=>e === id)){
      await DataStore.save(UserDS.copyOf(userData, updated=>{
        updated.checkedAppliedList = [...userData.checkedAppliedList].concat(String(id))
      }))
    }        

  }

  async function getPrizeCode(item){
    if(item.winner === userData.email){
      let code =  await DataStore.query(PrizeDS,c=>c.prodcutID("eq",item.id))
      return code[0].code 
    }    
  }

  useEffect(()=>{
    if(userData != null){
      setappliedlist(generateAppliedList())
    }
    
  },[appliedProductList,userData])

  function generateAppliedList(){
    let temp = appliedProductList.map((item,i)=>{
      let prizecode = ""
      let count = 
      <div className={styles.item_count_done}>
        {"마감"}
      </div>
      let button = 
      <input 
        className={styles.button}
        type="button" 
        name={item.winner} 
        id = {item.id}
        onClick={(e)=>{
          checkWinner(e,e.target.name,e.target.id)
          setisResultPopUp(true)
        }}
        value="🤞 🎁 🤞"
      />
      if(userData.checkedAppliedList.some(e=>e === item.id)){
        let _value = "🦝"
        count = 
          <div className={styles.item_lost}>
            {"미당첨"}
          </div>
        if(item.winner === userData.email) {
          _value = "🎉"
          count = 
          <div className={styles.item_won}>
            {"당첨"}
          </div>
          getPrizeCode(item).then(e=>prizecode=e)
        }
        button =
        <input 
          className={styles.disabled}
          type="button" 
          name={item.winner} 
          id = {item.id}
          value={_value}          
        />
        
      }
      if(item.applicants.length < item.max_applicants){
        let type = "⭐"
        if(item.isFree) type = "🍪"
        count = 
        <div className={styles.item_count}>
          모집 중
          {/* {item.applicants.length + " / " + item.max_applicants} */}
        </div>
        button =
        <input 
          className={styles.button}
          type="button" 
          name={item.winner} 
          id = {item.id}
          onClick={(e)=>{
            e.preventDefault()
            e.target.disabled=true
            applyProduct(item.id)
            setIsSharable(item.isFree)
            setTimeout(()=>e.target.disabled = false,1000)
          }}
          value={type + " 추가 응모"}
        />
      }
      return(
        <div className={styles.item_container} key={i}>
          <div className={styles.title_container}>
            <div className={styles.item_title}>
              {item.title}                   
            </div>
            <div>
              {
                (item.winner === userData.email && userData.checkedAppliedList.some((c)=> c===item.id)) &&
                <input 
                  className={styles.prizecode_confirm}
                  type="button" 
                  name={item.winner} 
                  id = {item.id}
                  onClick={(e)=>{
                    e.target.value=prizecode
                    e.target.type="text"
                    e.target.className=""
                  }}
                  value="코드 확인"
                />
              }
            </div>
          </div>
          <span className={styles.item_info_container}>
            {count}            
            {button}
          </span>
          
        </div>
      )
    })
    return temp
  }

  async function applyProduct(id){
    let tempProduct = await DataStore.query(ProductDS, id)
    if(tempProduct.isFree){
      if(userData.freeTicket > 0){
        await DataStore.save(ProductDS.copyOf(tempProduct,updated=>{
          updated.applicants = [...tempProduct.applicants].concat(userData.id)
          if(updated.applicants.length === updated.max_applicants){
            updated.type = "close"
            updated.winner = updated.applicants[Math.floor(Math.random()*updated.max_applicants)]
          }
        })).then(await DataStore.save(UserDS.copyOf(userData, updated=>{
          updated.freeTicket -= 1
          if(!updated.appliedList.some((c)=>c===id)){
            updated.appliedList = [...userData.appliedList].concat(id)
          }        
        }))).then(setisApplied(true))
      }
      else{
        alert("not enough free ticket")
        return      
      }
    }
    else{
      if(userData.ticket > 0){
        await DataStore.save(ProductDS.copyOf(tempProduct,updated=>{
          updated.applicants = [...tempProduct.applicants].concat(userData.id)
          if(updated.applicants.length === updated.max_applicants){
            updated.type = "close"              
            updated.winner = updated.applicants[Math.floor(Math.random()*updated.max_applicants)]

          }
        })).then(await DataStore.save(UserDS.copyOf(userData, updated=>{
          updated.ticket -= 1
          if(!updated.appliedList.some((c)=>c===id)){
            updated.appliedList = [...userData.appliedList].concat(id)
          }
        }))).then(setisApplied(true))
      }
      else{
        alert("not enough ticket")
        return        
      }
    }
  }

  return (
    <div className={styles.container}>
      {
      appliedlist.length > 0
      ?
      <h2 className={styles.top_title}>응모 내역</h2>
      :
      <h2 className={styles.top_title}>응모 가즈아</h2>}
      {appliedlist}
      <div className={styles.AppliedList_ButtonContainer}>
        <button className={styles.page_button} onClick={()=>{
          if(page === 0) return
          props.fetchappliedProductList(userData.email,page-1)          
        }}>  
          <FontAwesomeIcon className={styles.page_button_icon} icon={faChevronLeft} ></FontAwesomeIcon>
        </button>
        {page+1}
        <button className={styles.page_button} onClick={()=>{
          props.fetchappliedProductList(userData.email,page+1)
        }}>  
          <FontAwesomeIcon className={styles.page_button_icon} icon={faChevronRight} ></FontAwesomeIcon>
        </button>
        
      </div>
      {
        isApplied
        ?
        <ApplyPopUp
          isOpen={isApplied}
          close={()=>setisApplied(false)}
          isFree = {isSharable}
        />
        :
        null
      }
      {
        isResultPopUp
        ?
        <ResultPopUp
          isWinner = {isWinner}
          close = {()=>setisResultPopUp(false)}
        />
        :
        null
      }
    </div>
  );
}