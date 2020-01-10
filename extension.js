// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode'),
	opener = require('opn');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('mazz.previewInBrowser', function (e) {
    let preferences = vscode.workspace.getConfiguration('preview-in-browser');

    const default_prefs = {
      domain: null,
      browser:null,
      removeStartString:""
    };

    preferences = Object.assign(default_prefs, preferences);

    //console.log( preferences );
    //console.log(  vscode.workspace.workspaceFolders[0].uri.path );

    const domain = preferences.get('domain'),
      browser = preferences.get('browser'),
      removeStartString = preferences.get('removeStartString'),
      workspacePath = vscode.workspace.workspaceFolders[0].uri.path;

    let fileUrl = e.path;
    if(workspacePath && domain) {
        fileUrl = fileUrl.replace(workspacePath + removeStartString, domain +'/')
          .replace(/\/+/g, '/');
    }


    // console.log('e.path: ' + e.path );
    // console.log('fileUrl: ' + fileUrl );
    // console.log('domain: ' + domain );
    // console.log('browser: ' + browser );
    // console.log('removeStartString: ' + removeStartString );
    // console.log('workspacePath: ' + workspacePath );


    opener(fileUrl, browser? {app: browser} : {} );
});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}