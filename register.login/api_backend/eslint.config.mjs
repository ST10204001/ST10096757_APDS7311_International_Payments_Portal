import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        require: "readonly", // Add require as a global
        process: "readonly", // If you use process
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "script", // Allow CommonJS syntax
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
