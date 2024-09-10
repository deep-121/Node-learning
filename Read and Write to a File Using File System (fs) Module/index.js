const fs = require("fs");
const filePath = "input.txt";

const readFile = (message) =>
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.error("Error reading the file:", err);
    }
    console.log(message);
    console.log(data);
  });

readFile("Before appending:");

fs.appendFile(filePath, "\nHello, Node!", (err) => {
  if (err) {
    return console.error("Error appending to the file:", err);
  }
  readFile("After appending:");
});
