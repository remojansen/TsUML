import * as ts from "typescript";
import * as fs from "fs";
import interfaces from "../interfaces/interfaces";

function endFactory(separator: string, defaultSeparator: string = ``) {
    return (index: number, collection: any[]) => {
        let isLastElement = (index === (collection.length - 1));
        let end =  isLastElement ? defaultSeparator : `${separator}`;
        return end;
    };
}

let commaSparator = endFactory(",", "");
let semicolonSeparator = endFactory(";");

function serializeProps(propsDetails: interfaces.PropDetails[]) {
    return propsDetails.map((propDetails, index, arr) => {
        let end =  semicolonSeparator(index, arr);
        return `${propDetails.name}:${propDetails.type}${end}`;
    }).reduce((prev, val) => prev + val, "");
}

function serializeArgs(argsDetails: interfaces.ArgDetails[]) {
    return argsDetails.map((argDetails, index, arr) => {
        let end = commaSparator(index, arr);
        return `${argDetails.name}:${argDetails.type}${end}`;
    }).reduce((prev, val) => prev + val, "");
}

function serializeMethods(methodsDetails: interfaces.MethodDetails[]) {
    return methodsDetails.map((methodDetails, index, arr) => {
        let argsStr = serializeArgs(methodDetails.args);
        let end =  semicolonSeparator(index, arr);
        return `${methodDetails.name}(${argsStr}):${methodDetails.returnType}${end}`;
    }).reduce((prev, val) => prev + val, "");
}

function serialize(classDetails: interfaces.ClassDetails) {
    let props = serializeProps(classDetails.props);
    let methods = serializeMethods(classDetails.methods);
    let result = `[${classDetails.name}|${props}|${methods}]\n`;
    return result;
}

export default serialize;
