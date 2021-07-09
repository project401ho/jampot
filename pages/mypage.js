import React, {useState} from 'react'
import { SignOut } from '../lib/signin'

export default function MyPage(props) {

  return (
    <div >
      <button onClick={SignOut}>로그아웃</button>
    </div>
  );
}