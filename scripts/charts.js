Chart.defaults.global.defaultFontFamily = "Titillium";
Chart.defaults.global.defaultFontColor = "black";

let barChart = null;

const createLineChart = (element, label, color, data) => {
    const history = arrangeByAscendingDate(fetchHistory());

    new Chart(element, {
        type: 'line',
        data: {
            labels: history.map(h => getSpelledOutDate(h.date)),
            datasets: [{
                label: label,
                borderColor: color,
                data: data
            }]
        }
    });
}

const createBar = (label, data, color) => ({
    label: label,
    data: data,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 1
})

const drawLineCharts = () => {
    const feminineCanvas = document.getElementById("feminineChartCanvas").getContext("2d");
    const masculineCanvas = document.getElementById("masculineChartCanvas").getContext("2d");
    const nonBinaryCanvas = document.getElementById("nonBinaryChartCanvas").getContext("2d");
    const senseOfGenderCanvas = document.getElementById("senseOfGenderCanvas").getContext("2d");

    $('.lineChartCanvas').css('display', 'block');

    const history = arrangeByAscendingDate(fetchHistory());
    const colors = history.map(h => h.color);

    createLineChart(feminineCanvas, 'Feminine', 'rgba(255, 0, 0, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[0])));
    createLineChart(nonBinaryCanvas, 'Non-Binary', 'rgba(0, 255, 0, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[1])));
    createLineChart(masculineCanvas, 'Masculine', 'rgba(0, 0, 255, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[2])));
    createLineChart(senseOfGenderCanvas, 'Sense of Gender', 'rgba(0, 0, 0, .5)', colors.map(c => percentFromAlphaValue(rgbaAsArray(c)[3])));

    document.getElementById("barChartCanvas").style.display = "none";
}

const drawBarChart = (startDate, endDate) => {
    document.getElementById("feminineChartCanvas").style.display = "none";
    document.getElementById("masculineChartCanvas").style.display = "none";
    document.getElementById("nonBinaryChartCanvas").style.display = "none";
    document.getElementById("senseOfGenderCanvas").style.display = "none";

    // Destroy existing chart to avoid render issues
    barChart?.destroy();
    const barCanvas = document.getElementById("barChartCanvas").getContext("2d");

    if (!startDate || !endDate) {
        const history = fetchHistory();
        startDate = arrangeByAscendingDate(history)[0]?.date;
        endDate = arrangeByDescendingDate(history)[0]?.date;
    }

    const history = getFromDateRange(fetchHistory(), convertToISO(startDate), convertToISO(endDate));
    const colors = history.map(h => h.color);

    barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: ['Percentage'],
            datasets: [
                createBar('Feminine', [calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[0])))], 'rgba(255, 0, 0, .5)'), 
                createBar('Non-Binary', [calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[1])))], 'rgba(0, 255, 0, .5)'),
                createBar('Masculine', [calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[2])))], 'rgba(0, 0, 255, .5)'),
                createBar('Sense of Gender', [calculateAverage(colors.map(c => percentFromAlphaValue(rgbaAsArray(c)[3])))], 'rgba(0, 0, 0, .5)')
            ],
        },
        options: {
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        return `${label}: ${tooltipItem.yLabel}%`;
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 100,
                        callback: (value, index, values) => `${value}%`
                    }
                }]
            }
        }
    });
}