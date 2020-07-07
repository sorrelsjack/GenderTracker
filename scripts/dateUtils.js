const arrangeByDescendingDate = (history) => history.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const arrangeByAscendingDate = (history) => history.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

const getFromDateRange = (history, startDate, endDate) => history.filter(h => convertToISO(h.date) >= startDate && convertToISO(h.date) <= endDate);

const getSpelledOutDate = (date) => `${moment(date).format('MMMM Do YYYY, hh:mm:ss A')}`

const convertToISO = (date, includeTime = false) => moment(date).format(`YYYY-MM-DD${includeTime ? ' hh:mm:ss A' : ''}`);