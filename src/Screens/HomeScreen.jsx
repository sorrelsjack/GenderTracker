import React, { useEffect, useState } from 'react';
import { HistorySection, GenderSliders, GenderCharts } from '../Components';
import '../../styles.css'
import GenderRepository from '../Common/GenderRepository';

export const HomeScreen = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(GenderRepository.Instance().GetItems());
    }, []);

    const handleGenderAdded = (gender) => {
        const { date, color, entry } = gender;

        localStorage.setItem(date, JSON.stringify({ color, entry }));
        GenderRepository.Instance().AddItem({ date, color, entry });
        setItems(GenderRepository.Instance().GetItems());
    }

    return (
        <div>
            <div className="title">
                Gender Diary
            </div>
            <div className='indexContainer'>
                <HistorySection items={items} />
                <GenderSliders onGenderAdded={handleGenderAdded} />
                <GenderCharts history={items} />
            </div>
        </div>
    )
}