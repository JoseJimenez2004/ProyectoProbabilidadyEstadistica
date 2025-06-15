const categorias = ["CADA MES", "CADA 3-6 MESES", "RARA VEZ", "NUNCA"];
const FA = [1, 11, 39, 8];
const FAA = [1, 12, 51, 59];
const FR = [0.0169, 0.1864, 0.6610, 0.1356];
const FRA = [0.0169, 0.1902, 0.8475, 0.9831];
const clases = [30, 30.5, 31, 31.5];

// Estadísticas
const media = 30.93;
const mediana = 30.5;
const varianza = 0.0981;
const desviacion = 0.3132;

document.getElementById("media").textContent = media.toFixed(2);
document.getElementById("mediana").textContent = mediana.toFixed(2);
document.getElementById("varianza").textContent = varianza.toFixed(4);
document.getElementById("desviacion").textContent = desviacion.toFixed(4);

// Tabla
const tbody = document.getElementById("data-table-body");
categorias.forEach((cat, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${cat}</td>
    <td>${FA[i]}</td>
    <td>${(FR[i] * 100).toFixed(2)}</td>
    <td>${FAA[i]}</td>
    <td>${(FRA[i] * 100).toFixed(2)}</td>
  `;
  tbody.appendChild(tr);
});

// Bar Chart
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: categorias,
    datasets: [{
      label: "FA",
      data: FA,
      backgroundColor: "#3fb950"
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#c9d1d9" }, grid: { color: "#21262d" } },
      y: { beginAtZero: true, ticks: { color: "#c9d1d9" }, grid: { color: "#21262d" } }
    }
  }
});

// Pie Chart
new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: categorias,
    datasets: [{
      data: FR.map(f => (f * 100).toFixed(2)),
      backgroundColor: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]
    }]
  },
  options: {
    plugins: {
      legend: { labels: { color: "#c9d1d9" } }
    }
  }
});

// Scatter Chart (Dispersión)
new Chart(document.getElementById("scatterChart"), {
  type: "scatter",
  data: {
    datasets: [{
      label: "FA vs Clase",
      data: clases.map((x, i) => ({ x: x, y: FA[i] })),
      backgroundColor: "#facc15"
    }]
  },
  options: {
    scales: {
      x: { title: { display: true, text: "Clase", color: "#c9d1d9" }, ticks: { color: "#c9d1d9" } },
      y: { title: { display: true, text: "FA", color: "#c9d1d9" }, ticks: { color: "#c9d1d9" } }
    }
  }
});

// Line Chart (FAA)
new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: categorias,
    datasets: [{
      label: "Frecuencia Acumulada (FAA)",
      data: FAA,
      fill: true,
      borderColor: "#38bdf8",
      backgroundColor: "rgba(56, 189, 248, 0.2)"
    }]
  },
  options: {
    scales: {
      x: { ticks: { color: "#c9d1d9" } },
      y: { beginAtZero: true, ticks: { color: "#c9d1d9" } }
    }
  }
});
