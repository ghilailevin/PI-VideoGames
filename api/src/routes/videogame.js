const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { APY_KEY } = process.env;

router.get('/:idgame', async (req, res) => {
    let id = req.params.idgame;
    if (/^[0-9]+$/.test(id)) {
        try {
            const result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APY_KEY}`);
            return res.status(200).json(result.data);
        } catch (err) {
            res.status(404).send("Game not found");
        }
    } else {
        try{
            game = await Videogame.findByPk(id, { include: Genre })
            return res.status(200).json(game);
        }catch(err){
            res.status(404).send("Game not found");
        }
    }
}).post('/create', async (req, res) => {
    const { name, description, releasedate, rating, platforms, genres } = req.body;
    if (name && description) {
        var vg = await Videogame.create({
            name: name,
            description: description,
            releasedate: releasedate,
            rating: rating,
            platforms: platforms
        })
        vg.setGenres(genres);
        res.status(200).json(vg);
    }else{
        res.status(400).send("error al crear el juego, datos faltantes");
    }
})


module.exports = router;