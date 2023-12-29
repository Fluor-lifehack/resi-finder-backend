const mongoose = require("mongoose");

const property = new mongoose.Schema({
  //1. basicPropertyInformation:
  propertyMainImage: String,
  propertyMainVideo: String,
  superficie: Number,
  mesure: {
    type: String,
    enum: ["m²", "km²"],
    default: "m²",
  },
  action: {
    type: String,
    enum: ["sale", "rent"],
    default: "sale",
  },
  actionDetail: {
    type: String,
    enum: ["For Sale", "For Rent"],
    default: "For Sale",
  },

  propertyTypeExtend: {
    type: String,
    enum: [
      "Apartment",
      "Family House",
      "Town House",
      "Cottage",
      "Condominium",
      "Duplexes",
      "Offices",
      "Town",
      "House",
      "Villa",
      "room",
    ],
    default: "Apartment",
  },
  propertyName: String,
  propertyType: String,
  propertyAddress: String,
  listingPrice: Number,
  garage: Number,
  halls: Number,
  squareFootage: Number,
  numberofBedrooms: Number,
  numberOfRooms: Number,
  numberofBathrooms: Number,
  yearBuilt: Number,
  propertyDescription: String,
  propertyLongDescription: String,
  //2. Property Features and Amenities:
  lotSize: String,
  parkingAvailability: String,
  appliancesIncluded: String,
  heatingAndCoolingSystems: String,
  flooringType: String,
  exteriorFeatures: String,
  communityAmenities: String,
  //3. Media and Visuals:
  propertyPhotos: [],
  virtualToursOrVideos: [],
  floorPlans: [],
  propertyDocuments: [],
  //4. Listing and Marketing Details:
  listingStatus: String,
  listingAgentOrTeam: String,
  listingDate: String,
  marketingDescription: String,
  multipleListingService: String,
  //5. Property History:
  previousOwners: Number,
  purchaseHistory: String,
  //6. Financial Information:
  propertyTaxes: String,
  homeownersAssociation: String,
  mortgageInformation: String,
  //7. Contacts Associated with Property:
  sellers: String,
  buyers: String,
  photo: String,
  propertyManagers: String,
  contractorsOrServiceProviders: String,
  //8. Property Notes and Comments:
  internalNotesOrComments: String,
  deleted: {
    type: Boolean,
    default: false,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //9. Custom Fields ====================================>
  visitStatus: {
    type: String,
    enum: ["en cours de visite", "non visité"],
    default: "non visité",
  },
  labels: {
    type: [String],
    enum: ["sale", "no visit fees", "open house", "sold", "in construction"],
    default: "sale",
  },
  numberOfVisits: {
    type: Number,
    default: 0,
  },
  propertyType: {
    type: String,
    enum: ["studio", "résidence meublée", "hôtel", "terrain", "duplex vide"],
    required: true,
  },
  propertyStatus: {
    type: String,
    enum: ["achat", "location"],
    required: true,
  },

  propertyCategory: {
    type: String,
    enum: ["immeuble", "hôtel", "terrain", "autre"],
    required: true,
  },
  rooms: [
    {
      numeroChambre: Number,
      typeChambre: {
        type: String,
        enum: [
          "chambre double",
          "chambre simple",
          "suite",
          "appartement",
          "studio",
          "autre",
        ],
        required: true,
      },
      connectivite: {
        wifiDisponible: Boolean,
        prisesProchesLit: Boolean,
      },
      eclairage: {
        typeEclairage: String,
        lampesChevet: Boolean,
      },
      rangement: {
        espacePlacard: Boolean,
        cintresDisponibles: Boolean,
      },
      climatisation: {
        typeSysteme: String,
        temperatureAjustable: Boolean,
      },
      securite: {
        serruresSecurisees: Boolean,
        coffreFortDisponible: Boolean,
      },
      insonorisation: {
        typeIsolation: String,
        niveauBruit: String,
      },
      vues: {
        orientation: String,
        typesDeVues: [String],
      },
      detailsPratiques: {
        espaceTravail: Boolean,
        miroirPleinLongueur: Boolean,
      },
      salleDeBain: {
        articlesToiletteFournis: Boolean,
        secheCheveuxDisponible: Boolean,
        miroirsGrossissants: Boolean,
      },
      accessoires: {
        televisionStreaming: Boolean,
        radioReveil: Boolean,
      },
      elementsDecoratifs: {
        artMural: Boolean,
        couleursRideaux: String,
      },
      // ... (autres détails que vous souhaitez ajouter)
    },
  ],

  ville: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ville", // Assurez-vous que c'est le bon nom de modèle
    required: true,
  },
  commune: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commune", // Assurez-vous que c'est le bon nom de modèle
    required: true,
  },

  // Référence à Quartier
  quartier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quartier", // Assurez-vous que c'est le bon nom de modèle
    // required: true
  },
  featured: {
    type: Boolean,
    default: false,
  },

  features: {
    freeWifi: {
      enabled: { type: Boolean, default: false },
      name: { type: String, default: "Free Wi-Fi" },
      iconClass: { type: String, default: "fa-wifi" },
    },
    elevatorLift: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fa-hands" },
      name: { type: String, default: "Elevator Lift" },
    },
    powerBackup: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fa-power-off" },
      name: { type: String, default: "Power Backup" },
    },
    laundryService: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fas fa-monument" },
      name: { type: String, default: "Laundry Service" },
    },
    securityGuard: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fa-user-shield" },
      name: { type: String, default: "Security Guard" },
    },
    cctv: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fas fa-video" },
      name: { type: String, default: "CCTV" },
    },
    emergencyExit: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fas fa-door-open" },
      name: { type: String, default: "Emergency Exit" },
    },
    doctorOnCall: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fas fa-first-aid" },
      name: { type: String, default: "Doctor On Call" },
    },
    shower: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fas fa-shower" },
      name: { type: String, default: "Shower" },
    },
    freeParking: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fa-car" },
      name: { type: String, default: "Free Parking in the Area" },
    },
    airConditioning: {
      enabled: { type: Boolean, default: false },
      iconClass: { type: String, default: "fa-fan" },
      name: { type: String, default: "Air Conditioning" },
    },
  },

  coordonne: {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("property", property);

// {
//   "typePropriete": "immeuble",
//   "informationsDeBase": {
//     "type": "residence meublée",
//     "adresse": "123 Rue des Châteaux",
//     "prix": "1000000 FCFA",
//     "superficie": "200 m²",
//     "nombreChambres": 10,
//     "nombreSallesDeBain": 5,
//     "anneeConstruction": 2020,
//     "description": "Une belle résidence meublée avec des chambres spacieuses et des équipements modernes."
//   },
//   "caracteristiques": {
//     "lotissement": "Quartier des Lumières",
//     "parking": "Oui",
//     "equipements": ["Climatisation", "Wi-Fi", "Piscine"]
//   },
//   "photos": [
//     "lienPhoto1.jpg",
//     "lienPhoto2.jpg"
//   ],
//   "chambres": [
//     {
//       "numeroChambre": 1,
//       "typeChambre": "chambre double",
//       "connectivite": {
//         "wifiDisponible": true,
//         "prisesProchesLit": true
//       },
//       "eclairage": {
//         "typeEclairage": "ambiance",
//         "lampesChevet": true
//       },
//       "rangement": {
//         "espacePlacard": true,
//         "cintresDisponibles": true
//       },
//       "climatisation": {
//         "typeSysteme": "central",
//         "temperatureAjustable": true
//       },
//       "securite": {
//         "serruresSecurisees": true,
//         "coffreFortDisponible": false
//       },
//       "insonorisation": {
//         "typeIsolation": "murs épais",
//         "niveauBruit": "faible"
//       },
//       "vues": {
//         "orientation": "sud",
//         "typesDeVues": ["ville", "jardin"]
//       },
//       "detailsPratiques": {
//         "espaceTravail": true,
//         "miroirPleinLongueur": true
//       },
//       "salleDeBain": {
//         "articlesToiletteFournis": true,
//         "secheCheveuxDisponible": true,
//         "miroirsGrossissants": false
//       },
//       "accessoires": {
//         "televisionStreaming": true,
//         "radioReveil": false
//       },
//       "elementsDecoratifs": {
//         "artMural": true,
//         "couleursRideaux": "bleu"
//       }
//     },
//     // ... Vous pouvez ajouter d'autres objets de chambre ici si nécessaire
//   ]
// }
