function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  const notReturned = books.filter(book => book.borrows[0].returned === false)
  return notReturned.length;
}

//helper function to sort and slice to only top 5
function sortTopFive(arr) {
  return arr.sort((a, b) => a.count < b.count ? 1 : -1).slice(0, 5);
}

function getMostCommonGenres(books) {
  // builds a new array of only the genre for each book in books
  const genres = books.map((book) => book.genre);

  //creates an object where the genre is the key and the count is the value
  const sortByGenre = genres.reduce((acc, genre)=> {
    if (acc[genre] !== undefined) {
      acc[genre]++ ;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {})
  //Need to create a new arr with all of the genres in the object turned into their own object of {genre:  , count: }
  let genresArr = [];
  for (let genre in sortByGenre) {
    const count = sortByGenre[genre];
    genresArr.push({name: `${genre}`, count: count });
  }
  //Use helper function to sort and slice
  return sortTopFive(genresArr);
}

function getMostPopularBooks(books) {
  let booksArr = [];
  books.forEach(book => booksArr.push({ name: book.title, count: book.borrows.length }));
  return sortTopFive(booksArr);
}

function getMostPopularAuthors(books, authors) {
  let authorsArr = [];
  authors.forEach(author => {
    let authorObj = {}; //create an object for each author
    const {name: {first, last}} = author 
    authorObj.name = `${first} ${last}`; //name key for authorObj
    authorObj.count = 0; //count key for authorObj
    books.forEach(book => { //loop through all books
      if (book.authorId === author.id) {
        authorObj.count += book.borrows.length
      }
    })
    authorsArr.push(authorObj);
  })
  return sortTopFive(authorsArr)
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
