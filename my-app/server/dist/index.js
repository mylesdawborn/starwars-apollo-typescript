"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const helpers_1 = require("./helpers");
const typeDefs = apollo_server_1.gql `

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
        people(parent, args, context, info) {
            return helpers_1.getPeople(args.page || 1);
        },
        person(parent, args, context, info) {
            return helpers_1.getPerson(args.name);
        },
    },
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
server.listen(4040).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map