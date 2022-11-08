const key = require("../key.json");
const admin = require("firebase-admin");
const firebaseConfig = {
  apiKey: "AIzaSyBAkrAddi_HFxIh62Lb3ZCZm1EUSet0OVw",
  authDomain: "tmdt-21.firebaseapp.com",
  projectId: "tmdt-21",
  storageBucket: "tmdt-21.appspot.com",
  messagingSenderId: "738217066387",
  appId: "1:738217066387:web:74b3dc9eb900299b2bb266",
  measurementId: "G-PL8HLNBVWE",
};
const app= admin.initializeApp(firebaseConfig);

module.exports= {app}