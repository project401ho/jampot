import React, {useState} from 'react'
import Create from '../components/admin/Create'

export default function Admin(props) {
  const [createMode,setcreateMode] = useState(false)

  return (
    <div className='Admin_container'>
      {
      createMode
      ?
      <Create
        setcreateMode={(bool)=>setcreateMode(bool)}
      />
      :
      null
      }
      {/* <button onClick={()=>setcreateMode(true)}> create Product</button> */}
    </div>
  );
}