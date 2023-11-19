import { productModel } from "../models/productModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

//Register new Product  ---- ADMIN

export const registerProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      inventory,
      ratings,
      images,
      reviews,
      numberOfReviews,
    } = req.body;

    if (!title || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Please provide required information" });
    }

    const product = new productModel({
      title,
      description,
      price,
      category,
      inventory,
      ratings,
      images,
      reviews,
      numberOfReviews,
    });

    await product.save();
    res.status(200).json({ message: "Product registered successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get all product's data   --- ADMIN

export const getAllProductsData = async (req, res) => {
  try {
    const productsPerPage = 5;
    const productCount = await productModel.countDocuments();
    const apiFeature = new ApiFeatures(productModel.find(), req.query)
      .search()
      .filter()
      .pagination(productsPerPage);
    const product = await apiFeature.query;
    let filteredProductsCount = product.length;
    if (!product) {
      return res.status(400).send("No product found");
    }
    return res
      .status(201)
      .json({ product, productCount, filteredProductsCount, productsPerPage });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//Search product by id

export const searchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//Update a product   --- ADMIN

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await productModel.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    return res
      .status(200)
      .json({ message: "Product successfully updated", product });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//Delete a product   ---- ADMIN

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await productModel.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    await productModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Review Product
export const reviewProduct = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.firstName + " " + req.user.lastName,
      rating: Number(rating),
      comment,
    };

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const isReviewed = product.reviews.find(
      (rev) => rev.user && rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user && rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      review: review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Reviews of a product
export const getProductReviews = async (req, res) => {
  try {
    const product = await productModel.findById(req.query.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const product = await productModel.findById(req.query.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numberOfReviews = reviews.length;

    await productModel.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numberOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
