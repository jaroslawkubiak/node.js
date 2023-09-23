const fs = require('fs');
const superagent = require('superagent');

// one way - "using" callback hell :)
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent.get(`http://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
//     if (err) return console.log(err.message);
//     console.log(res.body.message);

//     fs.writeFile('dog-img.txt', res.body.message, err => {
//       console.log('Random dog save to file');
//     });
//   });
// });

// second way - using promise
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`http://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('Random dog save to file');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// third way - building promise
// read file promise
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('I could not find that file 😐');
      resolve(data);
    });
  });
};

// write file promise
const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Nie udało się zapisać pliku');
      resolve('Succes');
    });
  });
};

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((result) => {
//     console.log(`Breed: ${result}`);
//     return superagent.get(`http://dog.ceo/api/breed/${result}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePromise('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog save to file');
//   })
//   .catch((err) => {
//     console.log('BŁĄD: ', err);
//   });

// fourth way, using async await
const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `http://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise('dog-img.txt', res.body.message);
    console.log('Random dog save to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: Ready!';
};

(async () => {
  try {
    console.log('1: will get doc pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: done');
  } catch (err) {
    console.log('ERROR 🔥');
  }
})();

// console.log('1: will get doc pics');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3: done');
//   })
//   .catch((err) => {
//     console.log('ERROR 🔥');
//   });
