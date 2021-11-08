export async function publishReleaseDraft(
  tag_name: string,
  context: any,
  octoKit: any,
  body: string
) {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;

  const releases = await octoKit.repos.listReleases({
    owner,
    repo,
  });

  const releaseDrafts = releases.data.filter(
    (release: any) =>
      release.draft &&
      release.author.login === 'github-actions[bot]' &&
      release.tag_name &&
      release.name
  );

  if (releaseDrafts && releaseDrafts.length) {
    await octoKit.repos.deleteRelease({
      owner,
      repo,
      release_id: releaseDrafts[0].id,
    });
  }

  await octoKit.repos.createRelease({
    tag_name,
    owner,
    repo,
    name: tag_name,
    body,
    draft: true,
  });
}
