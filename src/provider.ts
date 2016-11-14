import * as vscode from "vscode";

class TsUMLProvider implements vscode.TextDocumentContentProvider {

    static scheme = "tsuml";

    private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

    public provideTextDocumentContent(uri: vscode.Uri): string {
        let svg = uri.query.split("uml=")[1];
        return `<!DOCTYPE html><html><head></head><body>${svg}</body></html>`;
    }

    get onDidChange(): vscode.Event<vscode.Uri> {
        return this._onDidChange.event;
    }

    public update(uri: vscode.Uri) {
        this._onDidChange.fire(uri);
    }
}

export default TsUMLProvider;
