// rollup.config.js

import typescript from "@rollup/plugin-typescript";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import resolve from "rollup-plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";

export default {
  input: "src/app.ts",

  output: {
    file: "./dist/app.js",
    format: "iife",
    name: "Eduardogame",
    sourcemap: true,
    intro: "var global = window;",
  },
  plugins: [
    typescript(),
    copy({
      targets: [
        { src: "src/index.html", dest: "dist" },
        { src: "src/assets", dest: "dist" },
      ],
    }),

    replace({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
      "typeof EXPERIMENTAL": JSON.stringify(true),
      "typeof PLUGIN_CAMERA3D": JSON.stringify(true),
      "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
      "typeof FEATURE_SOUND": JSON.stringify(true),
    }),
    resolve({
      extensions: [".ts", ".tsx"],
    }),
    commonjs(
      {
        include: ["node_modules/eventemitter3/**", "node_modules/phaser/**"],
        exclude: ["node_modules/phaser/src/polyfills/requestAnimationFrame.js"],
        sourceMap: true,
        ignoreGlobal: true,
      },
      uglify({
        mangle: false,
      })
    ),
    serve({
      open: true,
      contentBase: "dist",
      host: "localhost",
      port: 10001,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
  ],
};
