const fs = require("fs");

// Blocking, synchronous way
// read file
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
// write file
const textOut = `This whaw we know about avocado : ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

// Non-blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
  if (error) return console.log("error reading file");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n\n${data3}`, "utf-8", err => {
        console.log("file has been written");
      });
    });
  });
});

console.log("reading file...");
