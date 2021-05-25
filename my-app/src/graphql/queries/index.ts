import { gql } from '@apollo/client';

export const GET_ALL_PEOPLE = gql`  
  query People($page: Int!) {
    people(page: $page){
      count
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }
`;

export const GET_PERSON = gql` 
  query Person($name: String!) {
    person(name: $name){
      name
      height
      mass
      gender
      homeworld
      eye_color 
      skin_color
      hair_color
      birth_year
    }
  }
`;