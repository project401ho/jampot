import React, {useState} from 'react'
import Image from 'next/image'
import { fetchProductImage} from "../../lib/graphql"

export default function AppliedList(props) {
  const {appliedProductList} = props
  const [urlList, seturlList] = useState([])

  

  function generateAppliedList(){
    let temp = appliedProductList.map((item,i)=>{
      if(item.winner)
      return(
        <li key={i}>
          {item.title}    
          <button>당첨 확인</button>      
        </li>
      )
    })
    return temp
  }

  return (
    <div className='AppliedList_container'>
      <ul>
        {generateAppliedList()}
      </ul>      
    </div>
  );
}