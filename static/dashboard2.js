// dashboard2.js

document.addEventListener("DOMContentLoaded", () => {
  const respuestas = ["Frecuentemente", "Algunas veces", "Rara vez", "Nunca"];
  const ponderaciones = [1, 2, 3, 4];
  const fa = [7, 12, 14, 26];
  const faa = [7, 19, 33, 59];
  const fr = fa.map(f => f / 59);
  const fra = faa.map(f => f / 59);

  const media = 31.27;
  const mediana = 31.487;
  const moda = 31.5;
  const varianza = 0.5429;
  const desviacion = 0.7367;
  const rango = 31.5 - 30;
  const cv = (desviacion / media * 100).toFixed(2);

  // Mostrar métricas
  document.getElementById("media").textContent = media.toFixed(2);
  document.getElementById("mediana").textContent = mediana.toFixed(2);
  document.getElementById("moda").textContent = moda;
  document.getElementById("varianza").textContent = varianza;
  document.getElementById("desviacion").textContent = desviacion;
  document.getElementById("rango").textContent = rango;
  document.getElementById("cv").textContent = cv + "%";

  // Tabla de frecuencia
  const freqBody = document.getElementById("data-table-body");
  respuestas.forEach((resp, i) => {
    const row = `<tr><td>${resp}</td><td>${fa[i]}</td><td>${fr[i].toFixed(2)}</td><td>${faa[i]}</td><td>${fra[i].toFixed(2)}</td></tr>`;
    freqBody.innerHTML += row;
  });

  // Tabla de comparativa
  const compBody = document.getElementById("comparativa-table-body");
  const ponderados = ponderaciones.map((p, i) => p * fa[i]);
  respuestas.forEach((resp, i) => {
    const row = `<tr><td>${resp}</td><td>${ponderaciones[i]}</td><td>${fa[i]}</td><td>${ponderados[i]}</td></tr>`;
    compBody.innerHTML += row;
  });

  // Chart 1 - Bar
  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: respuestas,
      datasets: [{
        label: "FA",
        data: fa,
        backgroundColor: "#3b82f6"
      }]
    }
  });

  // Chart 2 - Pie
  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: respuestas,
      datasets: [{
        data: fr,
        backgroundColor: ["#06b6d4", "#fbbf24", "#10b981", "#ef4444"]
      }]
    }
  });

  // Chart 3 - Line
  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: respuestas,
      datasets: [{
        label: "FAA",
        data: faa,
        borderColor: "#6366f1",
        fill: false
      }]
    }
  });

  // Chart 4 - Scatter
  new Chart(document.getElementById("scatterChart"), {
    type: "scatter",
    data: {
      datasets: [{
        label: "FA por categoría",
        data: respuestas.map((r, i) => ({ x: i + 1, y: fa[i] })),
        backgroundColor: "#14b8a6"
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Categoría (1 a 4)" } },
        y: { title: { display: true, text: "FA" } }
      }
    }
  });

  // Chart 5 - Boxplot simulado
  new Chart(document.getElementById("boxplotChart"), {
    type: "bar",
    data: {
      labels: ["Distribución de valores"],
      datasets: [{
        label: "Rango",
        data: [rango],
        backgroundColor: "#eab308"
      }]
    },
    options: {
      indexAxis: "y",
      scales: {
        x: { min: 29.5, max: 32 }
      }
    }
  });

  // Chart 6 - FA y FR combinados
  new Chart(document.getElementById("comboChart"), {
    type: "bar",
    data: {
      labels: respuestas,
      datasets: [
        {
          label: "FA",
          data: fa,
          backgroundColor: "#0ea5e9",
          yAxisID: "y1"
        },
        {
          type: "line",
          label: "FR",
          data: fr,
          borderColor: "#f43f5e",
          yAxisID: "y2"
        }
      ]
    },
    options: {
      scales: {
        y1: {
          type: "linear",
          position: "left",
          beginAtZero: true
        },
        y2: {
          type: "linear",
          position: "right",
          beginAtZero: true
        }
      }
    }
  });
});
