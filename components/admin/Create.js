import React, {Component} from 'react'
import styles from "./Create.module.scss";
import { uploadImage, createProduct } from '../../lib/graphql'

export const date = new Date()

class Create extends Component {
  
  state={
    product:{
      id: ""+date.getFullYear()+(date.getMonth()+1)+date.getDate()+date.getTime(),
      description: "",
      applicants: [],
      title: "",
      createdAt: date,
      max_applicants: 6,
      image: "neogulman.png",
      isFree: false,
      type: "product",
    },
    
    imagefile: null
  }

  stateHandler = (e) => {
    const { name, value } = e.target;
    let temp = Object.assign({},this.state.product,{[name]:value})
    this.setState({ product: temp });
  };
  verifyFields(item){
    if(item.title === null) return false
    return true
  }
  render(){
    return (
    <div className={styles.container}>
      <h1>상품 만들기</h1>
      
      <input
        name="title"
        className={styles.inputs}
        type="text"
        placeholder="title"
        onChange={this.stateHandler}
      />
      <input
        name="description"
        className={styles.inputs}
        type="text"
        placeholder="description"
        onChange={this.stateHandler}
      />
      <input
        name="max_applicants"
        className={styles.inputs}
        type="text"
        placeholder={"기본 설정: " + this.state.product.max_applicants}
        onChange={this.stateHandler}
      />
      <input
        name="image"
        className={styles.inputs}
        type="text"
        placeholder="image"
        value = {this.state.product.image}
        onChange={this.stateHandler}
      />
      <input
        name="image_file"
        className={styles.inputs}
        type="file"
        placeholder="image"
        onChange={(e)=>{
          this.setState({imagefile:e.target.files[0],image:e.target.files[0].name})
          console.log(e);
        }}
      />
      <button 
        className={styles.inputs}
        onClick={async ()=>await uploadImage(this.state.imagefile)}
      > 
        이미지 업로드
      </button>

      <div className={styles.isFree_container}>
        <p>무료 상품일때 체크</p>
        <input
          name="isFree"
          className={styles.isFree_checkbox}
          type="checkbox"
          onChange={(e)=>this.setState({isFree:e.target.checked})}
        />
      
      </div>
      <div className={styles.buttons_container}>
        <button 
          onClick={()=>this.props.setcreateMode(false)}
          className={styles.buttons}
        > 
          닫기
        </button>
        <button 
          onClick={()=>{
            let item = Object.assign({},this.state.product)
            if(this.verifyFields(item)){
              console.log("start create");
              createProduct(item)
            }
          }}
          className={styles.buttons}
        >          
          만들기
        </button>

      </div>

    </div>
  );
  }
  
}

export default Create;