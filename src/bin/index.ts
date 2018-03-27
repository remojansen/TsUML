#! /usr/bin/env node

import chalk from "chalk";
import * as yargs from "yargs";
import { yUML } from "../core";
import { render } from "../core/renderer";

(async () => {

    try {

        if (yargs.argv.help) {
            console.log(chalk.yellowBright("tsuml --glob ./src/**/*.ts"));
        }

        const pattern = yargs.argv.glob;

        if (!pattern) {
            console.log(chalk.redBright("Missing --glob"));
        } else {
            const yuml = await yUML("./tsconfig.json", pattern);
            const path = await render(yuml, process.cwd());
            console.log(chalk.greenBright(`Saved UML diagram available at ${path}`));
        }

    } catch(e) {
        console.log(chalk.redBright(e));
    }

})();
