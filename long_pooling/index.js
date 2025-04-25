const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
app.use(express.static(__dirname));
const waitingList = [];
const stockdata = {
  stockname: "Xyz stock",
  stockPrice: 32,
  message: "stock price at start of the day",
};
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/getstockdata", (req, res) => {
  if (parseInt(req.query.stockprice) != stockdata.stockPrice) {
    res.json(stockdata);
  } else {
    let servertimer = setTimeout(() => {
      res.status(204).end();
      let clientindex = waitingList.indexOf(res);
      if (clientindex !== -1) waitingList.splice(clientindex, 1);
    }, 30000);
    res.on("close", () => {
      clearTimeout(servertimer);
    });
    waitingList.push(res);
  }
});
app.get("/updatestockprice", (req, res) => {
   stockdata.stockPrice= req.query.stockprice 
    console.log(stockdata)
  while (waitingList.length > 0) {
    let responseclient = waitingList.pop();
    responseclient.json(stockdata);
  }
  res.send("Updated stock price");
});
app.listen(port, () => {
  console.log(__dirname);
  console.log(`listening to port ${port}`);
});
