const express = require("express");
const { route } = require("express/lib/application");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.render("index");
});

routes.get("/gallery", (req, res) => {
  res.render("gallery");
});
routes.get("/about", (req, res) => {
  res.render("about");
});
routes.get("/news", (req, res) => {
  res.render("news");
});

routes.get("/views/registration", (req, res) => {
  res.render("registration");
});

routes.get("/views/login", (req, res) => {
  res.render("login");
});

routes.get("/views/contact-us", (req, res) => {
  res.render("contact-us");
});
routes.get("/views/donation", (req, res) => {
  res.render("donation");
});

module.exports = routes;
