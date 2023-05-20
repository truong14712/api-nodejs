import mongoose from "mongoose";
const { Schema } = mongoose;

/* This is creating a new schema for the blog. */
const blogSchema = new Schema({
  title: {
    type: String,
    require: true,
    minLength: 4,
  },
  author: {
    type: String,
    require: true,
    minLength: 6,
  },
  body: {
    type: String,
    require: true,
    minLength: 10,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("blogs", blogSchema);
