
const modoSite = document.getElementById("imagem-modo")

function mudarModo(){
    const nav = document.getElementsByClassName("navbar")[0]
    nav.classList.toggle("modo-escuro")
    if (nav.classList.contains("modo-escuro")) {
        modoSite.src = "./assets/light-mode.svg";
        localStorage.setItem("modo", "escuro");
    } else {
        modoSite.src = "./assets/dark-mode.svg";
        localStorage.setItem("modo", "claro");
    }
}

window.onload = function () {
    const modoSalvo = localStorage.getItem("modo");
    const nav = document.getElementsByClassName("navbar")[0];

    if (modoSalvo === "escuro") {
        nav.classList.add("modo-escuro");
        modoSite.src = "./assets/dark-mode.svg";
    } else {
        nav.classList.remove("modo-escuro");
        modoSite.src = "./assets/light-mode.svg";
}
};


modoSite.addEventListener("click", mudarModo);