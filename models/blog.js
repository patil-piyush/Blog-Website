const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subTitle: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    bannerImageURL: {
      type: String,
      required: true,
    },

    content: {
      type: Object, 
      required: true,
    },

    author: {
      type: String,
      default: 'Admin',
    },

    tags: {
      type: [String],
      default: [],
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Blog', blogSchema);
