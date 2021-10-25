import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getGenresAction, createGame } from '../redux/videogamesDucks';
import './CreateVideogame.css';

export default function CreateVideogame() {
    const [input, setInput] = useState({
        name: '',
        description: '',
        releasedate: '',
        rating: 0,
    })
    const genres = useSelector(store => store.games.genres);
    const dispatch = useDispatch();
    const [checkedGenres, setChekedGenres] = useState([]);
    const [checkedPlatforms, setCheckedPlatforms] = useState([]);
    const [errors, setErrors] = useState({
        name: '',
        description: ''
    })
    function startGenres() {
        if (genres.length === 0) {
            dispatch(getGenresAction());
        }
    }


    function handleCheckboxChange(e) {
        if (checkedGenres.length === 0) {
            setChekedGenres([...checkedGenres, parseInt(e.target.value)]);
        }
        else {
            var val = checkedGenres.findIndex((genre) => genre === e.target.value);
            if (val !== -1) {
                let newArr = [...checkedGenres];
                if (val === 0) {
                    newArr.shift();
                } else {
                    newArr.splice(val, val)
                }
                setChekedGenres([...newArr]);
            } else {
                setChekedGenres([...checkedGenres, parseInt(e.target.value)]);
            }
        }

    }


    function handlePlatformsChange(e) {
        if (checkedPlatforms.length === 0) {
            setCheckedPlatforms([...checkedPlatforms, { platform: { name: e.target.value } }]);
        }
        else {
            var search = checkedPlatforms.findIndex((platform) => platform.platform.name === e.target.value);
            if (search !== -1) {
                let platformArray = [...checkedPlatforms];
                if (search === 0) {
                    platformArray.shift();
                } else {
                    platformArray.splice(search, search)
                }
                console.log("platforms: " + platformArray);
                setCheckedPlatforms([...platformArray]);
            } else {
                setCheckedPlatforms([...checkedPlatforms, { platform: { name: e.target.value } }]);
            }
        }
    }

    function handleInputChange(e) {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        startGenres();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function handleErrors(e) {
        switch (e.target.name) {
            case "name":
                if (e.target.value === "") {
                    setErrors({ ...errors, [e.target.name]: "El nombre no debe estar vacío" })
                    break;
                }
                else if (/[^0-9a-zA-Z* ]/gi.test(e.target.value)) {
                    setErrors({ ...errors, [e.target.name]: "Escribe un nombre sin caracteres especiales" })
                    break;
                } else {
                    setErrors({ ...errors, [e.target.name]: "" });
                    break;
                }
            case "description":
                if (e.target.value === "") {
                    setErrors({ ...errors, [e.target.name]: "La descripción no debe ser vacía" })
                    break;
                }
                else {
                    setErrors({ ...errors, [e.target.name]: "" })
                }
                break;
            default:
                return;
        }
    }

    function submit() {
        const body = {
            name: input.name,
            description: input.description,
            releasedate: input.releasedate,
            genres: checkedGenres,
            rating: input.rating,
            platforms: checkedPlatforms,
        }
        dispatch(createGame(body));
    }

    return (
        <div className="createvideogame__panel">
            <form>
                <div className="createvideogame__form-name">
                    <label htmlFor="name" className="createvideogame__input-label">Title</label>
                    <input name="name" type="text" onChange={handleInputChange} onBlur={handleErrors}></input>
                </div>
                <div className="createvideogame__form-textarea">
                    <label htmlFor="description" className="createvideogame__input-label" style={{marginBottom:"px"}}>Description</label><br /><br />
                    <textarea name="description" rows="10" cols="50" onChange={handleInputChange} onBlur={handleErrors}></textarea>
                </div>
                <div className="date-range-picker">
                    <div style={{width:"50%",display:"inline-block",textAlign:"center"}}>
                        <p className="createvideogame__input-label" style={{marginBottom:"60px"}}>Release Date</p>
                        <input className="date-range-picker__date" onKeyDown={(e) => e.preventDefault()}type="date" id="start" name="releasedate" min="1900-01-01" max="2021-12-31" onChange={handleInputChange}></input>
                    </div>
                    <div style={{width:"50%",display:"inline-block",textAlign:"center"}}>
                    <p className="createvideogame__input-label">Rating</p><br/>
                        <input name="rating" className="createvideogame__ratingrange" defaultValue="0" type="range" max="5" step="0.5" onChange={handleInputChange}></input>
                        <p className="createvideogame__input-label">{input.rating}</p>
                    </div>
                </div>
                <p className="createvideogame__input-label" style={{marginBottom:"60px",textAlign:"center",color:"white"}}>Genres</p>
                <div className="createvideogame__form-genres">
                    {
                        genres.map(genre => <div className="genre-container"><label key={genre.id} className="genre-label">{genre.name}<input type="checkbox"className="checkbox" name={genre.id} onChange={handleCheckboxChange} value={genre.id}></input></label></div>)
                    }
                </div>
                <p className="createvideogame__input-label" style={{marginBottom:"60px",textAlign:"center",color:"white"}}>Platforms</p>
                <div className="createvideogame__form-platforms">
                    <div className="form-platforms__platform"><label className="genre-label">Xbox One<input type="checkbox"className="checkbox" name="Xbox One" onChange={handlePlatformsChange} value="Xbox One"></input></label></div>
                    <div className="form-platforms__platform"><label className="genre-label">Nintendo Switch<input type="checkbox" className="checkbox"name="Nintendo Switch" onChange={handlePlatformsChange} value="Nintendo Switch"></input></label></div>
                    <div className="form-platforms__platform"><label className="genre-label">PlayStation 5<input type="checkbox"className="checkbox" name="PlayStation 5" onChange={handlePlatformsChange} value="PlayStation 5"></input></label></div>
                    <div className="form-platforms__platform"><label className="genre-label">PC<input type="checkbox" name="PC"className="checkbox" onChange={handlePlatformsChange} value="PC"></input></label></div>
                </div>
            </form>
            <div style={{textAlign:"center",paddingTop:"50px"}}>
                <p className="createvideogame__input-label" style={{marginBottom:"60px",textAlign:"center",color:"white"}}>{errors.name}</p>
                <p className="createvideogame__input-label" style={{marginBottom:"60px",textAlign:"center",color:"white"}}>{errors.description}</p>
                {checkedPlatforms.length > 0 && errors.name === "" && errors.description === "" ? <input type="submit" value="Crear juego" className="neon-button" style={{width:"200px",height:"50px",position:"relative",left:"42%",fontSize:"30px"}}onClick={submit}></input> : "Por favor complete los campos"}
            </div>
        </div>
    )
}