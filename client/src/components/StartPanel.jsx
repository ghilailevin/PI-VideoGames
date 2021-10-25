import React, { useEffect } from 'react';
import './StartPanel.css';
import HenryStartImage from '../images/henry_start.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGamesAction, getGenresAction } from '../redux/videogamesDucks';

export default function StartPanel() {
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            await dispatch(getGamesAction());
            await dispatch(getGamesAction());
        }
        fetchData(); 
    }, [])
    return ( 
        <>
        <div className="wallpaper">
            <div className="gradient">
                <p className="title1">Video games</p>
            </div>
            <p className="title2">Webapp</p>
            <Link to="/" className="neon"><span>Start</span></Link>
            <img src={HenryStartImage} alt="henry start" className="start-henry"></img>
            <span className="henry-font">HENRY</span>
        </div>

    </>
    ) 
}