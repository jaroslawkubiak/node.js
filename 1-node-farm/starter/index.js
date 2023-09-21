const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////////////////
// WORKING WITH FILES
// // Blocking, synchronous way
// // read file
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// // write file
// const textOut = `This whaw we know about avocado : ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// // Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//   if (error) return console.log("error reading file");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n\n${data3}`, "utf-8", err => {
//         console.log("file has been written");
//       });
//     });
//   });
// });

// console.log("reading file...");

//////////////////////////////////////////////
// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(`${Date.now()} : ${req.url}`);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end(`This is a overview`);
  } else if (pathName === "/product") {
    res.end("<h2>This is a PRODUCT page</h2>");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello there",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("starting server.");
});
