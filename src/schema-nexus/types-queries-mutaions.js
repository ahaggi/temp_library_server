


const { Book, _getBookByID, _getBookByISBN, _getBooks, _getBooksByWhereInput, _createBook, _updateBook, _deleteBook, _createdBookSub, _updatedBookSub, _deletedBookSub  , __mockbookMut} = require('./_book')
const { Author, _getAuthorByID, _getAuthorByEmail, _getAuthors, _getAuthorsByWhereInput, _createAuthor, _updateAuthor, _deleteAuthor, _createdAuthorSub, _updatedAuthorSub, _deletedAuthorSub, } = require('./_author')
const { BooksToAuthors, _getBooksToAuthorsByID, _getBooksToAuthorsByWhereInput } = require('./_booksToAuthors')
const { Reader, _getReaderByID, _getReaderByEmail, _getReaders, _getReadersByWhereInput, _createReader, _updateReader, _deleteReader, _createdReaderSub, _updatedReaderSub, _deletedReaderSub, } = require('./_reader')
const { BooksToReaders, _getBooksToReadersByID, _getBooksToReadersByBorrowDate, _getBooksToReadersByReturnDate, _getBooksToReadersByWhereInput,
    _deleteBooksToReaders
} = require('./_booksToReaders')
const { Storage, _getStorageByID, _getStorageByQuantity, _getStorageByBorrowedQuantity, _getStorageByWhereInput,
    // _createStorage, _updateStorage, _deleteStorage 
} = require('./_storage')


module.exports = {
    Book,
    _getBookByID, _getBookByISBN, _getBooks, _getBooksByWhereInput,
    _createBook, _updateBook, _deleteBook,
    _createdBookSub, _updatedBookSub, _deletedBookSub,
    __mockbookMut,

    Author,
    _getAuthorByID, _getAuthorByEmail,
    _getAuthors, _getAuthorsByWhereInput,
    _createAuthor, _updateAuthor, _deleteAuthor,
    _createdAuthorSub, _updatedAuthorSub, _deletedAuthorSub,


    BooksToAuthors,
    _getBooksToAuthorsByID, _getBooksToAuthorsByWhereInput,

    Reader,
    _getReaderByID, _getReaderByEmail,
    _getReaders, _getReadersByWhereInput,
    _createReader, _updateReader, _deleteReader,
    _createdReaderSub, _updatedReaderSub, _deletedReaderSub,

    BooksToReaders,
    _getBooksToReadersByID, _getBooksToReadersByWhereInput,
    _getBooksToReadersByBorrowDate,
    _getBooksToReadersByReturnDate,
    _deleteBooksToReaders,

    Storage,
    _getStorageByID, _getStorageByWhereInput,
    _getStorageByQuantity, _getStorageByBorrowedQuantity,
    // _createStorage, _updateStorage, _deleteStorage
}    
