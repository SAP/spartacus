// const exec = require('@actions/exec');
const github = require('@actions/github');
const core = require('@actions/core');
// const fs = require('fs');
// const diff = require('diff-lines');
// const normalizeNewline = require('normalize-newline');

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const gh = github.getOctokit(GITHUB_TOKEN);

  const context = github.context;

  console.log(context.payload.pull_request);

  const relatedPR = context.payload.pull_request;

  const issueNumber = relatedPR.number;
  const targetBranch = relatedPR.base.ref;
  const reportHeader = 'Public API change detection bot';

  // function extractSnippetFromFile(filename) {
  //   const regexForTSSnippetInMarkdown = /```ts([\s\S]*)```/ms;
  //   return regexForTSSnippetInMarkdown
  //     .exec(normalizeNewline(fs.readFileSync(filename, 'utf-8')))[1]
  //     .trim();
  // }

  // await exec.exec('sh', [
  //   './.github/api-extractor-action/api-extractor-for-branch.sh',
  // ]);
  // await exec.exec('sh', [
  //   './.github/api-extractor-action/api-extractor-for-branch.sh',
  //   targetBranch,
  //   'target',
  // ]);

  // const libraries = ['assets', 'storefront', 'cds', 'product', 'setup'];

  // const libsDiffs = libraries.map((library) => {
  //   const sourceBranchReportDirectory = `etc`;
  //   const targetBranchReportDirectory = `target-branch-clone/etc`;
  //   const sourceBranchSnippet = extractSnippetFromFile(
  //     `${sourceBranchReportDirectory}/${library}.api.md`
  //   );
  //   const targetBranchSnippet = extractSnippetFromFile(
  //     `${targetBranchReportDirectory}/${library}.api.md`
  //   );
  //   return {
  //     library,
  //     diff: diff(targetBranchSnippet, sourceBranchSnippet, {
  //       n_surrounding: 2,
  //     }),
  //   };
  // });

  // function generateCommentBody(libsDiffs) {
  //   return (
  //     '## ' +
  //     reportHeader +
  //     '\n' +
  //     libsDiffs
  //       .map(
  //         (libDiff) =>
  //           '### @spartacus/' +
  //           libDiff.library +
  //           ' public API diff\n' +
  //           (!libDiff.diff
  //             ? 'nothing changed ;)'
  //             : '``` diff\n' + libDiff.diff + '\n```')
  //       )
  //       .join('\n') +
  //     '\n' +
  //     '### @spartacus/core public API diff\n' +
  //     'unable to analyze this library :(\n' +
  //     'Please check changes in public API manually.'
  //   );
  // }

  function generateCommentBody() {
    return (
      '## ' +
      reportHeader +
      '\n' +
      '\n' +
      '### @spartacus/core public API diff\n' +
      'unable to analyze this library :(\n' +
      'Please check changes in public API manually.'
    );
  }

  async function printReport(body) {
    const comments = await gh.issues.listComments({
      issue_number: issueNumber,
      owner,
      repo,
    });

    console.log(comments);

    const botComment = comments.data.filter((comment) =>
      comment.body.includes(reportHeader)
    );

    if (botComment && botComment.length) {
      await gh.issues.updateComment({
        comment_id: botComment[0].id,
        owner,
        repo,
        body,
      });
    } else {
      await gh.issues.createComment({
        issue_number: issueNumber,
        owner,
        repo,
        body,
      });
    }
  }

  await printReport(generateCommentBody());
}

run();
