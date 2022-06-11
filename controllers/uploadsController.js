const path = require("path");
const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
	// check if no file is uploaded
	if (!req.files) {
		throw new BadRequestError("please select image to upload");
	}
	const productImg = req.files.image;
	// check file type
	if (!productImg.mimetype.startsWith("image")) {
		throw new BadRequestError("please choose an image file type");
	}

	const maxSize = 1024 * 1024;

	if (productImg.size > maxSize) {
		throw new BadRequestError("Image size should be maximum 1KB");
	}
	//
	// file path
	const imgPath = path.join(
		__dirname,
		"../public/uploads/" + `${productImg.name}`
	);
	await productImg.mv(imgPath);
	res
		.status(StatusCodes.OK)
		.json({ image: { src: `/uploads/${productImg.name}` } });
};

const uploadProductImage = async (req, res) => {
	// check if no file is uploaded
	if (!req.files) {
		throw new BadRequestError("please select image to upload");
	}
	const productImg = req.files.image;
	// check file type
	if (!productImg.mimetype.startsWith("image")) {
		throw new BadRequestError("please choose an image file type");
	}

	const maxSize = 1024 * 1024;

	if (productImg.size > maxSize) {
		throw new BadRequestError("Image size should be maximum 1KB");
	}
	const result = await cloudinary.uploader.upload(
		req.files.image.tempFilePath,
		{
			use_filename: true,
			folder: "file-upload",
		}
	);

	fs.unlinkSync(req.files.image.tempFilePath);

	res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
