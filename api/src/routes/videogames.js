const { Router } = require('express');
const router = Router();
require('dotenv').config();
const {APY_KEY} = process.env;
const axios = require('axios');
const {Videogame, Genre} = require('../db');
const { Op } = require("sequelize");

let pages=[[]];
let numPages=0;
let nextPage;
const maxResults=100;
const limit=15;
var apiArray=[];
var dbArray = [];
router.get('/',async(req,res)=>{
    console.log("videogames request");
    const query = req.query.name;
    if(query){
        apiArray=[];
        dbArray=[];
        //first database games
        const dbgames = await Videogame.findAll({where:{name:{[Op.like]:`%${query}%`}}, include: Genre});
        dbArray = dbgames.slice(0,limit);
        // limit-=dbgames.length;
        //then api games
        resultsLeft = maxResults - dbgames.length;
        //Now we start getting results from API
        let finish=false;
        let counter =1;
        let next="first";
        while(!finish&&next){
            if(resultsLeft>0){
                const games = await axios.get(`https://api.rawg.io/api/games?search=${query}&page=${counter}&page_size=40&key=${APY_KEY}`);
                next = games.data.next;
                apiArray =apiArray.concat(games.data.results);
                resultsLeft-=games.data.results.length;
                counter++;
            }else{
                finish=true;
            }
        }
        let newArr3 =dbArray.concat(apiArray);

        res.status(200).json(newArr3);
    }
    else{
        apiArray=[];
    dbArray=[];
        const dbgames = await Videogame.findAll({include: Genre});
        dbArray = dbgames.slice(0,limit);
        resultsLeft = maxResults - dbgames.length;
        //Then API games
        let finish=false;
        let counter =1;
        let next="first";
        while(!finish){
            if(resultsLeft>0){//If there are
                const games = await axios.get(`https://api.rawg.io/api/games?page=${counter}&page_size=40&key=${APY_KEY}`);
                apiArray=apiArray.concat(games.data.results);
                next = games.data.next
                resultsLeft-=games.data.results.length;
                counter++;
            }else{//If all 100 results were in database or if we completed exactly 100 results from db + Api
                finish=true;
            }
        }
        let newArr3 =dbArray.concat(apiArray);
        if(newArr3.length>100){
            newArr3 = newArr3.slice(0,100);
        }
        res.status(200).json(newArr3);
    }
})    


module.exports= router;