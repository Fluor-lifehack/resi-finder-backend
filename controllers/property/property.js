const Property = require("../../model/schema/property");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Contact = require("../../model/schema/contact");
const Ville = require("../../model/urban/ville.model");
const Commune = require("../../model/urban/commune.model");

const index = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  console.log(` -- Start get all residences with query : ${query} -- `);
  // let result = await Property.find(query)
  let allData = await Property.find(query)
    .populate({
      path: "createBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .exec();
  console.log(` -- getting residences size: ${allData.length} -- `);

  const result = allData.filter((item) => item.createBy !== null);
  console.log(` -- getting residences after filter size: ${result.length} -- `);

  res.status(200).json({
    message: "Vos proprieté ont été récupéré avec succès",
    nbr: result.length,
    data: result,
  });
};

const add = async (req, res) => {
  try {
    const property = new Property(req.body);
    // ------------------------------------------------
    // // Vérifiez si le quartier existe déjà en base de données
    // let existingQuartier = await Quartier.findOne({ nom: quartier });

    // if (!existingQuartier) {
    // // Si le quartier n'existe pas, créez-en un nouveau
    // existingQuartier = await new Quartier({ nom: quartier }).save();
    // }

    // // Créez une nouvelle propriété avec les détails fournis
    // const property = new Property({
    // propertyType,
    // propertyAddress,
    // // ... (autres champs de la propriété)
    // ville: "ID_de_la_ville", // Remplacez par l'ID réel de la ville choisie
    // quartier: existingQuartier._id // Utilisez l'ID du quartier existant ou nouvellement créé
    // // ...
    // });
    // ------------------------------------------------
    await property.save();
    res.status(200).json({
      message: "Votre proprieté a été ajouté avec succès",
      data: property,
    });
  } catch (err) {
    console.error("Failed to create Property:", err);
    res.status(400).json({ error: "Failed to create Property" });
  }
};

const edit = async (req, res) => {
  try {
    let result = await Property.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to Update Property:", err);
    res.status(400).json({ error: "Failed to Update Property" });
  }
};

const view = async (req, res) => {
  const { id } = req.params;

  try {
    // Trouvez la propriété par ID
    const property = await Property.findOne({ _id: id });

    // Si aucune propriété n'est trouvée, renvoyez une erreur
    if (!property) return res.status(404).json({ message: "no Data Found." });

    // Trouvez tous les contacts filtrés par l'ID de la propriété
    const filteredContacts = await Contact.find({
      deleted: false,
      interestProperty: id,
    });

    // Trouvez les détails de la ville associée à cette propriété
    const villeDetails = await Ville.findOne({ _id: property.ville });

    // Trouvez les détails de la commune associée à cette propriété (si vous avez une référence de commune dans le modèle de
    //propriété)
    const communeDetails = await Commune.findOne({ _id: property.commune }); // Assurez-vous d'avoir une clé communeId dans
    //votre modèle Property

    // if (communeDetails && communeDetails.ville) {
    // const villeDetails_oh = await Ville.findOne({
    // _id: communeDetails.ville,
    // });
    // // console.log(villeDetails_oh);

    // // Intégrez les détails de la ville à l'intérieur de l'objet communeDetails
    // communeDetails.villeDetails = villeDetails_oh;
    // }
    // console.log(communeDetails);
    // Fusionnez les détails de la propriété avec les détails de la ville et de la commune
    const mergedData = {
      ...property._doc,
      villeDetails: villeDetails,
      communeDetails: communeDetails, // Ajoutez les détails de la commune à la propriété
    };

    // Renvoyer la réponse avec les détails fusionnés et les contacts
    res.status(200).json({ data: mergedData, filteredContacts });
  } catch (error) {
    // Si une erreur se produit, renvoyez une réponse d'erreur
    res.status(500).json({
      message: "Erreur lors de la récupération des données.",
      error: error.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, {
      deleted: true,
    });
    res.status(200).json({ message: "done", property });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

const deleteMany = async (req, res) => {
  try {
    const property = await Property.updateMany(
      { _id: { $in: req.body } },
      { $set: { deleted: true } }
    );
    res.status(200).json({ message: "done", property });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

// const storage = multer.diskStorage({
// destination: function (req, file, cb) {
// const uploadDir = 'uploads/Property/PropertyPhotos';
// fs.mkdirSync(uploadDir, { recursive: true });
// cb(null, uploadDir);
// },
// filename: function (req, file, cb) {
// const uploadDir = 'uploads/Property';
// const filePath = path.join(uploadDir, file.originalname);

// // Check if the file already exists in the destination directory
// if (fs.existsSync(filePath)) {
// // For example, you can append a timestamp to the filename to make it unique
// const timestamp = Date.now() + Math.floor(Math.random() * 90);
// cb(null, file.originalname.split('.')[0] + '-' + timestamp + '.' + file.originalname.split('.')[1]);
// } else {
// cb(null, file.originalname);
// }
// },
// });

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads/Property/PropertyPhotos";
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uploadDir = "uploads/Property/PropertyPhotos";
      const filePath = path.join(uploadDir, file.originalname);

      // Check if the file already exists in the destination directory
      if (fs.existsSync(filePath)) {
        // For example, you can append a timestamp to the filename to make it unique
        const timestamp = Date.now() + Math.floor(Math.random() * 90);
        cb(
          null,
          file.originalname.split(".")[0] +
            "-" +
            timestamp +
            "." +
            file.originalname.split(".")[1]
        );
      } else {
        cb(null, file.originalname);
      }
    },
  }),
});

const propertyPhoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      res.status(400).send("No files uploaded.");
      return;
    }
    const url = req.protocol + "://" + req.get("host");

    const file = req?.files.map((file) => ({
      img: `${url}/api/property/property-photos/${file.filename}`,
      createOn: new Date(),
    }));
    // Update the "photos" field for the existing document
    // await Property.updateOne({ _id: id }, { $set: { propertyPhotos: file } });
    await Property.updateOne(
      { _id: id },
      { $push: { propertyPhotos: { $each: file } } }
    );
    res.send("File uploaded successfully.");
  } catch (err) {
    console.error("Failed to create Property:", err);
    res.status(400).json({ error: "Failed to create Property" });
  }
};
// --
const virtualTours = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads/Property/virtual-tours-or-videos";
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uploadDir = "uploads/Property/virtual-tours-or-videos";
      const filePath = path.join(uploadDir, file.originalname);

      // Check if the file already exists in the destination directory
      if (fs.existsSync(filePath)) {
        // For example, you can append a timestamp to the filename to make it unique
        const timestamp = Date.now() + Math.floor(Math.random() * 90);
        cb(
          null,
          file.originalname.split(".")[0] +
            "-" +
            timestamp +
            "." +
            file.originalname.split(".")[1]
        );
      } else {
        cb(null, file.originalname);
      }
    },
  }),
});

