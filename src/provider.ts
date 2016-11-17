import * as vscode from "vscode";

const logo = "data:image/png;base64,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" +
"AAAElFTkSuQmCC";

class TsUMLProvider implements vscode.TextDocumentContentProvider {

    public static scheme = "tsuml";
    private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

    public provideTextDocumentContent(uri: vscode.Uri): string {
        let file = uri.query.split("file=")[1];
        return `<!DOCTYPE html>
                <html>
                    <head>
                        <style>
                            body {
                                background-color: #273746 !important;
                                padding: 5%;
                            }
                            .powered {
                                position: fixed;
                                bottom: 15px;
                                right: 25px;
                                color: #ffffff;
                                text-align: center;
                            }
                            .powered img {
                                width: 90px;
                                margin-top: -10px;
                            }
                        </style>
                    </head>
                    <body>
                        <img src="http://yuml.me/${file}"></div>
                        <div class="powered">
                            <p>Powered by</p>
                            <img src="${logo}"></img>
                        </div>
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
