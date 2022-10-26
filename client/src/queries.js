import { gql } from "@apollo/client";

//PERSON QUERIES AND MUTATION

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const EDIT_PERSON = gql`
  mutation EditPerson($id: String!, $firstName: String!, $lastName: String!) {
    editPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($id: String!) {
    deletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

//CAR QUERIES AND MUTATIONS

export const GET_CARS = gql`
  {
    cars {
      id
      year
      make
      model
      price
      personID
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $id: String!
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personID: String!
  ) {
    addCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personID: $personID
    ) {
      id
      year
      make
      model
      price
      personID
    }
  }
`;
