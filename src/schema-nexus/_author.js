
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
    type: Author ,
    nullable: true, // OBS findOne
    args: { id: stringArg({ nullable: false }) },

    resolve: (_, { id }, ctx) => {
        return ctx.prisma.author.findOne({
            where: { id: id }
        })
    }
});
const _getAuthorByEmail = (t) => t.field('getAuthorByEmail', {
    type: Author ,
    nullable: true, // OBS findOne
    args: { email: stringArg({ nullable: false }) },
    resolve: async(_, { email }, ctx) => {
        console.log('\n\n################## getAuthorByEmail ##################')
        console.log(`_getAuthorByEmail    at  ${new Date(Date.now()). toISOString()}`)
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

const _getAuthorsBy = (t) => {
    return t.list.field('getAuthorsBy', {
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
        resolve: (_, data, ctx) => {
            return ctx.prisma.author.create(data)
        },
    })
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
        resolve: (_, { where, data }, ctx) => {
            return ctx.prisma.author.update({
                where: where,
                data: data,
            })
        },
    })

}

/*

*/
const _deleteAuthor = (t) => {
    t.field('deleteAuthor', {
        type: Author,
        args: {
            where: arg({ type: _AuthorWhereUniqueInput }),
        },
        resolve: (_, { where }, ctx) => {
            return ctx.prisma.author.delete({ where: where })
        },
    })
}




module.exports = {
    Author,
    _getAuthorByID,
    _getAuthorByEmail,
    
    _getAuthors,
    _getAuthorsBy,


    //mutations
    _createAuthor,
    _updateAuthor,
    _deleteAuthor
}