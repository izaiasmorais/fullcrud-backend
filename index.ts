import "reflect-metadata";
import path from "path";
require("dotenv").config({ path: ".env.local" });
import "./mongodb/connect";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ClientResolver } from "./resolvers/resolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [ClientResolver],
    emitSchemaFile: path.resolve(__dirname, "scheme.ggl"),
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen(process.env.PORT);

  console.log("Server running on " + url);
}

main();
