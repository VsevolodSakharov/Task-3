const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const fields = "fields=totalItems,items/volumeInfo(title, authors,publisher,publishedDate,description,categories,averageRating,imageLinks/thumbnail)";
const maxResults="maxResults=16";
const KEY = "AIzaSyDtcDzfyPGRVxMSono-HwGXNO_oIgqkDI0";
const fromInput = document.querySelector("input");
const fromSelect = document.querySelector("#search-select");
const insert = document.querySelector(".main__article");
let result;
let books = [];

async function searchBook(e) {
  e.preventDefault();
  try {
  const response = await fetch(`${URL}${fromInput.value}+${fromSelect.value}&${fields}&${maxResults}&:keyes&key=${KEY}`);
  result = await response.json();
  books = result.items;
  }
  catch{err => console.log(err)};

  if (result.totalItems>0){
    for(let i=0; i<books.length; i++){
      const book = books[i].volumeInfo;
      insert.insertAdjacentHTML("beforeend",
      `<section class="card">
      <img src="${book.imageLinks.thumbnail}" class="card__side --front" alt="${book.title}">
      <div class="card__side --back">
      <ul>
      <li class="title">"${book.title}"</li>
      <li>Category: ${book.categories||"Not defined"}</li>
      <li>Rating: ${book.averageRating||"0"}</li>
      <li>Authors: ${book.authors||"Unknown"}</li>
      <li>Publisher: ${book.publisher||"Unknown"}</li>
      <li>Published date: ${book.publishedDate||"Unknown"}</li>
      <li>${book.description||"No available description."}</li>
      </ul>
      <form class="form">
      <button class="form__button --disabled">Add to bookshelf ♡</button>
      </form>
      </div>
      </section>`);
    }
  } else{
    insert.insertAdjacentHTML("beforeend", '<p class="card --no-results">No search results.</p>');
  };
  
}

function clearFields(e){
  e.preventDefault();
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
}

async function search(e){
  clearFields(e);
  searchBook(e);
}

const btn = document.querySelector("button");
btn.addEventListener("click", search);