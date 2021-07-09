import React, {useState} from 'react'
import { SingOut } from '../lib/signin'

export default function MyPage(props) {

  return (
    <div >
      <button onClick={SingOut}>로그아웃</button>
    </div>
  );
}