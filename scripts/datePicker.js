$(document).ready(() => {
    const history = arrangeByDescendingDate(fetchHistory());
    const earliestDate = moment(history[history.length - 1].date).format('MM/DD/YYYY hh:mm:ss A');
    const latestDate = moment(history[0].date).format('MM/DD/YYYY hh:mm:ss A');

    $('input[name="rangeDatePicker"]').daterangepicker({
        opens: 'center',
        startDate: earliestDate,
        endDate: latestDate,
        minDate: earliestDate,
        maxDate: latestDate,
        linkedCalendars: false
    }, () => { console.log('Date changed') })

    $('input[name="dateTimePicker"]').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        timePickerSeconds: true,
        opens: 'center',
        startDate: moment().format('MM/DD/YYYY hh:mm:ss A'),
        locale: {
            format: 'MM/DD/YYYY hh:mm:ss A'
        }
    }, () => { console.log('Date changed') })
})