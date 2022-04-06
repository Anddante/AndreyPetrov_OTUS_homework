const { ApolloServer } = require("apollo-server")
const { typeDefs, resolvers } = require("./schema")

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`Server running at: ${url}`)
})