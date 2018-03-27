import * as fs from "fs";
import chalk from "chalk";
import { flatten, join } from "lodash";
import { findFilesByGlob } from "./io";
import { getAst, parseClasses, parseInterfaces, parseHeritageClauses } from "./parser";
import { emitSingleClass, emitSingleInterface, emitHeritageClauses } from "./emitter";
import { render } from "./renderer";

export async function yUML(tsConfigPath: string, pattern: string) {

  const sourceFilesPaths = await findFilesByGlob(pattern);

  console.log(
    chalk.yellowBright(
      "Matched files:\n" + sourceFilesPaths.reduce((p, c) => `${p}${c}\n`, "")
    )
  );

  const ast = getAst(tsConfigPath, sourceFilesPaths);
  const files = ast.getSourceFiles();

  // parser
  const declarations = files.map(f => {
    const classes = f.getClasses();
    const interfaces = f.getInterfaces();
    const path = f.getFilePath();
    return {
      fileName: path,
      classes: classes.map(parseClasses),
      heritageClauses: classes.map(parseHeritageClauses),
      interfaces: interfaces.map(parseInterfaces)
    };
  });

  // emitter
  const entities = declarations.map(d => {
    const classes = d.classes.map((c) => emitSingleClass(c.className, c.properties, c.methods));
    const interfaces = d.interfaces.map((i) => emitSingleInterface(i.interfaceName, i.properties, i.methods));
    const heritageClauses = d.heritageClauses.map(emitHeritageClauses);
    return [...classes, ...interfaces, ...heritageClauses];
  });

  return join(flatten(entities), ",");

}
