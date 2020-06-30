const getRgbaCode = () => `rgba(${rgbValueFromPercent(ranges[rangeIds.feminine])}, ${rgbValueFromPercent(ranges[rangeIds.nonBinary])}, ${rgbValueFromPercent(ranges[rangeIds.masculine])}, ${alphaValueFromPercent(ranges[rangeIds.senseOfGender])})`;

const rgbValueFromPercent = (value) => Math.round((value / 100) * 255);

const alphaValueFromPercent = (value) => (value / 100);

const percentFromRgbValue = (value) => Math.round((value * 100) / 255);

const percentFromAlphaValue = (value) => (value * 100);

const rgbaAsArray = (rgba) => rgba.substring(rgba.indexOf('(') + 1, rgba.lastIndexOf(')')).split(/,\s*/);

const presentBlueAsOwnColor = (value) => `rgba(0, 0, ${value}, 1)`;
const presentRedAsOwnColor = (value) => `rgba(${value}, 0, 0, 1)`;
const presentGreenAsOwnColor = (value) => `rgba(0, ${value}, 0, 1)`;