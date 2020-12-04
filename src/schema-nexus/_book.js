const { idArg, makeSchema, objectType, stringArg, extendType, arg } = require('@nexus/schema')
// const { withFilter } = require('apollo-server');

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
      resolve: async (parent, args, ctx) => {
        let a = await ctx.prisma.book.findOne({ where: { id: parent.id } }).storage() // https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/relation-queries#fluent-api
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
    console.log(`_getBookByID ${id}   at  ${new Date(Date.now()).toISOString()}`)
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
    console.log(`_getBookByISBN   at  ${new Date(Date.now()).toISOString()}`)
    console.log('--------------------------------------------------\n\n')
    return ctx.prisma.book.findOne({
      where: { isbn: isbn }
    })
  }
});

const _getBooks = (t) => t.list.field('getBooks', {
  type: Book,
  resolve: (_, __, ctx) => {

    console.log('\n\n################## getBooks ##################')
    console.log(`_getBooks    at  ${new Date(Date.now()).toISOString()}`)
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
  res: getBooksByWhereInput(
    _bookArgs: { title: { not: { in: ["GraphQL book1", "GraphQL book2"] } } }
  ) {
    title
  }

  getBooks {
    title
  }

  res1: getBooksByWhereInput(
    _bookArgs: {
      booksToReaders: {
        some: { borrowDate: { gt: "2020-04-16T23:00:00.000Z" } }
      }
    }
  ) {
    title
    booksToReaders {
      borrowDate
    }
  }

  res2: getBooksByWhereInput(
    _bookArgs: {
      booksToReaders: {
        some: {
          borrowDate: {
            not: {
              in: [
                "2020-04-16T23:00:00.000Z"
                "2020-01-21T23:00:00.000Z"
                "2020-02-03T23:00:00.000Z"
                "2020-02-08T23:00:00.000Z"
                "2020-04-01T22:00:00.000Z"
              ]
            }
          }
        }
      }
    }
  ) {
    title
    booksToReaders {
      borrowDate
    }
  }
}


  */

const _getBooksByWhereInput = (t) => {
  return t.list.field('getBooksByWhereInput', {
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
    resolve: async (_, data, ctx) => {
      // return ctx.prisma.book.create(data);

      const createdBook = await ctx.prisma.book.create(data)

      // publish that a book has been created
      ctx.pubsub.publish(BOOK_CREATED, { createdBook })
      return createdBook;
    },
  })

}



const _createdBookSub = (t) => {
  t.field("createdBookSub", {
    type: Book,
    // args: {
    //   _bookTitle: stringArg({ required: false })
    // },
    subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(BOOK_CREATED),
    resolve: async (promise) => {
      const book = await promise.createdBook
      return book
    }
    // subscribe: withFilter(
    //   (parent, { _bookTitle }, ctx) =>
    //     ctx.pubsub.asyncIterator(BOOK_CREATED),
    //   (payload, { _bookTitle }) => payload.createdBook.title === _bookTitle

    // )
  });
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
    resolve: async (_, { where, data }, ctx) => {
      const updatedBook = await ctx.prisma.book.update({
        where: where,
        data: data,
      })
      // publish that a book has been updated
      ctx.pubsub.publish(BOOK_UPDATED, { updatedBook })
      return updatedBook;
    },
  })

}
const _updatedBookSub = (t) => {
  t.field("updatedBookSub", {
    type: Book,
    subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(BOOK_UPDATED),
    resolve: async (promise) => {
      const book = await promise.updatedBook
      return book

    }

  });
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
    resolve: async (_, { where }, ctx) => {
      const deletedBook = await ctx.prisma.book.delete({ where: where })
      // publish that a book has been deleted
      ctx.pubsub.publish(BOOK_DELETED, { deletedBook })
      return deletedBook;
    },
  })

}


const _deletedBookSub = (t) => {
  t.field("deletedBookSub", {
    type: Book,
    subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(BOOK_DELETED),
    resolve: async (promise) => {
      const book = await promise.deletedBook
      return book
    }
  });
}


const __mockbookMut = (t) => {
  t.field('mockbookMut', {
    type: Book,
    resolve: async (_, __, ctx) => {
      const books = await ctx.prisma.book.findMany({ where: { id: { gt: '' } } })
      const book = books[0]
      
      // publish a mock event (every couple of sec) that a mutation has been excuted 
      setInterval(async() => {
        let ran = Math.floor(Math.random() * 3);
        let key = ''
        if(ran == 0){
          mutationType =BOOK_CREATED;
          key ='createdBook'
        }
        else if(ran == 1){
          mutationType =BOOK_DELETED
          key ='deletedBook'
        }
        else{
          mutationType =BOOK_UPDATED
          key = 'updatedBook'
        }

        
        await  ctx.pubsub.publish(mutationType, { [key]:book })
      }, 5000)

      return book;
    },
  })
}

const
  BOOK_CREATED = 'BOOK_CREATED',
  BOOK_UPDATED = 'BOOK_UPDATED',
  BOOK_DELETED = 'BOOK_DELETED';

module.exports = {
  Book,
  _getBookByID,
  _getBookByISBN,
  _getBooks,
  _getBooksByWhereInput,
  _createBook,
  _updateBook,
  _deleteBook,
  _createdBookSub,
  _updatedBookSub,
  _deletedBookSub,
  __mockbookMut
}