const { idArg, makeSchema, objectType, stringArg, extendType, arg } = require('@nexus/schema')
const { _ReaderWhereInput } = require('./_whereInputTypes')
const { _ReaderCreateInput, _ReaderWhereUniqueInput } = require('./_createInputTypes')
const { _ReaderUpdateInput } = require('./_updateInputTypes')


const Reader = objectType({
  name: 'Reader',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.imgUri()
    t.model.costumerId()
    t.model.address()
    t.model.phone()
    t.model.booksToReaders({
      pagination: false,
    })
  },
})


const _getReaderByID = (t) => t.field('getReaderByID', {
  type: Reader,
  args: { id: stringArg({ nullable: false }) },
  nullable: true, // OBS findOne
  resolve: (_, { id }, ctx) => {
    return ctx.prisma.reader.findOne({
      where: { id: id }
    })
  }
});

const _getReaderByEmail = (t) => t.field('getReaderByEmail', {
  type: Reader,
  nullable: true, // OBS findOne
  args: { email: stringArg({ nullable: false }) },
  resolve: async (_, { email }, ctx) => {
    console.log('\n\n################## _getReaderByEmail ##################')
    console.log(`_getReaderByEmail    at  ${new Date(Date.now()).toISOString()}`)
    console.log('--------------------------------------------------\n\n')
    let res = await ctx.prisma.reader.findOne({
      where: { email: email }
    })
    console.log(res)

    return res
  }
});

const _getReaders = (t) => t.list.field('getReaders', {
  type: Reader,
  resolve: (_, __, ctx) => {
    return ctx.prisma.reader.findMany()
  }
});

//******************************************Costume WhereInput*********************************************************/
// use cases:
// Read more at the comments in "_inputTypes.js"

const _getReadersBy = (t) => {
  return t.list.field('getReadersBy', {
    type: Reader,
    args: {
      _readerArgs: arg({ type: _ReaderWhereInput })
    },
    resolve: (_, { _readerArgs }, ctx) => {

      return ctx.prisma.reader.findMany({
        where: _readerArgs
      })
    }
  })
};





/*
mutation{
  createReader(
    data:{
      name:"reader200"
      email:"z@z.com"
      booksToReaders:{
        create:[
                            //Obs due to the modeling of the explicit many-to-many relations
                            //we have to always create a new booksToReaders before 
                            // connecting to/creating  a Book 

          {
            borrowDate:"2020-07-01"
            returnDate:"2020-07-01"
            book:{connect:{id:"1"}
            }
            
          }
        ]
      }
    }){
  name
  }
}
*/
const _createReader = (t) => {

  t.field('createReader', {
    type: Reader,
    args: {
      data: arg({ type: _ReaderCreateInput }),
    },
    resolve: (_, data, ctx) => {
      return ctx.prisma.reader.create(data)
    },
  })

}


/*
 updateReader(where:{id:"ckg45gr4f000080v86vekm1x9"} , data:{name:"reader101"}){name}
 or,
 updateReader(where:{email:"z@z.com"} , data:{name:"reader201"}){name}
*/
const _updateReader = (t) => {
  t.field('updateReader', {
    type: Reader,
    args: {
      where: arg({ type: _ReaderWhereUniqueInput }),
      data: arg({ type: _ReaderUpdateInput }),
    },
    resolve: (_, { where, data }, ctx) => {
      return ctx.prisma.reader.update({
        where: where,
        data: data,
      })
    },
  })

}

/*
   deleteReader(where:{id:"ckg45gr4f000080v86vekm1x9"}){ name  }
*/
const _deleteReader = (t) => {
  t.field('deleteReader', {
    type: Reader,
    args: {
      where: arg({ type: _ReaderWhereUniqueInput }),
    },
    resolve: (_, { where }, ctx) => {
      return ctx.prisma.reader.delete({ where: where })
    },
  })

}
module.exports = {
  Reader,
  _getReaderByID,
  _getReaderByEmail,

  _getReaders,
  _getReadersBy,

  _createReader,
  _updateReader,
  _deleteReader,

}