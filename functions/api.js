const express = require("express");
const serverless = require("serverless-http");
const db = require("../db/config");
const route = require("../controllers/route");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5001;
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const router = express.Router();

//Setup Express App
const app = express();

// Middleware
app.use(bodyParser.json());
// Set up CORS
app.use(cors());
//API Routes
// app.use("/api", route);

router.get("/", (req, res) => {
  res.json({
    utilisateur: {
      auteur: {
        nom: "Alexis Vianney Anibe",
        role: "Dévéloppeur Full-Stack",
      },
      test_de_donnees:
        "------------------------------------------------------------------------------",
      informations_personnelles: {
        adresse: {
          code_postal: "75001",
          pays: "France",
          rue: "123 Rue de la Liberté",
          ville: "Paris",
        },
        contacts: {
          email: "jean.dupont@email.com",
          telephone: "+33 1 23 45 67 89",
        },
        date_naissance: "1990-05-15",
        nom: "Jean Dupont",
      },
      informations_professionnelles: {
        compétences: ["Java", "JavaScript", "Python", "SQL"],
        domaine: "Technologie de l'information",
        entreprise: "TechCorp",
        expérience: [
          {
            durée: "2 ans",
            entreprise: "TechCorp",
            poste: "Développeur junior",
          },
          {
            durée: "1 an",
            entreprise: "WebSoft",
            poste: "Développeur stagiaire",
          },
        ],
        poste: "Ingénieur logiciel",
      },
      autres_informations: {
        hobbies: ["Voyage", "Photographie", "Cuisine"],
        langues: ["Français", "Anglais"],
      },
      profil_social: {
        facebook: "https://www.facebook.com/jeandupont",
        linkedin: "https://www.linkedin.com/in/jeandupont",
        twitter: "https://twitter.com/jeandupont",
      },
    },
  });
});

router.get("/json", (req, res) => {
  res.json({
    path: "json",
    author: "Vianney Anibe",
  });
});

app.use("/.netlify/functions/api", route);
// app.use("/", router);

module.exports.handler = serverless(app);

// Connect to MongoDB
// const DATABASE_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const DATABASE_URL =
  "mongodb+srv://anibev3:k6WQS2aJQQlLQQjD@anibev3.xvcpn0e.mongodb.net/realEstate1?retryWrites=true&w=majority";
// const DATABASE = process.env.DB || "realEstate1";
const DATABASE = "realEstate1";

db(DATABASE_URL, DATABASE);
