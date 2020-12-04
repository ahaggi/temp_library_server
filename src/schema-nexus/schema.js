const { nexusSchemaPrisma } = require('nexus-plugin-prisma/schema')
// const { nexusPrismaPlugin } = require('nexus-prisma') DEPRECATED
const { stringArg, makeSchema, objectType, extendType, } = require('@nexus/schema')



const foo = require('./types-queries-mutaions')



const Queries = extendType({
  type: 'Query',

  definition(t) {
    foo._getBookByID(t),
      foo._getBookByISBN(t),

      foo._getBooks(t),
      foo._getBooksByWhereInput(t),

      foo._getAuthorByID(t),
      foo._getAuthorByEmail(t),
      foo._getAuthors(t),
      foo._getAuthorsByWhereInput(t),

      foo._getBooksToAuthorsByID(t),
      foo._getBooksToAuthorsByWhereInput(t),

      foo._getReaderByID(t),
      foo._getReaderByEmail(t),
      foo._getReaders(t),
      foo._getReadersByWhereInput(t),

      foo._getBooksToReadersByID(t),
      foo._getBooksToReadersByBorrowDate(t),
      foo._getBooksToReadersByReturnDate(t),
      foo._getBooksToReadersByWhereInput(t),

      foo._getStorageByID(t),
      foo._getStorageByQuantity(t),
      foo._getStorageByBorrowedQuantity(t),
      foo._getStorageByWhereInput(t)

  },
})



const Mutations = objectType({
  name: 'Mutation',
  definition(t) {

    foo._createBook(t),
      foo._updateBook(t),
      foo._deleteBook(t),
      // foo.__mockbookMut(t)

      foo._createAuthor(t),
      foo._updateAuthor(t),
      foo._deleteAuthor(t),


      foo._createReader(t),
      foo._updateReader(t),
      foo._deleteReader(t),

      // foo._createStorage(t),
      // foo._updateStorage(t),
      // foo._deleteStorage(t),

      foo._deleteBooksToReaders(t)

  },
})

const Subscription = objectType({
  name: "Subscription",
  definition(t) {
    foo._createdBookSub(t),
      foo._updatedBookSub(t),
      foo._deletedBookSub(t),
      foo._createdAuthorSub(t),
      foo._updatedAuthorSub(t),
      foo._deletedAuthorSub(t),
      foo._createdReaderSub(t),
      foo._updatedReaderSub(t),
      foo._deletedReaderSub(t)
  }
})

const schema = makeSchema({
  types: [Queries, Mutations, Subscription, foo.Book, foo.Author, foo.BooksToAuthors, foo.BooksToReaders, foo.Reader, foo.Storage],
  plugins: [nexusSchemaPrisma()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})

module.exports = {
  schema
}