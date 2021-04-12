import React, { useState, useEffect } from 'react';
import { GenderCircle } from '../Components';
import { 
    ArrangeByAscendingDate, 
    ArrangeByDescendingDate, 
    percentFromRgbValue, 
    percentFromAlphaValue,
    getRgbaCode,
    GetFromDateRange,
    rgbaAsArray,
    ConvertToISO,
    calculateAverage
} from '../Common';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { DrawBarChart, DrawLineCharts } from './Charts';

export const GenderCharts = (props) => {
    const { RangePicker } = DatePicker;

    const { history } = props;

    const [chartType, setChartType] = useState('bar');

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
    
    const [circleColor, setCircleColor] = useState('rgba(0, 0, 0, 0)');

    const DrawChart = () => {
        if (chartType === 'bar') DrawBarChart(startDate, endDate);
        if (chartType === 'line') DrawLineCharts(startDate, endDate);
    }

    useEffect(() => {
        DrawChart();
    }, [chartType])

    useEffect(() => {
        if (!history) return;
        
        let start = startDate || ArrangeByAscendingDate(history)[0]?.date;
        let end = endDate || ArrangeByDescendingDate(history)[0]?.date;

        const hist = GetFromDateRange(history, ConvertToISO(start), ConvertToISO(end));
        const colors = hist.map(h => h.color);

        setStartDate(start);
        setEndDate(end);
        setMinDate(ArrangeByAscendingDate(history)[0]?.date);
        setMaxDate(ArrangeByDescendingDate(history)[0]?.date);

        const percents = {
            feminine: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[0]))),
            nonBinary: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[1]))),
            masculine: calculateAverage(colors.map(c => percentFromRgbValue(rgbaAsArray(c)[2]))),
            senseOfGender: calculateAverage(colors.map(c => percentFromAlphaValue(rgbaAsArray(c)[3])))
        }

        setCircleColor(getRgbaCode(Object.values(percents)));
        DrawChart();
    }, [history, startDate, endDate])

    const handleChartTypeOptionChange = (e) => {
        setChartType(e.target.value);
    }

    return (
        <div className="chartContainer" id="chartContainer">
            <span>Average Gender Percentage</span>
            <div className="chartPickerContainer">
                <span className="chartPickerTitle">Timeframe</span>
                <Space direction='vertical' size={12}>
                    <RangePicker 
                        inputReadOnly
                        value={[moment(startDate), moment(endDate)]}
                        onChange={(dates) => { setStartDate(dates[0], setEndDate(dates[1])) }}
                        className='chartPicker'
                        format={'YYYY-MM-DD'}
                        disabledDate={(current) => { return (current && current > moment(maxDate) || (current && current < moment(minDate))) }}
                        allowClear={false} />
                </Space>
            </div>
            <div className="chartPickerContainer">
                <span className="chartPickerTitle">Chart Type</span>
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