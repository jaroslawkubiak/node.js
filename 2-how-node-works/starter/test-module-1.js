// one way
// class Calculator {
//   add(a, b) {
//     return a + b;
//   }
//   multiply(a, b) {
//     return a * b;
//   }
// }
// module.exports = Calculator;

// second way
module.exports = class {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }
};
