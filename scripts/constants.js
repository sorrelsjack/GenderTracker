const defaultColor = 'rgba(0, 0, 0, 0)';

const rangeIds = {
    feminine: 'feminineRange',
    nonBinary: 'nonBinaryRange',
    masculine: 'masculineRange',
    senseOfGender: 'senseOfGenderRange'
}

let ranges = {
    // Red
    [rangeIds.feminine]: 0,
    // Green
    [rangeIds.nonBinary]: 0,
    // Blue
    [rangeIds.masculine]: 0,
    // Alpha
    [rangeIds.senseOfGender]: 0
}

let bars = {
    feminine: 0,
    nonBinary: 0,
    masculine: 0,
    senseOfGender: 0
}