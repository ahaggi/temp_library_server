const { idArg, makeSchema, objectType, stringArg, arg } = require('@nexus/schema')
const { _BooksToAuthorsWhereInput } = require('./_whereInputTypes')

const BooksToAuthors = objectType({
    name: 'BooksToAuthors',
    definition(t) {
        t.model.id()
        t.model.authorId()
        t.model.bookId()
        t.model.author()
        t.model.book()
    },
})

// query {
//   booksToAuthors(id:"54"){
//     id
//   }
// }
const _getBooksToAuthorsByID = (t) => t.field('getBooksToAuthorsByID', {
    type: BooksToAuthors,
    nullable: true, // OBS findOne

    args: { id: stringArg({ nullable: false }) },
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.booksToAuthors.findOne({
            where: { id: id }
        })
    }
});



//******************************************Costume WhereInput*********************************************************/

// Use Book or Author qry instead of using this!
const _getBooksToAuthorsByWhereInput = (t) => {
    return t.list.field('getBooksToAuthorsByWhereInput', {
        type: BooksToAuthors,
        args: {
            _booksToAuthorsArgs: arg({ type: _BooksToAuthorsWhereInput })
        },
        resolve: (_, { _booksToAuthorsArgs }, ctx) => {
            return ctx.prisma.booksToAuthors.findMany({
                where: _booksToAuthorsArgs
            })
        }
    })
};












module.exports = {
    BooksToAuthors,
    _getBooksToAuthorsByID,
    _getBooksToAuthorsByWhereInput
}