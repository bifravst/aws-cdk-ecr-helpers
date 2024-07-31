import { createHash } from 'crypto'
import { createReadStream } from 'fs'

export const hashFile = async (file: string): Promise<string> => {
	const hash = createHash('md5')
	const content = createReadStream(file)

	return new Promise((resolve, reject) => {
		content.pipe(hash)
		content
			.on('close', () => {
				return resolve(hash.digest('hex'))
			})
			.on('error', (error) => {
				return reject(error)
			})
	})
}
