const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const fields = "fields=totalItems,items/id, items/volumeInfo(title, authors,publisher,publishedDate,description,categories,averageRating,imageLinks/thumbnail)";
const maxResults="maxResults=16";
const KEY = "AIzaSyDtcDzfyPGRVxMSono-HwGXNO_oIgqkDI0";
const fromInput = document.querySelector("input");
const fromSelect = document.querySelector("#search-select");
const insert = document.querySelector(".main__article");
const noResult = document.querySelector(".no-results");
let result;
let books = [];
let bookShelf = {};
import {activeUser} from "./logcheck.js";
const usersCollection = localStorage.users ? JSON.parse(localStorage.users) : {};
let userShelf = usersCollection[activeUser];


async function searchBook(e) {
  e.preventDefault();
  try {
  const response = await fetch(`${URL}${fromInput.value}+${fromSelect.value}&${fields}&${maxResults}&:keyes&key=${KEY}`);
  result = await response.json();
  books = result.items;
  }
  catch{err => console.log(err)};

  if (result.totalItems>0){
    noResult.style.display = "none";
    insert.classList.add("--search-success");
    for(let i=0; i<books.length; i++){
      const book = {
        ...books[i].volumeInfo,
        id:books[i].id
      };
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
      <button class="${activeUser ? "form__button" : "form__button --disabled"}" id="${book.id}">Add to bookshelf ♡</button>
      </form>
      </div>
      </section>`);
      const addBtn = document.getElementById(book.id);
      addBtn.addEventListener("click", (e) => {e.preventDefault(); addBook(book.id, book)});
    }
  } else{
    insert.classList.remove("--search-success");
    noResult.style.display = "flex";
    noResult.style.visibility="visible";
  };
  
}

function clearFields(e){
  e.preventDefault();
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
}

function search(e){
  clearFields(e);
  searchBook(e);
}

function addBook(key, value){
  if((userShelf.allBooks) && (key in userShelf.allBooks)){
    alert("Already on your bookshelf");
  } else{
    bookShelf[key] = value;
    userShelf["allBooks"] = bookShelf;
    localStorage.users = JSON.stringify(usersCollection);
    alert("The book was successfully added");
  }
}

const searchBtn = document.querySelector(".main__search-button");
searchBtn.addEventListener("click", search);
