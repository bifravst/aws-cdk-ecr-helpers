import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { hashFolder } from './hashFolder.js'
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

void describe('hashFolder', () => {
	void it('should calculate correct MD5 hash value for folder with files', async () => {
		const folderPath = path.join(__dirname, 'test-folder')
		const expectedMd5 = '2446ef9dbaecdce8dbf59fdfb68b0f81'
		const actualMd5 = await hashFolder(folderPath)
		assert.equal(actualMd5, expectedMd5)
	})
})
