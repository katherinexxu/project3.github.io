/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

// use the airtable librar to get a variable that represents one of our bases
var base = new Airtable({ apiKey: "keyjHMTNhKYdCvjzY" }).base(
  "appmyA20cds155D0R"
);

//get the "books" table from the base, select ALL the records, and specify the functions that will receive the data
base("elastic _collections_irem").select({}).eachPage(gotPageOfBooks, gotAllBooks);

// an empty array to hold our book data
const books = [];

// callback function that receives our data
function gotPageOfBooks(records, fetchNextPage) {
  console.log("gotPageOfBooks()");
  // add the records from this page to our books array
  books.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllBooks(err) {
  console.log("gotAllBooks()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading books");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogBooks();
  try {
  showBooks();
} catch (e) {
  console.log(e);
}
}

// just loop through the books and console.log them
function consoleLogBooks() {
  console.log("consoleLogBooks()");
  books.forEach((book) => {
    console.log("Book:", book);
  });
}

// loop through the books, create an h2 for each one, and add it to the page
function showBooks() {
  console.log("showBooks()");
  books.forEach((book) => {

    const h1 = document.createElement("h1");
    h1.innerText = book.fields.Name;
    document.body.appendChild(h1);

    const img = document.createElement("img");
    img.src = book.fields.Image[0].url;
    document.querySelector(".container").appendChild(img);
  });


}
