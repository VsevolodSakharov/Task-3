const logedIn = document.querySelectorAll(".--loged-in");
const logedOut = document.querySelectorAll(".--loged-out");
const exitWide= document.querySelector(".--exit");
const userName = document.querySelector(".username");
const exitSmall = document.querySelector(".nav__small-select");
let key;
let activeUser = false;

function quit(object, key, field){
    activeUser = false;
    object[key][field] = false;
    localStorage.users = JSON.stringify(object);
}

const usersCollection = localStorage.users ? JSON.parse(localStorage.users) : {};
if (Object.keys(usersCollection).length > 0){
    for (let i = 0; i < Object.keys(usersCollection).length; i++) {
        key = Object.keys(usersCollection)[i];
        if (usersCollection[key]["logStatus"] === true){
            logedOut.forEach( element => {
                element.style.display = "none";
            });  
            userName.innerHTML = key;
            userName.style.visibility = "visible";        
            activeUser = key;
            break;
        } else{
            continue;
        }
    }
    if (!activeUser){
        logedIn.forEach( element => {
            element.style.display = "none";
        });
    } else{
        exitWide.addEventListener("click", () => {
            quit(usersCollection, key, "logStatus");
        });
        exitSmall.addEventListener("change", (event) => {
            let selectedOption = event.target.value;
            if (selectedOption === "exit") {
                quit(usersCollection, key, "logStatus");
                window.location.href = "index.html";
            }
        });
    }
} else{
    logedIn.forEach( element => {
        element.style.display = "none";
    });
}

export {activeUser};



