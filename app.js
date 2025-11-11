// script.js

// Envio do formulário de contato
const form = document.getElementById("form-contato");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (nome && mensagem) {
    alert("Mensagem enviada com sucesso!");
    form.reset();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

// ====== CALCULADORAS ======

// Gerar dinamicamente as calculadoras dentro da <div class="calculadoras"></div>
const calculadorasContainer = document.querySelector(".calculadoras");

calculadorasContainer.innerHTML = `
  <div class="calc-box">
    <h3>Relação Peso/Potência</h3>
    <input type="number" id="peso" placeholder="Peso (kg)">
    <input type="number" id="potencia" placeholder="Potência (kW)">
    <button onclick="calcPesoPotencia()">Calcular</button>
    <p id="res-peso"></p>
  </div>
  <div class="calc-box">
    <h3>Aceleração Média</h3>
    <input type="number" id="v0" placeholder="Vel. Inicial (km/h)">
    <input type="number" id="v1" placeholder="Vel. Final (km/h)">
    <input type="number" id="tempo" placeholder="Tempo (s)">
    <button onclick="calcAceleracao()">Calcular</button>
    <p id="res-acel"></p>
  </div>
  <div class="calc-box">
    <h3>Autonomia Elétrica</h3>
    <input type="number" id="bateria" placeholder="Capacidade (kWh)">
    <input type="number" id="consumo" placeholder="Consumo (kWh/km)">
    <button onclick="calcAutonomia()">Calcular</button>
    <p id="res-auto"></p>
  </div>
  <div class="calc-box">
    <h3>Distância de Frenagem</h3>
    <input type="number" id="velocidade" placeholder="Velocidade (km/h)">
    <input type="number" id="atrito" placeholder="Atrito (ex: 0.7)">
    <button onclick="calcFrenagem()">Calcular</button>
    <p id="res-freio"></p>
  </div>
  <div class="calc-box">
    <h3>Torque Motor</h3>
    <input type="number" id="potMotor" placeholder="Potência (kW)">
    <input type="number" id="rpm" placeholder="RPM">
    <button onclick="calcTorque()">Calcular</button>
    <p id="res-torque"></p>
  </div>
`;

function calcPesoPotencia() {
  const peso = parseFloat(document.getElementById("peso").value);
  const pot = parseFloat(document.getElementById("potencia").value);
  const res = document.getElementById("res-peso");
  if (peso && pot) {
    const rel = (peso / pot).toFixed(2);
    res.textContent = `Relação: ${rel} kg/kW`;
  } else {
    res.textContent = "Preencha os campos corretamente.";
  }
}

function calcAceleracao() {
  const v0 = parseFloat(document.getElementById("v0").value) / 3.6;
  const v1 = parseFloat(document.getElementById("v1").value) / 3.6;
  const t = parseFloat(document.getElementById("tempo").value);
  const res = document.getElementById("res-acel");
  if (t && !isNaN(v0) && !isNaN(v1)) {
    const a = ((v1 - v0) / t).toFixed(2);
    res.textContent = `Aceleração: ${a} m/s²`;
  } else {
    res.textContent = "Dados inválidos.";
  }
}

function calcAutonomia() {
  const bat = parseFloat(document.getElementById("bateria").value);
  const cons = parseFloat(document.getElementById("consumo").value);
  const res = document.getElementById("res-auto");
  if (bat && cons) {
    const auto = (bat / cons).toFixed(1);
    res.textContent = `Autonomia: ${auto} km`;
  } else {
    res.textContent = "Insira os dados corretamente.";
  }
}

function calcFrenagem() {
  const v = parseFloat(document.getElementById("velocidade").value) / 3.6;
  const mu = parseFloat(document.getElementById("atrito").value);
  const res = document.getElementById("res-freio");
  if (v && mu) {
    const g = 9.8;
    const d = (v * v) / (2 * mu * g);
    res.textContent = `Distância: ${d.toFixed(2)} metros`;
  } else {
    res.textContent = "Valores inválidos.";
  }
}

function calcTorque() {
  const p = parseFloat(document.getElementById("potMotor").value);
  const rpm = parseFloat(document.getElementById("rpm").value);
  const res = document.getElementById("res-torque");
  if (p && rpm) {
    const torque = (9550 * p) / rpm;
    res.textContent = `Torque: ${torque.toFixed(2)} Nm`;
  } else {
    res.textContent = "Preencha corretamente.";
  }

}

new Swiper(".galeria-swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});