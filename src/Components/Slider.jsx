import React, { useState } from 'react';

export const Slider = (props) => {
    const { label, id, value, onChange } = props;

    return (
        <div>
            <p className="genderLabel">{label}</p>
            <input type="range" min="0" max="100" value={value} className="slider" onChange={(e) => onChange(e)}
                id={id}></input>
        </div>
    )
}