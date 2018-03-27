import { PropertyDetails, MethodDetails} from "./interfaces";

export const templates = {
    url: (dsl: string) => `http://yuml.me/diagram/scruffy/class/${dsl}`,
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
        `[${name}|${props.map(pTemplate)}|${methods.map(mTemplate)}]`
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
        `[${name}|${props.map(pTemplate)}|${methods.map(mTemplate)}]`
        );
    }
};
