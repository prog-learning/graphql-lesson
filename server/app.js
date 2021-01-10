const express = require('express')
const graphqlHTTP = require('express-graphql')
const shcema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  // graphql: true,
  shcema,
  graphiql: true,
}))

app.listen(3000, () => {
  console.log('now listnig for requests on port 3000!!')
})
