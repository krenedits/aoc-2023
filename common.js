const fs = require("fs");

const getData = (path) => {
  return fs.readFileSync(path, "utf8");
};

const getLines = (path) => {
  return getData(path)
    .split("\n")
    .filter((line) => line !== "");
};

module.exports = {
  getData,
  getLines,
};
