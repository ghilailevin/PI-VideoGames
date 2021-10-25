import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import controller from '../images/controller.png';
import './VideoGameDetail.css';
import MarioGif from '../images/mario_gif.gif'
import defaultImage from '../images/imagen_usuario-01.png'
import loading from '../images/loading.gif'

export default function VideoGameDetail(props) {
    const games = useSelector(store => store.games.gamesArray);
    const [game, setGame] = useState({})
    async function filter(gameId) {
        
        let gameresult = games.filter(game =>{
            // eslint-disable-next-line react-hooks/exhaustive-deps
            return game.id == gameId
        } )
        if (gameresult.length > 0) {
            //filter db/api
            let gameDetails = await axios.get(`http://localhost:3001/videogame/${gameresult[0].id}`)
            setGame(gameDetails.data);
            console.log(gameDetails.data);
            return gameDetails.data;
        }
        else {
            return null;
        }
    }
    useEffect(() => {
        filter(props.match)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="detail-panel">
            <div className="detail-panel__title-panel">
                <p className="detail-panel__title-panel__title">{(game) !== null && Object.entries(game).length !== 0 ? `${game.name}` : ""}</p>
            </div>
            <div className="detail-panel__image-panel">
                <img className="detail-panel__image-panel__image" src={(game) !== null && Object.entries(game).length !== 0 ? `${game.background_image ? game.background_image : defaultImage}` : loading} alt={game.name} />
            </div>
            <p className="detail-panel__description">{(game) !== null && Object.entries(game).length !== 0 ? `${game.description.replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br />', '\n')}` : ""}</p>
            <br /><br /><br /><br />
            <p className="detail-panel__description" id="detail-panel__description__platforms">Plataformas </p>
            <div className="detail-panel__platforms">
                {
                    (game) !== null && Object.entries(game).length !== 0 ? game.platforms.map(platform => <><div className="detail-panel__platform" key={platform.id}><img className="list-icon" src={controller} alt="controller" key={platform.id}></img> <p className="platform-description" key={platform.id}>{platform.platform.name}</p></div></>) : ""
                }
            </div>
            <br />
            <p style={{ textAlign: "center", color: "white", fontFamily: "'Teko', sans-serif", fontSize: "30px" }}>RATING</p>
            <p className="detail-panel__rating">{(game) !== null && Object.entries(game).length !== 0 ? `${game.rating}` : ""}</p>
            <br></br>
            <p className="detail-panel__description" id="detail-panel__description__platforms">Géneros </p>
            <div className="detail-panel__platforms">
                { 
                    (game) !== null && Object.entries(game).length !== 0 ? game.genres.map(genre =><div className="detail-panel__platform"><img src={MarioGif} className="list-icon-mario" alt="mario.gif"></img><p className="detail-panel__genre-description">{genre.name}</p></div>) : ""
                }
            </div>
        </div>
    )
}