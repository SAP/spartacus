import * as exec from '@actions/exec';

export async function build() {
  //build libs and app
  await exec.exec('yarn', ['install']);
  await exec.exec('yarn', ['build:libs']);
  await exec.exec('yarn', ['build']);
  await exec.exec('yarn', ['build:ssr']);
}

/**
 * Adds hosting service deployment URL as a comment to the corresponding github pull request
 * @param context Github context
 * @param octoKit Github octokit object
 * @param comment Comment body
 */
export async function addComment(context: any, octoKit: any, comment: string) {
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

/**
 * Generates a UPP valid bundle Id based on the branch name
 * replaces slashes with -s and other chars with -d
 * @param branch Branch name
 */
export function getBundleId(branch: string) {
  let bundleId = '';
  const regex = /(\-\d)/;
  branch
    .toLowerCase()
    .replace(/\//g, '-s')
    .replace(/\./g, '-d')
    .replace(/_/g, '-')
    .split(regex)
    .forEach((s: string) => {
      if (s.match(regex)) {
        bundleId += s.substring(0, 1) + 'i' + s.substring(1, 2);
      } else {
        bundleId += s;
      }
    });
  console.log(`--> Generated bundle ID: ${bundleId}`);
  return bundleId;
}
