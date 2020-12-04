const { inputObjectType, unionType, objectType } = require('@nexus/schema')
const { _BooksToReadersCreateWithoutBookInput,
    _BooksToReadersWhereUniqueInput,
    _BooksToAuthorsCreateWithoutAuthorInput,
    _BooksToAuthorsWhereUniqueInput,
    _BookWhereUniqueInput,
    _BookCreateWithoutBooksToAuthorsInput,
    _StorageCreateWithoutBookInput, _StorageWhereUniqueInput,
    _ReaderCreateWithoutBooksToReadersInput, _ReaderWhereUniqueInput,
    _BooksToAuthorsCreateWithoutBookInput,
    _AuthorCreateWithoutBooksToAuthorsInput, _AuthorWhereUniqueInput,
    _BooksToReadersCreateWithoutReaderInput, _BookCreateWithoutBooksToReadersInput,
    _BookCreateWithoutStorageInput } = require('./_createInputTypes')


/*export type AuthorUpdateInput = {
    id?: string | StringFieldUpdateOperationsInput
    name?: string | NullableStringFieldUpdateOperationsInput | null
    email?: string | NullableStringFieldUpdateOperationsInput | null
    booksToAuthors?: BooksToAuthorsUpdateManyWithoutAuthorInput
}*/





const _AuthorUpdateInput = inputObjectType({
    name: "_AuthorUpdateInput",
    definition(t) {
        t.string("name", { nullable: true })
        t.string("email", { nullable: true })
        t.string("about", { nullable: true })
        t.string("imgUri", { nullable: true })

        t.field("booksToAuthors", { type: _BooksToAuthorsUpdateManyWithoutAuthorInput, nullable: true })
    }
});


/*export type BooksToAuthorsUpdateManyWithoutAuthorInput = {
    create?: Enumerable<BooksToAuthorsCreateWithoutAuthorInput>
    connect?: Enumerable<BooksToAuthorsWhereUniqueInput>
    set?: Enumerable<BooksToAuthorsWhereUniqueInput>
    disconnect?: Enumerable<BooksToAuthorsWhereUniqueInput>
    delete?: Enumerable<BooksToAuthorsWhereUniqueInput>
    update?: Enumerable<BooksToAuthorsUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<BooksToAuthorsUpdateManyWithWhereNestedInput> | null
    deleteMany?: Enumerable<BooksToAuthorsScalarWhereInput>
    upsert?: Enumerable<BooksToAuthorsUpsertWithWhereUniqueWithoutAuthorInput>
}*/

const _BooksToAuthorsUpdateManyWithoutAuthorInput = inputObjectType({
    name: "_BooksToAuthorsUpdateManyWithoutAuthorInput",
    definition(t) {
        t.field("create", { type: _BooksToAuthorsCreateWithoutAuthorInput, list: true, nullable: true })
        // t.field("connect", { type: _BooksToAuthorsWhereUniqueInput, list: true, nullable: true })
        t.field("set", { type: _BooksToAuthorsWhereUniqueInput, list: true, nullable: true })
        t.field("disconnect", { type: _BooksToAuthorsWhereUniqueInput, list: true, nullable: true })
        t.field("delete", { type: _BooksToAuthorsWhereUniqueInput, list: true, nullable: true })
        t.field("update", { type: _BooksToAuthorsUpdateWithWhereUniqueWithoutAuthorInput, list: true, nullable: true })
        t.field("updateMany", { type: _BooksToAuthorsUpdateManyWithWhereNestedInput, list: true, nullable: true })
        t.field("deleteMany", { type: _BooksToAuthorsScalarWhereInput, list: true })
        t.field("upsert", { type: _BooksToAuthorsUpsertWithWhereUniqueWithoutAuthorInput, list: true, nullable: true })
    }
})


/*export type BooksToAuthorsUpdateWithWhereUniqueWithoutAuthorInput = {
    where: BooksToAuthorsWhereUniqueInput
    data: BooksToAuthorsUpdateWithoutAuthorDataInput
}*/

const _BooksToAuthorsUpdateWithWhereUniqueWithoutAuthorInput = inputObjectType({
    name: "_BooksToAuthorsUpdateWithWhereUniqueWithoutAuthorInput",
    definition(t) {
        t.field("where", { type: _BooksToAuthorsWhereUniqueInput })
        t.field("data", { type: _BooksToAuthorsUpdateWithoutAuthorDataInput })
    }
})


/*export type BooksToAuthorsUpdateManyWithWhereNestedInput = {
    where: BooksToAuthorsScalarWhereInput
    data: BooksToAuthorsUpdateManyDataInput
}*/

const _BooksToAuthorsUpdateManyWithWhereNestedInput = inputObjectType({
    name: "_BooksToAuthorsUpdateManyWithWhereNestedInput",
    definition(t) {
        t.field("where", { type: _BooksToAuthorsScalarWhereInput })
        t.field("data", { type: _BooksToAuthorsUpdateManyDataInput })
    }
})

