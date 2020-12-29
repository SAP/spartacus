const exec = require('@actions/exec');
const github = require('@actions/github');
const core = require('@actions/core');
const glob = require('@actions/glob');
const io = require('@actions/io');
const fs = require('fs');
// const diff = require('diff-lines');
// const normalizeNewline = require('normalize-newline');

async function prepareRepositoryForApiExtractor() {
  core.startGroup('Prepare branches for extractor');
  await exec.exec('sh', [
    './.github/api-extractor-action/prepare-repo-for-api-extractor.sh',
  ]);
  // await exec.exec('sh', [
  //   './.github/api-extractor-action/prepare-repo-for-api-extractor.sh',
  //   targetBranch,
  //   'target',
  // ]);
  // We can parallel these builds, when schematics builds won't trigger yarn install
  await exec.exec('sh', ['./.github/api-extractor-action/build-libs.sh']);
  // await exec.exec('sh', [
  //   './.github/api-extractor-action/build-libs.sh',
  //   targetBranch,
  //   'target',
  // ]);
  core.endGroup();
}

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const gh = github.getOctokit(GITHUB_TOKEN);

  const context = github.context;

  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;

  const relatedPR = context.payload.pull_request;

  const issueNumber = relatedPR.number;
  const targetBranch = relatedPR.base.ref;
  const reportHeader = 'Public API change detection bot';

  let globber = await glob.create(
    '.github/api-extractor-action/api-extractor.json',
    {}
  );
  const apiExtractorConfigPath = (await globber.glob())[0];

  await prepareRepositoryForApiExtractor();

  const Status = {
    Unknown: 'unknown',
    Success: 'success',
    Failed: 'failed',
    Missing: 'missing',
  };

  let entryPoints = {};

  globber = await glob.create('dist/**/package.json', {});
  const files = await globber.glob();

  for (let path of files) {
    const packageContent = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const name = packageContent.name;

    if (!entryPoints.name) {
      entryPoints[name] = {
        name: name,
        head: { status: Status.Unknown },
        base: { status: Status.Unknown },
      };
    }

    const newName = name.replace(/\//g, '_').replace(/\_/, '/');
    fs.writeFileSync(
      path,
      JSON.stringify({ ...packageContent, name: newName }, undefined, 2)
    );

    const directory = path.substring(0, path.length - `/package.json`.length);

    // Run api extractor for entrypoint
    core.startGroup(`api extractor for ${directory}`);
    await io.cp(apiExtractorConfigPath, directory);
    const options = {
      ignoreReturnCode: true,
      delay: 1000,
    };
    let myOutput = '';
    let myError = '';
    options.listeners = {
      stdLine: (line) => {
        myOutput += line;
      },
      errLine: (line) => {
        myError += line;
      },
    };
    const exitCode = await exec.exec(
      'sh',
      ['./.github/api-extractor-action/api-extractor.sh', directory],
      options
    );
    console.log('Exit code', exitCode);
    console.log('ErrLines', myError);
    console.log('Output', myOutput);
    core.endGroup();
  }

  // globber = await glob.create('etc/**/*.md', {});
  // const raports = await globber.glob();
  // console.log(raports);

  console.log(entryPoints);

  // globber = await glob.create('target-branch-clone/dist/**/package.json', {});
  // const files2 = await globber.glob();

  // core.startGroup('api extractor for target branch');
  // await Promise.all(
  //   files2.map(async (path) => {
  //     const packageContent = JSON.parse(fs.readFileSync(path, 'utf-8'));
  //     const name = packageContent.name;
  //     const newName = name.replace(/\//g, '_').replace(/\_/, '/');
  //     fs.writeFileSync(
  //       path,
  //       JSON.stringify({ ...packageContent, name: newName }, undefined, 2)
  //     );

  //     const directory = path.substring(0, path.length - `/package.json`.length);

  //     await io.cp(apiExtractorConfigPath, directory);
  //     await exec.exec(
  //       'sh',
  //       ['./.github/api-extractor-action/api-extractor.sh', directory],
  //       {
  //         ignoreReturnCode: true,
  //         delay: 1000,
  //       }
  //     );
  //   })
  // );
  // core.endGroup();

  // globber = await glob.create('target-branch-clone/etc/**/*.md', {});
  // const reports = await globber.glob();
  // console.log(reports);

  // function extractSnippetFromFile(filename) {
  //   const regexForTSSnippetInMarkdown = /```ts([\s\S]*)```/ms;
  //   return regexForTSSnippetInMarkdown
  //     .exec(normalizeNewline(fs.readFileSync(filename, 'utf-8')))[1]
  //     .trim();
  // }

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

  // function generateCommentBody() {
  //   return (
  //     '## ' +
  //     reportHeader +
  //     '\n' +
  //     '\n' +
  //     '### @spartacus/core public API diff\n' +
  //     'unable to analyze this library :(\n' +
  //     'Please check changes in public API manually.'
  //   );
  // }

  // async function printReport(body) {
  //   const comments = await gh.issues.listComments({
  //     issue_number: issueNumber,
  //     owner,
  //     repo,
  //   });

  //   console.log(comments);

  //   const botComment = comments.data.filter((comment) =>
  //     comment.body.includes(reportHeader)
  //   );

  //   if (botComment && botComment.length) {
  //     await gh.issues.updateComment({
  //       comment_id: botComment[0].id,
  //       owner,
  //       repo,
  //       body,
  //     });
  //   } else {
  //     await gh.issues.createComment({
  //       issue_number: issueNumber,
  //       owner,
  //       repo,
  //       body,
  //     });
  //   }
  // }

  // await printReport(generateCommentBody());
}

run();
