import moment from 'moment';

export const ArrangeByDescendingDate = (history) => history.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export const ArrangeByAscendingDate = (history) => history.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

// Convert to a standardized ISO string and then parse it into a numerical value, which will be what is ultimately compared
export const ExistsInDateRange = (date, startDate, endDate) => Date.parse(ConvertToISO(date)) >= Date.parse(ConvertToISO(startDate)) && Date.parse(ConvertToISO(date)) <= Date.parse(ConvertToISO(endDate));

export const GetFromDateRange = (history, startDate, endDate) => history.filter(h => ExistsInDateRange(h.date, startDate, endDate));

export const GetSpelledOutDate = (date) => `${moment(date).format('MMMM Do YYYY, hh:mm:ss A')}`

export const ConvertToISO = (date, includeTime = false) => moment(date).format(`YYYY-MM-DD${includeTime ? ' hh:mm:ss A' : ''}`);