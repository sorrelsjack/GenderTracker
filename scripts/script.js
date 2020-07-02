const initialize = () => {
    restoreLastSavedState();
    populateCirclesContainer();
    drawBarChart();
    //drawLineCharts();
}

const setDateTimePicker = () => {
    const now = convertToISO(new Date(), true);

    const datePicker = document.getElementById("dateTimePicker");
    datePicker.value = datePicker.maxDate = now;
}

const fetchHistory = () => {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        if (!isNaN(Date.parse(keys[i]))) {
            const item = JSON.parse(localStorage.getItem(keys[i]));
            values.push({ date: keys[i], color: item.color, entry: item.entry });
        }
    }

    return values;
}

// TODO: Styling
// TODO: Fix for mobile
// TODO: Better date validation

const calculateAverage = (values) => parseFloat(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

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

    Object.values(rangeIds).forEach(r => { document.getElementById(r).value = ranges[r] })
    changeCircleColor();
}