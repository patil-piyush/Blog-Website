const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

const createCommentController = async (req, res) => {
  try {
    const { blogId, name, email, content } = req.body;

    if (!blogId || !name || !email || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Ensure blog exists
    const blogExists = await Blog.findById(blogId);
    if (!blogExists) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const comment = await Comment.create({
      blogId,
      name,
      email,
      content,
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to add comment',
    });
  }
};


const getCommentsByBlogController = async (req, res) => {
    try {
      const { blogId } = req.params;
  
      const comments = await Comment.find({
        blogId,
        approved: true,
      }).sort({ createdAt: -1 });
  
      res.json({ comments });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch comments',
      });
    }
  };

  


  const deleteCommentController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleted = await Comment.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to delete comment',
      });
    }
  };
  
  module.exports = {
    createCommentController,
    getCommentsByBlogController,
    deleteCommentController,
  };
  

