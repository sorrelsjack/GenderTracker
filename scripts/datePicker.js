$(document).ready(() => {
    const history = arrangeByDescendingDate(fetchHistory());
    const historyExists = history?.length > 0;

    const dateFormat = 'YYYY-MM-DD';
    const dateTimeFormat = 'YYYY-MM-DD hh:mm:ss A';

    const now = convertToISO(new Date());
    const earliestDate = historyExists ? convertToISO(history[history.length - 1].date) : now;
    const latestDate = historyExists ? convertToISO(history[0].date) : now;

    $('input[id="rangeDatePicker"]').daterangepicker({
        opens: 'center',
        startDate: earliestDate,
        endDate: latestDate,
        minDate: earliestDate,
        maxDate: latestDate,
        linkedCalendars: false,
        locale: {
            format: dateFormat
        }
    }, () => { drawBarChart(startDate, endDate) })

    $('input[name="dateTimePicker"]').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        timePickerSeconds: true,
        opens: 'center',
        startDate: moment().format(dateTimeFormat),
        locale: {
            format: dateTimeFormat
        }
    }, () => { console.log('Date changed') })
})