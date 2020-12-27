function findAccountById(accounts, id) {
  let findAccount = accounts.find(acc => acc.id === id)
  return findAccount
}

function sortAccountsByLastName(accounts) {
  // let names = accounts.map((account) => {
  //  return { name: account.name } // creates a new object with only the first and last names
  // });
  const sortedNames = accounts.sort((account1, account2) => {  
    return account1.name.last > account2.name.last ? 1 : -1
  })
  return sortedNames;
}

function numberOfBorrows(account, books) {
  let count = 0;
  books.forEach((book) => {
    book.borrows.forEach(idNum => { // for each book loop over each borrowers idNum 
      if (idNum.id === account.id){ 
        count++
      }
    })
  })
  return count
}


function getBooksPossessedByAccount({id}, books, authors) {
  const booksUserHas = books.filter(book => 
    !book.borrows[0].returned && book.borrows[0].id === id)

  const booksCheckedOut = [];
  //for each book find the author
  booksUserHas.forEach(book => {
    const findAuthor = authors.find(author => author.id === book.authorId)
    //deconstruct book
    const { id, title, genre, authorId, borrows } = book;
    //push book into booksCheckedOut arr with author info added after authorId
    booksCheckedOut.push( {id, title, genre, authorId, author: findAuthor, borrows} )
  });
  return booksCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
