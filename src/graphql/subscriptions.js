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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
