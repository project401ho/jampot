import {Product as ProductDS, User as UserDS, Prize as PrizeDS} from '../src/models'
import { DataStore, Auth} from "aws-amplify"


export function sendLink(msg) { // 카카오톡 공유하기
  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: msg,
      description:"",
      imageUrl:"",
      link: {
        mobileWebUrl: 'https://jampot.org',
        webUrl: 'https://jampot.org',
      },
    },    
    buttons: [
      {
        title: '가입하기', // 버튼 이름
        link: {
        mobileWebUrl: 'https://jampot.org',
        webUrl: 'https://jampot.org',
        },
      },
    ],
  })
}

export async function sendCustomLink(){
  window.Kakao.Link.sendCustom({
    templateId: 57095
  });
  Auth.currentAuthenticatedUser().then(async (user)=>{
    console.log(user.attributes.email);
    let _user = await DataStore.query(UserDS,user.attributes.email)
    await DataStore.save(UserDS.copyOf(_user, updated=>{
      updated.freeTicket += 1
    }))
  })
}

export function shareStoryWeb() { // 카카오 스토리 공유하기
  window.Kakao.Story.share({
    url: 'https://developers.kakao.com',
    text: '카카오 개발자 사이트로 놀러오세요! #개발자 #카카오 :)',
  })
}