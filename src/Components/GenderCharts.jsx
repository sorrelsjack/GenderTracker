import React, { useState, useEffect } from 'react';
import './styles.css';
import { GenderCircle } from '../Components';

export const GenderCharts = () => {
    const [circleColor, setCircleColor] = useState('rgba(0, 0, 0, 0)');

    useEffect(() => {
        
    }, [])

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