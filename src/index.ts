#! /usr/bin/env node
import inquirer from 'inquirer';
import { Octokit } from 'octokit';

const answers = (await inquirer.prompt([
	{
		name: 'username',
		message: 'Your username: ',
	},
	{
		name: 'repo',
		message: 'ID of the repository: ',
	},
	{
		name: 'token',
		message: 'Github access token (must have repo_deployment privilege): ',
		type: 'password',
	},
])) as Partial<{
	username: string;
	repo: string;
	token: string;
}>;

try {
	const octokit = new Octokit({
		auth: answers.token ?? '',
	});
	const octokitConf = {
		owner: answers.username ?? '',
		repo: answers.repo ?? '',
	};

	const deployments = await octokit.request(
		'GET /repos/{owner}/{repo}/deployments',
		octokitConf
	);
	const deploymentIds = deployments.data.map((value) => value.id);

	if (deploymentIds.length <= 0) {
		throw new Error('No deployment found.');
	}

	deploymentIds.forEach(async (deployment) => {
		await octokit.request(
			`DELETE /repos/{owner}/{repo}/deployments/${deployment}`,
			octokitConf
		);
	});
} catch (err) {
	let errorMessage = '❌ Something unexpected happend.';

	if (err instanceof Error) {
		errorMessage = `❌ ${err.message}`;
	}

	console.log(errorMessage);
	process.exit(1);
}