/*export type BooksToAuthorsScalarWhereInput = {
    AND?: Enumerable<BooksToAuthorsScalarWhereInput>
    OR?: Array<BooksToAuthorsScalarWhereInput>
    NOT?: Enumerable<BooksToAuthorsScalarWhereInput>
    id?: string | StringFilter
    bookId?: string | StringNullableFilter | null
    authorId?: string | StringNullableFilter | null
}*/


const _BooksToAuthorsScalarWhereInput = inputObjectType({
    name: "_BooksToAuthorsScalarWhereInput",
    definition(t) {
        t.field("AND", { type: _BooksToAuthorsScalarWhereInput, list: true, nullable: true })
        t.field("OR", { type: _BooksToAuthorsScalarWhereInput, list: true, nullable: true })
        t.field("NOT", { type: _BooksToAuthorsScalarWhereInput, list: true, nullable: true })
        t.string("id")
        t.string("bookId", { nullable: true })
        t.string("authorId", { nullable: true })
    }
})

/*export type BooksToAuthorsUpsertWithWhereUniqueWithoutAuthorInput = {
    where: BooksToAuthorsWhereUniqueInput
    update: BooksToAuthorsUpdateWithoutAuthorDataInput
    create: BooksToAuthorsCreateWithoutAuthorInput
}*/

const _BooksToAuthorsUpsertWithWhereUniqueWithoutAuthorInput = inputObjectType({
    name: "_BooksToAuthorsUpsertWithWhereUniqueWithoutAuthorInput",
    definition(t) {
        t.field("where", { type: _BooksToAuthorsWhereUniqueInput })
        t.field("update", { type: _BooksToAuthorsUpdateWithoutAuthorDataInput })
        t.field("create", { type: _BooksToAuthorsCreateWithoutAuthorInput })
    }
})


/*export type BooksToAuthorsUpdateWithoutAuthorDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    book?: BookUpdateOneWithoutBooksToAuthorsInput
}*/

const _BooksToAuthorsUpdateWithoutAuthorDataInput = inputObjectType({
    name: "_BooksToAuthorsUpdateWithoutAuthorDataInput",
    definition(t) {
        t.field("book", { type: _BookUpdateOneWithoutBooksToAuthorsInput, nullable: true })
    }
})

/*export type BooksToAuthorsUpdateManyDataInput = {
    id?: string | 
}*/
const _BooksToAuthorsUpdateManyDataInput = inputObjectType({
    name: "_BooksToAuthorsUpdateManyDataInput",
    definition(t) {
        t.string("id", { nullable: true })
    }
})


/*export type BookUpdateOneWithoutBooksToAuthorsInput = {
    create?: BookCreateWithoutBooksToAuthorsInput
    connect?: BookWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: BookUpdateWithoutBooksToAuthorsDataInput
    upsert?: BookUpsertWithoutBooksToAuthorsInput
}*/

const _BookUpdateOneWithoutBooksToAuthorsInput = inputObjectType({
    name: "_BookUpdateOneWithoutBooksToAuthorsInput",
    definition(t) {
        // t.field("create", { type: _BookCreateWithoutBooksToAuthorsInput, nullable: true })
        t.field("connect", { type: _BookWhereUniqueInput, nullable: true })
        t.boolean("disconnect", { nullable: true })
        t.boolean("delete", { nullable: true })
        t.field("update", { type: _BookUpdateWithoutBooksToAuthorsDataInput, nullable: true })
        t.field("upsert", { type: _BookUpsertWithoutBooksToAuthorsInput, nullable: true })
    }
})



/*export type BookUpdateWithoutBooksToAuthorsDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    title?: string | NullableStringFieldUpdateOperationsInput | null
    pages?: number | NullableIntFieldUpdateOperationsInput | null
    chapters?: number | NullableIntFieldUpdateOperationsInput | null
    price?: number | NullableFloatFieldUpdateOperationsInput | null
    booksToReaders?: BooksToReadersUpdateManyWithoutBookInput
    storage?: StorageUpdateOneRequiredWithoutBookInput
}*/




const _BookUpdateWithoutBooksToAuthorsDataInput = inputObjectType({
    name: "_BookUpdateWithoutBooksToAuthorsDataInput",
    definition(t) {
        t.string("title", { nullable: true })
        t.string("isbn")
        t.int("pages", { nullable: true })
        t.int("chapters", { nullable: true })
        t.float("price", { nullable: true })
        t.string("description", { nullable: true })
        t.string("imgUri", { nullable: true })

        t.field("booksToReaders", { type: _BooksToReadersUpdateManyWithoutBookInput, nullable: true })
        t.field("storage", { type: _StorageUpdateOneRequiredWithoutBookInput, nullable: true })
    }
});


/*export type BooksToReadersUpdateManyWithoutBookInput = {
    create?: Enumerable<BooksToReadersCreateWithoutBookInput>
    connect?: Enumerable<BooksToReadersWhereUniqueInput>
    set?: Enumerable<BooksToReadersWhereUniqueInput>
    disconnect?: Enumerable<BooksToReadersWhereUniqueInput>
    delete?: Enumerable<BooksToReadersWhereUniqueInput>
    update?: Enumerable<BooksToReadersUpdateWithWhereUniqueWithoutBookInput>
    updateMany?: Enumerable<BooksToReadersUpdateManyWithWhereNestedInput> | null
    deleteMany?: Enumerable<BooksToReadersScalarWhereInput>
    upsert?: Enumerable<BooksToReadersUpsertWithWhereUniqueWithoutBookInput>
}*/

