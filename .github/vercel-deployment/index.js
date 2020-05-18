const axios = require('axios');
const { stripIndents } = require('common-tags');
const core = require('@actions/core');
const github = require('@actions/github');
const { execSync } = require('child_process');
const exec = require('@actions/exec');

const context = github.context;

const vercelToken = core.getInput('vercel-token');
const vercelTeamId = core.getInput('vercel-team-id');
const nowArgs = core.getInput('now-args');
const githubToken = core.getInput('github-token');
const githubDeployment = core.getInput('github-deployment');

const vercelAPIClient = axios.create({
  baseURL: 'https://api.zeit.co',
  headers: {
    Authorization: `Bearer ${vercelToken}`,
  },
  params: {
    teamId: vercelTeamId || undefined,
  },
});

const octokit = new github.GitHub(githubToken);

async function run() {
  await nowDeploy();
  // Disable commenting functionality for now. This have to work on push with pull_requests
  // if (context.issue.number) {
  //   core.info('this is related issue or pull_request ');
  //   await createCommentOnPullRequest();
  // } else if (context.eventName === 'push') {
  //   core.info('this is push event');
  //   await createCommentOnCommit();
  // }
}

async function nowDeploy() {
  const commit = execSync('git log -1 --pretty=format:%B').toString().trim();

  let myOutput = '';
  let myError = '';
  const options = {};
  options.listeners = {
    stdout: (data) => {
      myOutput += data.toString();
      core.info(data.toString());
    },
    stderr: (data) => {
      myError += data.toString();
      core.info(data.toString());
    },
  };

  return await exec
    .exec(
      'npx',
      [
        'now@19',
        ...nowArgs.split(/ +/),
        '--token',
        vercelToken,
        '-m',
        `githubCommitSha=${context.sha}`,
        '-m',
        `githubCommitAuthorName=${context.actor}`,
        '-m',
        `githubCommitAuthorLogin=${context.actor}`,
        '-m',
        'githubDeployment=1',
        '-m',
        `githubOrg=${context.repo.owner}`,
        '-m',
        `githubRepo=${context.repo.repo}`,
        '-m',
        `githubCommitOrg=${context.repo.owner}`,
        '-m',
        `githubCommitRepo=${context.repo.repo}`,
        '-m',
        `githubCommitMessage=${commit}`,
      ],
      options
    )
    .then(() => {});
}

async function listCommentsForCommit() {
  const { data: comments } = await octokit.repos.listCommentsForCommit({
    ...context.repo,
    commit_sha: context.sha,
  });
  return comments;
}

async function createCommentOnCommit() {
  const { data: comments } = await octokit.repos.listCommentsForCommit({
    ...context.repo,
    commit_sha: context.sha,
  });

  const vercelPreviewURLComment = comments.find((comment) =>
    comment.body.startsWith('Deploy preview for website ready!')
  );

  let deploymentUrl;
  let deploymentCommit;

  const {
    data: {
      deployments: [commitDeployment],
    },
  } = await vercelAPIClient.get('/v4/now/deployments', {
    params: {
      'meta-githubCommitSha': context.sha,
    },
  });

  if (commitDeployment) {
    deploymentUrl = commitDeployment.url;
    deploymentCommit = commitDeployment.meta.githubCommitSha;
  } else {
    const {
      data: {
        deployments: [lastBranchDeployment],
      },
    } = await vercelAPIClient.get('/v4/now/deployments', {
      params: {
        'meta-githubCommitRef': context.ref,
      },
    });

    if (lastBranchDeployment) {
      deploymentUrl = lastBranchDeployment.url;
      deploymentCommit = lastBranchDeployment.meta.githubCommitSha;
    } else {
      const {
        data: {
          deployments: [lastDeployment],
        },
      } = await vercelAPIClient.get('/v4/now/deployments', {
        params: {
          limit: 1,
        },
      });

      if (lastDeployment) {
        deploymentUrl = lastDeployment.url;
        deploymentCommit = lastDeployment.meta.githubCommitSha;
      }
    }
  }

  const commentBody = stripIndents`
    Deploy preview for website ready!

    Built with commit ${deploymentCommit}

    https://${deploymentUrl}
  `;

  if (vercelPreviewURLComment) {
    await octokit.repos.updateCommitComment({
      ...context.repo,
      comment_id: vercelPreviewURLComment.id,
      body: commentBody,
    });
  } else {
    await octokit.repos.createCommitComment({
      ...context.repo,
      commit_sha: context.sha,
      body: commentBody,
    });
  }

  core.setOutput('preview-url', `https://${deploymentUrl}`);
}

async function createCommentOnPullRequest() {
  const { data: comments } = await octokit.issues.listComments({
    ...context.repo,
    issue_number: context.issue.number,
  });
  console.log(comments);

  const vercelPreviewURLComment = comments.find((comment) =>
    comment.body.startsWith('Deploy preview for website ready!')
  );

  let deploymentUrl;
  let deploymentCommit;

  const {
    data: {
      deployments: [commitDeployment],
    },
  } = await vercelAPIClient.get('/v4/now/deployments', {
    params: {
      'meta-githubCommitSha': context.sha,
    },
  });

  if (commitDeployment) {
    deploymentUrl = commitDeployment.url;
    deploymentCommit = commitDeployment.meta.githubCommitSha;
  } else {
    const {
      data: {
        deployments: [lastBranchDeployment],
      },
    } = await vercelAPIClient.get('/v4/now/deployments', {
      params: {
        'meta-githubCommitRef': context.ref,
      },
    });

    if (lastBranchDeployment) {
      deploymentUrl = lastBranchDeployment.url;
      deploymentCommit = lastBranchDeployment.meta.githubCommitSha;
    } else {
      const {
        data: {
          deployments: [lastDeployment],
        },
      } = await vercelAPIClient.get('/v4/now/deployments', {
        params: {
          limit: 1,
        },
      });

      if (lastDeployment) {
        deploymentUrl = lastDeployment.url;
        deploymentCommit = lastDeployment.meta.githubCommitSha;
      }
    }
  }

  const commentBody = stripIndents`
    Deploy preview for website ready!

    Built with commit ${deploymentCommit}

    https://${deploymentUrl}
  `;

  if (vercelPreviewURLComment) {
    await octokit.issues.updateComment({
      ...context.repo,
      comment_id: vercelPreviewURLComment.id,
      body: commentBody,
    });
  } else {
    await octokit.issues.createComment({
      ...context.repo,
      issue_number: context.issue.number,
      body: commentBody,
    });
  }

  core.setOutput('preview-url', `https://${deploymentUrl}`);
}

run().catch((error) => {
  core.setFailed(error.message);
});
