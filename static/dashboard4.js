// Asegura que Chart.js reconozca el plugin de anotación
Chart.register(window['chartjs-plugin-annotation']);

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('chiSquareChart').getContext('2d');

    // Parámetros de la distribución chi-cuadrado
    const df = 58;
    const alpha = 0.05;
    const lowerCritical = 39.363;
    const upperCritical = 79.082;
    const testStatistic = 3.844; // actualizado

    // Generar datos para la curva chi-cuadrado
    function chiSquarePDF(x, df) {
        if (x <= 0) return 0;
        const k = df / 2;
        const numerator = Math.pow(x, k - 1) * Math.exp(-x / 2);
        const denominator = Math.pow(2, k) * gamma(k);
        return numerator / denominator;
    }

    // Aproximación simple de la función gamma
    function gamma(n) {
        if (n === Math.floor(n)) {
            let result = 1;
            for (let i = 2; i < n; i++) {
                result *= i;
            }
            return result;
        }
        return Math.sqrt(Math.PI) * Math.pow(n - 0.5, n - 1) * Math.exp(-(n - 0.5));
    }

    const step = 1;
    const maxX = 120;
    const dataPoints = [];
    for (let x = 0; x <= maxX; x += step) {
        dataPoints.push({ x, y: chiSquarePDF(x, df) });
    }

    const maxY = Math.max(...dataPoints.map(p => p.y));

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Distribución Chi-Cuadrado (58 gl)',
                data: dataPoints,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Valor χ²',
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: maxX,
                    ticks: {
                        stepSize: 10
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Densidad de probabilidad',
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: maxY * 1.1
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                annotation: {
                    annotations: {
                        lowerCriticalLine: {
                            type: 'line',
                            yMin: 0,
                            yMax: maxY,
                            xMin: lowerCritical,
                            xMax: lowerCritical,
                            borderColor: '#3498db',
                            borderWidth: 2,
                            label: {
                                content: `χ²(0.975,58) = ${lowerCritical}`,
                                enabled: true,
                                position: 'top'
                            }
                        },
                        upperCriticalLine: {
                            type: 'line',
                            yMin: 0,
                            yMax: maxY,
                            xMin: upperCritical,
                            xMax: upperCritical,
                            borderColor: '#3498db',
                            borderWidth: 2,
                            label: {
                                content: `χ²(0.025,58) = ${upperCritical}`,
                                enabled: true,
                                position: 'top'
                            }
                        },
                        testStatisticLine: {
                            type: 'line',
                            yMin: 0,
                            yMax: maxY,
                            xMin: testStatistic,
                            xMax: testStatistic,
                            borderColor: '#f39c12',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: `Estadístico = ${testStatistic}`,
                                enabled: true,
                                position: 'top'
                            }
                        },
                        lowerCriticalRegion: {
                            type: 'box',
                            xMin: 0,
                            xMax: lowerCritical,
                            yMin: 0,
                            yMax: maxY,
                            backgroundColor: 'rgba(52, 152, 219, 0.2)',
                            borderWidth: 0
                        },
                        upperCriticalRegion: {
                            type: 'box',
                            xMin: upperCritical,
                            xMax: maxX,
                            yMin: 0,
                            yMax: maxY,
                            backgroundColor: 'rgba(52, 152, 219, 0.2)',
                            borderWidth: 0
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `χ² = ${context.parsed.x}, Densidad = ${context.parsed.y.toFixed(4)}`;
                        }
                    }
                }
            }
        }
    });
});
