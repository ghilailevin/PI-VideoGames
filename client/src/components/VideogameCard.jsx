import React from 'react';
import './VideogameCard.css';
import userImage from '../images/imagen_usuario-01.png'
export default function VideogameCard(props){
    return(
        
        <div className="gamecard">
            {props.image?<img src={props.image} className="gamecard__image" alt={props.name+".png"}/>:<img src={userImage} className="gamecard__image" alt={props.name+".png"}/>}
            <p className="gamecard__title">{props.name}</p>
            {props.genres.length>0?props.genres.map(genre=><span className="gamecard__genres" key={genre.name}>{genre.name}&nbsp;</span>):"No genres"}
        </div>
    )
}