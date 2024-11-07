const modoSite = document.getElementById("imagem-modo");
const button = document.getElementById("button-inicio");

function mudarModo() {
  const nav = document.getElementsByClassName("navbar")[0];
  nav.classList.toggle("modo-escuro");
    button.classList.toggle("ia-button-dark");
  if (nav.classList.contains("modo-escuro")) {
    modoSite.src = "./assets/light-mode.svg";
    localStorage.setItem("modo", "escuro");
  } else {
    modoSite.src = "./assets/dark-mode.svg";
    localStorage.setItem("modo", "claro");
  }
}

function voltarDash(){
    window.location.href = "index.html";
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

const esportes = [
  "Futebol",
  "Caminhada e corrida",
  "Voleibol",
  "Academia e musculação",
  "Natação",
  "Tênis de mesa",
  "Ciclismo",
  "Basquetebol",
  "Atletismo",
  "Esgrima",
  "Baseball",
  "Badminton",
  "Nenhum",
];

function getEsportesBinarios() {
  const esportesBinarios = []
  const checkboxes = document.querySelectorAll(
    "input[type='checkbox'][name='pratica']"
  );

  console.log("ISSO",checkboxes.length)
  checkboxes.forEach((checkbox) => {
    checkbox.value = checkbox.checked
      ? esportesBinarios.push(1)
      : esportesBinarios.push(0);
  });

  return esportesBinarios;
}

modoSite.addEventListener("click", mudarModo);
button.addEventListener("click",voltarDash)
function getFormData() {
  const formData = new FormData(document.getElementById("iaForm"));

  const result = [];

  formData.forEach((value, key) => {
    if (key == "pratica") {
      const esportesBinarios = getEsportesBinarios();
      result.push(...esportesBinarios);
      
    }
    else{
      result.push(value);
    }
  });

  return result;
}

// Função para gerar a resposta binária dos esportes
function getEsportesBinarios() {
  // Exemplo: Retorna um array binário para esportes (deve ser adaptado para corresponder à lógica correta)
  return [1, 0, 0, 1, 0]; // Exemplo de valores binários
}



console.log(getFormData());



function submitForm(event) {
  event.preventDefault();

  const formData = getFormData();

  const payload = {
    dados: formData,
  };

  console.log(payload)

  console.log("Payload:", payload);

  fetch("https://api-potencialesporte-pdxz.onrender.com/analise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  })
    .then((response) => {
      console.log("Status da resposta:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("Resposta do servidor:", data);
    })
    .catch((error) => {
      console.error("Erro ao enviar os dados:", error);
    });
}

document.getElementById("submitForm").addEventListener("click", submitForm);