const _BooksToReadersUpdateManyWithoutBookInput = inputObjectType({
    name: "_BooksToReadersUpdateManyWithoutBookInput",
    definition(t) {
        t.field("create", { type: _BooksToReadersCreateWithoutBookInput, list: true, nullable: true })
        // t.field("connect", { type: _BooksToReadersWhereUniqueInput, list: true, nullable: true })
        t.field("set", { type: _BooksToReadersWhereUniqueInput, list: true, nullable: true })
        t.field("disconnect", { type: _BooksToReadersWhereUniqueInput, list: true, nullable: true })
        t.field("delete", { type: _BooksToReadersWhereUniqueInput, list: true, nullable: true })
        t.field("update", { type: _BooksToReadersUpdateWithWhereUniqueWithoutBookInput, list: true, nullable: true })
        t.field("updateMany", { type: _BooksToReadersUpdateManyWithWhereNestedInput, list: true, nullable: true })
        t.field("deleteMany", { type: _BooksToReadersScalarWhereInput, list: true, nullable: true })
        t.field("upsert", { type: _BooksToReadersUpsertWithWhereUniqueWithoutBookInput, list: true, nullable: true })
    }
})

/*export type BookUpsertWithoutBooksToAuthorsInput = {
    update: BookUpdateWithoutBooksToAuthorsDataInput
    create: BookCreateWithoutBooksToAuthorsInput
}*/

const _BookUpsertWithoutBooksToAuthorsInput = inputObjectType({
    name: "_BookUpsertWithoutBooksToAuthorsInput",
    definition(t) {
        t.field("update", { type: _BookUpdateWithoutBooksToAuthorsDataInput })
        // t.field("create", { type: _BookCreateWithoutBooksToAuthorsInput })
    }
})


/*export type StorageUpdateOneRequiredWithoutBookInput = {
    create?: StorageCreateWithoutBookInput
    connect?: StorageWhereUniqueInput
    update?: StorageUpdateWithoutBookDataInput
    upsert?: StorageUpsertWithoutBookInput
}*/


const _StorageUpdateOneRequiredWithoutBookInput = inputObjectType({
    name: "_StorageUpdateOneRequiredWithoutBookInput",
    definition(t) {
        t.field("create", { type: _StorageCreateWithoutBookInput, nullable: true })
        // t.field("connect", { type: _StorageWhereUniqueInput, nullable: true })
        t.field("update", { type: _StorageUpdateWithoutBookDataInput, nullable: true })
        t.field("upsert", { type: _StorageUpsertWithoutBookInput, nullable: true })
    }
})


/*export type BooksToReadersUpdateWithWhereUniqueWithoutBookInput = {
    where: BooksToReadersWhereUniqueInput
    data: BooksToReadersUpdateWithoutBookDataInput
}*/

const _BooksToReadersUpdateWithWhereUniqueWithoutBookInput = inputObjectType({
    name: "_BooksToReadersUpdateWithWhereUniqueWithoutBookInput",
    definition(t) {
        t.field("where", { type: _BooksToReadersWhereUniqueInput })
        t.field("data", { type: _BooksToReadersUpdateWithoutBookDataInput })
    }
})



/*export type BooksToReadersUpdateManyWithWhereNestedInput = {
    where: BooksToReadersScalarWhereInput
    data: BooksToReadersUpdateManyDataInput
}*/

const _BooksToReadersUpdateManyWithWhereNestedInput = inputObjectType({
    name: "_BooksToReadersUpdateManyWithWhereNestedInput",
    definition(t) {
        t.field("where", { type: _BooksToReadersScalarWhereInput })
        t.field("data", { type: _BooksToReadersUpdateManyDataInput })
    }
})



/*export type BooksToReadersScalarWhereInput = {
    AND?: Enumerable<BooksToReadersScalarWhereInput>
    OR?: Array<BooksToReadersScalarWhereInput>
    NOT?: Enumerable<BooksToReadersScalarWhereInput>
    id?: string | StringFilter
    borrowDate?: string | StringFilter
    returnDate?: string | StringFilter
    returned?: boolean | BoolFilter
    bookId?: string | StringFilter
    readerId?: string | StringFilter
}*/

const _BooksToReadersScalarWhereInput = inputObjectType({
    name: "_BooksToReadersScalarWhereInput",
    definition(t) {
        t.field("AND", { type: _BooksToReadersScalarWhereInput, list: true, nullable: true })
        t.field("OR", { type: _BooksToReadersScalarWhereInput, list: true, nullable: true })
        t.field("NOT", { type: _BooksToReadersScalarWhereInput, list: true, nullable: true })
        t.string("id", { nullable: true })
        t.string("borrowDate", { nullable: true })
        t.string("returnDate", { nullable: true })
        t.boolean("returned", { nullable: true })
        t.string("bookId", { nullable: true })
        t.string("readerId", { nullable: true })
    }
})


/*export type BooksToReadersUpdateManyDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    borrowDate?: string | StringFieldUpdateOperationsInput
    returnDate?: string | StringFieldUpdateOperationsInput
    returned?: boolean | BoolFieldUpdateOperationsInput
}*/
const _BooksToReadersUpdateManyDataInput = inputObjectType({
    name: "_BooksToReadersUpdateManyDataInput",
    definition(t) {
        t.string("borrowDate", { nullable: true })
        t.string("returnDate", { nullable: true })
        t.boolean("returned", { nullable: true })
    }
})


/*export type BooksToReadersUpsertWithWhereUniqueWithoutBookInput = {
    where: BooksToReadersWhereUniqueInput
    update: BooksToReadersUpdateWithoutBookDataInput
    create: BooksToReadersCreateWithoutBookInput
}*/


const _BooksToReadersUpsertWithWhereUniqueWithoutBookInput = inputObjectType({
    name: "_BooksToReadersUpsertWithWhereUniqueWithoutBookInput",
    definition(t) {
        t.field("where", { type: _BooksToReadersWhereUniqueInput })
        t.field("update", { type: _BooksToReadersUpdateWithoutBookDataInput })
        t.field("create", { type: _BooksToReadersCreateWithoutBookInput })
    }
})

/*export type StorageUpdateWithoutBookDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    quantity?: number | NullableIntFieldUpdateOperationsInput | null
    borrowedQuantity?: number | NullableIntFieldUpdateOperationsInput | null
}*/


const _StorageUpdateWithoutBookDataInput = inputObjectType({
    name: "_StorageUpdateWithoutBookDataInput",
    definition(t) {
        t.int("quantity", { nullable: true })
        t.int("borrowedQuantity", { nullable: true })
    }
})

/*export type StorageUpsertWithoutBookInput = {
    update: StorageUpdateWithoutBookDataInput
    create: StorageCreateWithoutBookInput
}*/
const _StorageUpsertWithoutBookInput = inputObjectType({
    name: "_StorageUpsertWithoutBookInput",
    definition(t) {
        t.field("update", { type: _StorageUpdateWithoutBookDataInput })
        t.field("create", { type: _StorageCreateWithoutBookInput })
    }
})


/*export type BooksToReadersUpdateWithoutBookDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    borrowDate?: string | StringFieldUpdateOperationsInput
    returnDate?: string | StringFieldUpdateOperationsInput
    returned?: boolean | BoolFieldUpdateOperationsInput
    reader?: ReaderUpdateOneWithoutBooksToReadersInput
}*/



const _BooksToReadersUpdateWithoutBookDataInput = inputObjectType({
    name: "_BooksToReadersUpdateWithoutBookDataInput",
    definition(t) {
        t.string("borrowDate", { nullable: true })
        t.string("returnDate", { nullable: true })
        t.boolean("returned", { nullable: true })
        t.field("reader", { type: _ReaderUpdateOneWithoutBooksToReadersInput, nullable: true })
    }
})


/*
export type ReaderUpdateOneWithoutBooksToReadersInput = {
    create?: ReaderCreateWithoutBooksToReadersInput
    connect?: ReaderWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: ReaderUpdateWithoutBooksToReadersDataInput
    upsert?: ReaderUpsertWithoutBooksToReadersInput
  }

}*/

const _ReaderUpdateOneWithoutBooksToReadersInput = inputObjectType({
    name: "_ReaderUpdateOneWithoutBooksToReadersInput",
    definition(t) {
        // t.field("create", { type: _ReaderCreateWithoutBooksToReadersInput, nullable: true })
        t.field("connect", { type: _ReaderWhereUniqueInput, nullable: true })
        t.boolean("disconnect", { nullable: true })
        t.boolean("delete", { nullable: true })
        t.field("update", { type: _ReaderUpdateWithoutBooksToReadersDataInput, nullable: true })
        t.field("upsert", { type: _ReaderUpsertWithoutBooksToReadersInput, nullable: true })
    }
})



/*export type ReaderUpdateWithoutBooksToReadersDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    name?: string | NullableStringFieldUpdateOperationsInput | null
    email?: string | NullableStringFieldUpdateOperationsInput | null
}*/

const _ReaderUpdateWithoutBooksToReadersDataInput = inputObjectType({
    name: "_ReaderUpdateWithoutBooksToReadersDataInput",
    definition(t) {
        t.string("name", { nullable: true })
        t.string("email", { nullable: true })
        t.string("imgUri", { nullable: true })
        t.string("address", { nullable: true })
        t.string("phone", { nullable: true })
    }
});


/*export type ReaderUpsertWithoutBooksToReadersInput = {
    update: ReaderUpdateWithoutBooksToReadersDataInput
    create: ReaderCreateWithoutBooksToReadersInput
}*/

