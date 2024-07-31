import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { hashFile } from './hashFile.js'
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

void describe('hashFile', () => {
	void it('should calculate correct MD5 hash value for a file', async () => {
		const filePath = path.join(__dirname, 'test-folder', 'test.txt')
		const expectedMd5 = '35fd70b6138a64d64c376a6549d6bf57'
		const actualMd5 = await hashFile(filePath)
		assert.equal(actualMd5, expectedMd5)
	})
})
