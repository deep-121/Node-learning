const math = require("./mathOperations");

console.log("Addition (5 + 3):", math.add(5, 3));
console.log("Subtraction (10 - 7):", math.subtract(10, 7));
console.log("Multiplication (4 * 6):", math.multiply(4, 6));
console.log("Division (20 / 5):", math.divide(20, 5));

try {
  console.log(math.divide(10, 0));
} catch (error) {
  console.error("Error:", error.message);
}
