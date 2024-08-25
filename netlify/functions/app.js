console.log("this is me and app is starting:");
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const path = require("path");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

// Paths for Netlify environment
const staticPath = path.join(__dirname, "../../static/static");
const routes = require("../../src/routes/main");

// Middleware setup
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/static", express.static("public"));
app.use(express.static(staticPath));
app.use("", routes);

// View engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../views")); // Ensure correct path
hbs.registerPartials(path.join(__dirname, "../../views/partials")); // Ensure correct path

// MongoDB connection
const uri = "mongodb+srv://pushpanjal:Khushi@cluster0.5qfi9gh.mongodb.net/";
const clientPromise = MongoClient.connect(uri);
clientPromise
  .then((client) => {
    const db = client.db(); // Get the database from the client
    console.log("MongoDB connected");

    // You can now use 'db' to interact with your MongoDB database
    routes.post("/views/registration", async (req, res) => {
      try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
          // if (password === req.body.confirmpassword) {
          // Rest of your code remains the same

          const registration = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
            confirmpassword: cpassword,
            phoneNumber: req.body.phoneNumber,
            dateOfBirth: req.body.dateOfBirth,
            city: req.body.city,
            country: req.body.country,
            state: req.body.state,
            zip: req.body.zip,
            occupation: req.body.occupation,
            whatsappNumber: req.body.whatsappNumber,
            adharNumber: req.body.adharNumber,
            gender: req.body.gender,
          };

          const result = await db
            .collection("registrations")
            .insertOne(registration);

          console.log("Registration successful:", result);

          res.status(200).send("index"); // Assuming "index.hbs" is in the root of the views directory
        } else {
          res.send("Password is incorrect");
        }
      } catch (error) {
        console.error("Error while registering:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
// router.post("/views/registration", async (req, res) => {
//   try {
//     const password = req.body.password;
//     const cpassword = req.body.confirmpassword;
//     if (password === cpassword) {
//       const client = await clientPromise;
//       const db = client.db();
//       const registration = {
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: password,
//         confirmpassword: cpassword,
//         phoneNumber: req.body.phoneNumber,
//         dateOfBirth: req.body.dateOfBirth,
//         city: req.body.city,
//         country: req.body.country,
//         state: req.body.state,
//         zip: req.body.zip,
//         occupation: req.body.occupation,
//         whatsappNumber: req.body.whatsappNumber,
//         adharNumber: req.body.adharNumber,
//         gender: req.body.gender,
//       };
//       await db.collection("registrations").insertOne(registration);
//       res.status(200).render("index");
//     } else {
//       res.send("Password is incorrect");
//     }
//   } catch (error) {
//     console.error("Error while registering:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.use(router);

module.exports.handler = serverless(app);
