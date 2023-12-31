const Role = require("../../model/schema/role.model");

function initialRoles() {
  console.log("\nOn est dans la fonction initRole\n");
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "patient",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'patient' to roles collection");
      });

      new Role({
        name: "assistant",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'assistant' to roles collection");
      });

      new Role({
        name: "chief_medecin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'chief_medecin' to roles collection");
      });
    }
  });
}

module.exports = {
  initialRoles,
};
