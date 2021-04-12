import { 
    ArrangeByAscendingDate, 
    ArrangeByDescendingDate,
    GetFromDateRange,
    FetchHistory,
    ConvertToISO,
    rgbaAsArray,
    calculateAverage,
    GetSpelledOutDate,
    percentFromRgbValue,
    percentFromAlphaValue
} from '../Common';

Chart.defaults.global.defaultFontFamily = "Titillium";
Chart.defaults.global.defaultFontColor = "black";

let barChart = null;
let lineChart = null;

export const CreateLineChart = (element, label, color, data, start, end) => {
    const history = ArrangeByAscendingDate(GetFromDateRange(FetchHistory(), start, end));

    lineChart = new Chart(element, {
        type: 'line',
        data: {
            labels: history.map(h => GetSpelledOutDate(h.date)),
            datasets: [{
                label: label,
                borderColor: color,
                data: data
            }]
        }
    });
}

const CreateBar = (label, data, color) => ({
    label: label,
    data: data,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 1
})

export const DrawLineCharts = (startDate, endDate) => {
    const feminineCanvas = document.getElementById("feminineChartCanvas").getContext("2d");
    const masculineCanvas = document.getElementById("masculineChartCanvas").getContext("2d");
    const nonBinaryCanvas = document.getElementById("nonBinaryChartCanvas").getContext("2d");
    const senseOfGenderCanvas = document.getElementById("senseOfGenderCanvas").getContext("2d");

    $('.lineChartCanvas').css('display', 'block');
    lineChart?.destroy();

    if (!startDate || !endDate) {
        const history = FetchHistory();
        startDate = ArrangeByAscendingDate(history)[0]?.date;
        endDate = ArrangeByDescendingDate(history)[0]?.date;
    }

    const history = GetFromDateRange(FetchHistory(), ConvertToISO(startDate), ConvertToISO(endDate));
    const colors = history.map(h => h.color);

    CreateLineChart(feminineCanvas, 'Feminine', 'rgba(255, 0, 0, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[0])), startDate, endDate);
    CreateLineChart(nonBinaryCanvas, 'Non-Binary', 'rgba(0, 255, 0, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[1])), startDate, endDate);
    CreateLineChart(masculineCanvas, 'Masculine', 'rgba(0, 0, 255, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[2])), startDate, endDate);
    CreateLineChart(senseOfGenderCanvas, 'Sense of Gender', 'rgba(0, 0, 0, .5)', colors.map(c => percentFromAlphaValue(rgbaAsArray(c)[3])), startDate, endDate);

    document.getElementById("barChartCanvas").style.display = "none";
}

export const DrawBarChart = (startDate, endDate) => {
    document.getElementById("feminineChartCanvas").style.display = "none";
    document.getElementById("masculineChartCanvas").style.display = "none";
    document.getElementById("nonBinaryChartCanvas").style.display = "none";
    document.getElementById("senseOfGenderCanvas").style.display = "none";

    // Destroy existing chart to avoid render issues
    barChart?.destroy();
    const barCanvas = document.getElementById("barChartCanvas").getContext("2d");

    if (!startDate || !endDate) {
        const history = FetchHistory();
        startDate = ArrangeByAscendingDate(history)[0]?.date;
        endDate = ArrangeByDescendingDate(history)[0]?.date;
    }

    const history = GetFromDateRange(FetchHistory(), ConvertToISO(startDate), ConvertToISO(endDate));
    const colors = history.map(h => h.color);

    const percents = {
        feminine: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[0]))),
        nonBinary: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[1]))),
        masculine: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[2]))),
        senseOfGender: calculateAverage(colors.map(c => percentFromAlphaValue(rgbaAsArray(c)[3])))
    }

    const bars = percents;

    barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: ['Percentage'],
            datasets: [
                CreateBar('Feminine', [percents.feminine], 'rgba(255, 0, 0, .5)'), 
                CreateBar('Non-Binary', [percents.nonBinary], 'rgba(0, 255, 0, .5)'),
                CreateBar('Masculine', [percents.masculine], 'rgba(0, 0, 255, .5)'),
                CreateBar('Sense of Gender', [percents.senseOfGender], 'rgba(0, 0, 0, .5)')
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