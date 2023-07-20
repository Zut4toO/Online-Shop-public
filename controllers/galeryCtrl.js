const Galery = require('../models/galeryModel');
const cloudinary = require('../utils/cloudinary');

const galeryCtrl = {
  getGaleries: async (req, res) => {
    try {
      // Try to find in DB
      const galeries = await Galery.find();
      res.json(galeries);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createGalery: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.CLIENT_URL}/galery`,
      });

      const image = result.secure_url;
      const cloudinary_id = result.public_id;

      try {
        const galery = await Galery.findOne({ image });
        if (galery)
          return res.status(400).json({ msg: 'Diese Bild existiert bereits' });

        const newGalery = new Galery({
          image,
          cloudinary_id,
        });
        await newGalery.save();
      } catch (mongoErr) {
        try {
          await cloudinary.uploader.destroy(cloudinary_id);
        } catch (imageDeleteError) {
          return res.status(500).json({ msg: imageDeleteError.message });
        }
        return res.status(500).json({ msg: mongoErr.message });
      }

      res.json({ msg: 'Bild erfolgreich hinzugefügt' });
    } catch (imageUploadError) {
      return res.status(500).json({ msg: imageUploadError.message });
    }
  },
  deleteGalery: async (req, res) => {
    try {
      let result = await Galery.findById({ _id: req.params.id });
      try {
        await cloudinary.uploader.destroy(result.cloudinary_id);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      try {
        await Galery.findByIdAndDelete(req.params.id);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      res.json({ msg: 'Bild erfolgreich gelöscht' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = galeryCtrl;
