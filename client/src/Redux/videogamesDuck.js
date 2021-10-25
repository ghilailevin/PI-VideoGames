import axios from 'axios';
import swal from 'sweetalert2';
//constraints
const initialState = {
    gamesArray: [],
    auxArray: [],
    currentPage: 0,
    pageLimit: 0,
    page: [],
    genres: []
}


//reducer
export default function videogamesReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_GAMES":
            return {
                ...state,
                gamesArray: action.payload.gamesArray,
                pageLimit: action.payload.pages,
                currentPage: action.payload.pages > 0 ? 1 : 0,
                page: action.payload.current,
                auxArray: action.payload.auxArray
            }

        case "NEXT_PAGE":
            return {
                ...state,
                page: action.payload.page,
                currentPage: action.payload.currentPage
            }
        case "PREV_PAGE":
            return ({
                ...state,
                page: action.payload.page,
                currentPage: action.payload.currentPage
            })
        case "SORT":
            return {
                ...state,
                gamesArray: action.payload.sortedArray,
                currentPage: action.payload.currentPage,
                page: action.payload.firstPage
            }
        case "FILTER":
            return {
                ...state,
                gamesArray: action.payload.filteredArray,
                currentPage: action.payload.numPages > 0 ? 1 : 0,
                pageLimit: action.payload.numPages,
                page: action.payload.firstPage
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        default:
            return state;
    }
}

//actions
export const getGamesAction = (query) => async (dispatch, getState) => {
    try {
        let state = getState().games;
        var res;
        if (query) {
            res = await axios.get("http://localhost:3001/videogames?name=" + query);
        }
        else {
            res = await axios.get("http://localhost:3001/videogames");
        }
        let resArray = res.data;
        let numPages = Math.ceil(resArray.length / 15);
        //how many pages will be with our results.
        // for(let i=0;i<numPages;i++){
        //     pages[i]=resArray.slice(i*15,(i+1)*15);
        // }
        let newArr = [...resArray];
        let firstPage = newArr.slice(0, 15);
        dispatch({
            type: "GET_GAMES",
            payload: { gamesArray: res.data, pages: numPages, current: firstPage, auxArray: res.data }
        })
    } catch (err) {
        console.log("Can't resolve the petition: " + err)
    }
}


export const getNextAction = () => async (dispatch, getState) => {
    let state = getState().games;
    let newArr = [...state.gamesArray];
    let nextPage = newArr.slice(state.currentPage * 15, (state.currentPage + 1) * 15);
    dispatch({
        type: "NEXT_PAGE",
        payload: { page: nextPage, currentPage: state.currentPage + 1 }
    })
}
export const getPrevAction = () => async (dispatch, getState) => {
    let state = getState().games;
    let newArr = [...state.gamesArray]
    let prevPage = newArr.slice((state.currentPage - 2) * 15, (state.currentPage - 1) * 15);
    dispatch({
        type: "PREV_PAGE",
        payload: { page: prevPage, currentPage: state.currentPage - 1 }
    })
}
export const sortGamesAction = (sortby) => async (dispatch, getState) => {
    let state = getState().games;
    var newArr = [];
    var sortedArr = [];
    var page = [];
    switch (sortby) {
        case "alphabeticasc":
            newArr = [...state.gamesArray];
            sortedArr = newArr.sort(function (x, y) {
                let a = x.name.toUpperCase(),
                    b = y.name.toUpperCase();
                return a === b ? 0 : a > b ? 1 : -1;
            });
            page = sortedArr.slice(0, 15);
            dispatch({
                type: "SORT",
                payload: { sortedArray: sortedArr, currentPage: 1, firstPage: page }
            })
            break;
        case "alphabeticdesc":
            newArr = [...state.gamesArray];
            sortedArr = newArr.sort(function (x, y) {
                let a = x.name.toUpperCase(),
                    b = y.name.toUpperCase();
                return a === b ? 0 : a < b ? 1 : -1;
            });
            page = sortedArr.slice(0, 15);
            dispatch({
                type: "SORT",
                payload: { sortedArray: sortedArr, currentPage: 1, firstPage: page }
            })
            break;
        case "ratingasc":
            newArr = [...state.gamesArray];
            sortedArr = newArr.sort(function (x, y) {
                let a = x.rating,
                    b = y.rating;
                return a === b ? 0 : a > b ? 1 : -1;
            });
            page = sortedArr.slice(0, 15);
            dispatch({
                type: "SORT",
                payload: { sortedArray: sortedArr, currentPage: 1, firstPage: page }
            })
            break;
        case "ratingdesc":
            newArr = [...state.gamesArray];
            sortedArr = newArr.sort(function (x, y) {
                let a = x.rating,
                    b = y.rating;
                return a === b ? 0 : a < b ? 1 : -1;
            });
            page = sortedArr.slice(0, 15);
            dispatch({
                type: "SORT",
                payload: { sortedArray: sortedArr, currentPage: 1, firstPage: page }
            })
            break;
        default:
            return;
    }
}

