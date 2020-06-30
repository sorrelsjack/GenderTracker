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

    drawCharts();
}