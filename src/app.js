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
       res.send(menDataSaved)
    }catch(e){
        console.log(e)
        console.log("Post request failed")
    }
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