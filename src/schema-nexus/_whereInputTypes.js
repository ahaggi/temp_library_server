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

// export type StringFilter = {
//     equals?: string
//     in?: Enumerable<string>
//     notIn?: Enumerable<string>
//     lt?: string
//     lte?: string
//     gt?: string
//     gte?: string
//     contains?: string
//     startsWith?: string
//     endsWith?: string
//     not?: string | NestedStringFilter
//   }
const _StringFilter = inputObjectType({
    name: "_StringFilter",
    definition(t) {
        t.string("equals")
        t.string("in", { list: true })
        t.string("notIn", { list: true })
        t.string("lt")
        t.string("lte")
        t.string("gt")
        t.string("gte")
        t.string("contains")
        t.string("startsWith")
        t.string("endsWith")
        t.field("not", { type: "_StringFilter" })
    }
})

// export type IntFilter = {
//     equals?: number
//     in?: Enumerable<number>
//     notIn?: Enumerable<number>
//     lt?: number
//     lte?: number
//     gt?: number
//     gte?: number
//     not?: number | NestedIntFilter
//   }
const _IntFilter = inputObjectType({
    name: "_IntFilter",
    definition(t) {
        t.int("equals")
        t.int("in", { list: true })
        t.int("notIn", { list: true })
        t.int("lt")
        t.int("lte")
        t.int("gt")
        t.int("gte")
        t.field("not", { type: "_IntFilter" })
    }
})

//   export type FloatFilter = {
//     equals?: number
//     in?: Enumerable<number>
//     notIn?: Enumerable<number>
//     lt?: number
//     lte?: number
//     gt?: number
//     gte?: number
//     not?: number | NestedFloatFilter
//   }

const _FloatFilter = inputObjectType({
    name: "_FloatFilter",
    definition(t) {
        t.float("equals")
        t.float("in", { list: true })
        t.float("notIn", { list: true })
        t.float("lt")
        t.float("lte")
        t.float("gt")
        t.float("gte")
        t.field("not", { type: "_FloatFilter" })
    }
})
// export type BoolFilter = {
//     equals?: boolean
//     not?: boolean | NestedBoolFilter
//   }

const _BoolFilter = inputObjectType({
    name: "_BoolFilter",
    definition(t) {
        t.boolean("equals")
        t.field("not", { type: "_BoolFilter" })
    }
})


// const _StringDateFilter = inputObjectType({
//     name: "_StringDateFilter",
//     definition(t) {
//         t.string("equals")
//         t.string("in", { list: true })
//         t.string("notIn", { list: true })
//         t.string("lt")
//         t.string("lte")
//         t.string("gt")
//         t.string("gte")
//         // t.string("contains")      NOT supported by Date comparison
//         // t.string("startsWith")    NOT supported by Date comparison
//         // t.string("endsWith")      NOT supported by Date comparison
//         t.string("notIn", { list: true })
//         t.field("not", { type: "_StringDateFilter" })
//     }
// })

const _BookWhereInput = inputObjectType({
    name: "_BookWhereInput",
    definition(t) {
        t.string("id")
        t.field("title", { type: _StringFilter })
        t.field("isbn", { type: _StringFilter })
        t.field("pages", { type: _IntFilter })
        t.field("chapters", { type: _IntFilter })
        t.field("price", { type: _FloatFilter })
        t.field("description", { type: _StringFilter })
        t.field("available", { type: _BoolFilter })
        // t.string("imgUri", { nullable: true })
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
        t.field("name", { type: _StringFilter })
        t.field("email", { type: _StringFilter })
        t.field("about", { type: _StringFilter })
        // t.string("imgUri", { nullable: true })
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
        t.field("name", { type: _StringFilter })
        t.field("email", { type: _StringFilter })
        // t.string("imgUri")
        t.field("costumerId", { type: _StringFilter })
        t.field("address", { type: _StringFilter })
        t.field("phone", { type: _StringFilter })
        t.field("booksToReaders", { type: _BooksToReadersListRelationFilter })
        t.field("OR", { type: _ReaderWhereInput, list: true })
        t.field("NOT", { type: _ReaderWhereInput, list: true })
    }
});


const _BooksToReadersWhereInput = inputObjectType({
    name: "_BooksToReadersWhereInput",
    definition(t) {
        t.string("id")
        // OBS it is more sufficient to save the date as string instead of creating a costume scalar type.
        // In case of need to a compair dates, string compairison will work just fine since we save the dates as 
        // (UTC-zulu format) YYYY-MM-DD'T'HH:mm:ss
        t.field("borrowDate", { type: _StringFilter })
        t.field("returnDate", { type: _StringFilter })
        t.field("returned", { type: _BoolFilter })
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
        t.field("quantity", { type: _IntFilter })
        t.field("borrowedQuantity", { type: _IntFilter })
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




