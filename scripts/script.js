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
    drawCharts();
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

// TODO: Favicon (Jane will do)
// TODO: Styling
// TODO: Fix for mobile
// TODO: Chart time period selector
// TODO: 'During time period, you felt X way on average'

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