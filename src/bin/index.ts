#! /usr/bin/env node

import chalk from "chalk";
import * as yargs from "yargs";
import { yUML } from "../core";
import { render } from "../core/renderer";

(async () => {

    try {

        if (yargs.argv.h) {
            console.log(chalk.yellowBright("ts-uml --glob ./src/**/*.ts"));
        }

        const pattern = yargs.argv.glob;

        if (!pattern) {
            console.log(chalk.redBright("Missing --glob"));
        } else {
            const yuml = await yUML("./tsconfig.json", pattern);
            const path = await render(yuml);
            console.log(chalk.greenBright(`Saved UML diagram available at ${path}`));
        }

    } catch(e) {
        console.log(chalk.redBright(e));
    }

})();
