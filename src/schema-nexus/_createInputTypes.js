const { inputObjectType, unionType, objectType } = require('@nexus/schema')

// export type BookCreateInput = {
//     id?: string
//     title?: string | null
//     pages?: number | null
//     chapters?: number | null
//     price?: number | null
//     booksToAuthors?: BooksToAuthorsCreateManyWithoutBookInput
//     booksToReaders?: BooksToReadersCreateManyWithoutBookInput
//     storage?: StorageCreateOneWithoutBookInput
// }


// export type BooksToAuthorsWhereUniqueInput = {
//     id?: string
// }


const _BookCreateInput = inputObjectType({
    name: "_BookCreateInput",
    definition(t) {
        t.string("title", { nullable: false })
        t.int("pages", { nullable: false })
        t.string("isbn", { nullable: false })
        t.int("chapters", { nullable: false })
        t.float("price", { nullable: false })
        t.string("description", { nullable: false })
        t.string("imgUri", { nullable: true })
        t.field("booksToAuthors", { type: _BooksToAuthorsCreateManyWithoutBookInput })
        t.field("booksToReaders", { type: _BooksToReadersCreateManyWithoutBookInput })
        t.field("storage", { type: _StorageCreateOneWithoutBookInput })
    }
});

// export type BooksToAuthorsCreateManyWithoutBookInput = {
//     create?: Enumerable<BooksToAuthorsCreateWithoutBookInput>
//     connect?: Enumerable<BooksToAuthorsWhereUniqueInput>
//   }


const _BooksToAuthorsCreateManyWithoutBookInput = inputObjectType({
    name: "BooksToAuthorsCreateManyWithoutBookInput",
    definition(t) {
        t.field("create", { type: _BooksToAuthorsCreateWithoutBookInput, list: true })
        // t.field("connect", { type: _BooksToAuthorsWhereUniqueInput, list: true })

    }
})


// export type BooksToAuthorsWhereUniqueInput = {
//     id?: string
//   }

const _BooksToAuthorsWhereUniqueInput = inputObjectType({
    name: "_BooksToAuthorsWhereUniqueInput",
    definition(t) {
        t.string("id")
    }
})


// export type BooksToAuthorsCreateWithoutBookInput = {
//     id?: string
//     author: AuthorCreateOneWithoutBooksToAuthorsInput
//   }

const _BooksToAuthorsCreateWithoutBookInput = inputObjectType({
    name: "_BooksToAuthorsCreateWithoutBookInput",
    definition(t) {
        t.field("author", { type: _AuthorCreateOneWithoutBooksToAuthorsInput })
    }
})


// export type AuthorCreateOneWithoutBooksToAuthorsInput = {
//     create?: AuthorCreateWithoutBooksToAuthorsInput
//     connect?: AuthorWhereUniqueInput
//   }


const _AuthorCreateOneWithoutBooksToAuthorsInput = inputObjectType({
    name: "_AuthorCreateOneWithoutBooksToAuthorsInput",
    definition(t) {
        // t.field("create", { type: _AuthorCreateWithoutBooksToAuthorsInput })
        t.field("connect", { type: _AuthorWhereUniqueInput })
    }
})


// export type AuthorCreateWithoutBooksToAuthorsInput = {
//     id?: string
//     name?: string | null
//     email?: string | null
//   }

const _AuthorCreateWithoutBooksToAuthorsInput = inputObjectType({
    name: "_AuthorCreateWithoutBooksToAuthorsInput",
    definition(t) {
        t.string("name")
        t.string("email")
        t.string("about")
        t.string("imgUri", { nullable: true })

    }
});


// export type AuthorWhereUniqueInput = {
//     id?: string
//     email?: string | null
//   }


const _AuthorWhereUniqueInput = inputObjectType({
    name: "_AuthorWhereUniqueInput",
    definition(t) {
        t.string("id")
        t.string("email")
    }
});



// export type BooksToReadersCreateManyWithoutBookInput = {
//     create?: Enumerable<BooksToReadersCreateWithoutBookInput>
//     connect?: Enumerable<BooksToReadersWhereUniqueInput>
// }


