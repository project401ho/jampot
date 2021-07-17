/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPrize = /* GraphQL */ `
  mutation CreatePrize(
    $input: CreatePrizeInput!
    $condition: ModelPrizeConditionInput
  ) {
    createPrize(input: $input, condition: $condition) {
      id
      code
      prodcutID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updatePrize = /* GraphQL */ `
  mutation UpdatePrize(
    $input: UpdatePrizeInput!
    $condition: ModelPrizeConditionInput
  ) {
    updatePrize(input: $input, condition: $condition) {
      id
      code
      prodcutID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deletePrize = /* GraphQL */ `
  mutation DeletePrize(
    $input: DeletePrizeInput!
    $condition: ModelPrizeConditionInput
  ) {
    deletePrize(input: $input, condition: $condition) {
      id
      code
      prodcutID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
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
      winner
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      winner
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      winner
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      checkedAppliedList
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
      checkedAppliedList
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
      checkedAppliedList
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
