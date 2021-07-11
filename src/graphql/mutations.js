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
      image
      isFree
      type
      winner {
        items {
          id
          productID
          winneremail
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
      image
      isFree
      type
      winner {
        items {
          id
          productID
          winneremail
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
      image
      isFree
      type
      winner {
        items {
          id
          productID
          winneremail
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        image
        isFree
        type
        winner {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      winneremail
      _version
      _deleted
      _lastChangedAt
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
        image
        isFree
        type
        winner {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      winneremail
      _version
      _deleted
      _lastChangedAt
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
        image
        isFree
        type
        winner {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      winneremail
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      nickname
      ticket
      freeTicket
      appliedList
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      nickname
      ticket
      freeTicket
      appliedList
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      nickname
      ticket
      freeTicket
      appliedList
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
