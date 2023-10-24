"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// config/viewConfig.js
var require_viewConfig = __commonJS({
  "config/viewConfig.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var sourcePath = path.join(__dirname, "..", "src");
    module2.exports = {
      views: [
        path.join(sourcePath, "views"),
        path.join(sourcePath, "views", "pages")
      ],
      engine: "ejs",
      publicPath: path.join(sourcePath, "public")
    };
  }
});

// main.ts
var express = require("express");
require("dotenv").config();
var app = express();
var viewConfig = require_viewConfig();
app.set("views", viewConfig.views);
app.set("view engine", viewConfig.engine);
app.use(express.static(viewConfig.publicPath));
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
