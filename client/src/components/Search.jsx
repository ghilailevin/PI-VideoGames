import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGamesAction } from '../redux/videogamesDucks';
import './Searcher.css';

export default function Searcher() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    function handleChange(e) {
        setSearch(e.target.value);
    }
    function searchGame(game) {
        dispatch(getGamesAction(game))
    }
    function submit() {
        searchGame(search);
        setSearch("");
    }
    return (<>
        <div className="search">
            <input className="searchinput" onChange={handleChange} />
            <input type="submit" className="search-button" value="SEARCH" onClick={submit}></input>
        </div>
    </>)
}
