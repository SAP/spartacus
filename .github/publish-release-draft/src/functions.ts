export async function createRelease(
  context: any,
  octoKit: any,
  tag_name: string,
  body: string
) {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;

  await octoKit.repos.createRelease({
    tag_name,
    owner,
    repo,
    body,
    draft: true,
  });
}
