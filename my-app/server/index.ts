import { ApolloServer, gql } from 'apollo-server'
import { getPerson, getPeople } from './helpers'

const typeDefs = gql`

  type Person {
    name: String
    height: String
    mass: String 
    gender: String
    homeworld: String
  }

  type PersonDetails {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
    hair_color: String
    eye_color: String
    skin_color: String
    birth_year: String
  }

  type PersonReturnData {
    count: Int
    results: [Person]
  }

  type Query {
    people(page: Int): PersonReturnData 
    person(name: String): PersonDetails
  }
`;

const resolvers = {
  Query: {
    people(parent: any, args: any, context: any, info: any) {
      return getPeople(args.page || 1)
    },
    person(parent: any, args: any, context: any, info: any) {
      return getPerson(args.name)
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4040).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});