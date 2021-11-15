import * as core from '@actions/core';
import { Context } from '@actions/github/lib/context';

const COMMENT_HEADER = '## Pull request checker: Conventional commits';

const commitType = [
  'feat',
  'fix',
  'perf',
  'refactor',
  'style',
  'test',
  'chore',
  'docs',
];

const commitScope = [
  '@spartacus/core',
  '@spartacus/storefront',
  '@spartacus/styles',
  '@spartacus/assets',
  '@spartacus/schematics',
  '@spartacus/incubator',
  '@spartacus/user',
  '@spartacus/cds',
  '@spartacus/organization',
  '@spartacus/product',
  '@spartacus/product-configurator',
  '@spartacus/storefinder',
  '@spartacus/checkout',
  '@spartacus/asm',
  '@spartacus/smartedit',
  '@spartacus/qualtrics',
  '@spartacus/cdc',
  '@spartacus/digital-payments',
  '@spartacus/tracking',
  '@spartacus/cart',
  '@spartacus/order',
  '@spartacus/setup',
];

export function checkPullRequestTitle(title: string): {
  isTypeValid: boolean;
  isScopeValid: boolean;
} {
  const commonTypeRegex = `^(?<type>${commitType.join('|')})`;
  const typeRegex = new RegExp(`${commonTypeRegex}: `);

  const packagedScope = commitScope
    .map((scope) => (scope = `(${scope.replace('/', '\\/')})`))
    .join('|');
  const scopeRegex = new RegExp(
    `${commonTypeRegex}(: |((?<scope>${packagedScope})): )`
  );

  const isTypeValid = typeRegex.test(title);
  const isScopeValid = scopeRegex.test(title);

  return { isTypeValid, isScopeValid };
}

function generateTextForType(isTypeValid: boolean): string {
  let body: string = '';

  if (isTypeValid) {
    body = `No **type** format error`;
  } else {
    body = `
    **type** must be one of the following:
      - feat
      - fix
      - perf
      - refactor
      - style
      - test
      - chore
      - docs
    `;

    core.setFailed('Type is not proper');
  }

  return `## Is the pull request **type** text valid\n${body}`;
}

function generateTextForScope(isScopeValid: boolean): string {
  let body: string = '';

  if (isScopeValid) {
    body = `No **scope** format error and **scope** is optional`;
  } else {
    body = `
    **scope** is optional, but choose one of the following:
     - @spartacus/core
     - @spartacus/storefront
     - @spartacus/styles
     - @spartacus/assets
     - @spartacus/schematics
     - @spartacus/incubator
     - @spartacus/user
     - @spartacus/cds
     - @spartacus/organization
     - @spartacus/product
     - @spartacus/product-configurator
     - @spartacus/storefinder
     - @spartacus/checkout
     - @spartacus/asm
     - @spartacus/smartedit
     - @spartacus/qualtrics
     - @spartacus/cdc
     - @spartacus/digital-payments
     - @spartacus/tracking
     - @spartacus/cart
     - @spartacus/order
     - @spartacus/setup
    `;

    core.setFailed('Scope is not proper');
  }

  return `## Is the pull request **scope** text valid\n${body}`;
}

function generateCommentBody(
  isTypeValid: boolean,
  isScopeValid: boolean
): string {
  const content = `
  ## Please remember to follow the conventional commits format as explained in here https://sap.github.io/spartacus-docs/commit-guidelines/#commit-message-format\n
  - Example: <type>(<scope>): <subject> ----> fix: hello world or fix(@spartacus/core): hello world
  - Make sure the pull request title and commit header matches as well
  - Do not forget to put meaningful commit body messages
  - Do not forgot to put **closes GH-issueNumber** in the pull request body and commit footer 
  - <type>(<scope>): <subject> <----- format for pull request title and commit header. However, scope is optional.
  
  ${generateTextForType(isTypeValid)}
  
  ${generateTextForScope(isScopeValid)}
  `;

  return `${COMMENT_HEADER}\n${content}\n`;
}

async function printReport(
  body: string,
  ghClient: any,
  issueNumber: number,
  context: Context
): Promise<void> {
  if (!context.payload.repository) {
    throw new Error('Missing repository in context!');
  }

  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;

  const comments = await ghClient.issues.listComments({
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
    await ghClient.issues.deleteComment({
      comment_id: botComment[0].id,
      owner,
      repo,
    });
  }
  await ghClient.issues.createComment({
    issue_number: issueNumber,
    owner,
    repo,
    body,
  });
}

export async function addCommentToPR(
  ghClient: any,
  relatedPR: { number: number },
  context: Context,
  isTypeValid: boolean,
  isScopeValid: boolean
): Promise<void> {
  const commentBody = generateCommentBody(isTypeValid, isScopeValid);
  await printReport(commentBody, ghClient, relatedPR.number, context);
}
