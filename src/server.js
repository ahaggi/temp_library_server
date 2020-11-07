const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema-nexus/schema')
const { createContext } = require('./schema-nexus/context')

let args = {
  schema,
  context: createContext,
  introspection: true,
  playground:true,
  cors: {
    origin: '*',			// <- allow request from all domains
    credentials: true // <- enable CORS response for requests with credentials (cookies, http authentication)}).listen(
  }		

}
new ApolloServer(args).listen(
  { port: process.env.PORT || 4021 },
  () =>
    console.log(
      `🚀 Server asdeady at: http://localhost:4021\n⭐️ See sample queries: http://pris.ly/e/js/graphql-apollo-server#using-the-graphql-api`,
    ),
)
