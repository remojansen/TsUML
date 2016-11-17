import * as ts from "typescript";
import parse from "./parser/parser";
import serialize from "./serializer/serializer";
import render from "./renderer/renderer";

function getDiagram(tsFilePaths: string[]): Promise<string> {

    if (tsFilePaths.length === 0) {
        Promise.reject("Missing input files!");
    }

    let options = {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES5,
    };

    let entitiesDetails = parse(tsFilePaths, options);
    let dsl = serialize(entitiesDetails);

    return render(dsl);

}

export default getDiagram;
