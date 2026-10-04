import * as assert from 'assert';
import * as vscode from 'vscode';
import { getFileName } from '../../extension';

suite('Web Extension Test Suite', () => {
	test('gets the final filename from a resource URI', () => {
		assert.strictEqual(getFileName(vscode.Uri.parse('file:///workspace/src/extension.ts')), 'extension.ts');
	});

	test('gets the final directory name when the URI ends with a slash', () => {
		assert.strictEqual(getFileName(vscode.Uri.parse('file:///workspace/src/')), 'src');
	});

	test('returns undefined when the URI has no filename', () => {
		assert.strictEqual(getFileName(undefined), undefined);
	});
});