const _BooksToReadersCreateManyWithoutBookInput = inputObjectType({
    name: "_BooksToReadersCreateManyWithoutBookInput",
    definition(t) {
        t.field("create", { type: _BooksToReadersCreateWithoutBookInput, list: true })
        // t.field("connect", { type: _BooksToReadersWhereUniqueInput, list: true })
    }
})




// export type BooksToReadersCreateWithoutBookInput = {
//     id?: string
//     borrowDate: string
//     returnDate: string
//     returned?: boolean
//     reader: ReaderCreateOneWithoutBooksToReadersInput
// }


const _BooksToReadersCreateWithoutBookInput = inputObjectType({
    name: "_BooksToReadersCreateWithoutBookInput",
    definition(t) {
        t.string("borrowDate")
        t.string("returnDate")
        t.boolean("returned")
        t.field("reader", { type: _ReaderCreateOneWithoutBooksToReadersInput })
    }
});

// export type BooksToReadersWhereUniqueInput = {
//     id?: string
// }
const _BooksToReadersWhereUniqueInput = inputObjectType({
    name: "_BooksToReadersWhereUniqueInput",
    definition(t) {
        t.string("id")
    }
})




// export type ReaderCreateOneWithoutBooksToReadersInput = {
//     create?: ReaderCreateWithoutBooksToReadersInput
//     connect?: ReaderWhereUniqueInput
// }



const _ReaderCreateOneWithoutBooksToReadersInput = inputObjectType({
    name: "_ReaderCreateOneWithoutBooksToReadersInput",
    definition(t) {
        // t.field("create", { type: _ReaderCreateWithoutBooksToReadersInput })
        t.field("connect", { type: _ReaderWhereUniqueInput })
    }
})

// export type ReaderCreateWithoutBooksToReadersInput = {
//     id?: string
//     name?: string | null
//     email?: string | null
// }
const _ReaderCreateWithoutBooksToReadersInput = inputObjectType({
    name: "_ReaderCreateWithoutBooksToReadersInput",
    definition(t) {
        t.string("name")
        t.string("email")
        t.string("imgUri", { nullable: true })
        // t.string("costumerId")
        t.string("address")
        t.string("phone", { nullable: true })
    }
});


// export type ReaderWhereUniqueInput = {
//     id?: string
//     email?: string | null
// }
const _ReaderWhereUniqueInput = inputObjectType({
    name: "_ReaderWhereUniqueInput",
    definition(t) {
        t.string("id")
        t.string("email")
        t.string("phone")
    }
});




// export type StorageCreateOneWithoutBookInput = {
//     create?: StorageCreateWithoutBookInput
//     connect?: StorageWhereUniqueInput
// }
const _StorageCreateOneWithoutBookInput = inputObjectType({
    name: "_StorageCreateOneWithoutBookInput",
    definition(t) {
        t.field("create", { type: _StorageCreateWithoutBookInput })

        // t.field("connect", { type: _StorageWhereUniqueInput }) 
    }
})


// export type StorageCreateWithoutBookInput = {
//     id?: string
//     quantity?: number | null
//     borrowedQuantity?: number | null
// }

const _StorageCreateWithoutBookInput = inputObjectType({
    name: "_StorageCreateWithoutBookInput",
    definition(t) {
        t.int("quantity")
        t.int("borrowedQuantity", { nullable: true })
    }
});

// export type StorageWhereUniqueInput = {
//     id?: string
// }

const _StorageWhereUniqueInput = inputObjectType({
    name: "_StorageWhereUniqueInput",
    definition(t) {
        t.string("id")
    }
});
















// export type AuthorCreateInput = {
//     id?: string
//     name?: string | null
//     email?: string | null
//     booksToAuthors?: BooksToAuthorsCreateManyWithoutAuthorInput
// }

const _AuthorCreateInput = inputObjectType({
    name: "_AuthorCreateInput",
    definition(t) {
        t.string("name")
        t.string("email")
        t.string("about")
        t.string("imgUri", { nullable: true })

        t.field("booksToAuthors", { type: _BooksToAuthorsCreateManyWithoutAuthorInput })
    }
});


// export type BooksToAuthorsCreateManyWithoutAuthorInput = {
//     create?: Enumerable<BooksToAuthorsCreateWithoutAuthorInput>
//     connect?: Enumerable<BooksToAuthorsWhereUniqueInput>
// }

