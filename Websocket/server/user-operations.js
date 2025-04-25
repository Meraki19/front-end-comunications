
const fs = require("fs");
const path = require('path')
const addUser = async (newuser)=> {
    let filepath = path.join(__dirname,'..', "mock_data/user-list.json");
    let data = await readUserData(filepath,newuser)
    console.log(data)
    writeUserData(filepath,data)
  }
  const readUserData= (filepath,newuser)=> {
 
    return new Promise((resolve,reject)=>{
      fs.readFile(filepath, (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          let exstinData = JSON.parse(data);
          let dataToStore = {
            ...newuser,
            id:Math.floor(Math.random() * 100)
          }
          let updataedData = [...exstinData, dataToStore];
          resolve(updataedData)
        }
      });
    })
   
  }
  const writeUserData= (filepath, currentUserdata)=> {
    fs.writeFile(filepath, JSON.stringify(currentUserdata, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("updated db");
      }
    });
  }
  module.exports = {
    addUser
  }