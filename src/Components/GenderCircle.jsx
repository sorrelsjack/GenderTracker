import React from 'react';
import { getRangeRgbaCode, rgbaAsArray } from '../Common';

export const GenderCircle = (props) => {
    const {
        className,
        color = 'rgba(0, 0, 0, 0)',
        size = 'small',
        icon,
        tooltip,
        onClick = () => { },
        onMouseOver = () => { }
    } = props;

    const Tooltip = tooltip;
    const colorArray = rgbaAsArray(color);

    return (
        <div
            className={`${size === 'small' ? 'circle' : 'largeCircle'} ${className} tooltip`}
            style={{ backgroundColor: color }}
            id="currentCircle"
            onClick={onClick}
            onMouseOver={onMouseOver}>
            {icon}
            {!Tooltip ? <span
                className="tooltiptext"
                id="tooltipText">{`rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3]})`}</span> : <div>{Tooltip}</div>}
        </div>
    )
}