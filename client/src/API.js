import axios from "axios";

export default {
  scrapeArticles: function (website) {
    return axios.get("/" + website);
  },
  // saveArticles: function () {

  // },
  // getSavedArticles: function () {

  // },
  // deleteArticle: function () {

  // }

};