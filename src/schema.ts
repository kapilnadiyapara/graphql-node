import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Employee {
    id: ID!,
    name: String!
    position: String!
    salary: Float!
  } 

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(id: ID!, name: String!, position: String!, salary: Float!): Employee
    updateEmployee(id: ID!, name: String, position: String, salary: Float): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;
