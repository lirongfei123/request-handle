import typescript from 'rollup-plugin-typescript';
import tslint from "rollup-plugin-tslint";
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: "src/index.ts",
    output: {
        file: "dist/main.js",
        format: "cjs"
    },
    external: [ 'axios', 'qs'],
    plugins: [
        commonjs({
            // namedExports: {
            //     'prop-checks': [ 'checkPropTypes' ]
            // }
        }),
        tslint({}),
        typescript(),
        uglify()
    ]
};








