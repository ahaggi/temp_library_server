
const { idArg, makeSchema, objectType, stringArg, extendType, arg } = require('@nexus/schema')
const { _AuthorWhereInput } = require('./_whereInputTypes')
const { _AuthorCreateInput, _AuthorWhereUniqueInput } = require('./_createInputTypes')
const { _AuthorUpdateInput } = require('./_updateInputTypes')

const Author = objectType({
    name: 'Author',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.email()
        t.model.about()
        t.model.imgUri()

        t.model.booksToAuthors({
            pagination: false,
        })
    },
})

const _getAuthorByID = (t) => t.field('getAuthorByID', {
    type: Author,
    nullable: true, // OBS findOne
    args: { id: stringArg({ nullable: false }) },

    resolve: (_, { id }, ctx) => {
        return ctx.prisma.author.findOne({
            where: { id: id }
        })
    }
});
const _getAuthorByEmail = (t) => t.field('getAuthorByEmail', {
    type: Author,
    nullable: true, // OBS findOne
    args: { email: stringArg({ nullable: false }) },
    resolve: async (_, { email }, ctx) => {
        console.log('\n\n################## getAuthorByEmail ##################')
        console.log(`_getAuthorByEmail    at  ${new Date(Date.now()).toISOString()}`)
        console.log('--------------------------------------------------\n\n')
        let a = ctx.prisma.author.findOne({
            where: { email: email }
        })
        console.log(await a)
        return a
    }
});

const _getAuthors = (t) => t.list.field('getAuthors', {
    type: Author,
    resolve: (_, __, ctx) => {
        return ctx.prisma.author.findMany()
    }
});


//******************************************Costume WhereInput*********************************************************/
// use cases:
// Read more at the comments in "_inputTypes.js"

const _getAuthorsByWhereInput = (t) => {
    return t.list.field('getAuthorsByWhereInput', {
        type: Author,
        args: {
            _authorArgs: arg({ type: _AuthorWhereInput })
        },
        resolve: (_, { _authorArgs }, ctx) => {
            console.log(_authorArgs)
            return ctx.prisma.author.findMany({
                where: _authorArgs
            })
        }
    })
};




/*
mutation{ 

    createAuthor(
        data: {
        name: "Author333"
        email: "w@w.com"
        booksToAuthors: {
                            //Obs due to the modeling of the explicit many-to-many relations
                            //we have to always create a new booksToAuthors before 
                            // connecting to/creating  an author 
            create:[          
              
              {book:{connect:{id: "ckg43722r003898v8q6u73211"}}}
              {book:{connect:{id: "ckg435pz7002298v86i2y5g8f"}}}
            ]
          
          
       
        }
    })
    {
        id
        name
        email
    }

}
 */
const _createAuthor = (t) => {
    t.field('createAuthor', {
        type: Author,
        args: {
            data: arg({ type: _AuthorCreateInput }),
        },
        resolve:async (_, data, ctx) => {
            const createdAuthor =  await ctx.prisma.author.create(data)
            // publish that an Author has been created
             ctx.pubsub.publish(AUTHOR_CREATED, { createdAuthor })
            return createdAuthor;
      
        },
    })
}

const _createdAuthorSub = (t) => {
    t.field("createdAuthorSub", {
      type: Author,
      subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(AUTHOR_CREATED),
      resolve: async(promise )=> {
        const author = await promise.createdAuthor
        return author
      }
    });
  }
  

/**
mutation {
  updateAuthor(where:{email:"q@q.com"} , data:{name:"author101"}){name}
}
 */
const _updateAuthor = (t) => {
    t.field('updateAuthor', {
        type: Author,
        args: {
            where: arg({ type: _AuthorWhereUniqueInput }),
            data: arg({ type: _AuthorUpdateInput }),
        },
        resolve: async(_, { where, data }, ctx) => {
            const updatedAuthor =  await ctx.prisma.author.update({
                where: where,
                data: data,
            })
            // publish that an Author has been updated
             ctx.pubsub.publish(AUTHOR_UPDATED, { updatedAuthor })
            return updatedAuthor;

        },
    })

}

const _updatedAuthorSub = (t) => {
    t.field("updatedAuthorSub", {
      type: Author,
      subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(AUTHOR_UPDATED),
      resolve: async(promise)=> {
        const author = await promise.updatedAuthor
        return author
      }
    });
  }


  const _deleteAuthor = (t) => {
    t.field('deleteAuthor', {
        type: Author,
        args: {
            where: arg({ type: _AuthorWhereUniqueInput }),
        },
        resolve:async (_, { where }, ctx) => {
            const deletedAuthor =  await ctx.prisma.author.delete({ where: where })
            // publish that an Author has been deleted
             ctx.pubsub.publish(AUTHOR_DELETED, { deletedAuthor })
            return deletedAuthor;
        },
    })
}

const _deletedAuthorSub = (t) => {
    t.field("deletedAuthorSub", {
      type: Author,
      subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(AUTHOR_DELETED),
      resolve: async(promise)=> {
        const author = await promise.deletedAuthor
        return author
      }
    });
  }

const
AUTHOR_CREATED = 'AUTHOR_CREATED',
AUTHOR_UPDATED = 'AUTHOR_UPDATED',
AUTHOR_DELETED = 'AUTHOR_DELETED';


module.exports = {
    Author,
    _getAuthorByID,
    _getAuthorByEmail,

    _getAuthors,
    _getAuthorsByWhereInput,


    //mutations
    _createAuthor,
    _updateAuthor,
    _deleteAuthor,
    _createdAuthorSub,
    _updatedAuthorSub,
    _deletedAuthorSub,
}