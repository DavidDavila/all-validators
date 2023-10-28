module.exports = {
  "roots": [
    "src"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!@toolz/allow)/"],
  testRegex: "(/src/.*\\.(spec))\\.(ts|js)$"
};