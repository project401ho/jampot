import { API, Storage } from 'aws-amplify'
import 
  { 
    getProduct,
    productsByDate,
    getUser,
  } 
from '../src/graphql/queries';
import 
  { 
    createProduct as createProductMutation,
    createUser as createUserMutation,
    updateProduct as updateProductMutation,
    updateUser as updateUserMutation,
  } 
from '../src/graphql/mutations';

//create

export async function createProduct(item){
  await API.graphql({
    query:createProductMutation, 
    variables:{input: item},
    authMode: 'AWS_IAM'
  }) 
  console.log("done create");
}



export async function createUser(item){
  await API.graphql({
    query:createUserMutation, 
    variables:{input: item},
    authMode: 'AWS_IAM'
  }) 
}

//update
export async function updateProduct(item){
  await API.graphql({
    query:updateProductMutation, 
    variables:{input: item},
    authMode: 'AWS_IAM'
  }) 
  console.log("done update");
}

export async function updateUser(item){
  await API.graphql({
    query:updateUserMutation, 
    variables:{input: item},
    authMode: 'AWS_IAM'
  }) 
  console.log("done update");
}

//fetch

export async function fetchProduct(){
  const product = await API.graphql({
    query:getProduct,
    variables:{
      id:"20217101625888940964"
    },
  })
  return product.data.getProduct
}

export async function fetchUser(email){
  const userData = await API.graphql({
    query:getUser,
    variables:{
      id:email
    },
  })
  return userData.data.getUser
}

export async function fetchProductList(nextToken){
  const product = await API.graphql({
    query:listProduct,
    limit:10,
    nextToken:nextToken
  })
  return product.data.getProduct.items
}

export async function fetchProductListByDate(nextToken){
  const productlist = await API.graphql({
    query:productsByDate,
    variables:{
        type: "product",
      sortDirection: "ASC"
    },
    limit:10,
    nextToken: nextToken
  })
  console.log(productlist.data.productsByDate.items);
  return productlist.data.productsByDate.items
}

export async function fetchProductImage(filename){
  return await Storage.get(filename)
}

export async function uploadImage(_file){
  await Storage.put(_file.name, _file)
}