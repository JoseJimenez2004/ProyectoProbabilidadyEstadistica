document.addEventListener("DOMContentLoaded", () => {
  const datos = [
    { respuesta: "No lo sé", ponderacion: 4, fa: 2, mediaClase: 30 },
    { respuesta: "Poco seguro", ponderacion: 3, fa: 3, mediaClase: 30.5 },
    { respuesta: "Muy seguro", ponderacion: 1, fa: 17, mediaClase: 31 },
    { respuesta: "Algo seguro", ponderacion: 2, fa: 37, mediaClase: 31.5 },
  ];

  const totalFA = datos.reduce((sum, d) => sum + d.fa, 0);
  const ponderacionFA = datos.map(d => d.ponderacion * d.fa);
  const media = ponderacionFA.reduce((sum, val) => sum + val, 0) / totalFA;

  // Tabla de frecuencias
  const tablaBody = document.getElementById("data-table-body");
  let faAcumulada = 0;
  datos.forEach((d, i) => {
    faAcumulada += d.fa;
    const fr = (d.fa / totalFA).toFixed(3);
    const fra = (faAcumulada / totalFA).toFixed(3);
    const fila = `
      <tr>
        <td>${d.respuesta}</td>
        <td>${d.fa}</td>
        <td>${fr}</td>
        <td>${faAcumulada}</td>
        <td>${fra}</td>
      </tr>`;
    tablaBody.innerHTML += fila;
  });

  // Tabla comparativa
  const comparativaBody = document.getElementById("comparativa-table-body");
  datos.forEach(d => {
    const fila = `
      <tr>
        <td>${d.respuesta}</td>
        <td>${d.ponderacion}</td>
        <td>${d.fa}</td>
        <td>${d.ponderacion * d.fa}</td>
      </tr>`;
    comparativaBody.innerHTML += fila;
  });

  // Estadísticas básicas
  const mediaGeneral = 31.27;
  const varianza = 0.5429;
  const desviacion = 0.7367;
  const mediana = 31.5;
  const moda = 31.5;
  const rango = 31.5 - 30;
  const coefVar = ((desviacion / mediaGeneral) * 100).toFixed(2);

  document.getElementById("media").textContent = mediaGeneral;
  document.getElementById("mediana").textContent = mediana;
  document.getElementById("moda").textContent = moda;
  document.getElementById("varianza").textContent = varianza;
  document.getElementById("desviacion").textContent = desviacion;
  document.getElementById("rango").textContent = rango.toFixed(2);
  document.getElementById("cv").textContent = `${coefVar}%`;

  // Gráficos
  const etiquetas = datos.map(d => d.respuesta);
  const frecuencias = datos.map(d => d.fa);
  const colores = ["#6b7280", "#1d4ed8", "#10b981", "#f59e0b"];

  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Frecuencia Absoluta",
        data: frecuencias,
        backgroundColor: colores,
      }]
    },
    options: { responsive: true }
  });

  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: etiquetas,
      datasets: [{
        data: frecuencias,
        backgroundColor: colores
      }]
    },
    options: { responsive: true }
  });

  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Media de Clase",
        data: datos.map(d => d.mediaClase),
        borderColor: "#3b82f6",
        backgroundColor: "#93c5fd",
        fill: true
      }]
    },
    options: { responsive: true }
  });

  new Chart(document.getElementById("scatterChart"), {
    type: "scatter",
    data: {
      datasets: [{
        label: "FA vs Media Clase",
        data: datos.map(d => ({ x: d.mediaClase, y: d.fa })),
        backgroundColor: "#8b5cf6"
      }]
    },
    options: { responsive: true }
  });

  new Chart(document.getElementById("boxplotChart"), {
    type: "bar",
    data: {
      labels: ["Distribución"],
      datasets: [{
        label: "Media, Mediana, Moda",
        data: [mediaGeneral, mediana, moda],
        backgroundColor: ["#ef4444", "#10b981", "#3b82f6"]
      }]
    },
    options: { responsive: true, indexAxis: 'y' }
  });

  new Chart(document.getElementById("comboChart"), {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [
        {
          type: "bar",
          label: "Frecuencia Absoluta",
          data: frecuencias,
          backgroundColor: "#34d399"
        },
        {
          type: "line",
          label: "Media de Clase",
          data: datos.map(d => d.mediaClase),
          borderColor: "#2563eb",
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: { responsive: true }
  });
});
