import { API, Storage } from 'aws-amplify'
import { getProduct } from '../src/graphql/queries';
import { createProduct as createProductMutation } from '../src/graphql/mutations';

export async function createProduct(item){
  await API.graphql({
    query:createProductMutation, 
    variables:{input: item},
    authMode: 'AWS_IAM'
  }) 
}

export async function fetchProduct(){
  const product = await API.graphql({
    query:getProduct,
    variables:{
      id:1
    },
  })
  return product.data.getProduct
}

export async function fetchProductImage(filename){
  return await Storage.get(filename)
}

export async function uploadImage(_file){
  await Storage.put(_file.name, _file)
}