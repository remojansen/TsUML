import interfaces from "../interfaces/interfaces";
import * as http from "http";
import * as fs from "fs";
import * as nomnoml from "nomnoml";

function render(umlString: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        try {
            let svg = nomnoml.renderSvg(umlString);
            resolve(svg);
        } catch(e) {
            reject(e);
        }
    });
}

export default render;
