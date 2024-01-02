const Role = require("../../model/schema/role.model");

function initialRoles() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        const rolesToAdd = [
          { name: "admin" },
          { name: "agence" },
          { name: "agent" },
          { name: "user" },
        ];

        return Role.insertMany(rolesToAdd);
      }
    })
    .then(() => {
      console.log(`\n|-------> ✅ Added roles to roles collection`);
    })
    .catch((error) => {
      console.log(`\n|-------> ❌ Error initializing roles:`, error);
    });
}

module.exports = {
  initialRoles,
};
