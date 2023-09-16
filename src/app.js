const express = require('express')

// custom modules
const {connection} = require('./db/conn')
const {MensRanking} = require('../src/models/mens')
const app = express()

// Using predefined middleware of express
app.use(express.json())

const port = process.env.PORT || 3000

// RESTAPI - Handling POST request
app.post('/mens', async(req,res) => {
    const {ranking,name,dob,country,score,event} = req.body
    try{
        const men = new MensRanking({
            ranking,
            name,
            dob,
            country,
            score,
            event
        })
       const menDataSaved =  await men.save()
       res.status(201).send(menDataSaved)
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

// HANDLING GET REQUEST for single user based upon ranking
app.get('/mens/:id',async(req,res) => {
    try{
        const id = req.params.id
        const getMen = await MensRanking.find({ranking : id})
        res.send(getMen)
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

// HANDLING GET REQUESTS FOR ALL USERS
app.get('/mens/',async(req,res) => {
    try{
        const getMens = await MensRanking.find({})
        res.send(getMens)
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

// HANDLING PATCH REQUESTS TO UPDATE AN INDIDIVIDUAL USER
app.put('/mens/:userID' , async (req,res) => {
    const {userID} = req.params
    const payload = req.body

    const user = await MensRanking.findByIdAndUpdate({_id : userID} , payload)

    res.send({user})
})

// HANDLING DELETE REQUESTS
app.delete('/mens/:userID' , async (req,res) => {
    const {userID} = req.params
    const user = await MensRanking.findByIdAndDelete({_id : userID})
    res.send({user})
})

app.listen(port, async() => {
    try{
        await connection
        console.log("Connection successful")
    }catch(e){
        console.log("Not connected")
        console.log(e)
    }
    console.log(`connection is live at port no. ${port}`)
})