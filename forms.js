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

modoSite.addEventListener("click", mudarModo);
button.addEventListener("click", voltarDash);





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
  checkboxes.forEach((checkbox) => {
    checkbox.value = checkbox.checked
      ? esportesBinarios.push(1)
      : esportesBinarios.push(0);
  });

  return esportesBinarios;
}

function getFormData() {
  const formData = new FormData(document.getElementById("iaForm"));

  const result = [];
  let estado = ""; // Usando 'let' para permitir reatribuição

  formData.forEach((value, key) => {
    if (key === "estado") {
      estado = value; // Atribui o valor de 'estado' diretamente
    } else if (key !== "pratica") {
      result.push(value); // Adiciona todos os valores, exceto os de 'pratica'
    }
  });

  result.push(estado); // Adiciona o 'estado' após o loop
  const esportesBinarios = getEsportesBinarios(); // A função para pegar os dados binários dos esportes
  result.push(...esportesBinarios); // Espalha os valores binários no final do array
  
  return result;
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
