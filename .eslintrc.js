module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        'linebreak-style': 0,
        'no-use-before-define': 1,
        'no-underscore-dangle': 1,
        'consistent-return': 1,
        'no-bitwise': 0,
        'no-unused-expressions': 0,
        'newline-after-var': 2,
        'import/prefer-default-export': 0,
        'no-console': 0
    }
};