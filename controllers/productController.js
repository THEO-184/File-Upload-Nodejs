const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
	const product = await Product.create(req.body);

	res.status(StatusCodes.OK).json({ product });
};

const getAllProducts = async (req, res) => {
	const products = await Product.find({});
	res
		.status(StatusCodes.OK)
		.json({ success: true, total: products.length, products });
};

module.exports = { createProduct, getAllProducts };