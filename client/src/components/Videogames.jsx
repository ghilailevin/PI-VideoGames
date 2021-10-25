import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideogameCard from './VideogameCard';
import Searcher from './Searcher';
import { getGamesAction, getNextAction, getPrevAction, sortGamesAction, filterGamesAction,getGenresAction } from '../redux/videogamesDucks';
import { Link } from 'react-router-dom';
import './Videogames.css';
import controller from '../images/loading.gif'

export default function Videogames() {
    const games = useSelector(store => store.games.page);
    const pages = useSelector(store => store.games.pageLimit);
    const current = useSelector(store => store.games.currentPage);
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(true);
    const [order, setOrder] = useState("");
    const [filter, setFilter] = useState("");

    async function startGames() {
        if (games.length === 0) {
            await dispatch(getGamesAction());
            await dispatch(getGenresAction());
            setLoading(false);
        }
        setLoading(false);
    }
    async function handleSortingChange(e) {
        await setOrder(e.target.value);
    }
    async function handleFilterChange(e) {
        await setFilter(e.target.value);
    }
    useEffect(() => {
        startGames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        dispatch(filterGamesAction(filter));
        dispatch(sortGamesAction(order));
        console.log(loading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, filter])

    return (<>
        <div className="filter-sorter">
            <Searcher></Searcher>
            <div className="orderer">
                <label>
                    Order by&nbsp;&nbsp;&nbsp;
                    <select value={order} className="orderer__select" onChange={handleSortingChange}>
                        <option value="">Select an option</option>
                        <option value="alphabeticasc">alphabetic +</option>
                        <option value="alphabeticdesc">alphabetic -</option>
                        <option value="ratingasc">rating +</option>
                        <option value="ratingdesc">rating -</option>
                    </select>
                </label>
            </div>
            <div className="filterer">
            <label>
                Filter by&nbsp;&nbsp;&nbsp;
                <select value={filter} className="filterer__select" onChange={handleFilterChange}>
                    <option value="">Select an option</option>
                    <option value="all">None</option>
                    <option value="creator">Created by user</option>
                    <option value="xbox">Xbox</option>
                    <option value="playstation">PlayStation</option>
                    <option value="nintendo">Nintendo</option>
                    <option value="pc">PC</option>
                </select>
            </label>
            </div>
        </div>
        <div className="game-panel">
            {
               Object.entries(games).length !== 0  && games!==null? games.map(game => <Link to={`/videogames/${game.id}`} key={game.id}><VideogameCard name={game.name} image={game.background_image} genres={game.genres} key={game.id}></VideogameCard></Link>) : !loading?<p className="noresults">No results found</p>:<img src={controller} className="loadingimage"alt="loading"></img>
            }
        </div>
        <div className="pagination">
        <p>Pages {pages}</p>
            <p>Current {current}</p>
            {
                current > 1 ? <input type="button" className="neon-button" onClick={() => dispatch(getPrevAction())} value="<<"></input> : ""
            }
            {
                current < pages ? <input type="button" className="neon-button" onClick={() => dispatch(getNextAction())} value=">>"></input> : ""
            }
        </div>
    </>)

}
