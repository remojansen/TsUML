import * as glob from "glob";
import * as request from "request";
import * as fs from "fs";

export async function findFilesByGlob(pattern: string) {
    return new Promise<string[]>((res, rej) => {
        glob(pattern, (err, files) => {
            if (err) {
                rej(err);
            } else {
                res(files);
            }
        });
    });
}

export async function download(dsl: string) {
    return new Promise<string>((resolve, reject) => {
        const url = "https://yuml.me/diagram/scruffy/class/";
        const options = {
            form: {
                dsl_text: dsl
            }
        };
        request.post(url, options, (err, res, body) => {
            if (err) {
                reject(err);
            }
            const svgFileName = body.replace(".png", ".svg");
            const diagramUrl = `${url}${svgFileName}`;
            resolve(diagramUrl);
        });
    });
};
