import * as request from "request";

const renderingService = "http://yuml.me/diagram/plain/class/";

function render(dsl: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        request.post(
            renderingService,
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
