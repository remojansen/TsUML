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
    
    const className = classDeclaration.getSymbol()!.getName();
    const propertyDeclarations = classDeclaration.getProperties();
    const methodDeclarations = classDeclaration.getMethods();

    const properties = propertyDeclarations.map(property => {
        const sym = property.getSymbol();
        if (sym) {
            return {
                name: sym.getName()
            };
        }
    }).filter((p) => p !== undefined) as PropertyDetails[];

    const methods = methodDeclarations.map(method => {
        const sym = method.getSymbol();
        if (sym) {
            return {
                name: sym.getName()
            }
        }
    }).filter((p) => p !== undefined) as MethodDetails[];

    return { className, properties, methods };
}

export function parseInterfaces(interfaceDeclaration: SimpleAST.InterfaceDeclaration) {

    const interfaceName = interfaceDeclaration.getSymbol()!.getName();
    const propertyDeclarations = interfaceDeclaration.getProperties();
    const methodDeclarations = interfaceDeclaration.getMethods();
  
    const properties = propertyDeclarations.map(property => {
        const sym = property.getSymbol();
        if (sym) {
            return {
                name: sym.getName()
            }
        }
    }).filter((p) => p !== undefined) as PropertyDetails[];
  
    const methods = methodDeclarations.map(method => {
        const sym = method.getSymbol();
        if (sym) {
            return {
                name: sym.getName()
            }
        }
    }).filter((p) => p !== undefined) as MethodDetails[];
  
    return { interfaceName, properties, methods };
}

export function parseHeritageClauses(classDeclaration: SimpleAST.ClassDeclaration) {

    const className = classDeclaration.getSymbol()!.getName();
    const extended =  classDeclaration.getExtends();
    const implemented =  classDeclaration.getImplements();
    let heritageClauses: HeritageClause[] = [];

    if (extended) {
        const identifier = extended.getChildrenOfKind(ts.SyntaxKind.Identifier)[0];
        if (identifier) {
            const sym = identifier.getSymbol();
            if (sym) {
                heritageClauses.push(
                    {
                        clause: sym.getName(),
                        className
                    }
                );
            }
        }
    }

    if (implemented) {
        implemented.forEach(i => {
            const identifier = i.getChildrenOfKind(ts.SyntaxKind.Identifier)[0];
            if (identifier) {
                const sym = identifier.getSymbol();
                if (sym) {
                    heritageClauses.push(
                        {
                            clause: sym.getName(),
                            className
                        }
                    );
                }
            }
        });
    }

    return heritageClauses;
}

