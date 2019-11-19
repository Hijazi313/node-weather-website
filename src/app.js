const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

const port = process.env.PORT || 3000;

// DEFINE PATH FOR EXPRESS CONFIG
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    authorName: "Muhammad Hamza Asif"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    authorName: "Muhammad Hamza Asif"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address Must Be Provided"
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      res.send({
        error: error
      });
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        res.send({ error: error });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You Must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    authorName: "Muhammad Hamza Asif",
    message: "This is a Help message"
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    authorName: "Muhammad Hamza Asif",
    message: "Help Article Not Found"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    authorName: "Muhammad Hamza Asif",
    message: "Error 404 Page Not Found"
  });
});
try {
  app.listen(port, () => {
    console.log("Server is Up and running on port 3000");
  });
} catch (error) {
  console.log(error);
}
