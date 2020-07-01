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
        drawCharts();
    }
}

const handleCircleMouseover = () => {
    document.getElementById("tooltipText").textContent = `${getRgbaCode()}`;
}

const handleLogGenderButtonPressed = () => {
    const datePicker = document.getElementById("dateTimePicker");

    if (datePicker.value > datePicker.maxDate) {
        alert("Please choose an earlier date and/or time.");
        return;
    }

    const date = moment(`${datePicker.value}`, 'YYYY-MM-DD HH:mm:ss A', true).toISOString();
    let entry = document.getElementById("logTextArea").value;

    localStorage.setItem(date, JSON.stringify({ color: getRgbaCode(), entry: entry }));

    setDateTimePicker();

    addCircle(date, getRgbaCode(), entry);

    drawCharts();
}