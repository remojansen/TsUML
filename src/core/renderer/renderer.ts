import * as request from "request";

function render(dsl: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        request.post(
            "http://yuml.me/diagram/plain/class/",
            { json: { dsl_text: dsl } },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(body);
                }
            }
        );
    });
}

export default render;
