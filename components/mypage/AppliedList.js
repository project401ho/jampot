import React, {useState} from 'react'
import Image from 'next/image'
import { fetchProductImage} from "../../lib/graphql"
import {DataStore, SortDirection} from "aws-amplify"
import {Product as ProductDS, User as UserDS} from '../../src/models'

export default function AppliedList(props) {
  const {appliedProductList, userData} = props
  const [urlList, seturlList] = useState([])
  
  
  async function checkWinner(e, winner, id){
    console.log("id",id);
    console.log(typeof(id));
    if(winner === userData.email){
      e.target.value = "🎉"
    }
    else{
      e.target.value = "🦝"
    }
    console.log(!userData.checkedAppliedList.some(e=>e === id));
    if(!userData.checkedAppliedList.some(e=>e === id)){
      console.log("e",e);
      console.log("id", id);
      await DataStore.save(UserDS.copyOf(userData, updated=>{
        updated.checkedAppliedList = [...userData.checkedAppliedList].concat(String(id))
      }))
    }        
  }
  function winnerPopUp(){

  }

  function racoonPopUp(){

  }

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
      return(
        <li key={i}>
          {item.title}    
          {button}
        </li>
      )
    })
    return temp
  }

  return (
    <div className='AppliedList_container'>
      <ul>
        {userData && generateAppliedList()}
      </ul>      
    </div>
  );
}