const _ReaderUpsertWithoutBooksToReadersInput = inputObjectType({
    name: "_ReaderUpsertWithoutBooksToReadersInput",
    definition(t) {
        t.field("update", { type: _ReaderUpdateWithoutBooksToReadersDataInput, nullable: true })
        // t.field("create", { type: _ReaderCreateWithoutBooksToReadersInput, nullable: true })
    }
})


/*export type BookUpdateInput = {
    id?: string | StringFieldUpdateOperationsInput
    title?: string | NullableStringFieldUpdateOperationsInput | null
    pages?: number | NullableIntFieldUpdateOperationsInput | null
    chapters?: number | NullableIntFieldUpdateOperationsInput | null
    price?: number | NullableFloatFieldUpdateOperationsInput | null
    booksToAuthors?: BooksToAuthorsUpdateManyWithoutBookInput
    booksToReaders?: BooksToReadersUpdateManyWithoutBookInput
    storage?: StorageUpdateOneRequiredWithoutBookInput
}*/

const _BookUpdateInput = inputObjectType({
    name: "_BookUpdateInput",
    definition(t) {
        t.string("title", { nullable: true })
        t.string("isbn")
        t.int("pages", { nullable: true })
        t.int("chapters", { nullable: true })
        t.float("price", { nullable: true })
        t.string("description", { nullable: true })
        t.string("imgUri", { nullable: true })
        t.field("booksToAuthors", { type: _BooksToAuthorsUpdateManyWithoutBookInput, nullable: true })
        t.field("booksToReaders", { type: _BooksToReadersUpdateManyWithoutBookInput, nullable: true })
        t.field("storage", { type: _StorageUpdateOneRequiredWithoutBookInput, nullable: true })
    }
});

/*export type BooksToAuthorsUpdateManyWithoutBookInput = {
    create?: Enumerable<BooksToAuthorsCreateWithoutBookInput>
    connect?: Enumerable<BooksToAuthorsWhereUniqueInput>
    set?: Enumerable<BooksToAuthorsWhereUniqueInput>
    disconnect?: Enumerable<BooksToAuthorsWhereUniqueInput>
    delete?: Enumerable<BooksToAuthorsWhereUniqueInput>
    update?: Enumerable<BooksToAuthorsUpdateWithWhereUniqueWithoutBookInput>
    updateMany?: Enumerable<BooksToAuthorsUpdateManyWithWhereNestedInput> | null
    deleteMany?: Enumerable<BooksToAuthorsScalarWhereInput>
    upsert?: Enumerable<BooksToAuthorsUpsertWithWhereUniqueWithoutBookInput>
}*/

const _BooksToAuthorsUpdateManyWithoutBookInput = inputObjectType({
    name: "_BooksToAuthorsUpdateManyWithoutBookInput",
    definition(t) {
        t.field("create", { type: _BooksToAuthorsCreateWithoutBookInput, list: true, nullable: true })
        // t.field("connect", { type: _BooksToAuthorsWhereUniqueInput, list: true, nullable: true })
        t.field("set", { type: _BooksToAuthorsWhereUniqueInput, list: true, nullable: true })
        t.field("disconnect", { type: _BooksToAuthorsWhereUniqueInput, list: true, nullable: true })
        t.field("delete", { type: _BooksToAuthorsWhereUniqueInput, list: true, nullable: true })
        t.field("update", { type: _BooksToAuthorsUpdateWithWhereUniqueWithoutBookInput, list: true, nullable: true })
        t.field("updateMany", { type: _BooksToAuthorsUpdateManyWithWhereNestedInput, list: true, nullable: true })
        t.field("deleteMany", { type: _BooksToAuthorsScalarWhereInput, list: true })
        t.field("upsert", { type: _BooksToAuthorsUpsertWithWhereUniqueWithoutBookInput, list: true, nullable: true })
    }
})


/*export type BooksToAuthorsUpdateWithWhereUniqueWithoutBookInput = {
    where: BooksToAuthorsWhereUniqueInput
    data: BooksToAuthorsUpdateWithoutBookDataInput
}*/

const _BooksToAuthorsUpdateWithWhereUniqueWithoutBookInput = inputObjectType({
    name: "_BooksToAuthorsUpdateWithWhereUniqueWithoutBookInput",
    definition(t) {
        t.field("where", { type: _BooksToAuthorsWhereUniqueInput })
        t.field("data", { type: _BooksToAuthorsUpdateWithoutBookDataInput })
    }
})


/*export type BooksToAuthorsUpsertWithWhereUniqueWithoutBookInput = {
    where: BooksToAuthorsWhereUniqueInput
    update: BooksToAuthorsUpdateWithoutBookDataInput
    create: BooksToAuthorsCreateWithoutBookInput
}*/

const _BooksToAuthorsUpsertWithWhereUniqueWithoutBookInput = inputObjectType({
    name: "_BooksToAuthorsUpsertWithWhereUniqueWithoutBookInput",
    definition(t) {
        t.field("where", { type: _BooksToAuthorsWhereUniqueInput })
        t.field("update", { type: _BooksToAuthorsUpdateWithoutBookDataInput })
        t.field("create", { type: _BooksToAuthorsCreateWithoutBookInput })
    }
})


