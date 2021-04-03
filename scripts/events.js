/*const handleRangeValueChange = (event) => {
    const { id, value } = event.target;
    ranges[id] = value;
    changeCurrentCircleColor();
}

const handleClearHistoryPressed = () => {
    const r = confirm("Are you sure you want to clear your history? You can't get this back.");
    if (r) {
        localStorage.clear();
        document.getElementById("circlesContainer").innerHTML = '';
        drawBarChart();
        //drawLineCharts();
    }
}

const handleCurrentCircleInteraction = () => document.getElementById("tooltipText").textContent = getRangeRgbaCode();

// TODO Deal with the case where it could be a line graph too
const handleChartCircleInteraction = () => document.getElementById("largeCircleTooltipText").textContent = getBarRgbaCode();

const handleLogGenderButtonPressed = () => {
    const datePicker = document.getElementById("dateTimePicker");
    const rangeDatePicker = $('#rangeDatePicker').data('daterangepicker');

    if (datePicker.value > datePicker.maxDate) {
        alert("Please choose an earlier date and/or time.");
        return;
    }

    // Don't bother messing with this
    const date = moment(`${datePicker.value}`, 'YYYY-MM-DD HH:mm:ss A', true).toISOString();
    let entry = document.getElementById("logTextArea").value;

    localStorage.setItem(date, JSON.stringify({ color: getRangeRgbaCode(), entry: entry }));

    setDateTimePicker();
    addCircle(date, getRangeRgbaCode(), entry);

    const { startDate, endDate } = rangeDatePicker;

    // TODO: Can we get minDate to update dynamically?
    //if (date < moment(rangeDatePicker.startDate, 'YYYY-MM-DD HH:mm:ss A', true)) rangeDatePicker.minDate = date;
    if (existsInDateRange(date, startDate, endDate)) drawBarChart(startDate, endDate);
    //drawLineCharts();
}

handleChartTypeOptionChange = (event) => {
    console.log('Coming soon!');
    /*const types = {
        bar: 'bar',
        line: 'line'
    }
    
    const { value } = event.target;

    if (value === types.bar) drawBarChart();
    if (value === types.line) drawLineCharts();
}*/