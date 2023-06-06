const exitSmall = document.querySelector(".nav__small-select");

function redirect(value) {
    if ((value !== "") && (value !== "exit")){
        window.location.href = value;
    }
}

exitSmall.addEventListener("change", (event) => {
    let selectedOption = event.target.value;
    redirect(selectedOption);
});