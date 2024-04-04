import {
	CreateRepositoryCommand,
	DescribeRepositoriesCommand,
	ECRClient,
	ImageTagMutability,
	RepositoryNotFoundException,
} from '@aws-sdk/client-ecr'

type logFn = (...args: string[]) => void

export type ContainerRepository = {
	uri: string
	name: string
}

export const repositoryName = ({
	stackName,
	id,
}: {
	stackName: string
	id: string
}): string => `${stackName}-${id}`

export const getOrCreateRepository =
	({ ecr }: { ecr: ECRClient }) =>
	async ({
		stackName,
		id,
		debug,
	}: {
		stackName: string
		id: string
		debug?: logFn
	}): Promise<ContainerRepository> => {
		const name = repositoryName({ stackName, id })
		try {
			const result = await ecr.send(
				new DescribeRepositoriesCommand({
					repositoryNames: [name],
				}),
			)
			const uri = result.repositories?.[0]?.repositoryUri ?? ''
			return {
				name,
				uri,
			}
		} catch (error) {
			if (error instanceof RepositoryNotFoundException) {
				debug?.(`Repository ${name} does not exist. Create a new repository.`)
				// Create a repository
				const result = await ecr.send(
					new CreateRepositoryCommand({
						repositoryName: name,
						imageTagMutability: ImageTagMutability.IMMUTABLE,
					}),
				)

				return {
					name,
					uri: result.repository?.repositoryUri ?? '',
				}
			} else {
				throw error
			}
		}
	}
