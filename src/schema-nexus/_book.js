const { idArg, makeSchema, objectType, stringArg, extendType, arg } = require('@nexus/schema')
const { _BookWhereInput } = require('./_whereInputTypes')
const { _BookCreateInput, _BookWhereUniqueInput } = require('./_createInputTypes')
const { _BookUpdateInput } = require('./_updateInputTypes')



const Book = objectType({
  name: 'Book',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.isbn()
    t.model.pages()
    t.model.chapters()
    t.model.price()
    t.model.description()
    t.model.imgUri()
    t.model.booksToAuthors({
      pagination: false
    })
    t.model.booksToReaders({
      pagination: false
    })
    t.model.storage()

    t.boolean('available', {
      resolve: async (parent, args, ctx) =>  {
        let a =await ctx.prisma.book.findOne({where:{id:parent.id}}).storage() // https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/relation-queries#fluent-api
        return (a.quantity - a.borrowedQuantity) > 0
      },
    })
  },
})

const _getBookByID = (t) => t.field('getBookByID', {
  type: Book,
  args: { id: stringArg({ nullable: false }) },
  nullable: true, // OBS findOne
  resolve: (_, { id }, ctx) => {
    console.log('\n\n################## _getBookByID ##################')
    console.log(`_getBookByID ${id}   at  ${new Date(Date.now()). toISOString()}`)
    console.log('--------------------------------------------------\n\n')

    
    return ctx.prisma.book.findOne({
      where: { id: id }
    })
  }
});

const _getBookByISBN = (t) => t.field('getBookByISBN', {
  type: Book,
  args: { isbn: stringArg({ nullable: false }) },
  nullable: true, // OBS findOne
  resolve: (_, { isbn }, ctx) => {
    console.log('\n\n################## _getBookByISBN ##################')
    console.log(`_getBookByISBN   at  ${new Date(Date.now()). toISOString()}`)
    console.log('--------------------------------------------------\n\n')
    return ctx.prisma.book.findOne({
      where: { isbn: isbn }
    })
  }
});

const _getBooks = (t) => t.list.field('getBooks', {
  type: Book,
  resolve:  (_, __, ctx) => {

    console.log('\n\n################## getBooks ##################')
    console.log(`_getBooks    at  ${new Date(Date.now()). toISOString()}`)
    console.log('--------------------------------------------------\n\n')

    return ctx.prisma.book.findMany()
  }
});



//******************************************Costume WhereInput*********************************************************/
// use cases:
// Find book by any of the Book-fields
// Extreme qry: find the authors names which by some specific readers-fields, Read more at the comments in "_inputTypes.js"

/*
query {

  // find the title and the readers name for a book that the Author1 has published
  getBooksBy(_bookArgs:{booksToAuthors:{some:{author:{name:"Author1"}}}}){
    title
    booksToReaders{reader{name}}
  }

  // find the title and the authors' name for a book that the Reader1 has borrowed
    getBooksBy(_bookArgs:{booksToReaders:{some:{reader:{name:"Reader1"}}}}){
    title
    booksToAuthors{author{name}}
  }

  */

const _getBooksBy = (t) => {
  return t.list.field('getBooksBy', {
    type: Book,
    args: {
      _bookArgs: arg({ type: _BookWhereInput })
    },
    resolve: (_, { _bookArgs }, ctx) => {
      console.log(_bookArgs)
      return ctx.prisma.book.findMany({
        where: _bookArgs
      })
    }
  })
};



/*
  createBook(
    data:{
      title:"title3"
      pages:10
      chapters:100
      price:10.10
          booksToAuthors:{
            create:[
                            //Obs due to the modeling of the explicit many-to-many relations
                            //we have to always create a new booksToAuthors before 
                            // connecting to/creating  a Book 

              {
                author:{
                  connect:{id:"1"}
                }
              }
              {
                author:{
                  connect:{id:"2"}
                }
              }
              {
                author:{
                  connect:{
                    email:"q@q.com"
                  }
                }
              }
            ]
          }
      
    }){id}

*/
const _createBook = (t) => {

  t.field('createBook', {
    type: Book,
    args: {
      data: arg({ type: _BookCreateInput }),
    },
    resolve: (_, data, ctx) => {
      return ctx.prisma.book.create(data)
    },
  })

}


/*
mutation {
  updateBook(
    where: { id: "2" }
    data: {
      title: "q"
      pages: 2
      booksToAuthors: {
        create: [
          { author: { connect: { id: "authorID" } } }
          { author: { connect: { id: "authorID" } } }
          { author: { create: { name: "authorID", email: "q@q.com" } } }
        ]
        delete: [
          { id: "booksToAuthorsID" }
          { id: "booksToAuthorsID" }
          { id: "booksToAuthorsID" }
        ]
      }
    }
  ) {
    id
  }
}
*/
const _updateBook = (t) => {
  t.field('updateBook', {
    type: Book,
    args: {
      where: arg({ type: _BookWhereUniqueInput }),
      data: arg({ type: _BookUpdateInput }),
    },
    resolve: (_, { where, data }, ctx) => {
      return ctx.prisma.book.update({
        where: where,
        data: data,
      })
    },
  })

}

/*
 mutation {
   deleteBook(where:{id:"ckg3ybuvc00164kv8yw1eka6f"}){
    title
  }
}*/
const _deleteBook = (t) => {
  t.field('deleteBook', {
    type: Book,
    args: {
      where: arg({ type: _BookWhereUniqueInput }),
    },
    resolve: (_, { where }, ctx) => {
      return ctx.prisma.book.delete({where: where})
    },
  })

}

module.exports = {
  Book,
  _getBookByID,
  _getBookByISBN,
  _getBooks,
  _getBooksBy,
  _createBook,
  _updateBook,
  _deleteBook
}