/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateWinner = /* GraphQL */ `
  subscription OnCreateWinner {
    onCreateWinner {
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
export const onUpdateWinner = /* GraphQL */ `
  subscription OnUpdateWinner {
    onUpdateWinner {
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
export const onDeleteWinner = /* GraphQL */ `
  subscription OnDeleteWinner {
    onDeleteWinner {
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
