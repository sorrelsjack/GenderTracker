import React, { useEffect, useState } from 'react';
import './styles.css';
import { GenderCircle, Slider } from '.';
import { getRangeRgbaCode, ExistsInDateRange, ConvertToISO, RestoreLastSavedState } from '../Common';
import moment from 'moment';
import GenderRepository from '../Common/GenderRepository';

export const GenderSliders = (props) => {
    const { onGenderAdded } = props;

    const [feminine, setFeminine] = useState(0);
    const [nonBinary, setNonBinary] = useState(0);
    const [masculine, setMasculine] = useState(0);
    const [sense, setSense] = useState(0.0);

    const [circleColor, setCircleColor] = useState('rgba(0, 0, 0, 0)');

    const handleRangeValueChange = (e) => {
        const { id, value } = e.target;

        // TODO: Make this... less like this
        if (id === 'feminineRange') setFeminine(value);
        if (id === 'nonBinaryRange') setNonBinary(value);
        if (id === 'masculineRange') setMasculine(value);
        if (id === 'senseOfGenderRange') setSense(value);
    }

    useEffect(() => {
        const values = RestoreLastSavedState();

        setFeminine(values.feminine);
        setNonBinary(values.nonBinary);
        setMasculine(values.masculine);
        setSense(values.sense)
    }, [])

    useEffect(() => {
        setCircleColor(getRangeRgbaCode([feminine, nonBinary, masculine, sense]));
    }, [feminine, nonBinary, masculine, sense])

    const setDateTimePicker = () => {
        const now = ConvertToISO(new Date(), true);
    
        const datePicker = document.getElementById("dateTimePicker");
        datePicker.value = datePicker.maxDate = now;
    }

    const handleLogGenderButtonPressed = () => {
        const datePicker = document.getElementById("dateTimePicker");
        const rangeDatePicker = $('#rangeDatePicker').data('daterangepicker');
    
        if (datePicker.value > datePicker.maxDate) {
            alert("Please choose an earlier date and/or time.");
            return;
        }
    
        // Don't bother messing with this
        const date = moment(`${datePicker.value}`, 'YYYY-MM-DD HH:mm:ss A', true).toISOString();
        let entry = document.getElementById("logTextArea").value;
    
        onGenderAdded({ date, color: getRangeRgbaCode([feminine, nonBinary, masculine, sense]), entry: entry });
    
        //setDateTimePicker();
        //addCircle(date, getRangeRgbaCode(), entry);
    
        const { startDate, endDate } = rangeDatePicker;
    
        // TODO: Can we get minDate to update dynamically?
        //if (date < moment(rangeDatePicker.startDate, 'YYYY-MM-DD HH:mm:ss A', true)) rangeDatePicker.minDate = date;
        //if (ExistsInDateRange(date, startDate, endDate)) drawBarChart(startDate, endDate);
        //drawLineCharts();
    }

    return (
        <div className="mainContainer">
            <Slider label='Feminine' id='feminineRange' value={feminine} onChange={handleRangeValueChange} />
            <Slider label='Non-Binary' id='nonBinaryRange' value={nonBinary} onChange={handleRangeValueChange} />
            <Slider label='Masculine' id='masculineRange' value={masculine} onChange={handleRangeValueChange} />
            <Slider label='Sense of Gender' id='senseOfGenderRange' value={sense} onChange={handleRangeValueChange} />
            <div className="mainCircleContainer">
                <GenderCircle color={circleColor} />
            </div>
            <div className="logSectionContainer">
                <input type="text" name="dateTimePicker" id="dateTimePicker" readOnly></input>
                <textarea className="logTextArea" rows="7" id="logTextArea"></textarea>
                <button onClick={handleLogGenderButtonPressed}>Log This Gender</button>
            </div>
        </div>
    )
}