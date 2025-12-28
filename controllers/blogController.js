const Blog = require('../models/Blog');
const slugify = require('slugify');

const createBlogController = async (req, res) => {
    try {
        const { title, subTitle, bannerImageURL, content, tags } = req.body;

        if (!title || !bannerImageURL || !content) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const slug = slugify(title, { lower: true, strict: true });

        const existing = await Blog.findOne({ slug });
        if (existing) {
            return res.status(409).json({ message: 'Blog with same title exists' });
        }

        const blog = await Blog.create({
            title,
            subTitle,
            slug,
            bannerImageURL, // already uploaded
            content,        // Editor.js JSON
            tags,
        });

        res.status(201).json({
            message: 'Blog created successfully',
            blog,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating blog',
            error: error.message,
        });
    }
};




const editBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subTitle, content, bannerImageURL, tags, published } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Update slug only if title changes
        if (title && title !== blog.title) {
            const newSlug = slugify(title, { lower: true, strict: true });

            const exists = await Blog.findOne({ slug: newSlug, _id: { $ne: id } });
            if (exists) {
                return res.status(409).json({ message: 'Blog with same title exists' });
            }

            blog.title = title;
            blog.slug = newSlug;
        }

        blog.subTitle = subTitle ?? blog.subTitle;
        blog.content = content ?? blog.content;
        blog.bannerImageURL = bannerImageURL ?? blog.bannerImageURL;
        blog.tags = tags ?? blog.tags;
        blog.published = published ?? blog.published;

        await blog.save();

        res.json({ message: 'Blog updated successfully', blog });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating blog',
            error: error.message,
        });
    }
};




const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting blog',
            error: error.message,
        });
    }
};



// GET ALL BLOGS (PUBLIC)
const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true })
            .select('title subTitle slug bannerImageURL createdAt')
            .sort({ createdAt: -1 });

        res.json({ blogs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};


//  GET SINGLE BLOG BY SLUG (PUBLIC)

const getBlogBySlugController = async (req, res) => {
    try {
        const { slug } = req.params;

        const blog = await Blog.findOne({ slug, published: true });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({ blog });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
};




module.exports = {
    createBlogController,
    editBlogController,
    deleteBlogController,
    getAllBlogsController,
    getBlogBySlugController,
};
