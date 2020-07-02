Chart.defaults.global.defaultFontFamily = "Titillium";
Chart.defaults.global.defaultFontColor = "black";

const changeCircleColor = () => {
    document.getElementById("currentCircle").style.backgroundColor = getRgbaCode();
}

const populateCirclesContainer = () => {
    const history = arrangeByDescendingDate(fetchHistory());
    history.forEach(h => { addCircle(h.date, h.color, h.entry) });
}

const createLineChart = (element, label, color, data) => {
    const history = arrangeByAscendingDate(fetchHistory());

    return new Chart(element, {
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

    const history = arrangeByAscendingDate(fetchHistory());
    const colors = history.map(h => h.color);

    createLineChart(feminineCanvas, 'Feminine', 'rgba(255, 0, 0, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[0])));
    createLineChart(nonBinaryCanvas, 'Non-Binary', 'rgba(0, 255, 0, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[1])));
    createLineChart(masculineCanvas, 'Masculine', 'rgba(0, 0, 255, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[2])));
    createLineChart(senseOfGenderCanvas, 'Sense of Gender', 'rgba(0, 0, 0, .5)', colors.map(c => percentFromAlphaValue(rgbaAsArray(c)[3])));
}

const drawBarChart = (startDate, endDate) => {
    const barCanvas = document.getElementById("barChartCanvas").getContext("2d");

    if (!startDate || !endDate) {
        const history = fetchHistory();
        startDate = arrangeByAscendingDate(history)[0].date;
        endDate = arrangeByDescendingDate(history)[0].date;
    }

    const history = getFromDateRange(fetchHistory(), convertToISO(startDate), convertToISO(endDate));
    const colors = history.map(h => h.color);

    new Chart(barCanvas, {
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
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 100
                    }
                }]
            }
        }
    });
}

const addCircle = (date, color, entry) => {
    const createCircle = () => {
        const circle = document.createElement("div");

        circle.className = "circle historyCircle tooltip";
        circle.style.backgroundColor = color;

        if (entry) {
            const icon = document.createElement("i");
            icon.className = "fas fa-book-open";
            circle.append(icon);
        }

        circle.onclick = circle.onmouseover = () => {
            const historyEntryContainer = document.getElementById("historyEntryContainer");
            historyEntryContainer.innerHTML = '';

            if (!entry) {
                historyEntryContainer.style.display = "none";
                return;
            }

            const entryHeader = document.createElement("div");
            const entryTitleText = document.createTextNode(getSpelledOutDate(date));
            entryHeader.appendChild(entryTitleText);

            const entryBody = document.createElement("div");
            entryBody.className = "historyEntryBody";
            const entryBodyText = document.createTextNode(entry);
            entryBody.appendChild(entryBodyText);

            historyEntryContainer.appendChild(entryHeader);
            historyEntryContainer.appendChild(entryBody);

            historyEntryContainer.style.display = "block";
        }

        const tooltip = document.createElement("span");
        tooltip.className = "tooltiptext";
        tooltip.append(getSpelledOutDate(date));

        const rgba = document.createElement("p");
        const rgbaText = document.createTextNode(color);
        rgba.appendChild(rgbaText);
        tooltip.appendChild(rgba);

        const percentages = document.createElement("div");
        percentages.className = "percentageContainer";

        const colorArray = rgbaAsArray(color);

        const f = document.createElement("div");
        const fText = document.createTextNode(`F: ${percentFromRgbValue(colorArray[0])}%`);
        f.appendChild(fText);
        f.style.color = presentRedAsOwnColor(colorArray[0]);

        const n = document.createElement("div");
        const nText = document.createTextNode(`N: ${percentFromRgbValue(colorArray[1])}%`);
        n.appendChild(nText);
        n.style.color = presentGreenAsOwnColor(colorArray[1]);

        const m = document.createElement("div");
        const mText = document.createTextNode(`M: ${percentFromRgbValue(colorArray[2])}%`);
        m.appendChild(mText);
        m.style.color = presentBlueAsOwnColor(colorArray[2]);

        const s = document.createElement("div");
        const sText = document.createTextNode(`Sense: ${percentFromAlphaValue(colorArray[3])}%`);
        s.appendChild(sText);
        s.style.opacity = colorArray[3];

        percentages.appendChild(f);
        percentages.appendChild(n);
        percentages.appendChild(m);
        percentages.appendChild(s);

        tooltip.appendChild(percentages);
        circle.append(tooltip);

        return circle;
    }

    const circlesContainer = document.getElementById("circlesContainer");

    let history = fetchHistory();
    history = arrangeByDescendingDate(history);
    const index = history.map(h => h.date).indexOf(date);

    circlesContainer.insertBefore(createCircle(date, color), circlesContainer.childNodes[index]);
}