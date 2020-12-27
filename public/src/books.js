function findAuthorById(authors, id) {
  let foundAuthor = authors.find(author => author.id === id)
  return foundAuthor;
}

function findBookById(books, id) {
  let foundBook = books.find(book => book.id === id)
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
    const notReturned = books.filter(book => book.borrows[0].returned === false)
    const returned = books.filter(book => book.borrows[0].returned === true)
    return [notReturned, returned]
  }


function getBorrowersForBook(book, accounts) {
  let bookBorrowers = []; 

  accounts.forEach(account => {
    book.borrows.forEach(borrower => { // loop over each account and loop over the borrower info for given book
      if(borrower.id === account.id){
        let accountClone = {...account}; // clone the account object 
        accountClone['returned'] = borrower.returned; // add 'returned' key to account object
        bookBorrowers.push(accountClone); // push new account object into array. 
      }
    })
  })
    return bookBorrowers.slice(0, 10); // only return the first 10
  }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

