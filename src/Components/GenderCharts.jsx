import React, { useState, useEffect } from 'react';
import './styles.css';
import { GenderCircle } from '../Components';
import { 
    ArrangeByAscendingDate, 
    ArrangeByDescendingDate, 
    percentFromRgbValue, 
    percentFromAlphaValue,
    getRgbaCode
} from '../Common';

export const GenderCharts = (props) => {
    const { history, startDate, endDate } = props;

    const [circleColor, setCircleColor] = useState('rgba(0, 0, 0, 0)');

    const calculateAverage = (values) => parseFloat(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

    useEffect(() => {
        if (!history) return;
        
        let start = startDate || ArrangeByAscendingDate(history)[0]?.date;
        let end = endDate || ArrangeByDescendingDate(history)[0]?.date;

        const hist = getFromDateRange(history, convertToISO(start), convertToISO(end));
        const colors = hist.map(h => h.color);

        const percents = {
            feminine: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[0]))),
            nonBinary: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[1]))),
            masculine: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[2]))),
            senseOfGender: calculateAverage(colors.map(c => percentFromAlphaValue(rgbaAsArray(c)[3])))
        }

        setCircleColor(getRgbaCode(Object.values(percents)));
    }, [history, startDate, endDate])

    const handleChartTypeOptionChange = (e) => {
        // TODO: This
    }

    return (
        <div className="chartContainer" id="chartContainer">
            <span>Average Gender Percentage</span>
            <div className="chartPickerContainer">
                <span className="chartPickerTitle">Timeframe</span>
                <input className="chartPicker" type="text" name="rangeDatePicker" id="rangeDatePicker" readOnly />
            </div>
            <div className="chartPickerContainer">
                <span className="chartPickerTitle">Chart Type (WIP - Not Working)</span>
                <select className="chartPicker" onChange={handleChartTypeOptionChange} id="chartTypePicker">
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                </select>
            </div>
            <div className="genderChartsContainer">
                <canvas id="barChartCanvas" height="200"></canvas>
                <canvas className="lineChartCanvas" id="feminineChartCanvas"></canvas>
                <canvas className="lineChartCanvas" id="nonBinaryChartCanvas"></canvas>
                <canvas className="lineChartCanvas" id="masculineChartCanvas"></canvas>
                <canvas className="lineChartCanvas" id="senseOfGenderCanvas"></canvas>
                <div className="mainCircleContainer">
                    <GenderCircle size='large' color={circleColor} />
                </div>
            </div>
        </div>
    )
}