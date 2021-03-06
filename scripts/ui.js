const changeCurrentCircleColor = () => document.getElementById("currentCircle").style.backgroundColor = getRangeRgbaCode();

const changeLargeCircleColor = () => document.getElementById("largeCircle").style.backgroundColor = getBarRgbaCode();

const populateCirclesContainer = () => {
    const history = arrangeByDescendingDate(fetchHistory());
    history.forEach(h => { addCircle(h.date, h.color, h.entry) });
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