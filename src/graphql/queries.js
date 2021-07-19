/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPrize = /* GraphQL */ `
  query GetPrize($id: ID!) {
    getPrize(id: $id) {
      id
      code
      prodcutID
      createdAt
      updatedAt
    }
  }
`;
export const listPrizes = /* GraphQL */ `
  query ListPrizes(
    $filter: ModelPrizeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrizes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        prodcutID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      nickname
      ticket
      freeTicket
      appliedList
      checkedAppliedList
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        nickname
        ticket
        freeTicket
        appliedList
        checkedAppliedList
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const productsByDate = /* GraphQL */ `
  query ProductsByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
