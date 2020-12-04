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

const _getReadersByWhereInput = (t) => {
  return t.list.field('getReadersByWhereInput', {
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
    resolve: async(_, data, ctx) => {
      const createdReader =  await ctx.prisma.reader.create(data)
      // publish that an Author has been created
       ctx.pubsub.publish(READER_CREATED, { createdReader })
      return createdReader;
    },
  })

}

const _createdReaderSub = (t) => {
  t.field("createdReaderSub", {
    type: Reader,
    subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(READER_CREATED),
    resolve: async(promise)=> {
      const reader = await promise.createdReader
      return reader
    }
  });
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
    resolve:async (_, { where, data }, ctx) => {
      const updatedReader =  await ctx.prisma.reader.update({
        where: where,
        data: data,
      })
      // publish that an Author has been updated
       ctx.pubsub.publish(READER_UPDATED, { updatedReader })
      return updatedReader;
    },
  })

}
const _updatedReaderSub = (t) => {
  t.field("updatedReaderSub", {
    type: Reader,
    subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(READER_UPDATED),
    resolve: async(promise)=> {
      const reader = await promise.updatedReader
      return reader
    }
  });
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
    resolve: async(_, { where }, ctx) => {
      const deletedReader =  await ctx.prisma.reader.delete({ where: where })
      // publish that an Author has been deleted
       ctx.pubsub.publish(READER_DELETED, { deletedReader })
      return deletedReader;

    },
  })

}

const _deletedReaderSub = (t) => {
  t.field("deletedReaderSub", {
    type: Reader,
    subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(READER_DELETED),
    resolve: async(promise)=> {
      const reader = await promise.deletedReader
      return reader
    }
  });
}



const
READER_CREATED = 'READER_CREATED',
READER_UPDATED = 'READER_UPDATED',
READER_DELETED = 'READER_DELETED';

module.exports = {
  Reader,
  _getReaderByID,
  _getReaderByEmail,

  _getReaders,
  _getReadersByWhereInput,

  _createReader,
  _updateReader,
  _deleteReader,

  _createdReaderSub,
  _updatedReaderSub,
  _deletedReaderSub,

}