/*export type BooksToAuthorsUpdateWithoutBookDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    author?: AuthorUpdateOneWithoutBooksToAuthorsInput
}*/

const _BooksToAuthorsUpdateWithoutBookDataInput = inputObjectType({
    name: "_BooksToAuthorsUpdateWithoutBookDataInput",
    definition(t) {
        t.field("author", { type: _AuthorUpdateOneWithoutBooksToAuthorsInput, nullable: true })
    }
})


/*export type AuthorUpdateOneWithoutBooksToAuthorsInput = {
    create?: AuthorCreateWithoutBooksToAuthorsInput
    connect?: AuthorWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: AuthorUpdateWithoutBooksToAuthorsDataInput
    upsert?: AuthorUpsertWithoutBooksToAuthorsInput
}*/


const _AuthorUpdateOneWithoutBooksToAuthorsInput = inputObjectType({
    name: "_AuthorUpdateOneWithoutBooksToAuthorsInput",
    definition(t) {
        // t.field("create", { type: _AuthorCreateWithoutBooksToAuthorsInput, nullable: true })
        t.field("connect", { type: _AuthorWhereUniqueInput, nullable: true })
        t.boolean("disconnect", { nullable: true })
        t.boolean("delete", { nullable: true })
        t.field("update", { type: _AuthorUpdateWithoutBooksToAuthorsDataInput, nullable: true })
        t.field("upsert", { type: _AuthorUpsertWithoutBooksToAuthorsInput, nullable: true })
    }
})


/*export type AuthorUpdateWithoutBooksToAuthorsDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    name?: string | NullableStringFieldUpdateOperationsInput | null
    email?: string | NullableStringFieldUpdateOperationsInput | null
}*/


const _AuthorUpdateWithoutBooksToAuthorsDataInput = inputObjectType({
    name: "_AuthorUpdateWithoutBooksToAuthorsDataInput",
    definition(t) {
        t.string("name", { nullable: true })
        t.string("email", { nullable: true })
        t.string("about", { nullable: true })
        t.string("imgUri", { nullable: true })

    }
});


/*export type AuthorUpsertWithoutBooksToAuthorsInput = {
    update: AuthorUpdateWithoutBooksToAuthorsDataInput
    create: AuthorCreateWithoutBooksToAuthorsInput
}*/


const _AuthorUpsertWithoutBooksToAuthorsInput = inputObjectType({
    name: "_AuthorUpsertWithoutBooksToAuthorsInput",
    definition(t) {
        t.field("update", { type: _AuthorUpdateWithoutBooksToAuthorsDataInput })
        // t.field("create", { type: _AuthorCreateWithoutBooksToAuthorsInput })
    }
})

/*export type BooksToAuthorsUpdateInput = {
    id?: string | StringFieldUpdateOperationsInput
    author?: AuthorUpdateOneWithoutBooksToAuthorsInput
    book?: BookUpdateOneWithoutBooksToAuthorsInput
}*/


const _BooksToAuthorsUpdateInput = inputObjectType({
    name: "_BooksToAuthorsUpdateInput",
    definition(t) {
        t.field("author", { type: _AuthorUpdateOneWithoutBooksToAuthorsInput, nullable: true })
        t.field("book", { type: _BookUpdateOneWithoutBooksToAuthorsInput, nullable: true })
    }
});



/*export type ReaderUpdateInput = {
    id?: string | StringFieldUpdateOperationsInput
    name?: string | NullableStringFieldUpdateOperationsInput | null
    email?: string | NullableStringFieldUpdateOperationsInput | null
    booksToReaders?: BooksToReadersUpdateManyWithoutReaderInput
}*/

const _ReaderUpdateInput = inputObjectType({
    name: "_ReaderUpdateInput",
    definition(t) {
        t.string("name", { nullable: true })
        t.string("email", { nullable: true })
        t.string("imgUri", { nullable: true })
        t.string("address", { nullable: true })
        t.string("phone", { nullable: true })
        t.field("booksToReaders", { type: _BooksToReadersUpdateManyWithoutReaderInput, nullable: true })
    }
});


/*export type BooksToReadersUpdateManyWithoutReaderInput = {
    create?: Enumerable<BooksToReadersCreateWithoutReaderInput>
    connect?: Enumerable<BooksToReadersWhereUniqueInput>
    set?: Enumerable<BooksToReadersWhereUniqueInput>
    disconnect?: Enumerable<BooksToReadersWhereUniqueInput>
    delete?: Enumerable<BooksToReadersWhereUniqueInput>
    update?: Enumerable<BooksToReadersUpdateWithWhereUniqueWithoutReaderInput>
    updateMany?: Enumerable<BooksToReadersUpdateManyWithWhereNestedInput> | null
    deleteMany?: Enumerable<BooksToReadersScalarWhereInput>
    upsert?: Enumerable<BooksToReadersUpsertWithWhereUniqueWithoutReaderInput>
}*/


