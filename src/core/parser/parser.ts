import * as ts from "typescript";
import interfaces from "../interfaces/interfaces";

function parse(fileNames: string[], options: ts.CompilerOptions): interfaces.EntityDetails[] {

    // Build a program using the set of root file names in fileNames
    let program = ts.createProgram(fileNames, options);

    // Get the checker, we will use it to find more about classes
    let checker = program.getTypeChecker();

    // The final result
    let output: interfaces.EntityDetails[] = [];

    //  visit nodes finding exported classes
    function visit(node: ts.Node) {

        // Only consider exported nodes
        if (!isNodeExported(node)) {
            return;
        }

        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            // This is a top level class, get its symbol
            let symbol = checker.getSymbolAtLocation((<ts.ClassDeclaration>node).name);
            output.push(serializeClass(symbol));
        } else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            ts.forEachChild(node, visit);
        }

    }

    // Serialize a class symbol infomration
    function serializeClass(symbol: ts.Symbol) {

        let EntityDetails: interfaces.EntityDetails = {
            kind: "class",
            methods: [],
            name: symbol.getName(),
            props: [],
        };

        EntityDetails.props = serializeProperties(symbol);
        EntityDetails.methods = serializeMethods(symbol);
        return EntityDetails;

    }

    function serializeProperties(symbol: ts.Symbol): interfaces.PropDetails[] {

        let props: interfaces.PropDetails[] = [];

        ts.forEachChild(symbol.valueDeclaration, (node) => {

            if (node.kind === ts.SyntaxKind.PropertyDeclaration) {

                let sym = checker.getSymbolAtLocation((<ts.PropertyDeclaration>node).name);
                let propertyType = checker.getTypeOfSymbolAtLocation(sym, sym.valueDeclaration);

                props.push({
                    name: sym.name,
                    type: checker.typeToString(propertyType)
                });

            }

        });

        return props;

    }

    function serializeMethods(symbol: ts.Symbol): interfaces.MethodDetails[] {

        let methods: interfaces.MethodDetails[] = [];

        ts.forEachChild(symbol.valueDeclaration, (node) => {

            if (node.kind === ts.SyntaxKind.MethodDeclaration) {

                let sym = checker.getSymbolAtLocation((<ts.MethodDeclaration>node).name);
                let methodType = checker.getTypeOfSymbolAtLocation(sym, sym.valueDeclaration);
                let methodSignature = methodType.getCallSignatures()[0];

                methods.push({
                    args: methodSignature.getParameters().map((parameter) => {
                        let parameterType = checker.getTypeOfSymbolAtLocation(parameter, parameter.valueDeclaration);
                        return {
                            name: parameter.getName(),
                            type: checker.typeToString(parameterType)
                        };
                    }),
                    name: sym.name,
                    returnType: checker.typeToString(methodSignature.getReturnType())
                });
            }

        });

        return methods;

    }

    // True if this is visible outside this file, false otherwise
    function isNodeExported(node: ts.Node): boolean {
        return (node.flags && ts.NodeFlags.Export) !== 0 ||
               (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    }

    // Visit every sourceFile in the program    
    for (const sourceFile of program.getSourceFiles()) {
        // Walk the tree to search for classes
        ts.forEachChild(sourceFile, visit);
    }

    return output;
}

export default parse;
