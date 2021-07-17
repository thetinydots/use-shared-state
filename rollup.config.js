import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

export default [
  {
    input: "src/useSharedState.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [
      typescript({
        objectHashIgnoreUnknownHack: true,
        clean: true,
        tsconfigOverride: {
          compilerOptions: { declaration: true },
        },
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/useSharedState.d.ts",
    output: [
      {
        file: "dist/main.d.ts",
        format: "cjs",
      },
    ],
    plugins: [dts()],
  },
];
