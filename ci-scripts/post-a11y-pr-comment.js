const fs = require('fs');

async function postComment(github, context, core) {
  const commentFile = 'pr-comment.md';

  if (!fs.existsSync(commentFile)) {
    console.log('No PR comment file found. Skipping.');
    return;
  }

  let comment = fs.readFileSync(commentFile, 'utf8');

  const artifactName = `a11y-screenshots-pr-${process.env.GITHUB_PR_NUMBER}-${process.env.GITHUB_MATRIX_CONTAINER}-${process.env.GITHUB_RUN_ATTEMPT}`;

  const artifacts = await github.rest.actions.listWorkflowRunArtifacts({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: context.runId,
  });

  const artifact = artifacts.data.artifacts.find(
    (a) => a.name === artifactName
  );

  if (!artifact) {
    console.log(
      `Artifact ${artifactName} not found. Available artifacts:`,
      artifacts.data.artifacts.map((a) => a.name)
    );
    core.setFailed(
      `Could not find artifact ${artifactName} to generate download link`
    );
    return;
  }

  const artifactUrl = `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/artifacts/${artifact.id}`;
  comment = comment.replace(
    'ARTIFACT_URL_PLACEHOLDER',
    `[${artifactName}](${artifactUrl})`
  );

  const comments = await github.rest.issues.listComments({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  const commentId = `a11y-failure-container-${process.env.GITHUB_MATRIX_CONTAINER}`;
  const existingComment = comments.data.find(
    (comment) =>
      comment.user.type === 'Bot' &&
      comment.body.includes(`<!-- ${commentId} -->`)
  );

  if (existingComment) {
    await github.rest.issues.updateComment({
      comment_id: existingComment.id,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: comment,
    });
    console.log('Updated existing PR comment');
  } else {
    await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: comment,
    });
    console.log('Created new PR comment');
  }
}

module.exports = postComment;