const _BooksToAuthorsCreateManyWithoutAuthorInput = inputObjectType({
    name: "_BooksToAuthorsCreateManyWithoutAuthorInput",
    definition(t) {
        t.field("create", { type: _BooksToAuthorsCreateWithoutAuthorInput, list: true })
        // t.field("connect", { type: _BooksToAuthorsWhereUniqueInput, list: true })
    }
})


// export type BooksToAuthorsCreateWithoutAuthorInput = {
//     id?: string
//     book: BookCreateOneWithoutBooksToAuthorsInput
// }

const _BooksToAuthorsCreateWithoutAuthorInput = inputObjectType({
    name: "_BooksToAuthorsCreateWithoutAuthorInput",
    definition(t) {
        t.field("book", { type: _BookCreateOneWithoutBooksToAuthorsInput })
    }
});


// export type BookCreateOneWithoutBooksToAuthorsInput = {
//     create?: BookCreateWithoutBooksToAuthorsInput
//     connect?: BookWhereUniqueInput
// }

const _BookCreateOneWithoutBooksToAuthorsInput = inputObjectType({
    name: "_BookCreateOneWithoutBooksToAuthorsInput",
    definition(t) {
        // t.field("create", { type: _BookCreateWithoutBooksToAuthorsInput })
        t.field("connect", { type: _BookWhereUniqueInput })
    }
})

// export type BookCreateWithoutBooksToAuthorsInput = {
//     id?: string
//     title?: string | null
//     pages?: number | null
//     chapters?: number | null
//     price?: number | null
//     booksToReaders?: BooksToReadersCreateManyWithoutBookInput  292
//     storage?: StorageCreateOneWithoutBookInput
// }
const _BookCreateWithoutBooksToAuthorsInput = inputObjectType({
    name: "_BookCreateWithoutBooksToAuthorsInput",
    definition(t) {
        t.string("title")
        t.string("isbn")
        t.int("pages")
        t.int("chapters")
        t.float("price")
        t.string("description")
        t.string("imgUri", { nullable: true })
        t.field("booksToReaders", { type: _BooksToReadersCreateManyWithoutBookInput })
        t.field("storage", { type: _StorageCreateOneWithoutBookInput })
    }
});


// export type BookWhereUniqueInput = {
//     id?: string
// }
const _BookWhereUniqueInput = inputObjectType({
    name: "_BookWhereUniqueInput",
    definition(t) {
        t.string("id")
        t.string("isbn")
    }
});





// export type ReaderCreateInput = {
//     id?: string
//     name?: string | null
//     email?: string | null
//     booksToReaders?: BooksToReadersCreateManyWithoutReaderInput
// }






const _ReaderCreateInput = inputObjectType({
    name: "_ReaderCreateInput",
    definition(t) {
        t.string("name")
        t.string("email")
        t.string("imgUri", { nullable: true })
        // t.string("costumerId")
        t.string("address")
        t.string("phone", { nullable: true })
        t.field("booksToReaders", { type: _BooksToReadersCreateManyWithoutReaderInput })
    }
});

// export type BooksToReadersCreateManyWithoutReaderInput = {
//     create?: Enumerable<BooksToReadersCreateWithoutReaderInput>
//     connect?: Enumerable<BooksToReadersWhereUniqueInput>
// }

const _BooksToReadersCreateManyWithoutReaderInput = inputObjectType({
    name: "_BooksToReadersCreateManyWithoutReaderInput",
    definition(t) {
        t.field("create", { type: _BooksToReadersCreateWithoutReaderInput, list: true })
        // t.field("connect", { type: _BooksToReadersWhereUniqueInput, list: true })
    }
})



// export type BooksToReadersCreateWithoutReaderInput = {
//     id?: string
//     borrowDate: string
//     returnDate: string
//     returned?: boolean
//     book: BookCreateOneWithoutBooksToReadersInput
// }

const _BooksToReadersCreateWithoutReaderInput = inputObjectType({
    name: "_BooksToReadersCreateWithoutReaderInput",
    definition(t) {
        t.string("borrowDate")
        t.string("returnDate")
        t.boolean("returned")
        t.field("book", { type: _BookCreateOneWithoutBooksToReadersInput })
    }
});




