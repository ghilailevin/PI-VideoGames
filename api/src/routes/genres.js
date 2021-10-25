const {Router} = require('express');
const axios = require('axios');
require('dotenv').config();
const {APY_KEY} = process.env;
const router = Router();
const {Genre} = require('../db');

router.get('/',async(req,res)=>{
  console.log("consultado");
    var a = await Genre.findAll();
    if(a.length===0){
      var genres = await axios(`https://api.rawg.io/api/genres?key=${APY_KEY}`)
      genres.data.results.forEach(genre=>{
         Genre.create({
          name: genre.slug
        })
      })
      console.log("Genres created succesfully: ");
      var a = await Genre.findAll();
      res.status(200).json(a);
    }else{
      console.log("Genres requested succesfully from database");
      res.status(200).json(a);
    }
})

module.exports= router;