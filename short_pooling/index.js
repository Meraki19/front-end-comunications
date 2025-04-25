const express = require('express')
const path = require('path')
const app = express()
const port = 3000;
let data =  {messgae: 'Absence request has been approved'}
app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'index.html'))

})

app.get('/getData', (req,res)=>{
    res.json(data)
})
app.get('/updatedData', (req,res)=>{
    data.messgae = 'Absence request has been cancelled'
    res.json(data)
})
app.listen(port,()=>{
    console.log(__dirname)
    console.log(`port listening at ${3000}`)
})