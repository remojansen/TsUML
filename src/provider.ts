import * as vscode from "vscode";
import { getContent } from "./provider_content";

class TsUMLProvider implements vscode.TextDocumentContentProvider {

    public static scheme = "tsuml";
    private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

    public provideTextDocumentContent(uri: vscode.Uri): string {
        let file = uri.query.split("file=")[1];
        let url = `http://yuml.me/${file}`;
        return getContent(url);
    }

    get onDidChange(): vscode.Event<vscode.Uri> {
        return this._onDidChange.event;
    }

    public update(uri: vscode.Uri) {
        this._onDidChange.fire(uri);
    }
}

export default TsUMLProvider;
