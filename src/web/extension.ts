// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { flash, getEvalText } from "../utils";
import * as commands from "./webCsoundCommands";
import { CsoundWebviewViewProvider } from "./webviewCsound";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const csoundWebViewProvider = new CsoundWebviewViewProvider(
    context.extensionUri
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      CsoundWebviewViewProvider.viewType,
      csoundWebViewProvider
    )
  );

  const notYetImplementedForWeb = () => {
    vscode.window.showInformationMessage(
      "This command has not yet been reimplemented for the web."
    );
  };
  // play command
  const playCommand = vscode.commands.registerTextEditorCommand(
    "extension.csoundPlayActiveDocument",
    (textEditor: vscode.TextEditor) => {
      console.log(textEditor.document.uri.fsPath);
      csoundWebViewProvider.start();
    }
  );
  context.subscriptions.push(playCommand);

  const killCommand = vscode.commands.registerTextEditorCommand(
    "extension.csoundKillCsoundProcess",
    (textEditor: vscode.TextEditor) => {
      csoundWebViewProvider.stop();
    }
  );
  context.subscriptions.push(killCommand);

  const evalOrcCommand = vscode.commands.registerTextEditorCommand(
    "extension.csoundEvalOrc",
    (textEditor: vscode.TextEditor) => {
      const { text, from , to} = getEvalText(textEditor.document, textEditor.selection);
      csoundWebViewProvider.evalOrc(text);
      flash(textEditor, new vscode.Range(from, to));
    }
  );
  context.subscriptions.push(evalOrcCommand);

  const evalScoCommand = vscode.commands.registerTextEditorCommand(
    "extension.csoundEvalSco",
    notYetImplementedForWeb
  );
  context.subscriptions.push(evalScoCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
