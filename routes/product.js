const express = require("express");
const protect = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");
const { createFood, getAllFoods, getFoodById,updateProductImage} = require("../controllers/product");
router = express.Router();

router.post("/addfood/:email",protect, verifyAdmin, createFood) 
router.get("/getAllFood/:catagory", getAllFoods)
router.get("/getFood/:id", getFoodById)
router.put("/productImage/:email",protect, verifyAdmin, updateProductImage);

module.exports = router;