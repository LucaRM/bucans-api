const mongoose = require('mongoose')
const Schema = mongoose.Schema

export const characterSchema = new Schema({
    _id: String,
    name: String,
    level: Number,
    class: {
        name: String,
        ID: String
    },
    abilityScores: {
        strength: Number,
        dexterity: Number,
        constitution: Number,
        intelligence: Number,
        wisdom: Number,
        charisma: Number
    }
})
