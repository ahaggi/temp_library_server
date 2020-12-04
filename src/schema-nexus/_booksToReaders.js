
const { objectType, booleanArg, floatArg, idArg, intArg, stringArg, arg } = require('@nexus/schema')
const { _BooksToReadersWhereInput } = require('./_whereInputTypes')
const { _BooksToReadersWhereUniqueInput } = require('./_createInputTypes')


const BooksToReaders = objectType({
  name: 'BooksToReaders',
  definition(t) {
    t.model.id()
    t.model.borrowDate()
    t.model.returnDate()
    t.model.returned()
    t.model.bookId()
    t.model.readerId()
    t.model.book()
    t.model.reader()
    t.string('remainingTime', {
      resolve: async (parent, args, ctx) => {
        let now = Date.now()
        let rt = (new Date(parent.returnDate)).getTime()
        let diff = now - rt

        let _overdue = (now >= rt)

        // this values will be null if the "returnDate" is null
        let { d, h, m } = dhm(Math.abs(diff))

        let res = {
          overdue: _overdue,
          DD: d,
          HH: h,
          MM: m,
        }

        return JSON.stringify(res)
      }
    })
    // t.field("data", {
    //   type: "JSON",
    //   resolve: (_, data, ctx) => {
    //     let now = Date.now()
    //     let rt = (new Date(parent.returnDate)).getTime()
    //     let res = now > rt ? dhm(now - rt) : dhm(rt - now)
    //     return {overdue:false}
    //   },
    // });
  },
})


let dhm = (ms) => {
  var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(ms / cd),
    h = Math.floor((ms % cd) / ch),
    m = Math.round((ms - d * cd - h * ch) / 60000);

  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  return { d, h, m };
}

// query {
//   booksToReaders(id:"54"){
//     id
//   }
// }
// Use Book or Reader qry instead of using this!
const _getBooksToReadersByID = (t) => t.field('getBooksToReadersByID', {
  type: BooksToReaders,
  nullable: true, // OBS findOne

  args: { id: stringArg({ nullable: false }) },
  resolve: (_, { id }, ctx) => {
    return ctx.prisma.booksToReaders.findOne({
      where: { id: id }
    })
  }
});

const _getBooksToReadersByBorrowDate = (t) => t.list.field('getBooksToReadersByBorrowDate', {
  type: BooksToReaders,
  args: { borrowDate: stringArg() },
  resolve: (_, { borrowDate }, ctx) => {
    return ctx.prisma.booksToReaders.findMany({
      where: { borrowDate: { contains: borrowDate } }
    })
  }
});

const _getBooksToReadersByReturnDate = (t) => t.list.field('getBooksToReadersByReturnDate', {
  type: BooksToReaders,
  args: { returnDate: stringArg({ nullable: false }) },
  resolve: (_, { returnDate }, ctx) => {
    return ctx.prisma.booksToReaders.findMany({
      where: { returnDate: { contains: returnDate } }
    })
  }
});


//******************************************Costume WhereInput*********************************************************/
/*
getBooksToReadersByWhereInput(_booksToReadersArgs: {
                                    book: {
                                      OR: [
                                        {
                                          booksToAuthors: {
                                            some: { author: { name: "Author2" } }
                                          }
                                        },
                                        {
                                          booksToAuthors: {
                                            some: { author: { name: "Author3" } }
                                          }
                                        }
                                      ]
                                    }
                                  }
                                  ){
                                    reader{
                                      name
                                    },
                                  }
*/
const _getBooksToReadersByWhereInput = (t) => {
  return t.list.field('getBooksToReadersByWhereInput', {
    type: BooksToReaders,
    args: {
      _booksToReadersArgs: arg({ type: _BooksToReadersWhereInput })
    },
    resolve: (_, { _booksToReadersArgs }, ctx) => {

      // OBS it is more sufficient to save the date as string instead of creating a costume scalar type.
      // In case of need to a compair dates, string compairison will work just fine since we save the dates as 
      // (UTC-zulu format) YYYY-MM-DD'T'HH:mm:ss


      // let checkByBorrowDate = Object.prototype.hasOwnProperty.call(obj, 'borrowDate')
      // let checkByReturnDate = Object.prototype.hasOwnProperty.call(obj, 'returnDate')

      // if (checkByBorrowDate) {
      //   for (var prop in _booksToReadersArgs.borrowDate) {
      //     _booksToReadersArgs.borrowDate[prop] = new Date(_booksToReadersArgs.borrowDate[prop])
      //   }
      // }

      // if (checkByReturnDate) {
      //   for (var prop in _booksToReadersArgs.returnDate) {
      //     _booksToReadersArgs.returnDate[prop] = new Date(_booksToReadersArgs.returnDate[prop])
      //   }
      // }

      console.log(_booksToReadersArgs)

      return ctx.prisma.booksToReaders.findMany({
        where: _booksToReadersArgs
      })
    }
  })
};






const _deleteBooksToReaders = (t) => {
  t.field('deleteBooksToReaders', {
    type: BooksToReaders,
    args: {
      where: arg({ type: _BooksToReadersWhereUniqueInput }),
    },
    resolve: (_, { where }, ctx) => {
      return ctx.prisma.booksToReaders.delete({ where: where })
    },
  })

}


module.exports = {
  BooksToReaders,
  _getBooksToReadersByID,
  _getBooksToReadersByBorrowDate,
  _getBooksToReadersByReturnDate,
  _getBooksToReadersByWhereInput,
  _deleteBooksToReaders
}