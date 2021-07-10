/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        winner {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWinner = /* GraphQL */ `
  query GetWinner($id: ID!) {
    getWinner(id: $id) {
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
export const listWinners = /* GraphQL */ `
  query ListWinners(
    $filter: ModelWinnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWinners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          updatedAt
        }
        winneremail
        createdAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
