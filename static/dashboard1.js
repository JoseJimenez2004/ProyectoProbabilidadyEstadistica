const datos = [
  { categoria: "Cada mes", FA: 1, FAA: 1, FR: 0.0169, FRA: 0.0169, ponderacion: 1 },
  { categoria: "Cada 3-6 meses", FA: 11, FAA: 12, FR: 0.1864, FRA: 0.2033, ponderacion: 2 },
  { categoria: "Rara vez", FA: 39, FAA: 51, FR: 0.6610, FRA: 0.8644, ponderacion: 3 },
  { categoria: "Nunca", FA: 8, FAA: 59, FR: 0.1356, FRA: 1.0, ponderacion: 4 },
];

const media = 30.93;
const mediana = 30.5;
const moda = 31; // Rara vez (mayor FA)
const rango = 31.5 - 30; // 1.5
const varianza = 0.0981;
const desviacion = 0.3132;
const coefVariacion = (desviacion / media) * 100;

document.getElementById("media").textContent = media.toFixed(2);
document.getElementById("mediana").textContent = mediana.toFixed(2);
document.getElementById("moda").textContent = moda;
document.getElementById("rango").textContent = rango.toFixed(2);
document.getElementById("varianza").textContent = varianza.toFixed(4);
document.getElementById("desviacion").textContent = desviacion.toFixed(4);
document.getElementById("cv").textContent = coefVariacion.toFixed(2) + "%";

// ------------------------ Tablas ------------------------
const tableBody = document.getElementById("data-table-body");
datos.forEach(d => {
  tableBody.innerHTML += `<tr>
    <td>${d.categoria}</td>
    <td>${d.FA}</td>
    <td>${(d.FR * 100).toFixed(2)}%</td>
    <td>${d.FAA}</td>
    <td>${(d.FRA * 100).toFixed(2)}%</td>
  </tr>`;
});

const comparativaBody = document.getElementById("comparativa-table-body");
datos.forEach(d => {
  comparativaBody.innerHTML += `<tr>
    <td>${d.categoria}</td>
    <td>${d.ponderacion}</td>
    <td>${d.FA}</td>
    <td>${d.FA * d.ponderacion}</td>
  </tr>`;
});

// ------------------------ Gráficas ------------------------
const labels = datos.map(d => d.categoria);
const fa = datos.map(d => d.FA);
const fr = datos.map(d => +(d.FR * 100).toFixed(2));
const faa = datos.map(d => d.FAA);

// Bar Chart
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels,
    datasets: [{
      label: "Frecuencia Absoluta",
      data: fa,
      backgroundColor: "#00b4d8",
    }],
  },
  options: {
    animation: { duration: 1000 }
  }
});

// Pie Chart
new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels,
    datasets: [{
      label: "Distribución %",
      data: fr,
      backgroundColor: ["#0096c7", "#00b4d8", "#48cae4", "#90e0ef"],
    }],
  },
});

// Scatter Chart
new Chart(document.getElementById("scatterChart"), {
  type: "scatter",
  data: {
    datasets: [{
      label: "FA vs Categoría",
      data: fa.map((y, i) => ({ x: i + 1, y })),
      backgroundColor: "#023e8a"
    }]
  },
  options: {
    scales: {
      x: { title: { display: true, text: "Categoría (Índice)" } },
      y: { title: { display: true, text: "FA" } }
    }
  }
});

// Line Chart
new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels,
    datasets: [{
      label: "FAA",
      data: faa,
      fill: false,
      borderColor: "#0077b6",
      tension: 0.3
    }]
  }
});

// Combo Chart
new Chart(document.getElementById("comboChart"), {
  type: "bar",
  data: {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'FA',
        data: fa,
        backgroundColor: '#90e0ef'
      },
      {
        type: 'line',
        label: 'FR (%)',
        data: fr,
        borderColor: '#023e8a',
        fill: false
      }
    ]
  }
});

// Simulación Boxplot (como líneas, no nativo en Chart.js)
new Chart(document.getElementById("boxplotChart"), {
  type: "bar",
  data: {
    labels: labels,
    datasets: [{
      label: 'Media de clase simulada',
      data: [30, 30.5, 31, 31.5],
      backgroundColor: '#0077b6'
    }]
  }
});
