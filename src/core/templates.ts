import { PropertyDetails, MethodDetails} from "./interfaces";

export const templates = {
    composition: "+->",
    implementsOrExtends: (abstraction: string, implementation: string) => {
        return (
        `${templates.plainClassOrInterface(abstraction)}` +
        `^-${templates.plainClassOrInterface(implementation)}`
        );
    },
    plainClassOrInterface: (name: string) => `[${name}]`,
    colorClass: (name: string) => `[${name}{bg:skyblue}]`,
    colorInterface: (name: string) => `[${name}{bg:palegreen}]`,
    class: (name: string, props: PropertyDetails[], methods: MethodDetails[]) => {
        const pTemplate = (property: PropertyDetails) => `${property.name};`;
        const mTemplate = (method: MethodDetails) => `${method.name}();`;
        return (
        `${templates.colorClass(name)}` +
        `[${name}|${props.map(pTemplate).join("")}|${methods.map(mTemplate).join("")}]`
        );
    },
    interface: (
        name: string,
        props: PropertyDetails[],
        methods: MethodDetails[]
    ) => {
        const pTemplate = (property: PropertyDetails) => `${property.name};`;
        const mTemplate = (method: MethodDetails) => `${method.name}();`;
        return (
        `${templates.colorInterface(name)}` +
        `[${name}|${props.map(pTemplate).join("")}|${methods.map(mTemplate).join("")}]`
        );
    }
};
