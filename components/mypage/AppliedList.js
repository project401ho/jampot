import React, {useEffect, useState} from 'react'
import {DataStore, SortDirection} from "aws-amplify"
import {Product as ProductDS, User as UserDS} from '../../src/models'
import styles from "../../styles/AppliedList.module.css";
import ResultPopUp from './ResultPopUp';

export default function AppliedList(props) {
  const {appliedProductList, userData} = props
  const [urlList, seturlList] = useState([])
  const [appliedlist, setappliedlist] =useState([])
  const [isResultPopUp, setisResultPopUp] = useState(false)
  const [isWinner, setisWinner] =useState(false)

  async function checkWinner(e, winner, id){
    if(winner === userData.email){
      e.target.value = "🎉"
      setisWinner(true)
    }
    else{
      e.target.value = "🦝"
      setisWinner(false)
    }
    if(!userData.checkedAppliedList.some(e=>e === id)){
      await DataStore.save(UserDS.copyOf(userData, updated=>{
        updated.checkedAppliedList = [...userData.checkedAppliedList].concat(String(id))
      }))
    }        
    generateAppliedList()
  }

  useEffect(()=>{
    setappliedlist(generateAppliedList())
  },[appliedProductList])

  function generateAppliedList(){
    let temp = appliedProductList.map((item,i)=>{
      let button = 
      <input 
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
        if(item.winner === userData.email) _value = "🎉"
        button =
        <input 
          type="button" 
          name={item.winner} 
          id = {item.id}
          value={_value}
        />
      }
      if(item.applicants.length < item.max_applicants){
        button =
        <input 
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
          {item.title}    
          {button}
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
          }
        })).then(await DataStore.save(UserDS.copyOf(userData, updated=>{
          updated.freeTicket -= 1
          updated.appliedList = [...userData.appliedList].concat(id)
        })))
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
          }
        })).then(await DataStore.save(UserDS.copyOf(userData, updated=>{
          updated.ticket -= 1
          updated.appliedList = [...userData.appliedList].concat(id)
        })))
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