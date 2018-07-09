module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ],
  "globals": {
    "localStorage": true,
    "window": true,
    "document": true,
  },
  "rules": {
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "camelcase": "off",
    "no-useless-constructor": "off",
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "max-len": "off",
  }
};