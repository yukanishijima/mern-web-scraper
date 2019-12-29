const express = require("express");
const mongoose = require("mongoose");
// const routes = require("./routes");

const PORT = process.env.PORT || 3001;

// initialize Express
const app = express();

// middleware - parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// routes
// app.use(routes);

// send every other request to the react app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// connect to Mongo DB - if deployed, use the deployed database, otherwise use the local database
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mern-web-scraper";
const MONGODB_URI = "mongodb://localhost/mern-web-scraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("database connected");
});

// start the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
