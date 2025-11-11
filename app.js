

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

const calculadorasContainer = document.querySelector(".calculadoras");

calculadorasContainer.innerHTML = `
  <div class="calc-box">
    <h3>Relação Peso/Potência</h3>
    <input type="number" id="peso" placeholder="Peso do Veículo (kg)">
    <input type="number" id="potencia" placeholder="Potência do Motor (HP)">
    <button onclick="calcPesoPotencia()">Calcular</button>
    <p id="res-peso"></p>
    <div class="dica"><strong>Dica:</strong> Uma menor relação peso/potência indica melhor desempenho. Valores típicos para Baja SAE: 15–25 kg/HP.</div>
  </div>

  <div class="calc-box">
    <h3>Aceleração Média</h3>
    <input type="number" id="v1" placeholder="Velocidade Final (km/h)">
    <input type="number" id="tempo" placeholder="Tempo (segundos)">
    <button onclick="calcAceleracao()">Calcular</button>
    <p id="res-acel"></p>
    <div class="dica"><strong>Dica:</strong> Aceleração = (Velocidade Final ÷ Tempo). Quanto maior a aceleração, melhor a performance de largada.</div>
  </div>

  <div class="calc-box">
    <h3>Distância de Frenagem</h3>
    <input type="number" id="velocidade" placeholder="Velocidade Inicial (km/h)">
    <input type="number" id="atrito" placeholder="Coeficiente de Atrito">
    <button onclick="calcFrenagem()">Calcular</button>
    <p id="res-freio"></p>
    <div class="dica"><strong>Dica:</strong> Coeficiente de atrito típico: asfalto seco (0.7–0.8), terra (0.5–0.6). Distância = v² ÷ (2 × μ × g).</div>
  </div>

  <div class="calc-box">
    <h3>Torque (Potência × RPM)</h3>
    <input type="number" id="potMotor" placeholder="Potência (HP)">
    <input type="number" id="rpm" placeholder="RPM">
    <button onclick="calcTorque()">Calcular</button>
    <p id="res-torque"></p>
    <div class="dica"><strong>Dica:</strong> Torque (N·m) = (Potência × 5252) ÷ RPM. O torque máximo geralmente ocorre em rotações mais baixas.</div>
  </div>

  <div class="calc-box">
    <h3>Velocidade Final Estimada</h3>
    <input type="number" id="rpmMax" placeholder="RPM Máximo">
    <input type="number" id="relacaoFinal" placeholder="Relação Final">
    <input type="number" id="raioRoda" placeholder="Raio da Roda (metros)">
    <button onclick="calcVelocidadeFinal()">Calcular</button>
    <p id="res-velocidade"></p>
    <div class="dica"><strong>Dica:</strong> Velocidade (km/h) = (RPM × 2π × Raio) ÷ (Relação × 60 × 1000) × 3.6. Considere o raio dinâmico do pneu.</div>
  </div>

  <div class="calc-box">
    <h3>Consumo de Combustível</h3>
    <input type="number" id="distanciaComb" placeholder="Distância (km)">
    <input type="number" id="consumoComb" placeholder="Consumo Médio (km/L)">
    <button onclick="calcConsumoCombustivel()">Calcular</button>
    <p id="res-combustivel"></p>
    <div class="dica"><strong>Dica:</strong> Litros = Distância ÷ Consumo. O consumo do Baja varia muito conforme terreno e estilo de pilotagem.</div>
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

function calcVelocidadeFinal() {
  const rpm = parseFloat(document.getElementById("rpmMax").value);
  const relacao = parseFloat(document.getElementById("relacaoFinal").value);
  const raio = parseFloat(document.getElementById("raioRoda").value);
  const res = document.getElementById("res-velocidade");

  if (rpm && relacao && raio) {
    const velocidade = ((rpm * 2 * Math.PI * raio) / (relacao * 60)) * 3.6;
    res.textContent = `Velocidade Estimada: ${velocidade.toFixed(2)} km/h`;
  } else {
    res.textContent = "Insira todos os valores corretamente.";
  }
}

function calcConsumoCombustivel() {
  const distancia = parseFloat(document.getElementById("distanciaComb").value);
  const consumo = parseFloat(document.getElementById("consumoComb").value);
  const res = document.getElementById("res-combustivel");

  if (distancia && consumo) {
    const litros = distancia / consumo;
    res.textContent = `Consumo: ${litros.toFixed(2)} litros`;
  } else {
    res.textContent = "Preencha corretamente.";
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

new Swiper('.galeria-swiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  loopedSlides: 6,
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
