module interfaces {

    export interface PropDetails {
        name: string;
        type: string;
    }

    export interface ArgDetails {
        name: string;
        type: string;
    }

    export interface MethodDetails {
        name: string;
        returnType: string;
        args: ArgDetails[];
    }

    export type EntityKind = "class" | "interface" | "abstract_class";

    export interface EntityDetails {
        kind: EntityKind;
        name: string;
        props: PropDetails[];
        methods: MethodDetails[];
    }

    export type EntityRelationshipKind = "implementation" | "extension" | "composition";

    export interface EntityRelationShip {
        kind: EntityRelationshipKind;
        left: EntityDetails;
        right: EntityDetails;
    }

}

export default interfaces;
