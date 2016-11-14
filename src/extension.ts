'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import getDiagram from "./core/index";
import TsUMLProvider from "./provider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // register content provider for scheme TsUMLProvider.scheme
    const provider = new TsUMLProvider();
    let registration = vscode.workspace.registerTextDocumentContentProvider(TsUMLProvider.scheme, provider);

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "tsuml" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // The code you place here will be executed every time your command is executed
    let disposable = vscode.commands.registerCommand('extension.tsuml', () => {

        // Files to be parsed and displayed in the class diagram
        let files = vscode.window.visibleTextEditors.map((editor) => {
            return editor.document.uri.path;
        });

        // Generate UML deagram for current source file
        getDiagram(files).then((svg) => {
            let data = encodeURIComponent(svg);
            let previewUri = vscode.Uri.parse(`${TsUMLProvider.scheme}://authority/${TsUMLProvider.scheme}?uml=${data}`);

            return vscode.commands.executeCommand(
                "vscode.previewHtml",
                previewUri,
                vscode.ViewColumn.Two
            ).then(s => console.log('done.'), vscode.window.showErrorMessage);


        }).catch((error) => {
            vscode.window.showErrorMessage(`${error}`);
        });

    });

    context.subscriptions.push(
        disposable
    );
}

export function deactivate() {
    // this method is called when your extension is deactivated
}