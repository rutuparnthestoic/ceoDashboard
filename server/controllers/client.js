import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/user.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

//FUNCTION FOR GETTING PRODUCTS FROM DATABASE
export const getProducts = async (req,res) => {
    try{
        const products = await Product.find(); //Getting all the products
        const productsWithStats = await Promise.all( //Getting all the information for individual product
            products.map(async (product)=>{ //Loops through every product
                const stat = await ProductStat.find({ //Finds info for each of them from stat collection
                    productId: product._id 
                })
                return{ //Returns an array of objects in which each object has the product info with stats info.
                    ...product._doc,
                    stat,
                }
            })
        )

        res.status(200).json(productsWithStats);
    } catch(err) {
        res.status(400).json({ message: err.message});
    }
};


//FUNCTION FOR GETTING CUSTOMERS FROM DATABASE
export const getCustomers = async (req, res) => {
    try{
        const customers = await User.find({ role: 'user'}).select('-password'); //Finding all the customers i.e the people who have role of user. Without showing thier password.
        res.status(200).json(customers);
    } catch(err) {
        res.status(404).json({ message: err.message});
    }
}


//FUNCTION FOR GETTING TRANSACTIONS FROM DATABASE.
//This function is a little different. In this we do server side paging. That is sorting, searching the data table on the backend and then displaying it on frontend.
//This is useful when the amount of data is large enough such that we cannot sort it directly on frontend. 
export const getTransactions = async (req, res) => {
    try{
        const { page = 1, pageSize = 20, sort = null, search =''} = req.query;

        const generateSort = () => {
            const sortParsed = JSON.parse(sort)
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };

            return sortFormatted;
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                {cost : {$regex: new RegExp(search, "i")}},
                {userId: {$regex: new RegExp(search, "i")}}
            ],
        })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i"}
        });

        res.status(200).json({
            transactions,
            total,
        });

    } catch(err) {
        res.status(404).json({ message: err.message});
    }
}

//FUNCTION FOR GETTING GEO DATA FROM DATABASE
export const getGeography = async (req, res) => {
    try{
        const users = await User.find();

        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country);
            if(!acc[countryISO3]){
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return {id: country, value: count}
            })

        res.status(200).json(formattedLocations);
    } catch(err){
        res.status(404).json({ message: err.message});
    }
}