$(document).ready(() => {
    const history = arrangeByDescendingDate(fetchHistory());
    const historyExists = history?.length > 0;

    const dateFormat = 'YYYY-MM-DD';
    const dateTimeFormat = 'YYYY-MM-DD hh:mm:ss A';

    const now = moment().format(dateFormat);
    const earliestDate = historyExists ? moment(history[history.length - 1].date).format(dateFormat) : now;
    const latestDate = historyExists ? moment(history[0].date).format(dateFormat) : now;

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