import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { fetchProductImage} from "../../lib/graphql"
import {DataStore, SortDirection} from "aws-amplify"
import {Product as ProductDS, User as UserDS} from '../../src/models'
import styles from "../../styles/AppliedList.module.css";

export default function AppliedList(props) {
  const {appliedProductList, userData} = props
  const [urlList, seturlList] = useState([])
  const [appliedlist, setappliedlist] =useState([])

  async function checkWinner(e, winner, id){
    if(winner === userData.email){
      e.target.value = "🎉"
    }
    else{
      e.target.value = "🦝"
    }
    if(!userData.checkedAppliedList.some(e=>e === id)){
      await DataStore.save(UserDS.copyOf(userData, updated=>{
        updated.checkedAppliedList = [...userData.checkedAppliedList].concat(String(id))
      }))
    }        
  }
  function winnerPopUp(){

  }

  function racoonPopUp(){

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
      console.log(item.applicants.length < item.max_applicants);
      if(item.applicants.length < item.max_applicants){
        button =
        <input 
          type="button" 
          name={item.winner} 
          id = {item.id}
          onClick={(e)=>{
            checkWinner(e,e.target.name,e.target.id)
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

  return (
    <div className={styles.container}>
      {appliedlist}
    </div>
  );
}