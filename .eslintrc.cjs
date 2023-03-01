module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:typescript-sort-keys/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "simple-import-sort",
    "sonarjs",
    "typescript-sort-keys",
  ],
  rules: {
    "no-await-in-loop": "warn",
    "no-return-await": "warn",
    "react/jsx-sort-props": "warn",
    "react/sort-prop-types": "warn",
    "require-await": "warn",
    "simple-import-sort/imports": "warn",
    "sort-keys": "warn",
  },
  settings: { react: { version: "detect" } },
};
