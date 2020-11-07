const { nexusSchemaPrisma } = require('nexus-plugin-prisma/schema')
// const { nexusPrismaPlugin } = require('nexus-prisma') DEPRECATED
const { stringArg, makeSchema, objectType, extendType } = require('@nexus/schema')



const foo = require('./types-queries-mutaions')



const Queries = extendType({
  type: 'Query',

  definition(t) {
    foo._getBookByID(t),
    foo._getBookByISBN(t),

      foo._getBooks(t),
      foo._getBooksBy(t),

      foo._getAuthorByID(t),
      foo._getAuthorByEmail(t),
      foo._getAuthors(t),
      foo._getAuthorsBy(t),

      foo._getBooksToAuthorsByID(t),
      foo._getBooksToAuthorsBy(t),

      foo._getReaderByID(t),
      foo._getReaderByEmail(t),
      foo._getReaders(t),
      foo._getReadersBy(t),

      foo._getBooksToReadersByID(t),
      foo._getBooksToReadersByBorrowDate(t),
      foo._getBooksToReadersByReturnDate(t),
      foo._getBooksToReadersBy(t),

      foo._getStorageByID(t),
      foo._getStorageByQuantity(t),
      foo._getStorageByBorrowedQuantity(t),
      foo._getStorageBy(t),


      t.list.field('q', {
        type: foo.Reader,
        resolve: (_, __, ctx) => {


          return ctx.prisma.reader.findMany({
            where: {
              booksToReaders: {
                borrowDate: {
                  equals: new Date("2020-02-28T00:00:00.000Z")
                }
              }
            }
          })
        }
      });

  },
})



const Mutations = objectType({
  name: 'Mutation',
  definition(t) {
    
    foo._createBook(t),
      foo._updateBook(t),
      foo._deleteBook(t),

      foo._createAuthor(t),
      foo._updateAuthor(t),
      foo._deleteAuthor(t),


      foo._createReader(t),
      foo._updateReader(t),
      foo._deleteReader(t),

      // foo._createStorage(t),
      // foo._updateStorage(t),
      // foo._deleteStorage(t),

      foo._deleteBooksToReaders(t),


      t.field('TODO', {
        type: 'Book',
        nullable: true,
        args: {
          id: stringArg(),
        },
        resolve: (_, { id }, ctx) => {
          return ctx.prisma.post.update({
            where: { id: Number(id) },
            data: { published: true },
          })
        },
      })
  },
})


const schema = makeSchema({
  types: [Queries, Mutations, foo.Book, foo.Author, foo.BooksToAuthors, foo.BooksToReaders, foo.Reader, foo.Storage],
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