const _BooksToReadersUpdateManyWithoutReaderInput = inputObjectType({
    name: "_BooksToReadersUpdateManyWithoutReaderInput",
    definition(t) {
        t.field("create", { type: _BooksToReadersCreateWithoutReaderInput, list: true, nullable: true })
        // t.field("connect", { type: _BooksToReadersWhereUniqueInput, list: true, nullable: true })
        t.field("set", { type: _BooksToReadersWhereUniqueInput, list: true, nullable: true })
        t.field("disconnect", { type: _BooksToReadersWhereUniqueInput, list: true, nullable: true })
        t.field("delete", { type: _BooksToReadersWhereUniqueInput, list: true, nullable: true })
        t.field("update", { type: _BooksToReadersUpdateWithWhereUniqueWithoutReaderInput, list: true, nullable: true })
        t.field("updateMany", { type: _BooksToReadersUpdateManyWithWhereNestedInput, list: true, nullable: true })
        t.field("deleteMany", { type: _BooksToReadersScalarWhereInput, list: true, nullable: true })
        t.field("upsert", { type: _BooksToReadersUpsertWithWhereUniqueWithoutReaderInput, list: true, nullable: true })
    }
})


/*export type BooksToReadersUpdateWithWhereUniqueWithoutReaderInput = {
    where: BooksToReadersWhereUniqueInput
    data: BooksToReadersUpdateWithoutReaderDataInput
}*/

const _BooksToReadersUpdateWithWhereUniqueWithoutReaderInput = inputObjectType({
    name: "_BooksToReadersUpdateWithWhereUniqueWithoutReaderInput",
    definition(t) {
        t.field("where", { type: _BooksToReadersWhereUniqueInput })
        t.field("data", { type: _BooksToReadersUpdateWithoutReaderDataInput })
    }
})



/*export type BooksToReadersUpdateWithoutReaderDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    borrowDate?: string | StringFieldUpdateOperationsInput
    returnDate?: string | StringFieldUpdateOperationsInput
    returned?: boolean | BoolFieldUpdateOperationsInput
    book?: BookUpdateOneWithoutBooksToReadersInput
}*/

const _BooksToReadersUpdateWithoutReaderDataInput = inputObjectType({
    name: "_BooksToReadersUpdateWithoutReaderDataInput",
    definition(t) {
        t.string("borrowDate", { nullable: true })
        t.string("returnDate", { nullable: true })
        t.boolean("returned", { nullable: true })
        t.field("book", { type: _BookUpdateOneWithoutBooksToReadersInput, nullable: true })
    }
})


/*export type BooksToReadersUpsertWithWhereUniqueWithoutReaderInput = {
    where: BooksToReadersWhereUniqueInput
    update: BooksToReadersUpdateWithoutReaderDataInput
    create: BooksToReadersCreateWithoutReaderInput
}*/


const _BooksToReadersUpsertWithWhereUniqueWithoutReaderInput = inputObjectType({
    name: "_BooksToReadersUpsertWithWhereUniqueWithoutReaderInput",
    definition(t) {
        t.field("where", { type: _BooksToReadersWhereUniqueInput })
        t.field("update", { type: _BooksToReadersUpdateWithoutReaderDataInput })
        t.field("create", { type: _BooksToReadersCreateWithoutReaderInput })
    }
})

/*export type BookUpdateOneWithoutBooksToReadersInput = {
    create?: BookCreateWithoutBooksToReadersInput
    connect?: BookWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: BookUpdateWithoutBooksToReadersDataInput
    upsert?: BookUpsertWithoutBooksToReadersInput
  }
*/


const _BookUpdateOneWithoutBooksToReadersInput = inputObjectType({
    name: "_BookUpdateOneWithoutBooksToReadersInput",
    definition(t) {
        // t.field("create", { type: _BookCreateWithoutBooksToReadersInput, nullable: true })
        t.field("connect", { type: _BookWhereUniqueInput, nullable: true })
        t.boolean("disconnect", { nullable: true })
        t.boolean("delete", { nullable: true })

        t.field("update", { type: _BookUpdateWithoutBooksToReadersDataInput, nullable: true })
        t.field("upsert", { type: _BookUpsertWithoutBooksToReadersInput, nullable: true })
    }
})


/*export type BookUpdateWithoutBooksToReadersDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    title?: string | NullableStringFieldUpdateOperationsInput | null
    pages?: number | NullableIntFieldUpdateOperationsInput | null
    chapters?: number | NullableIntFieldUpdateOperationsInput | null
    price?: number | NullableFloatFieldUpdateOperationsInput | null
    booksToAuthors?: BooksToAuthorsUpdateManyWithoutBookInput
    storage?: StorageUpdateOneRequiredWithoutBookInput
}*/


const _BookUpdateWithoutBooksToReadersDataInput = inputObjectType({
    name: "_BookUpdateWithoutBooksToReadersDataInput",
    definition(t) {
        t.string("title", { nullable: true })
        t.string("isbn")
        t.int("pages", { nullable: true })
        t.int("chapters", { nullable: true })
        t.float("price", { nullable: true })
        t.string("description", { nullable: true })
        t.string("imgUri", { nullable: true })
        t.field("booksToAuthors", { type: _BooksToAuthorsUpdateManyWithoutBookInput, nullable: true })
        t.field("storage", { type: _StorageUpdateOneRequiredWithoutBookInput, nullable: true })
    }
});

