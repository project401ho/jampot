/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      description
      applicants
      title
      createdAt
      max_applicants
      winner {
        items {
          id
          productID
          winneremail
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      description
      applicants
      title
      createdAt
      max_applicants
      winner {
        items {
          id
          productID
          winneremail
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      description
      applicants
      title
      createdAt
      max_applicants
      winner {
        items {
          id
          productID
          winneremail
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const createWinner = /* GraphQL */ `
  mutation CreateWinner(
    $input: CreateWinnerInput!
    $condition: ModelWinnerConditionInput
  ) {
    createWinner(input: $input, condition: $condition) {
      id
      productID
      product {
        id
        description
        applicants
        title
        createdAt
        max_applicants
        winner {
          nextToken
        }
        updatedAt
      }
      winneremail
      createdAt
      updatedAt
    }
  }
`;
export const updateWinner = /* GraphQL */ `
  mutation UpdateWinner(
    $input: UpdateWinnerInput!
    $condition: ModelWinnerConditionInput
  ) {
    updateWinner(input: $input, condition: $condition) {
      id
      productID
      product {
        id
        description
        applicants
        title
        createdAt
        max_applicants
        winner {
          nextToken
        }
        updatedAt
      }
      winneremail
      createdAt
      updatedAt
    }
  }
`;
export const deleteWinner = /* GraphQL */ `
  mutation DeleteWinner(
    $input: DeleteWinnerInput!
    $condition: ModelWinnerConditionInput
  ) {
    deleteWinner(input: $input, condition: $condition) {
      id
      productID
      product {
        id
        description
        applicants
        title
        createdAt
        max_applicants
        winner {
          nextToken
        }
        updatedAt
      }
      winneremail
      createdAt
      updatedAt
    }
  }
`;