export const filterGamesAction = (filterBy) => async (dispatch, getState) => {
    let state = getState().games;
    let newArr = [...state.auxArray];
    let numPages;
    let firstPage;
    switch (filterBy) {
        case "all":
            newArr = [...state.auxArray]
            numPages = Math.ceil(newArr.length / 15);
            firstPage = newArr.slice(0, 15);
            dispatch({
                type: "FILTER",
                payload: { filteredArray: newArr, numPages: numPages, firstPage: firstPage }
            })
            break;
        case "creator":
            newArr = newArr.filter(game => !(/^[0-9]+$/.test(game.id)))
            numPages = Math.ceil(newArr.length / 15);
            firstPage = newArr.slice(0, 15);
            dispatch({
                type: "FILTER",
                payload: { filteredArray: newArr, numPages: numPages, firstPage: firstPage }
            })
            break;
        case "xbox":
            newArr = newArr.filter(game => {
                let test=[];
                if(game.platforms){
                    test = [...game.platforms]
                }
                let fit = false;
                for (let i = 0; i < test.length && !fit; i++) {
                    if (/xbox*/i.test(test[i].platform.name)) {
                        fit = true;
                    }
                }
                return fit;
            })
            numPages = Math.ceil(newArr.length / 15);
            firstPage = newArr.slice(0, 15);
            dispatch({
                type: "FILTER",
                payload: { filteredArray: newArr, numPages: numPages, firstPage: firstPage }
            })
            break;
        case "playstation":
            newArr = newArr.filter(game => {
                let test=[];
                if(game.platforms){
                    test = [...game.platforms]
                }
                let fit = false;
                for (let i = 0; i < test.length && !fit; i++) {
                    console.log(test[i].platform)
                    if (/playstation*/i.test(test[i].platform.name)) {
                        fit = true;
                    }
                }
                return fit;
            })
            numPages = Math.ceil(newArr.length / 15);
            firstPage = newArr.slice(0, 15);
            dispatch({
                type: "FILTER",
                payload: { filteredArray: newArr, numPages: numPages, firstPage: firstPage }
            })
            break;
        case "nintendo":
            newArr = newArr.filter(game => {
                let test=[];
                if(game.platforms){
                    test = [...game.platforms]
                }
                let fit = false;
                for (let i = 0; i < test.length && !fit; i++) {
                    console.log(test[i].platform)
                    if (/nintendo*/i.test(test[i].platform.name)) {
                        fit = true;
                    }
                }
                return fit;
            })
            numPages = Math.ceil(newArr.length / 15);
            firstPage = newArr.slice(0, 15);
            dispatch({
                type: "FILTER",
                payload: { filteredArray: newArr, numPages: numPages, firstPage: firstPage }
            })
            break;
        case "pc":
            newArr = newArr.filter(game => {
                let test=[];
                if(game.platforms){
                    test = [...game.platforms]
                }
                let fit = false;
                for (let i = 0; i < test.length && !fit; i++) {
                    console.log(test[i].platform)
                    if (/pc*/i.test(test[i].platform.name)) {
                        fit = true;
                    }
                }
                return fit;
            })
            numPages = Math.ceil(newArr.length / 15);
            firstPage = newArr.slice(0, 15);
            dispatch({
                type: "FILTER",
                payload: { filteredArray: newArr, numPages: numPages, firstPage: firstPage }
            })
            break;
        default:
            break;
    }
}

export const getGenresAction = () => async (dispatch, getState) => {
    try {
        const genres = await axios.get("http://localhost:3001/genres/")
        dispatch({
            type: "GET_GENRES",
            payload: genres.data
        })
    } catch (err) {
        console.log("Can't get genres: " + err)
    }
}
export const createGame = (body) => async (dispatch, getState) => {
    try {
        let res = await axios({
            method: 'post',
            url: 'http://localhost:3001/videogame/create',
            data: {
                name: body.name,
                description: body.description,
                releasedate: body.releasedate,
                rating: body.rating,
                platforms: body.platforms,
                genres: body.genres
            }
        })
        swal.fire({
            title:'Success!',
            type:'success',
            text:'Game created successfully'
        })
        dispatch(getGamesAction())
    } catch (err) {
        swal.fire({
            icon:'error',
            title:'Wait what?',
            text:'Can\'t create the game, fill the required values'
        })
        console.log("Can't create game: " + err);
    }
}