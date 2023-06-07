const insert = document.querySelector(".main__article");
const noResult = document.querySelector(".no-results");
import {activeUser} from "./logcheck.js";
const usersCollection = localStorage.users ? JSON.parse(localStorage.users) : {};
const user = usersCollection[activeUser];
const booksCollection = user?.allBooks || "";
let id; 
let bookData;

if (booksCollection !== ""){
    noResult.style.display = "none";
    insert.classList.add("--search-success");
    for(let i=0; i<Object.keys(booksCollection).length; i++){
      id = Object.keys(booksCollection)[i];
      bookData = booksCollection[id];
      insert.insertAdjacentHTML("beforeend",
      `<section class="card">
      <img src="${bookData.imageLinks?.thumbnail}" class="card__side --front" alt="${bookData.title}">
      <div class="card__side --back">
      <ul>
      <li class="title">"${bookData.title}"</li>
      <li>Category: ${bookData.categories||"Not defined"}</li>
      <li>Rating: ${bookData.averageRating||"0"}</li>
      <li>Authors: ${bookData.authors||"Unknown"}</li>
      <li>Publisher: ${bookData.publisher||"Unknown"}</li>
      <li>Published date: ${bookData.publishedDate||"Unknown"}</li>
      <li>${bookData.description||"No available description."}</li>
      </ul>
      </div>
      </section>`);
    }
} else{
    insert.classList.remove("--search-success");
    noResult.style.display = "flex";
    noResult.style.visibility="visible";
};