// export type BookCreateOneWithoutBooksToReadersInput = {
//     create?: BookCreateWithoutBooksToReadersInput
//     connect?: BookWhereUniqueInput
// }



const _BookCreateOneWithoutBooksToReadersInput = inputObjectType({
    name: "_BookCreateOneWithoutBooksToReadersInput",
    definition(t) {
        // t.field("create", { type: _BookCreateWithoutBooksToReadersInput })
        t.field("connect", { type: _BookWhereUniqueInput })
    }
})


// export type BookCreateWithoutBooksToReadersInput = {
//     id?: string
//     title?: string | null
//     pages?: number | null
//     chapters?: number | null
//     price?: number | null
//     booksToAuthors?: BooksToAuthorsCreateManyWithoutBookInput
//     storage?: StorageCreateOneWithoutBookInput
// }

const _BookCreateWithoutBooksToReadersInput = inputObjectType({
    name: "_BookCreateWithoutBooksToReadersInput",
    definition(t) {
        t.string("title")
        t.string("isbn")
        t.int("pages")
        t.int("chapters")
        t.float("price")
        t.string("description")
        t.string("imgUri", { nullable: true })
        t.field("booksToAuthors", { type: _BooksToAuthorsCreateManyWithoutBookInput })
        t.field("storage", { type: _StorageCreateOneWithoutBookInput })
    }
});












// export type StorageCreateInput = {
//     id?: string
//     quantity?: number | null
//     borrowedQuantity?: number | null
//     book: BookCreateOneWithoutStorageInput
// }

const _StorageCreateInput = inputObjectType({
    name: "_StorageCreateInput",
    definition(t) {
        t.int("quantity")
        t.int("borrowedQuantity", { nullable: true, })
        t.field("book", { type: _BookCreateOneWithoutStorageInput })
    }
});

// export type BookCreateOneWithoutStorageInput = {
//     create?: BookCreateWithoutStorageInput
//     connect?: BookWhereUniqueInput
// }
const _BookCreateOneWithoutStorageInput = inputObjectType({
    name: "_BookCreateOneWithoutStorageInput",
    definition(t) {
        // t.field("create", { type: _BookCreateWithoutStorageInput })
        t.field("connect", { type: _BookWhereUniqueInput })
    }
})

// export type BookCreateWithoutStorageInput = {
//     id?: string
//     title?: string | null
//     pages?: number | null
//     chapters?: number | null
//     price?: number | null
//     booksToAuthors?: BooksToAuthorsCreateManyWithoutBookInput
//     booksToReaders?: BooksToReadersCreateManyWithoutBookInput
// }


const _BookCreateWithoutStorageInput = inputObjectType({
    name: "_BookCreateWithoutStorageInput",
    definition(t) {
        t.string("title")
        t.string("isbn")
        t.int("pages")
        t.int("chapters")
        t.float("price")
        t.string("description")
        t.string("imgUri", { nullable: true })
        t.field("booksToAuthors", { type: _BooksToAuthorsCreateManyWithoutBookInput })
        t.field("booksToReaders", { type: _BooksToReadersCreateManyWithoutBookInput })
    }
});












module.exports = {
    _BookCreateInput,
    _AuthorCreateInput,
    _ReaderCreateInput,
    _StorageCreateInput,


    // to be used in the _updateInputTypes.js
    _BooksToReadersCreateWithoutBookInput,
    _BooksToReadersWhereUniqueInput,
    _BooksToAuthorsCreateWithoutAuthorInput,
    _BooksToAuthorsWhereUniqueInput,
    _BookWhereUniqueInput,
    _BookCreateWithoutBooksToAuthorsInput,
    _StorageCreateWithoutBookInput,
    _StorageWhereUniqueInput,
    _ReaderCreateWithoutBooksToReadersInput,
    _ReaderWhereUniqueInput,
    _BooksToAuthorsCreateWithoutBookInput,
    _AuthorCreateWithoutBooksToAuthorsInput,
    _AuthorWhereUniqueInput,
    _BooksToReadersCreateWithoutReaderInput,
    _BookCreateWithoutBooksToReadersInput,
    _BookCreateWithoutStorageInput
}




