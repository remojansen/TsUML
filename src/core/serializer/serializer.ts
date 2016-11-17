import interfaces from "../interfaces/interfaces";

function endFactory(separator: string, defaultSeparator = ``) {
    return (index: number, collection: any[]) => {
        let isLastElement = (index === (collection.length - 1));
        let end =  isLastElement ? defaultSeparator : `${separator}`;
        return end;
    };
}

let commaSparator = endFactory(",", "");

function serializeProps(propsDetails: interfaces.PropDetails[]) {
    return propsDetails.map((propDetails, index, arr) => {
        return `${propDetails.name}:${propDetails.type};`;
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
        return `${methodDetails.name}(${argsStr}):${methodDetails.returnType};`;
    }).reduce((prev, val) => prev + val, "");
}

function serializeClass(EntityDetails: interfaces.EntityDetails) {
    let props = serializeProps(EntityDetails.props);
    let methods = serializeMethods(EntityDetails.methods);
    return `[${EntityDetails.name}|${props}|${methods}{bg:steelblue}]\n`;
}

function serializeInterface(EntityDetails: interfaces.EntityDetails) {
    let props = serializeProps(EntityDetails.props);
    let methods = serializeMethods(EntityDetails.methods);
    return `[${EntityDetails.name}|${props}|${methods}{bg:wheat}]\n`;
}

function serializeAbstractClass(EntityDetails: interfaces.EntityDetails) {
    let props = serializeProps(EntityDetails.props);
    let methods = serializeMethods(EntityDetails.methods);
    return `[${EntityDetails.name}|${props}|${methods}{bg:plum}]\n`;
}

function serializeInheritanceRelationships(EntityDetails: interfaces.EntityDetails) {
    // TODO
    return "[CHILD]^-.-[PARENT]";
}

function serializeInterfaceInheritanceRelationships(EntityDetails: interfaces.EntityDetails) {
    // TODO
    return "[CHILD]^-[PARENT]";
}

function serializeCompositionRelationships(EntityDetails: interfaces.EntityDetails) {
    // TODO
    return "[CHILD]++-1>[PARENT]";
}

function serialize(entities: interfaces.EntityDetails[]) {

    // Add entitites
    let dsl = entities.map((entity) => {
        switch (entity.kind) {
            case "class":
                return serializeClass(entity);
            case "interface":
                return serializeInterface(entity);
            case "abstract_class":
                return serializeAbstractClass(entity);
            default:
                throw new Error("Entity Kind Not Supported!");
        }
    }).reduce((a, b) => `${a}${b}`, "").split("<").join("-").split(">").join("-");

    // Add relationships
    dsl += entities.map(serializeInheritanceRelationships).reduce((a, b) => `${a}${b}`, "");
    dsl += entities.map(serializeInterfaceInheritanceRelationships).reduce((a, b) => `${a}${b}`, "");
    dsl += entities.map(serializeCompositionRelationships).reduce((a, b) => `${a}${b}`, "");

    return `${dsl}`;
}

export default serialize;
