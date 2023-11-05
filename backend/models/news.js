const mongoose = require("mongoose");
const newsSchema = mongoose.Schema({
  nameNews: String,
  descriptionNews: String,
  dateNews : Date,
  imgNews: String,

});
//affect newsSchema to News Model Name
const news= mongoose.model("News", newsSchema);
//export news
module.exports = news;