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

    export interface ClassDetails {
        name: string;
        props: PropDetails[];
        methods: MethodDetails[];
    }

}

export default interfaces;
 