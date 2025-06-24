import { MongoClient } from "mongodb"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { schemaQL } from "./schema.ts";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if(!MONGO_URL){
    throw new Error("Please provide a MONGO_URL");
}

const client = new MongoClient(MONGO_URL);
await client.connect();
console.info("Client connected");

const server = new ApolloServer({
  typeDefs: schemaQL,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
    context: async () => ({}),
    listen: {port: 8080},
})

console.log(`URL listening at port ${url}`);