import { 
    rgbaAsArray, 
    percentFromRgbValue, 
    percentFromAlphaValue, 
    ArrangeByDescendingDate 
} from '.';

export const FetchHistory = () => {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        if (!isNaN(Date.parse(keys[i]))) {
            const item = JSON.parse(localStorage.getItem(keys[i]));
            values.push({ date: keys[i], color: item.color, entry: item.entry });
        }
    }

    return values;
}

export const GetMostRecentGender = () => ArrangeByDescendingDate(FetchHistory())[0];

export const RestoreLastSavedState = () => {
    const genderColor = GetMostRecentGender()?.color;
    const rgba = rgbaAsArray(genderColor ?? 'rgba(0, 0, 0, 0)');

    return {
        feminine: percentFromRgbValue(rgba[0]),
        nonBinary: percentFromRgbValue(rgba[1]),
        masculine: percentFromRgbValue(rgba[2]),
        sense: percentFromAlphaValue(rgba[3])
    }
}