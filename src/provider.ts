import * as vscode from "vscode";

class TsUMLProvider implements vscode.TextDocumentContentProvider {

    public static scheme = "tsuml";
    private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

    public provideTextDocumentContent(uri: vscode.Uri): string {
        let file = uri.query.split("file=")[1];
        return `<!DOCTYPE html>
                <html>
                    <head></head>
                    <body>
                        <img src="http://yuml.me/${file}"></div>
                    </body>
                </html>`;
    }

    get onDidChange(): vscode.Event<vscode.Uri> {
        return this._onDidChange.event;
    }

    public update(uri: vscode.Uri) {
        this._onDidChange.fire(uri);
    }
}

export default TsUMLProvider;
