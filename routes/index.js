const path = require("path");
const router = require("express").Router();

const axios = require("axios");
const cheerio = require("cheerio");

// route for scraping
router.route("/techcrunch")
  .get((req, res) => {

    axios.get("https://techcrunch.com/").then((response) => {
      let result = {};
      const $ = cheerio.load(response.data);

      $(".post-block__header").each(function (i, element) {
        result.title = $(this).children().children().text().replace(/\t|\n/g, "").trim();
        result.link = $(this).children().children().attr("href");
        result.content = $(this).siblings(".post-block__content").text().replace(/\t|\n/g, "").concat("...");
        result.image = $(this).siblings("footer.post-block__footer").children("figure").children("a").children("img").attr("src");
      });

      res.json(result);
    });
  });

// route for saving an article to database

// router.route("/article")
//   .post(func);

// route for dealing with saved articles

// router.route("/saved-article")
//   .get(func2)
//   .delete(func3);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// send every other request to the react app

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

module.exports = router;