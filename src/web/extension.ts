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
	const disposableWithoutExtension = vscode.commands.registerCommand(
		'copy-file-name-faster.copyFileNameWithoutExtension',
		async (resourceUri: vscode.Uri | undefined) => {
			const fileName = getFileNameWithoutExtension(resourceUri);
			if (fileName) {
				await vscode.env.clipboard.writeText(fileName);
			}
		}
	);

	context.subscriptions.push(disposable, disposableWithoutExtension);
}

export function getFileName(resourceUri: vscode.Uri | undefined): string | undefined {
	const path = resourceUri?.path.replace(/\/+$/, '');
	return path?.split('/').pop() || undefined;
}

export function getFileNameWithoutExtension(resourceUri: vscode.Uri | undefined): string | undefined {
	const fileName = getFileName(resourceUri);
	if (!fileName) {
		return undefined;
	}

	const extensionIndex = fileName.lastIndexOf('.');
	return extensionIndex > 0 && extensionIndex < fileName.length - 1
		? fileName.slice(0, extensionIndex)
		: fileName;
}

export function deactivate() {}
