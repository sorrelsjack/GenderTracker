const rangeIds = {
    feminine: 'feminineRange',
    nonBinary: 'nonBinaryRange',
    masculine: 'masculineRange',
    senseOfGender: 'senseOfGenderRange'
}

let ranges = {
    // Red
    [rangeIds.feminine]: 0,
    // Green
    [rangeIds.nonBinary]: 0,
    // Blue
    [rangeIds.masculine]: 0,
    // Alpha
    [rangeIds.senseOfGender]: 0
}

const initialize = () => {
    restoreLastSavedState();
    populateCirclesContainer();
    setDatePicker();
    setTimePicker();
}

const setDatePicker = () => {
    const now = moment(new Date()).format('yyyy-MM-DD');

    const datePicker = document.getElementById("datePicker");
    datePicker.value = datePicker.max = now;
}

const setTimePicker = () => {
    const now = moment(new Date()).format('HH:mm:ss');

    const timePicker = document.getElementById("timePicker");
    timePicker.value = timePicker.max = now;
}

const handleRangeValueChange = (event) => {
    const { id, value } = event.target;
    ranges[id] = value;
    changeCircleColor();
}

const handleClearHistoryPressed = () => {
    const r = confirm("Are you sure you want to clear your history? You can't get this back.");
    if (r) {
        localStorage.clear();
        document.getElementById("circlesContainer").innerHTML = '';
    }
}

const handleCircleMouseover = () => {
    document.getElementById("tooltipText").textContent = `${getRgbaCode()}`;
}

const handleLogGenderButtonPressed = () => {
    const datePicker = document.getElementById("datePicker");
    const timePicker = document.getElementById("timePicker");

    if (datePicker.value > datePicker.max || timePicker.value > timePicker.max) {
        alert("Please choose an earlier date and/or time.");
        return;
    }

    const date = moment(`${datePicker.value} ${timePicker.value}`).format();
    let entry = document.getElementById("logTextArea").value;

    localStorage.setItem(date, JSON.stringify({ color: getRgbaCode(), entry: entry }));

    setDatePicker();
    setTimePicker();

    addCircle(date, getRgbaCode(), entry);
}

const changeCircleColor = () => {
    document.getElementById("currentCircle").style.backgroundColor = getRgbaCode();
}

const getRgbaCode = () => `rgba(${rgbValueFromPercent(ranges[rangeIds.feminine])}, ${rgbValueFromPercent(ranges[rangeIds.nonBinary])}, ${rgbValueFromPercent(ranges[rangeIds.masculine])}, ${alphaValueFromPercent(ranges[rangeIds.senseOfGender])})`;

const rgbValueFromPercent = (value) => Math.round((value / 100) * 255);

const alphaValueFromPercent = (value) => (value / 100);

const percentFromRgbValue = (value) => Math.round((value * 100) / 255);

const percentFromAlphaValue = (value) => (value * 100);

const rgbaAsArray = (rgba) => rgba.substring(rgba.indexOf('(') + 1, rgba.lastIndexOf(')')).split(/,\s*/);

const presentBlueAsOwnColor = (value) => `rgba(0, 0, ${value}, 1)`;
const presentRedAsOwnColor = (value) => `rgba(${value}, 0, 0, 1)`;
const presentGreenAsOwnColor = (value) => `rgba(0, ${value}, 0, 1)`;

const fetchHistory = () => {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        if (!isNaN(Date.parse(keys[i]))) {
            const item = JSON.parse(localStorage.getItem(keys[i]));
            values.push({ date: keys[i], color: item.color, entry: item.entry });
        }
    }

    return values;
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

// TODO: Chart
// TODO: Favicon (Jane will do)
// TODO: Styling
// TODO: Fix for mobile
// TODO: Mobile app?
// TOOD: Edit entries
const populateCirclesContainer = () => {
    const history = arrangeByDescendingDate(fetchHistory());
    history.forEach(h => { addCircle(h.date, h.color, h.entry) });
}

const arrangeByDescendingDate = (history) => history.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const getReadableDate = (date) => `${moment(date).format('MMMM Do YYYY, h:mm A')}`

const getMostRecentGender = () => arrangeByDescendingDate(fetchHistory())[0];

const restoreLastSavedState = () => {
    const genderColor = getMostRecentGender()?.color;
    if (!genderColor) {
        Object.values(rangeIds).forEach(r => { document.getElementById(r).value = 0 });
        return;
    }

    const rgba = rgbaAsArray(genderColor);

    ranges[rangeIds.feminine] = percentFromRgbValue(rgba[0]);
    ranges[rangeIds.nonBinary] = percentFromRgbValue(rgba[1]);
    ranges[rangeIds.masculine] = percentFromRgbValue(rgba[2]);
    ranges[rangeIds.senseOfGender] = percentFromAlphaValue(rgba[3]);

    //Object.values(rangeIds).forEach(r => { ranges[r] = percentFromRgbValue(rgba[rangeIds.indexOf(r)]) })
    Object.values(rangeIds).forEach(r => { document.getElementById(r).value = ranges[r] })
    changeCircleColor();
}