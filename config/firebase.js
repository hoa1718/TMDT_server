const key = require("../key.json");
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(key)
  });