const VirtualToursorVideos = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      res.status(400).send("No files uploaded.");
      return;
    }
    const url = req.protocol + "://" + req.get("host");

    const file = req?.files.map((file) => ({
      img: `${url}/api/property/virtual-tours-or-videos/${file.filename}`,
      createOn: new Date(),
    }));

    await Property.updateOne(
      { _id: id },
      { $push: { virtualToursOrVideos: { $each: file } } }
    );
    res.send("File uploaded successfully.");
  } catch (err) {
    console.error("Failed to create Property:", err);
    res.status(400).json({ error: "Failed to create Property" });
  }
};

const FloorPlansStorage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads/Property/floor-plans";
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uploadDir = "uploads/Property/floor-plans";
      const filePath = path.join(uploadDir, file.originalname);

      // Check if the file already exists in the destination directory
      if (fs.existsSync(filePath)) {
        // For example, you can append a timestamp to the filename to make it unique
        const timestamp = Date.now() + Math.floor(Math.random() * 90);
        cb(
          null,
          file.originalname.split(".")[0] +
            "-" +
            timestamp +
            "." +
            file.originalname.split(".")[1]
        );
      } else {
        cb(null, file.originalname);
      }
    },
  }),
});

const FloorPlans = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      res.status(400).send("No files uploaded.");
      return;
    }
    const url = req.protocol + "://" + req.get("host");

    const file = req?.files.map((file) => ({
      img: `${url}/api/property/floor-plans/${file.filename}`,
      createOn: new Date(),
    }));

    await Property.updateOne(
      { _id: id },
      { $push: { floorPlans: { $each: file } } }
    );
    res.send("File uploaded successfully.");
  } catch (err) {
    console.error("Failed to create Property:", err);
    res.status(400).json({ error: "Failed to create Property" });
  }
};
// --
const PropertyDocumentsStorage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads/Property/property-documents";
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uploadDir = "uploads/Property/property-documents";
      const filePath = path.join(uploadDir, file.originalname);

      // Check if the file already exists in the destination directory
      if (fs.existsSync(filePath)) {
        // For example, you can append a timestamp to the filename to make it unique
        const timestamp = Date.now() + Math.floor(Math.random() * 90);
        cb(
          null,
          file.originalname.split(".")[0] +
            "-" +
            timestamp +
            "." +
            file.originalname.split(".")[1]
        );
      } else {
        cb(null, file.originalname);
      }
    },
  }),
});

const PropertyDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      res.status(400).send("No files uploaded.");
      return;
    }
    const url = req.protocol + "://" + req.get("host");

    const file = req?.files.map((file) => ({
      filename: file.filename,
      img: `${url}/api/property/property-documents/${file.filename}`,
      createOn: new Date(),
    }));

    await Property.updateOne(
      { _id: id },
      { $push: { propertyDocuments: { $each: file } } }
    );
    res.send("File uploaded successfully.");
  } catch (err) {
    console.error("Failed to create Property:", err);
    res.status(400).json({ error: "Failed to create Property" });
  }
};

const getLatestProperty = async (req, res) => {
  try {
    // Utilisez la méthode find() de Mongoose pour récupérer les 3 dernières résidences ajoutées
    const residences = await Property.find({})
      .sort({ createdAt: -1 }) // Trier par ordre décroissant selon la date de création
      .limit(3); // Limiter à 3 résultats
    console.log(residences);
    res.status(200).json({
      success: true,
      count: residences.length,
      data: residences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des résidences",
      details: error.message,
    });
  }
};

const getSixLatestProperty = async (req, res) => {
  try {
    const residences = await Property.find({})
      .sort({ createdAt: -1 }) // Trier par ordre décroissant selon la date de création
      .limit(6); // Limiter à 3 résultats
    // Récupération des détails de la ville
    const cityIds = residences.map((property) => property.ville);
    const cities = await Ville.find({ _id: { $in: cityIds } }); // Supposons que Ville soit votre modèle de ville

    // Mapper les détails de la ville aux propriétés correspondantes
    const propertiesWithCityDetails = residences.map((property) => {
      const cityDetail = cities.find(
        (city) => city._id.toString() === property.ville.toString()
      );
      return {
        ...property.toJSON(),
        villeDetails: cityDetail, // Ajout des détails de la ville à chaque propriété
      };
    });

    res.status(200).json({
      success: true,
      count: propertiesWithCityDetails.length,
      data: propertiesWithCityDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des résidences",
      details: error.message,
    });
  }
};

const getFeaturedProperties = async (req, res) => {
  try {
    const featuredProperties = await Property.find({ featured: true });

    // Récupération des détails de la ville
    const cityIds = featuredProperties.map((property) => property.ville);
    const cities = await Ville.find({ _id: { $in: cityIds } }); // Supposons que Ville soit votre modèle de ville

    // Mapper les détails de la ville aux propriétés correspondantes
    const propertiesWithCityDetails = featuredProperties.map((property) => {
      const cityDetail = cities.find(
        (city) => city._id.toString() === property.ville.toString()
      );
      return {
        ...property.toJSON(),
        villeDetails: cityDetail, // Ajout des détails de la ville à chaque propriété
      };
    });

    res.status(200).json({
      success: true,
      count: propertiesWithCityDetails.length,
      data: propertiesWithCityDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des propriétés en vedette",
      details: error.message,
    });
  }
};

const getPropertiesByVille = async (req, res) => {
  try {
    // Récupérez toutes les villes
    const villes = await Ville.find();

    // Pour chaque ville, obtenez les détails des propriétés
    const data = await Promise.all(
      villes.map(async (ville) => {
        // Recherchez les propriétés liées à cette ville
        const properties = await Property.find({ ville: ville._id });

        // Retournez les détails formatés pour la ville
        return {
          nom: ville.nom,
          nombreDeproprieteDansLaVille: properties.length,
          descriptionDeLaVille: ville.description,
          image: ville.image, // Assurez-vous que ce champ existe dans votre modèle de ville
          properties: properties,
        };
      })
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des propriétés par ville",
      details: error.message,
    });
  }
};

const getRechercheResult = async (req, res) => {
  try {
    const { action, propertyType, rooms, bed, bath, price, superficie } =
      req.body;
    console.log(req.body);
    const query = {};

    if (action) query.action = action;
    if (propertyType) query.propertyType = propertyType;
    if (rooms) query.rooms = rooms;
    if (bed) query.numberofBedrooms = bed;
    if (bath) query.numberofBathrooms = bath;
    if (price) query.listingPrice = price;
    if (superficie) query.superficie = superficie;

    const properties = await Property.find(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erreur lors de la recherche des propriétés",
      details: error.message,
    });
  }
};

module.exports = {
  index,
  add,
  view,
  edit,
  deleteData,
  deleteMany,
  upload,
  propertyPhoto,
  virtualTours,
  VirtualToursorVideos,
  FloorPlansStorage,
  FloorPlans,
  PropertyDocumentsStorage,
  PropertyDocuments,
  getLatestProperty,
  getFeaturedProperties,
  getSixLatestProperty,
  getPropertiesByVille,
  getRechercheResult,
};
