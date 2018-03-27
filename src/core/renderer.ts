import * as path from "path";
import { templates } from "./templates";
import { download } from "./io";

export function render(dsl: string, rootPath: string) {
    return new Promise<string>((res, rej) => {
        const url = templates.url(dsl);
        const file = `uml_diagram_${new Date().getTime()}.png`;
        const absolutePath = path.join(rootPath, file);
        download(url, file, () => res(absolutePath));
    });
}
