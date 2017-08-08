import babel from "rollup-plugin-babel"
import babelrc from "babelrc-rollup"

const pkg = require("./package.json")
const external = Object.keys(pkg.dependencies)

export default {
  entry: "index.js",
  external: external,
  plugins: [babel(babelrc())],
  globals: {
    react: "React",
  },
  targets: [
    {
      dest: pkg.main,
      format: "umd",
      moduleName: "ReactJSONFetch",
    },
    {
      dest: pkg.module,
      format: "es",
    },
  ],
}
