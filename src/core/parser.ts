import Ast, * as SimpleAST from "ts-simple-ast";
import * as ts from "typescript";
import { flatten, join } from "lodash";
import { PropertyDetails, MethodDetails, HeritageClause } from "./interfaces";

export function getAst(tsConfigPath: string, sourceFilesPaths?: string[]) {
    const ast = new Ast({
        tsConfigFilePath: tsConfigPath,
        addFilesFromTsConfig: !Array.isArray(sourceFilesPaths)
    });
    if (sourceFilesPaths) {
        ast.addExistingSourceFiles(sourceFilesPaths);
    }
    return ast;
}

export function parseClasses(classDeclaration: SimpleAST.ClassDeclaration) {
    
    const className = classDeclaration.getName();
    const propertyDeclarations = classDeclaration.getProperties();
    const methodDeclarations = classDeclaration.getMethods();

    const properties = propertyDeclarations.map(property => ({
        name: property.getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getFullText().trim()
    } as PropertyDetails));

    const methods = methodDeclarations.map(method => ({
        name: method.getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getFullText().trim()
    } as MethodDetails));

    return { className, properties, methods };
}

export function parseInterfaces(interfaceDeclaration: SimpleAST.InterfaceDeclaration) {

    const interfaceName = interfaceDeclaration.getName();
    const propertyDeclarations = interfaceDeclaration.getProperties();
    const methodDeclarations = interfaceDeclaration.getMethods();
  
    const properties = propertyDeclarations.map(property => ({
        name: property.getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getFullText().trim()
    } as PropertyDetails));
  
    const methods = methodDeclarations.map(method => ({
        name: method.getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getFullText().trim()
    } as MethodDetails));
  
    return { interfaceName, properties, methods };
}

export function parseHeritageClauses(classDeclaration: SimpleAST.ClassDeclaration) {

    const className = classDeclaration.getName();
    const heritageClauses = classDeclaration.getHeritageClauses();
  
    const implementsClauses = heritageClauses.map(heritageClause => {
      return flatten(
        heritageClause
          .getChildren()
          .map(ff => ff.getChildren().map(c => c.getFullText().trim()))
      );
    });
  
    const result = flatten(implementsClauses).map(
        clause => ({ clause, className }) as HeritageClause
    );

    return result;
}
