import cloudinary from "../libs/cloudinary.js";
import { redis } from "../libs/redis.js";
import Product from "../models/product.model.js";

export const handleGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.log("Error in handleGetAllProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const handleFeaturedProducts = async (req, res) => {
  try {
    // check if anyting stored in redis if yes, then return them
    let featuredProducts = await redis.get("featuredProducts");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis, fetch from mongoDB
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featuredProducts", JSON.stringify(featuredProducts));

    return res.json(featuredProducts);
  } catch (error) {
    console.log("Error in handleFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const handleCreateProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in handleCreateProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const handleDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloduinary");
      } catch (error) {
        console.log("error deleting image from cloduinary", error);
      }
    }

    await Product.findByIdAndDelete(product);

    // if this is a featured product delete from redis also
    // if(product.isFeatured) {
    //     await redis.del(`featuredProducts:${}`);
    // }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in handleDeleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const handleRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error in handleRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const handleGetProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log(
      "Error in handleGetProductsByCategory controller",
      error.message
    );
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const handleToggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(
      "Error in handleToggleFeaturedProduct controller",
      error.message
    );
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateFeaturedProductsCache = async () => {
  try {
    // The lean() method  is used to return plain JavaScript objects
    // instead of full Mongoose documents. This can significantly improve performance

    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("error in update cache function");
  }
};
