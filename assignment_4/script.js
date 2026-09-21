let waveChart;

function calculateAndPlot() {
    const amplitude = Number(document.getElementById("amplitude").value);
    const damping = Number(document.getElementById("damping").value);
    const frequency = Number(document.getElementById("frequency").value);
    const xmin = Number(document.getElementById("xmin").value);
    const xmax = Number(document.getElementById("xmax").value);

    if (
        isNaN(amplitude) ||
        isNaN(damping) ||
        isNaN(frequency) ||
        isNaN(xmin) ||
        isNaN(xmax)
    ) {
        alert("Please enter a number in every field.");
        return;
    }

    if (xmax <= xmin) {
        alert("Maximum X must be greater than Minimum X.");
        return;
    }

    const points = [];
    const resultValues = [];

    const numberOfPoints = 200;
    const step = (xmax - xmin) / numberOfPoints;

    for (let i = 0; i <= numberOfPoints; i++) {
        const x = xmin + i * step;

        const y =
            amplitude *
            Math.exp(-damping * x) *
            Math.sin(frequency * x);

        points.push({
            x: x,
            y: y
        });
    }

    const resultStep = (xmax - xmin) / 20;

    for (let i = 0; i <= 20; i++) {
        const x = xmin + i * resultStep;

        const y =
            amplitude *
            Math.exp(-damping * x) *
            Math.sin(frequency * x);

        resultValues.push(
            "X = " +
            x.toFixed(2) +
            " | Y = " +
            y.toFixed(4)
        );
    }

    document.getElementById("results").innerHTML =
        resultValues.join("<br>");

    const chartCanvas = document.getElementById("waveChart");

    if (waveChart) {
        waveChart.destroy();
    }

    waveChart = new Chart(chartCanvas, {
        type: "line",

        data: {
            datasets: [
                {
                    label: "Damped Sine Wave",
                    data: points,
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                title: {
                    display: true,
                    text: "Damped Sine Wave",
                    color: "white"
                },

                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },

            scales: {
                x: {
                    type: "linear",

                    title: {
                        display: true,
                        text: "X",
                        color: "white"
                    },

                    ticks: {
                        color: "white"
                    },

                    grid: {
                        color: "rgba(255, 255, 255, 0.25)"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Y",
                        color: "white"
                    },

                    ticks: {
                        color: "white"
                    },

                    grid: {
                        color: "rgba(255, 255, 255, 0.25)"
                    }
                }
            }
        }
    });
}

document
    .getElementById("calculateButton")
    .addEventListener("click", calculateAndPlot);

calculateAndPlot();