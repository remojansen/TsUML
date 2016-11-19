import interfaces from "../interfaces/interfaces";

// DSL docs at http://yuml.me/

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

function serializeClass(entityDetails: interfaces.EntityDetails) {
    let props = serializeProps(entityDetails.props);
    let methods = serializeMethods(entityDetails.methods);
    return `[${entityDetails.name}|${props}|${methods}{bg:steelblue}],`;
}

function serializeInterface(entityDetails: interfaces.EntityDetails) {
    let props = serializeProps(entityDetails.props);
    let methods = serializeMethods(entityDetails.methods);
    return `[${entityDetails.name}|${props}|${methods}{bg:wheat}],`;
}

function serializeAbstractClass(entityDetails: interfaces.EntityDetails) {
    let props = serializeProps(entityDetails.props);
    let methods = serializeMethods(entityDetails.methods);
    return `[${entityDetails.name}|${props}|${methods}{bg:plum}],`;
}

function serializeInheritanceRelationships(entityDetails: interfaces.EntityDetails) {
    return  entityDetails.relationships
                .filter((relationship) => relationship.kind === "extension")
                .map((relationship) => `[${entityDetails.name}]^-[${relationship.link}],`);
}

function serializeInterfaceInheritanceRelationships(entityDetails: interfaces.EntityDetails) {
    return  entityDetails.relationships
                .filter((relationship) => relationship.kind === "implementation")
                .map((relationship) => `[${entityDetails.name}]^-.-[${relationship.link}],`);
}

function serializeCompositionRelationships(entityDetails: interfaces.EntityDetails) {
    return  entityDetails.relationships
                .filter((relationship) => relationship.kind === "composition")
                .map((relationship) => `[${entityDetails.name}]++-1>[${relationship.link}],`);
}

function serialize(entities: interfaces.EntityDetails[]) {

    // Add entitites
    let entitiesDsl = entities.map((entity) => {
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
    }).reduce((a, b) => `${a}${b}`, "")
      .split("=>").join("⇒")
      .split("<").join("◅")
      .split(">").join("▻");

    // Add relationships
    let extensionDsl = entities.map(serializeInheritanceRelationships).reduce((a, b) => `${a}${b}`, "");
    let implementationDsl = entities.map(serializeInterfaceInheritanceRelationships).reduce((a, b) => `${a}${b}`, "");
    let composedDsl = entities.map(serializeCompositionRelationships).reduce((a, b) => `${a}${b}`, "");

    let dsl = `
        ${entitiesDsl}
        ${extensionDsl}
        ${implementationDsl}
        ${composedDsl}
    `;

    return `${dsl}`;
}

export default serialize;
