import ModelProduct from "../models/products";
import ModelCategories from "../models/categories";
import Joi from "joi";
const productSchema = Joi.object({
  name: Joi.string().required().min(6),
  price: Joi.number().required(),
  description: Joi.string(),
  image: Joi.string(),
  categoryId: Joi.string().required(),
});
const getAllProduct = async (req, res) => {
  // const {
  //   _sort = "createAt",
  //   _order = "asc",
  //   _limit = 10,
  //   _page = 1,
  // } = req.query;
  // const options = {
  //   page: _page,
  //   limit: _limit,
  //   sort: {
  //     [_sort]: _order === "desc" ? -1 : 1,
  //   },
  // };
  try {
    const products = await ModelProduct.find().populate("categoryId");
    // const products = await ModelProduct.paginate({}, options);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};
const searchProduct = async (req, res) => {
  const { category, name } = req.query;
  console.log(req.query);
  const query = {};

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  try {
    const products = await ModelProduct.find(query);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const addProduct = async (req, res) => {
  try {
    const formData = req.body;
    await productSchema.validateAsync(req.body);
    const newProduct = new ModelProduct(formData);
    await newProduct.save();
    await ModelCategories.findByIdAndUpdate(newProduct.categoryId, {
      $addToSet: {
        products: newProduct._id,
      },
    });
    return res.status(201).send({
      messenger: "Thêm thành công",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ModelProduct.findById(id).populate("categoryId");
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ModelProduct.findByIdAndRemove(id);
    if (product) {
      return res.status(200).send({
        messenger: "Xóa thành công",
      });
    } else {
      return res.status(404).json({
        messenger: "Không tìm thấy product",
      });
    }
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const formData = req.body;
    await productSchema.validateAsync(req.body);
    const id = req.params.id;
    await ModelProduct.findByIdAndUpdate(id, formData, { new: true });
    return res.status(200).send({
      messenger: "Cập nhật thành công",
      data: formData,
    });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};
export {
  getAllProduct,
  addProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
};
