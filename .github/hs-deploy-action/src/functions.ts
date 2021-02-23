import * as child_process from 'child_process';
import * as exec from '@actions/exec';

export async function build() {
  //build libs and app
  await exec.exec('yarn', ['install']);
  await exec.exec('yarn', ['build:libs']);
  await exec.exec('yarn', ['build']);
}

export async function deploy(github: any, octoKit: any) {
  const context = github.context;
  const branch = context.payload.pull_request.head.ref;

  console.log(`--> Deploying branch ${branch}`);
  const prNumber = branch.substring('feature/GH-'.length, branch.length);

  const bundleId = `spartacus-feature-spa${prNumber}`;
  const command = `upp application deploy -b ${bundleId} -t spartacus -s ./dist/storefrontapp -e stage`;

  const exp = /https\:\/\/\w+\.cloudfront\.net/;
  let output = '';

  const process = child_process.exec(command);

  process.stdout?.on('data', (data) => {
    const line = data.toString();
    const match = line.match(exp);
    if (match && match.length > 0) {
      const body = `:rocket: Spartacus deployed to [${match}](${match})`;
      addComment(context, octoKit, body);
    }
    output += data.toString();
  });

  process.on('exit', (code) => {
    if (code !== 0) {
      console.log(`upp deploy exited with code ${code}`);
    }
  });
}

export async function addComment(context: any, octoKit: any, comment: String) {
  const COMMENT_HEADER = '## Hosting service deployment';
  const issueNumber = context.payload.pull_request.number;
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const body = `${COMMENT_HEADER}\n${comment}`;

  const comments = await octoKit.issues.listComments({
    issue_number: issueNumber,
    owner,
    repo,
  });

  const botComment = comments.data.filter(
    (comment: any) =>
      comment.body.includes(COMMENT_HEADER) &&
      comment.user.login === 'github-actions[bot]'
  );

  if (botComment && botComment.length) {
    await octoKit.issues.deleteComment({
      comment_id: botComment[0].id,
      owner,
      repo,
    });
  }

  await octoKit.issues.createComment({
    issue_number: issueNumber,
    owner,
    repo,
    body,
  });
}
