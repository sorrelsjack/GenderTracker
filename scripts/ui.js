const changeCircleColor = () => {
    document.getElementById("currentCircle").style.backgroundColor = getRgbaCode();
}

const populateCirclesContainer = () => {
    const history = arrangeByDescendingDate(fetchHistory());
    history.forEach(h => { addCircle(h.date, h.color, h.entry) });
}

const createChart = (element, label, color, data) => {
    const history = arrangeByDescendingDate(fetchHistory());

    return new Chart(element, {
        type: 'line',
        data: {
            labels: history.map(h => moment(h.date).format('MMMM Do YYYY, h:mm A')),
            datasets: [{
                label: label,
                borderColor: color,
                data: data
            }]
        }
    });
}

const drawCharts = () => {
    Chart.defaults.global.defaultFontFamily = "Titillium";
    Chart.defaults.global.defaultFontColor = "black";
    
    const feminineCanvas = document.getElementById("feminineChartCanvas").getContext("2d");
    const masculineCanvas = document.getElementById("masculineChartCanvas").getContext("2d");
    const nonBinaryCanvas = document.getElementById("nonBinaryChartCanvas").getContext("2d");
    const senseOfGenderCanvas = document.getElementById("senseOfGenderCanvas").getContext("2d");

    const history = arrangeByDescendingDate(fetchHistory());
    const colors = history.map(h => h.color);

    const feminineChart = createChart(feminineCanvas, 'Feminine', 'rgba(255, 0, 0, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[0])));
    const nonBinaryChart = createChart(nonBinaryCanvas, 'Non-Binary', 'rgba(0, 255, 0, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[1])));
    const masculineChart = createChart(masculineCanvas, 'Masculine', 'rgba(0, 0, 255, .5)', colors.map(c => percentFromRgbValue(rgbaAsArray(c)[2])));
    const senseOfGenderChart = createChart(senseOfGenderCanvas, 'Sense of Gender', 'rgba(0, 0, 0, .5)', colors.map(c => percentFromAlphaValue(rgbaAsArray(c)[3])));
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
            const entryTitleText = document.createTextNode(getReadableDate(date));
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
        tooltip.append(getReadableDate(date));

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