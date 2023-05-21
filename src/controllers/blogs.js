import Blogs from "../models/Blogs.js";
import Joi from "joi";
/* A validation BlogSchema for the data that is being sent to the server. */
const BlogSchema = Joi.object({
  title: Joi.string().min(4).required(),
  author: Joi.string().required().min(6),
  body: Joi.string().required().min(10),
  date: Joi.date(),
});

const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const addBlog = async (req, res) => {
  try {
    await BlogSchema.validateAsync(req.body);
    const { title, author, date, body } = req.body;
    const newBlogData = { title, author, date, body };
    const newBlog = new Blogs(newBlogData);
    await newBlog.save();
    return res.status(201).send({
      messenger: "Thêm thành công",
      data: newBlog,
    });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const getOneBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blogs.findByIdAndRemove(id);
    if (blogs) {
      return res.status(200).send({
        messenger: "Xóa thành công",
      });
    } else {
      return res.status(500).send({
        messenger: "Không tìm thấy blog",
      });
    }
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    await BlogSchema.validateAsync(req.body);
    const { id } = req.params;

    const { title, author, body, date } = req.body;
    const newData = { title, author, body, date };
    // { title, author, body, date }
    await Blogs.findByIdAndUpdate(id, newData);
    return res.status(200).send({
      messenger: "Cập nhật thành công",
      data: newData,
    });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};
export { getAllBlog, addBlog, getOneBlog, deleteBlog, updateBlog };
