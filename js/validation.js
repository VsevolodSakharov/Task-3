const input = document.querySelectorAll(".main__form-input");
const login = document.querySelector(".--login");
const password = document.querySelector(".--password");
const confirmPassword = document.querySelector(".--confirm");
const warning = document.querySelectorAll(".main__form-warning");
const mainWarning = document.querySelector(".--main-error");
const logWarning = document.querySelector(".--log-error");
const passWarning = document.querySelector(".--pass-error");
const confirmWarning = document.querySelector(".--confirm-error");

const usersCollection = localStorage.users ? JSON.parse(localStorage.users) : {};

let errors = {};

function registration(e) {
  e.preventDefault();
  errors = {};
  input.forEach( element => {
    element.style.borderColor = "";
  });

  warning.forEach( element => {
    element.innerHTML = "&nbsp";
    element.style.visibility = "hidden";
  })

  if ((confirmPassword.value !== "") && (password.value !== confirmPassword.value)) {
    errors.confirmPassword = "*Passwords don't match";
    password.style.borderColor = "red";
    confirmPassword.style.borderColor = "red";
    confirmWarning.innerHTML = errors.confirmPassword;
    confirmWarning.style.visibility = "visible";
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if ((login.value !== "" && !emailPattern.test(login.value))) {
    errors.login = "*Invalid email address";
    login.style.borderColor = "red";
    logWarning.innerHTML = errors.login;
    logWarning.style.visibility = "visible";
  } else if (login.value === "") {
    errors.login = "*Field is required";
    login.style.borderColor = "red";
    logWarning.innerHTML = errors.login;
    logWarning.style.visibility = "visible";
  }
  
  if ((password.value !== "") && (password.value.length < 6)) {
    errors.password = "*Must be atleast 6 symbols long";
    password.style.borderColor = "red";
    passWarning.innerHTML = errors.password;
    passWarning.style.visibility = "visible";
  } else if (password.value === "") {
    errors.password = "*Field is required";
    password.style.borderColor = "red";
    passWarning.innerHTML = errors.password;
    passWarning.style.visibility = "visible";
  }

  if (confirmPassword.value === ""){
    errors.confirmPassword = "*Field is required";
    confirmPassword.style.borderColor = "red";
    confirmWarning.innerHTML = errors.confirmPassword;
    confirmWarning.style.visibility = "visible";
  }

  const userData = {
    email: login.value,
    password: password.value,
    logStatus: true,
  };
  
  if (usersCollection[userData.email]) {
    errors.login = "*This email is already registered"
    login.style.borderColor = "red";
    logWarning.innerHTML = errors.login;
    logWarning.style.visibility = "visible";
  }
  
  if (Object.keys(errors).length > 0 ) {
    mainWarning.innerHTML = "Please, fill out the form properly";
    mainWarning.style.visibility = "visible";
  } else{
    usersCollection[userData.email] = userData;
    localStorage.users = JSON.stringify(usersCollection);
    alert("New account was successfully created.");
    window.location.href = "index.html";
  }
}

function log(e){
  e.preventDefault();
  errors={};
  input.forEach( element => {
    element.style.borderColor = "";
  });
  warning.forEach( element => {
    element.innerHTML = "&nbsp";
    element.style.visibility = "hidden";
  })

  if (login.value === "") {
    errors.login = "*Field is required";
    login.style.borderColor = "red";
    logWarning.innerHTML = errors.login;
    logWarning.style.visibility = "visible";
  }
  if (password.value === "") {
    errors.password = "*Field is required";
    password.style.borderColor = "red";
    passWarning.innerHTML = errors.password;
    passWarning.style.visibility = "visible";
  }

  if(Object.keys(errors).length > 0 ){
    mainWarning.innerHTML = "Please, fill out the form properly";
    mainWarning.style.visibility = "visible";
  }
  else{
    if((usersCollection[login.value]) && (password.value === usersCollection[login.value].password)){
      usersCollection[login.value].logStatus = true;
      localStorage.users = JSON.stringify(usersCollection);
      window.location.href = "index.html";
    } else{
      mainWarning.innerHTML = "Wrong email or password. Please, try again";
      mainWarning.style.visibility = "visible";
      login.style.borderColor = "red";
      password.style.borderColor = "red";
    }
  }
}

const regButton = document.querySelector(".--reg-button");
if(regButton){
  regButton.addEventListener("click", registration);
}

const logButton = document.querySelector(".--log-button");
if(logButton){
  logButton.addEventListener("click", log);
}

