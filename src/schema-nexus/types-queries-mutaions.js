


const { Book, _getBookByID, _getBookByISBN, _getBooks, _getBooksBy, _createBook, _updateBook, _deleteBook } = require('./_book')
const { Author, _getAuthorByID, _getAuthorByEmail, _getAuthors, _getAuthorsBy, _createAuthor, _updateAuthor, _deleteAuthor } = require('./_author')
const { BooksToAuthors, _getBooksToAuthorsByID, _getBooksToAuthorsBy } = require('./_booksToAuthors')
const { Reader, _getReaderByID, _getReaderByEmail, _getReaders, _getReadersBy, _createReader, _updateReader, _deleteReader } = require('./_reader')
const { BooksToReaders, _getBooksToReadersByID, _getBooksToReadersByBorrowDate, _getBooksToReadersByReturnDate, _getBooksToReadersBy,
     _deleteBooksToReaders 
    } = require('./_booksToReaders')
const { Storage, _getStorageByID, _getStorageByQuantity, _getStorageByBorrowedQuantity, _getStorageBy, 
    // _createStorage, _updateStorage, _deleteStorage 
} = require('./_storage')


module.exports = {
    Book,
    _getBookByID, _getBookByISBN, _getBooks, _getBooksBy,
    _createBook, _updateBook, _deleteBook,

    Author,
    _getAuthorByID, _getAuthorByEmail,
    _getAuthors, _getAuthorsBy,
    _createAuthor, _updateAuthor, _deleteAuthor,

    BooksToAuthors,
    _getBooksToAuthorsByID, _getBooksToAuthorsBy,

    Reader,
    _getReaderByID, _getReaderByEmail,
    _getReaders, _getReadersBy,
    _createReader, _updateReader, _deleteReader,

    BooksToReaders,
    _getBooksToReadersByID, _getBooksToReadersBy,
    _getBooksToReadersByBorrowDate,
    _getBooksToReadersByReturnDate,
    _deleteBooksToReaders,

    Storage,
    _getStorageByID, _getStorageBy,
    _getStorageByQuantity, _getStorageByBorrowedQuantity,
    // _createStorage, _updateStorage, _deleteStorage
}    
