import React, {useEffect, useState} from 'react'
import {DataStore, SortDirection} from "aws-amplify"
import {Product as ProductDS, User as UserDS} from '../../src/models'
import styles from "../../styles/AppliedList.module.css";
import ResultPopUp from './ResultPopUp';
import ApplyPopUp from '../home/ApplyPopUp'

export default function AppliedList(props) {
  const {appliedProductList, userData} = props
  const [appliedlist, setappliedlist] =useState([])
  const [isResultPopUp, setisResultPopUp] = useState(false)
  const [isWinner, setisWinner] = useState(false)
  const [isApplied, setisApplied] = useState(false)

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

  useEffect(()=>{
    setappliedlist(generateAppliedList())
  },[appliedProductList,userData])

  function generateAppliedList(){
    let temp = appliedProductList.map((item,i)=>{
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
        count = 
        <div className={styles.item_count}>
          {item.applicants.length + " / " + item.max_applicants}
        </div>
        button =
        <input 
          className={styles.button}
          type="button" 
          name={item.winner} 
          id = {item.id}
          onClick={(e)=>{
            e.preventDefault()
            applyProduct(item.id)
          }}
          value="추가 응모"
        />
      }
      return(
        <div className={styles.item_container} key={i}>
          <span>
            {item.title}              
            {/* {item.Prize} */}
          </span>
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
      {appliedlist}
      {
        isApplied
        ?
        <ApplyPopUp
          isOpen={isApplied}
          close={()=>setisApplied(false)}
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