const cloudinary = require('cloudinary').v2;

/**
 * IMAGE UPLOAD FOR EDITOR.JS
 * Returns response in Editor.js format
 */
const uploadImageController = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: 0,
        message: 'Image is required',
      });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: 'editor_images',
    });

    res.json({
      success: 1,
      file: {
        url: result.secure_url,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: 'Image upload failed',
    });
  }
};

module.exports = {
  uploadImageController,
};
     