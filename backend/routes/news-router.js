// import express module
const express = require("express");
//importation du module multer pour lire les fichier(image,video,audio)
const multer = require("multer");
const fs = require("fs");
//import module path (sans installation)
const path = require("path");
// Model Importation
const News = require("../models/news");
//instance router ..
const router = express.Router();

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
//multer configuration : FileName and destination
const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images/imagesNews");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName =
      name + "-" + Date.now() + "-newsEduCenter-" + "." + extension;
    cb(null, imgName);
  },
});
// Business Logic : Get All News
router.get("/", (req, res) => {
  console.log("Here into BL : Business Logic : Get All News");
  News.find().then((docs) => {
    res.json({ allNews: docs });
  });
});
// Business Logic : Get News By ID
router.get("/getNewsById/:id", (req, res) => {
  console.log("Here into BL : Get News By ID");
  let id = req.params.id;
  News.findOne({ _id: id }).then((doc) => {
    res.json({ news: doc });
  });
});

// Business Logic : Add News
router.post(
  "/addNews",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    req.body.imgNews = `http://localhost:3000/images/imagesNews/${req.file.filename}`;
    const imgExtension = path.extname(req.file.originalname).toLowerCase();
    if (
      imgExtension === ".png" ||
      imgExtension === ".jpg" ||
      imgExtension === ".jpeg"
    ) {
      const news = new News({
        nameNews: req.body.nameNews,
        descriptionNews: req.body.descriptionNews,
        dateNews: req.body.dateNews,
        imgNews: req.body.imgNews,
      });
      news.save((err, doc) => {
        res.json({ message: "1" });
      });
    } else {
      // Format Image Not Compatible
      res.json({ message: "0" });
    }
  }
);
// Business Logic : Update News
router.put(
  "/editNews/:id",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    const updatedNews = {
      id: req.params.id,
      nameNews: req.body.nameNews,
      dateNews: req.body.dateNews,
      descriptionNews: req.body.descriptionNews,
      imgNews: req.file,
    };
    if (req.file) {
      updatedNews.imgNews = `http://localhost:3000/images/imagesNews/${req.file.filename}`;
    }

    News.updateOne({ _id: updatedNews.id }, updatedNews).then(
      (updateResult) => {
        updateResult.nModified
          ? res.json({ newsIsUpdated: true })
          : res.json({ newsIsUpdated: false });
      }
    );
  }
);
// Business Logic : Delete News by Id
router.delete("/deleteNews/:id", (req, res) => {
  const newsId = req.params.id;

  // Retrieve the News data to get the file name
  News.findById(newsId, (err , news) => {
    const fileName = path.basename(news.imgNews);
    const filePath = path.join(
      __dirname,
      "..",
      "images",
      "imagesNews",
      fileName
    );

    // Delete the news file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete course file" });
      }

      // Delete the news
      News.findByIdAndRemove(newsId, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to delete course" });
        }
        // News successfully deleted
        return res.json({ message: "1" });
      });
    });
  });
});

// make router impotable from another files
module.exports = router;
