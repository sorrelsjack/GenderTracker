const defaultColor = 'rgba(0, 0, 0, 0)';

export const getRgbaCode = (values) => 
    values.some(v => isNaN(v)) 
        ? defaultColor
        : `rgba(${rgbValueFromPercent(values[0])}, ${rgbValueFromPercent(values[1])}, ${rgbValueFromPercent(values[2])}, ${alphaValueFromPercent(values[3])})`;

export const getRangeRgbaCode = (values) => getRgbaCode(Object.values(values));

export const getBarRgbaCode = () => getRgbaCode(Object.values(bars));

export const rgbValueFromPercent = (value) => Math.round((value / 100) * 255);

export const alphaValueFromPercent = (value, decimalPlaces = 2) => 
{
    value = parseFloat(value / 100);

    value % 1 !== 0
        ? value = value.toFixed(decimalPlaces)
        : value = value.toPrecision(1)

    return value;
}

export const percentFromRgbValue = (value) => Math.round((value * 100) / 255);

export const percentFromAlphaValue = (value) => Math.round(value * 100);

export const rgbaAsArray = (rgba) => rgba.substring(rgba.indexOf('(') + 1, rgba.lastIndexOf(')')).split(/,\s*/);

export const presentBlueAsOwnColor = (value) => `rgba(0, 0, ${value}, 1)`;
export const presentRedAsOwnColor = (value) => `rgba(${value}, 0, 0, 1)`;
export const presentGreenAsOwnColor = (value) => `rgba(0, ${value}, 0, 1)`;