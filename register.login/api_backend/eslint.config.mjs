import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        require: "readonly", // Allow 'require' as a global
        process: "readonly", // Allow 'process' as a global
      },
      parserOptions: {
        ecmaVersion: 12, // Use ECMAScript 2021
        sourceType: "script", // Allow CommonJS syntax
      },
      settings: {
        react: {
          version: "detect", // Automatically detect React version
        },
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];