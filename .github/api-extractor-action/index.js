const { Toolkit } = require('actions-toolkit');
const diff = require('diff-lines');
const normalizeNewline = require('normalize-newline');

Toolkit.run(
  async (tools) => {
    const owner = tools.context.payload.repository.owner.login;
    const repo = tools.context.payload.repository.name;

    const response = await tools.github.pulls.list({
      owner,
      repo,
      head: 'SAP:' + tools.context.payload.ref.replace('refs/heads/', ''),
    });

    const relatedPullRequests = response.data;

    if (relatedPullRequests.length === 0) {
      return;
    }

    const relatedPR = relatedPullRequests[0];

    const issueNumber = relatedPR.number;
    const targetBranch = relatedPR.base.ref;
    const reportHeader = 'Public API change detection bot';

    function extractSnippetFromFile(filename) {
      const regexForTSSnippetInMarkdown = /```ts([\s\S]*)```/ms;
      return regexForTSSnippetInMarkdown
        .exec(normalizeNewline(tools.getFile(filename)))[1]
        .trim();
    }

    await tools.runInWorkspace('sh', [
      './.github/api-extractor-action/api-extractor-for-branch.sh',
    ]);
    await tools.runInWorkspace('sh', [
      './.github/api-extractor-action/api-extractor-for-branch.sh',
      targetBranch,
      'target',
    ]);

    const libraries = ['assets', 'storefront', 'cds'];

    const libsDiffs = libraries.map((library) => {
      const sourceBranchReportDirectory = `etc`;
      const targetBranchReportDirectory = `target-branch-clone/etc`;
      const sourceBranchSnippet = extractSnippetFromFile(
        `${sourceBranchReportDirectory}/${library}.api.md`
      );
      const targetBranchSnippet = extractSnippetFromFile(
        `${targetBranchReportDirectory}/${library}.api.md`
      );
      return {
        library,
        diff: diff(targetBranchSnippet, sourceBranchSnippet, {
          n_surrounding: 2,
        }),
      };
    });

    function generateCommentBody(libsDiffs) {
      return (
        '## ' +
        reportHeader +
        '\n' +
        libsDiffs
          .map(
            (libDiff) =>
              '### @spartacus/' +
              libDiff.library +
              ' public API diff\n' +
              (!libDiff.diff
                ? 'nothing changed ;)'
                : '``` diff\n' + libDiff.diff + '\n```')
          )
          .join('\n') +
        '\n' +
        '### @spartacus/core public API diff\n' +
        'unable to analyze this library :(\n' +
        'Please check changes in public API manually.'
      );
    }

    async function printReport(body) {
      const comments = await tools.github.issues.listComments({
        issue_number: issueNumber,
        owner,
        repo,
      });

      const botComment = comments.data.filter((comment) =>
        comment.body.includes(reportHeader)
      );

      if (botComment && botComment.length) {
        await tools.github.issues.updateComment({
          comment_id: botComment[0].id,
          owner,
          repo,
          body,
        });
      } else {
        await tools.github.issues.createComment({
          issue_number: issueNumber,
          owner,
          repo,
          body,
        });
      }
    }

    printReport(generateCommentBody(libsDiffs));
  },
  {
    event: ['push'],
    secrets: ['GITHUB_TOKEN'],
  }
);
