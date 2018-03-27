import Ast, * as SimpleAST from "ts-simple-ast";
import * as ts from "typescript";
import { flatten, join } from "lodash";
import * as path from "path";
import { PropertyDetails, MethodDetails, HeritageClause } from "./interfaces";
import { templates }from "./templates";
import { download } from "./io";

export function emitSingleClass(name: string, properties: PropertyDetails[], methods: MethodDetails[]) {
    return templates.class(name, properties, methods);
}

export function emitSingleInterface(name: string, properties: PropertyDetails[], methods: MethodDetails[]) {
    return templates.interface(name, properties, methods);
}
  
export function emitHeritageClauses(heritageClauses: HeritageClause[]) {
    return heritageClauses.map((heritageClause) =>
        templates.implementsOrExtends(heritageClause.clause, heritageClause.className)
    );
}
