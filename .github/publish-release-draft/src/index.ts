import * as core from '@actions/core';
import * as github from '@actions/github';
import { publishReleaseDraft } from './functions';

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const CHANGELOG = process.env.CHANGELOG;
  const TO_TAG = process.env.TO_TAG ?? '';

  if (!GITHUB_TOKEN) {
    throw new Error('No valid github token to perform this action');
  }

  if (!CHANGELOG) {
    core.setError('Unable to execute action. CHANGELOG value is missing');
  }

  const octoKit = github.getOctokit(GITHUB_TOKEN);
  const context = github.context;

  await publishReleaseDraft(TO_TAG, context, octoKit, CHANGELOG);
}

run();
