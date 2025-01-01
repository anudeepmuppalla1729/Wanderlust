const { request } = require("express");

// Enum categories
const categories = ["trending", "rooms", "iconic_cities", "mountains", "castles", "pools", "camps", "farms", "arctic"];

// Sample data array (replace this with your actual data array)
const data = require("./init/data.js");

// Function to add random categories
data.forEach(item => {
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  item.category = randomCategory;
});

console.log(data);