/*export type BookUpsertWithoutBooksToReadersInput = {
    update: BookUpdateWithoutBooksToReadersDataInput
    create: BookCreateWithoutBooksToReadersInput
}*/

const _BookUpsertWithoutBooksToReadersInput = inputObjectType({
    name: "_BookUpsertWithoutBooksToReadersInput",
    definition(t) {
        t.field("update", { type: _BookUpdateWithoutBooksToReadersDataInput, nullable: true })
        // t.field("create", { type: _BookCreateWithoutBooksToReadersInput, nullable: true })
    }
})


/*export type BooksToReadersUpdateInput = {
    id?: string | StringFieldUpdateOperationsInput
    borrowDate?: string | StringFieldUpdateOperationsInput
    returnDate?: string | StringFieldUpdateOperationsInput
    returned?: boolean | BoolFieldUpdateOperationsInput
    book?: BookUpdateOneWithoutBooksToReadersInput
    reader?: ReaderUpdateOneWithoutBooksToReadersInput
}*/


const _BooksToReadersUpdateInput = inputObjectType({
    name: "_BooksToReadersUpdateInput",
    definition(t) {
        t.string("borrowDate", { nullable: true })
        t.string("returnDate", { nullable: true })
        t.boolean("returned", { nullable: true })
        t.field("book", { type: _BookUpdateOneWithoutBooksToReadersInput, nullable: true })
        t.field("reader", { type: _ReaderUpdateOneWithoutBooksToReadersInput, nullable: true })
    }
})


/*
export type StorageUpdateInput = {
    id?: string | StringFieldUpdateOperationsInput
    quantity?: number | IntFieldUpdateOperationsInput
    borrowedQuantity?: number | IntFieldUpdateOperationsInput
    book?: BookUpdateOneWithoutStorageInput
  }
*/

const _StorageUpdateInput = inputObjectType({
    name: "_StorageUpdateInput",
    definition(t) {
        t.int("quantity", { nullable: true })
        // t.int("borrowedQuantity", { nullable: true })
        t.field("book", { type: _BookUpdateOneWithoutStorageInput, nullable: true })

    }
})


/*  
  export type BookUpdateOneWithoutStorageInput = {
        create?: BookCreateWithoutStorageInput
        connect?: BookWhereUniqueInput
        disconnect?: boolean
        delete?: boolean
        update?: BookUpdateWithoutStorageDataInput
        upsert?: BookUpsertWithoutStorageInput
  }

}*/

const _BookUpdateOneWithoutStorageInput = inputObjectType({
    name: "_BookUpdateOneWithoutStorageInput",
    definition(t) {
        // t.field("create", { type: _BookCreateWithoutStorageInput, nullable: true })
        t.field("connect", { type: _BookWhereUniqueInput, nullable: true })
        t.boolean("disconnect", { nullable: true })
        t.boolean("delete", { nullable: true })

        t.field("update", { type: _BookUpdateWithoutStorageDataInput, nullable: true })
        t.field("upsert", { type: _BookUpsertWithoutStorageInput, nullable: true })
    }
})



/*export type BookUpdateWithoutStorageDataInput = {
    id?: string | StringFieldUpdateOperationsInput
    title?: string | NullableStringFieldUpdateOperationsInput | null
    pages?: number | NullableIntFieldUpdateOperationsInput | null
    chapters?: number | NullableIntFieldUpdateOperationsInput | null
    price?: number | NullableFloatFieldUpdateOperationsInput | null
    booksToAuthors?: BooksToAuthorsUpdateManyWithoutBookInput
    booksToReaders?: BooksToReadersUpdateManyWithoutBookInput
}*/

const _BookUpdateWithoutStorageDataInput = inputObjectType({
    name: "_BookUpdateWithoutStorageDataInput",
    definition(t) {
        t.string("title", { nullable: true })
        t.string("isbn", { nullable: true })
        t.int("pages", { nullable: true })
        t.int("chapters", { nullable: true })
        t.float("price", { nullable: true })
        t.string("description", { nullable: true })
        t.string("imgUri", { nullable: true })
        t.field("booksToAuthors", { type: _BooksToAuthorsUpdateManyWithoutBookInput, nullable: true })
        t.field("booksToReaders", { type: _BooksToReadersUpdateManyWithoutBookInput, nullable: true })
    }
});


/*export type BookUpsertWithoutStorageInput = {
    update: BookUpdateWithoutStorageDataInput
    create: BookCreateWithoutStorageInput
}*/


const _BookUpsertWithoutStorageInput = inputObjectType({
    name: "_BookUpsertWithoutStorageInput",
    definition(t) {
        t.field("update", { type: _BookUpdateWithoutStorageDataInput })
        // t.field("create", { type: _BookCreateWithoutStorageInput })
    }
})



module.exports = {
    _BookUpdateInput,
    _AuthorUpdateInput,
    _BooksToAuthorsUpdateInput,
    _ReaderUpdateInput,
    _BooksToReadersUpdateInput,
    _StorageUpdateInput,
}




