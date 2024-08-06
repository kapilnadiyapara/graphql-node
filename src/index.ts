import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import express from "express";
import bodyParser from "body-parser";
import { GraphQLClient } from "graphql-request";

const startServer = async () => {
  const graphQLClient = new GraphQLClient("http://localhost:4000/graphql", {});
  const app = express() as any;
  app.use(bodyParser.json());

  const server = new ApolloServer({ typeDefs, resolvers });

  await  server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.get("/api/user-list", (req: any, res: any) => {
    const document: any = gql`
      {
        employees {
          id
          name
          salary
        }
      }
    `;
    graphQLClient.request(document).then((resp) => {
      res.json({ message: resp });
    });
  });

  app.get("/api/users", (req: any, res: any) => {
    const document: any = gql`
      {
        employee(id: "2") {
          id
          name
        }
      }
    `;

    graphQLClient.request(document).then((resp) => {
      res.json({ message: resp });
    });
  });

  app.post("/api/userbyid", (req: any, res: any) => {
    const id = req.body?.id;
    
    const document: any = gql`{
        employee(id: ${id}) {
          id
          name
        }
    }`;

    graphQLClient.request(document).then((resp) => {
      res.json({ message: resp });
    });
  });

  app.post("/api/add", (req: any, res: any) => {
    const id = req.body?.id;
    const namep = req.body?.name;
    const position = req.body?.position;
    const salary = req.body.salary;

    const document: any = gql`
      mutation {
       addEmployee(id: "${id}", name: "${namep}", position: "${position}" , salary:  ${salary}) {
        id
        name
        position
        salary
      }
    }`;

    graphQLClient.request(document).then((resp) => {
      res.json({ message: resp });
    });
  });

  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer();
