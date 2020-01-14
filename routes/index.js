const path = require("path");
const router = require("express").Router();

const axios = require("axios");
const cheerio = require("cheerio");

// route for scraping
router.route("/techcrunch")
  .get((req, res) => {

    axios.get("https://techcrunch.com/").then((response) => {
      let result = [];
      const $ = cheerio.load(response.data);

      $(".post-block__header").each(function (i, element) {
        result.push({
          title: $(this).children().children().text().replace(/[\t\n]/g, "").trim(),
          link: $(this).children().children().attr("href"),
          content: $(this).siblings(".post-block__content").text().replace(/\t|\n/g, "").concat("..."),
          image: $(this).siblings("footer.post-block__footer").children("figure").children("a").children("img").attr("src"),
        });
      });

      res.json(result);
      console.log(result);

    });
  });

router.route("/tnw")
  .get((req, res) => {

    axios.get("https://thenextweb.com/latest/").then((response) => {
      let result = [];
      const $ = cheerio.load(response.data);

      $(".story").each(function (i, element) {
        result.push({
          title: $(this).children().children().children("a").text().trim(),
          link: $(this).children("a").attr("href"),
          content: $(this).children().children().text().concat("..."),
          image: $(this).children("a").attr("data-src"),
        });
      });

      res.json(result);
      console.log(result);

    });
  });

router.route("/wired")
  .get((req, res) => {

    axios.get("https://www.wired.com/search/?q=tech&page=1&sort=publishDate_tdt%20desc").then((response) => {
      let result = [];
      const $ = cheerio.load(response.data);

      $(".archive-item-component").each(function (i, element) {
        result.push({
          title: $(this).children().children("a").children("h2").text().trim(),
          link: `https://www.wired.com` + $(this).children("a").attr("href"),
          content: $(this).children().children("a").children("p").text().concat("..."),
          image: $(this).children().children().children().children().children().children("img").attr("srcset").split(" ")[8],
        });
      });

      res.json(result);
      console.log(result);

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