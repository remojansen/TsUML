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

export function download(uri: string, filename: string, callback: () => void) {
    request.head(uri, (err, res, body) => {
        request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", callback);
    });
};
