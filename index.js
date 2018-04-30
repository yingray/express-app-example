const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");

const app = new express();

const hskey = fs.readFileSync("./domain.key");
const hscert = fs.readFileSync("./domain.crt");

const options = {
  key: hskey,
  cert: hscert
};

app.get("/", (req, res) => {
  res.send("hello, world!");
});

app.get("/webhook", (req, res) => {
  res.send("hello, hook!");
});

app.set("port", process.env.PORT || 3000);
app.set("httpsport", 8080);

const httpServer = http.createServer(app).listen(app.get("port"));
const httpsServer = https
  .createServer(options, app)
  .listen(app.get("httpsport"));
