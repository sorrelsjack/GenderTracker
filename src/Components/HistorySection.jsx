import React, { useState, useEffect } from 'react';
import {
    ArrangeByDescendingDate,
    FetchHistory,
    GetSpelledOutDate,
    percentFromRgbValue,
    percentFromAlphaValue,
    presentRedAsOwnColor,
    presentBlueAsOwnColor,
    presentGreenAsOwnColor,
    rgbaAsArray
} from '../Common';
import GenderRepository from '../Common/GenderRepository';
import { GenderCircle } from './GenderCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

export const HistorySection = (props) => {
    const { items } = props;

    const [history, setHistory] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        setHistory(ArrangeByDescendingDate(items));
    }, [items]);

    const handleClearHistoryPressed = () => {
        const r = confirm("Are you sure you want to clear your history? You can't get this back.");
        if (r) {
            localStorage.clear();
            setHistory([]);
            setSelected({});
            GenderRepository.Instance().ClearItems();
        }
    }

    const handleCircleInteraction = (h) => {
        setSelected(h)
    }

    const Tooltip = (item) => {
        const { date, color, entry } = item.item;
        const colorArray = rgbaAsArray(color);

        return (
            <div>
                <span className="tooltiptext" id="tooltipText">
                    {GetSpelledOutDate(date)}
                    <p>{`rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3]})`}</p>
                    <div className='percentageContainer'>
                        <div style={{ color: presentRedAsOwnColor(colorArray[0]) }}>{`F: ${percentFromRgbValue(colorArray[0])}%`}</div>
                        <div style={{ color: presentGreenAsOwnColor(colorArray[1]) }}>{`N: ${percentFromRgbValue(colorArray[1])}%`}</div>
                        <div style={{ color: presentBlueAsOwnColor(colorArray[2]) }}>{`M: ${percentFromRgbValue(colorArray[2])}%`}</div>
                        <div style={{ opacity: colorArray[3] }}>{`Sense: ${percentFromAlphaValue(colorArray[3])}%`}</div>
                    </div>
                </span>
            </div>
        )
    }

    return (
        <div className="historyContainer" id="historyContainer">
            <span>History (Most Recent to Least Recent)</span>
            <div className="circlesContainer" id="circlesContainer">
                {history.map(h => {
                    return (
                        <GenderCircle
                            onClick={() => handleCircleInteraction(h)}
                            onMouseOver={() => handleCircleInteraction(h)}
                            key={h.date}
                            color={h.color}
                            icon={h.entry && <FontAwesomeIcon className='historyCircleIcon' icon={faBookOpen} size={'lg'} />}
                            tooltip={<Tooltip item={h} />}
                            className='historyCircle' />
                    )
                })}
            </div>
            {selected.entry && <div className="historyEntryContainer" id="historyEntryContainer">
                <div>
                    {GetSpelledOutDate(selected.date)}
                </div>
                <div className='historyEntryBody'>
                    {selected.entry}
                </div>
            </div>}
            <button onClick={handleClearHistoryPressed}>Clear History</button>
        </div>
    )
}