import React, { useEffect, useState, forwardRef } from 'react';
import { Charts, GenderCircle, Slider } from '.';
import { getRangeRgbaCode, ExistsInDateRange, ConvertToISO, RestoreLastSavedState } from '../Common';
import { Space, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

export const GenderSliders = (props) => {
    const { onGenderAdded } = props;

    const [feminine, setFeminine] = useState(0);
    const [nonBinary, setNonBinary] = useState(0);
    const [masculine, setMasculine] = useState(0);
    const [sense, setSense] = useState(0.0);

    const [entry, setEntry] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [circleColor, setCircleColor] = useState('rgba(0, 0, 0, 0)');

    const handleRangeValueChange = (e) => {
        const { id, value } = e.target;
        
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
        setSense(values.sense);

        setDateTimePicker();
    }, [])

    useEffect(() => {
        setCircleColor(getRangeRgbaCode([feminine, nonBinary, masculine, sense]));
    }, [feminine, nonBinary, masculine, sense])

    const setDateTimePicker = () => {
        setStartDate(new Date());
    }

    const handleLogGenderButtonPressed = () => {
         if (startDate > new Date()) {
            alert("Please choose an earlier date and/or time.");
            return;
        }

        onGenderAdded({ date: startDate.toISOString(), color: getRangeRgbaCode([feminine, nonBinary, masculine, sense]), entry: entry });
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
                <Space direction='vertical' size={12}>
                    <DatePicker 
                        showTime
                        inputReadOnly
                        style={{ width: '100%' }}
                        value={moment(startDate)}
                        format={'YYYY-MM-DD hh:mm:ss A'}
                        onChange={(value) => setStartDate(value)}
                        onOk={(value) => setStartDate(value)}
                        disabledDate={(current) => { return current > moment().endOf('day') }}
                        allowClear={false} />
                </Space>
                <textarea 
                    className="logTextArea" 
                    rows="7" 
                    id="logTextArea" 
                    value={entry} 
                    onChange={(e) => setEntry(e.target.value)}></textarea>
                <button onClick={handleLogGenderButtonPressed}>Log This Gender</button>
            </div>
        </div>
    )
}