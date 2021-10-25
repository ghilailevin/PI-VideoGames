import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import logo from  '../images/henry_nav.png'

export default function Nav() {
    return (
        <div className="nav">
            <div className="nav__brand">
            <Link to="/" className="nav__homelink">
            <img src={logo} className="nav__brand" alt="brand"></img>
            <span className="henry__navnext">VIDEO GAMES WEBAPP</span>
            </Link>
            </div>
            <div className="nav__menu">
                <Link to="/" className="nav__menu__item">HOME</Link>
                <Link TO="/videogame/create" className="nav__menu__item">CREAR JUEGO</Link>
            </div>
            <div className="nav__search">
            </div>
        </div>
    )
}