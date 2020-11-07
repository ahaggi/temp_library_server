const { inputObjectType, unionType, objectType } = require('@nexus/schema')

/***********************************************************IMPORTANT!***********************************************************
    Since we want to send a whole object as an arg to a resolver of a qry, we need to white the SDL as described at https://graphql.github.io/learn/schema/#input-types
    This is mean the arg-type will NOT be one of (booleanArg, floatArg, idArg, intArg, stringArg)

    But since we are using NEXUS to create the SDL code, we canuse inputObjectType to generate the same "sturcture" and "types" of 
    the types inside "\node_modules\.prisma\client\index.d.ts", which prisma uses to "map" the database-relations

    Pros:
    - For example we can query a reader that borrowed a book which been authored by some specific author's name (don't need an authorId)!
    - Retrieve deeply nested data by loading several levels of relations
      THE FOLLOWING IS "BAD PRACTICE", BUT ITS JUST TO ILUSTRATE
        where{
            book: {
                    booksToAuthors: {
                        some: {
                            author: {
                                booksToAuthors: {
                                    some: {
                                        book: {
                                            id
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            }

    Cons:
    - This mirrors the types difined inside "\node_modules\.prisma\client\index.d.ts" at this version; Any new versions could have a diff properties' fields, 
      To counter that just edit this file to match prisma's types.
    - A little bit hacky!

    But until Nexus-prisma-plugin deploy a better solotion, this is OK.
 */

const _BookWhereInput = inputObjectType({
    name: "_BookWhereInput",
    definition(t) {
        t.string("id")
        t.field("title", { type: 'String' }) //  | _StringNullableFilter 
        t.string("isbn")
        t.int("pages")
        t.int("chapters")
        t.float("price")
        t.string("description")
        t.string("imgUri", { nullable: true })
        t.field("booksToAuthors", { type: _BooksToAuthorsListRelationFilter })  // OBS this is not a list type
        t.field("booksToReaders", { type: _BooksToReadersListRelationFilter })  // OBS this is not a list type
        t.field("storage", { type: _StorageWhereInput })
        t.field("OR", { type: _BookWhereInput, list: true })
        t.field("NOT", { type: _BookWhereInput, list: true })
    }
});

const _AuthorWhereInput = inputObjectType({
    name: "_AuthorWhereInput",
    definition(t) {
        t.string("id")
        t.string("name")
        t.string("email")
        t.string("about")
        t.string("imgUri", { nullable: true })
        t.field("booksToAuthors", { type: _BooksToAuthorsListRelationFilter })
        t.field("OR", { type: _AuthorWhereInput, list: true })
        t.field("NOT", { type: _AuthorWhereInput, list: true })
    }
});

const _BooksToAuthorsWhereInput = inputObjectType({
    name: "_BooksToAuthorsWhereInput",
    definition(t) {
        t.string("id")
        t.field("book", { type: _BookWhereInput })
        t.field("author", { type: _AuthorWhereInput })
        t.field("OR", { type: _BooksToAuthorsWhereInput, list: true })
        t.field("NOT", { type: _BooksToAuthorsWhereInput, list: true })
    }
});


const _ReaderWhereInput = inputObjectType({
    name: "_ReaderWhereInput",
    definition(t) {
        t.string("id")
        t.string("name")
        t.string("email")
        t.string("imgUri")
        t.string("costumerId")
        t.string("address")
        t.int("phone")
        t.field("booksToReaders", { type: _BooksToReadersListRelationFilter, list: true })
        t.field("OR", { type: _ReaderWhereInput, list: true })
        t.field("NOT", { type: _ReaderWhereInput, list: true })
    }
});


const _BooksToReadersWhereInput = inputObjectType({
    name: "_BooksToReadersWhereInput",
    definition(t) {
        t.string("id")
        t.string("borrowDate")
        t.string("returnDate")
        t.boolean("returned")
        t.field("book", { type: _BookWhereInput })
        t.field("reader", { type: _ReaderWhereInput })
        t.field("OR", { type: _BooksToReadersWhereInput, list: true })
        t.field("NOT", { type: _BooksToReadersWhereInput, list: true })
    }
});

const _StorageWhereInput = inputObjectType({
    name: "_StorageWhereInput",
    definition(t) {
        t.string("id")
        t.int("quantity")
        t.int("borrowedQuantity")
        t.field("book", { type: _BookWhereInput })
    }
});





const _BooksToAuthorsListRelationFilter = inputObjectType({
    name: "_BooksToAuthorsListRelationFilter",
    definition(t) {
        t.field("every", { type: _BooksToAuthorsWhereInput })
        t.field("some", { type: _BooksToAuthorsWhereInput })
        t.field("none", { type: _BooksToAuthorsWhereInput })
    }
});

const _BooksToReadersListRelationFilter = inputObjectType({
    name: "_BooksToReadersListRelationFilter",
    definition(t) {
        t.field("every", { type: _BooksToReadersWhereInput })
        t.field("some", { type: _BooksToReadersWhereInput })
        t.field("none", { type: _BooksToReadersWhereInput })
    }
});








// const SearchResult = unionType({
//     name: "SearchResult",
//     definition(t) {
//         t.members(Launch1, Launch2),
//             t.resolveType(item => {

//                 console.log(item.name)
//                 if (item.name === 'Launch1')
//                     return Launch1
//                 if (item.name === 'Launch2')
//                     return Launch2

//             })
//     }
// });

// const Launch1 = objectType({
//     name: "Launch1",
//     definition: (t) => {
//         t.id("id");
//         t.string("site", { nullable: true });
//     }
// })

//  const Launch2 = objectType({
//     name: "Launch2",
//     definition: (t) => {
//         t.id("id");
//         t.string("site", { nullable: true });
//     }
// })

// const _StringNullableFilter = inputObjectType({
//     name: "_StringNullableFilter",
//     definition(t) {
//         t.field("equals", { type: string | null })
//         t.field("in", { type: string | null, list: true })
//         t.field("notIn", { type: string | null, list: true })
//         t.field("lt", { type: string | null })
//         t.field("lte", { type: string | null })
//         t.field("gt", { type: string | null })
//         t.field("gte", { type: string | null })
//         t.field("contains", { type: string | null })
//         t.field("startsWith", { type: string | null })
//         t.field("endsWith", { type: string | null })
//         t.field("not", { type: _StringNullableFilter | null })  // This should be NestedStringNullableFilter
//     }
// });


// export type StringNullableFilter = {
//     equals?: string | null
//     in?: Enumerable<string> | null
//     notIn?: Enumerable<string> | null
//     lt?: string | null
//     lte?: string | null
//     gt?: string | null
//     gte?: string | null
//     contains?: string | null
//     startsWith?: string | null
//     endsWith?: string | null
//     not?: string | NestedStringNullableFilter | null
//   }

//   export type IntNullableFilter = {
//     equals?: number | null
//     in?: Enumerable<number> | null
//     notIn?: Enumerable<number> | null
//     lt?: number | null
//     lte?: number | null
//     gt?: number | null
//     gte?: number | null
//     not?: number | NestedIntNullableFilter | null
//   }

//   export type FloatNullableFilter = {
//     equals?: number | null
//     in?: Enumerable<number> | null
//     notIn?: Enumerable<number> | null
//     lt?: number | null
//     lte?: number | null
//     gt?: number | null
//     gte?: number | null
//     not?: number | NestedFloatNullableFilter | null
//   }







module.exports = {
    _BookWhereInput,
    _AuthorWhereInput,
    _BooksToAuthorsWhereInput,
    _ReaderWhereInput,
    _BooksToReadersWhereInput,
    _StorageWhereInput,
}




