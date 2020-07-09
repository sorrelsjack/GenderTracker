const getRgbaCode = (values) => 
    values.some(v => isNaN(v)) 
        ? defaultColor
        : `rgba(${rgbValueFromPercent(values[0])}, ${rgbValueFromPercent(values[1])}, ${rgbValueFromPercent(values[2])}, ${alphaValueFromPercent(values[3])})`;

const getRangeRgbaCode = () => getRgbaCode(Object.values(ranges));

const getBarRgbaCode = () => getRgbaCode(Object.values(bars));

const rgbValueFromPercent = (value) => Math.round((value / 100) * 255);

const alphaValueFromPercent = (value, decimalPlaces = 2) => 
{
    value = parseFloat(value / 100);

    value % 1 !== 0
        ? value = value.toFixed(decimalPlaces)
        : value = value.toPrecision(1)

    return value;
}

const percentFromRgbValue = (value) => Math.round((value * 100) / 255);

const percentFromAlphaValue = (value) => Math.round(value * 100);

const rgbaAsArray = (rgba) => rgba.substring(rgba.indexOf('(') + 1, rgba.lastIndexOf(')')).split(/,\s*/);

const presentBlueAsOwnColor = (value) => `rgba(0, 0, ${value}, 1)`;
const presentRedAsOwnColor = (value) => `rgba(${value}, 0, 0, 1)`;
const presentGreenAsOwnColor = (value) => `rgba(0, ${value}, 0, 1)`;