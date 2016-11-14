import * as ts from "typescript";
import parse from "./parser/parser";
import serialize from "./serializer/serializer";
import render from "./renderer/renderer";

function getDiagram(tsFilePaths: string[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
    
        if (tsFilePaths.length === 0) {
            reject("Missing input files!");
        }

        let options = {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS
        };

        let classesDetails = parse(tsFilePaths, options);
        let umlStr = classesDetails.map((classDetails) => serialize(classDetails)).reduce((p, c) => `${p}\n${c}`, "");

        render(umlStr).then((svg) => {
            resolve(svg);
        });

    });
}

export default getDiagram;
