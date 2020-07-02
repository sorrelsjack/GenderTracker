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
        drawBarChart();
        //drawLineCharts();
    }
}

const handleCircleMouseover = () => {
    document.getElementById("tooltipText").textContent = `${getRgbaCode()}`;
}

const handleLogGenderButtonPressed = () => {
    const datePicker = document.getElementById("dateTimePicker");
    const rangeDatePicker = $('#rangeDatePicker').data('daterangepicker');

    if (datePicker.value > datePicker.maxDate) {
        alert("Please choose an earlier date and/or time.");
        return;
    }

    const date = moment(`${datePicker.value}`, 'YYYY-MM-DD HH:mm:ss A', true).toISOString();
    let entry = document.getElementById("logTextArea").value;

    localStorage.setItem(date, JSON.stringify({ color: getRgbaCode(), entry: entry }));

    setDateTimePicker();
    addCircle(date, getRgbaCode(), entry);

    // TODO: Can we get minDate to update dynamically?
    //if (date < moment(rangeDatePicker.startDate, 'YYYY-MM-DD HH:mm:ss A', true)) rangeDatePicker.minDate = date;
    drawBarChart(rangeDatePicker.startDate, rangeDatePicker.endDate);
    //drawLineCharts();
}