const arrangeByDescendingDate = (history) => history.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const arrangeByAscendingDate = (history) => history.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

// Convert to a standardized ISO string and then parse it into a numerical value, which will be what is ultimately compared
const existsInDateRange = (date, startDate, endDate) => Date.parse(convertToISO(date)) >= Date.parse(convertToISO(startDate)) && Date.parse(convertToISO(date)) <= Date.parse(convertToISO(endDate));

const getFromDateRange = (history, startDate, endDate) => history.filter(h => existsInDateRange(h.date, startDate, endDate));

const getSpelledOutDate = (date) => `${moment(date).format('MMMM Do YYYY, hh:mm:ss A')}`

const convertToISO = (date, includeTime = false) => moment(date).format(`YYYY-MM-DD${includeTime ? ' hh:mm:ss A' : ''}`);