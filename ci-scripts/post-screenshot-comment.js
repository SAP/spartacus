/**
 * Posts a PR comment with download link for E2E test screenshots
 *
 * @param {Object} github - GitHub API client
 * @param {Object} context - GitHub Actions context
 */
async function postScreenshotComment(github, context) {
  const artifactName = 'e2e-screenshots';

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
    return;
  }

  const artifactUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}/artifacts/${artifact.id}`;

  const commentId = 'e2e-failure-comment';
  const commentBody = `<!-- ${commentId} -->\n## E2E Tests Failed ❌\n\n📸 **[Download Screenshots](${artifactUrl})**\n\n---\n*Commit: ${context.sha}*`;

  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: commentBody,
  });
  console.log('Created new E2E failure PR comment');
}

module.exports = postScreenshotComment;
