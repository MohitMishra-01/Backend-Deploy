const Product = require("../models/Product")

const createFood = async (req, res) => {
    try {
        // const {title, desc, img, catagory, prices, extraOptions} = req.body;
        // const newFood = new Product({
        //     title,
        //     desc,
        //     img,
        //     catagory,
        //     prices,
        //     extraOptions,
        // });
        //  console.log(req.body);
         const newFood = new Product(req.body);
         const saveFood = newFood.save();
         res.status(200).json({
            message: "Food Successfully Add",
            successz: true,
            data:{
                food: saveFood,
            }
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};

const getFoodById = async (req, res) => {
    try {
        const {id} = req.params;
        const foodItems = await Product.findById(id);

         res.status(200).json({
            message: "Food Details",
            successz: true,
            data:{
                food: foodItems,
            }
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};

// const getAllFoods = async (req, res) => {
//     try {
//         const foodItems = await Product.find();

//          res.status(200).json({
//             message: "View Food Successfully",
//             successz: true,
//             data:{
//                 food: foodItems,
//             }
//          })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: "Internal Server Error",
//             success: false,
//         });
//     }
// };


const getAllFoods = async (req, res) => {
    try {
        const {catagory} = req.params;
        // console.log(catagory);
        if(catagory === "All"){

            const foodItems = await Product.find();
    
             res.status(200).json({
                message: "View Food Successfully",
                successz: true,
                data:{
                    food: foodItems,
                }
             })
        } else{
            const foodItems = await Product.find({ catagory: catagory});

            res.status(200).json({
                message: "View Food Successfully",
                successz: true,
                data:{
                    food: foodItems,
                }
             });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};


const updateProductImage = async (req, res) => {
    try {
        const { img, id } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found",
            });
        }
        // Update the product image
        product.img = img || product.img
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product image updated successfully",
            data: {
                product,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

module.exports = {createFood, getAllFoods, getFoodById, updateProductImage}












