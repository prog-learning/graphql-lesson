const graphql = require('graphql')
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql

// dummy data
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1a' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2a' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3a' },
]
const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1a' },
  { name: 'Brandon Sanderson', age: 42, id: '2a' },
  { name: 'Terry Pratchett', age: 66, id: '3a' },
]

// これがスキーマ？
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent) // 検索したidのbooksのデータがparent
        return _.find(authors, { id: parent.authorId })
        // そのparentのauthorIdと一致するauthorのデータを取得
      }
    }
  })
});
// fieldsは関数で返す

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// ルートクエリを作成
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
  }
});

// 実際のクエリ
// book(id:'123'){
//   name
//   genre
// }

module.exports = new GraphQLSchema({
  query: RootQuery
});


