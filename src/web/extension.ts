import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'copy-file-name-faster.copyFileName',
		async (resourceUri: vscode.Uri | undefined) => {
			const fileName = getFileName(resourceUri);
			if (fileName) {
				await vscode.env.clipboard.writeText(fileName);
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function getFileName(resourceUri: vscode.Uri | undefined): string | undefined {
	const path = resourceUri?.path.replace(/\/+$/, '');
	return path?.split('/').pop() || undefined;
}

export function deactivate() {}
