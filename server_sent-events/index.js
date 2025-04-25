const express = require('express')
const livedata = require('./mock_data/live-stream.json')
const path = require('path')
const fs = require('fs')
const app = express()
const port=3003
app.use(express.static(__dirname))
app.use(express.json())
let index=0
let stackCount = livedata.length
console.log(stackCount)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
app.get('/live-stream',  (req,res)=>{
   res.setHeader('Content-Type','text/event-stream')
   res.setHeader('Connection','keep-alive')
   res.setHeader('Cache-Control','no-cache')
   const timer= setInterval(()=>{
       if(index<stackCount) {
        res.write(`data: ${JSON.stringify(livedata[index])}\n\n`)
        index++
        console.log(index)
       } else {
        console.log('ending streaming')
        //res.write("data: data streaming ended \n\n")
        res.end()
        clearInterval(timer)
      
        return
       }
    },3000)
    req.on('close',()=>{
        clearInterval(timer)
        res.end()
    })
})


app.listen(port,()=>{
    console.log(`listening to ${port}`)
})