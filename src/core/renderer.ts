import * as path from "path";
import { templates } from "./templates";
import { download } from "./io";

export function render(dsl: string) {
    return new Promise<string>((res, rej) => {
        const url = templates.url(dsl);
        const file = `uml_diagram_${new Date().getTime()}.png`;
        const absolutePath = path.join(__dirname, file);
        download(url, file, () => res(absolutePath));
    });
}
