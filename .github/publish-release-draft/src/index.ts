import * as github from '@actions/github';
import { publishReleaseDraft } from './functions';

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const CHANGELOG = process.env.CHANGELOG;
  const TO_TAG = process.env.TO_TAG;

  if (!GITHUB_TOKEN) {
    throw new Error('Github token missing in action');
  }

  if (!CHANGELOG) {
    throw new Error('missing changelog');
  }

  if (!TO_TAG) {
    throw new Error('To tag is missing');
  }

  const octoKit = github.getOctokit(GITHUB_TOKEN);
  const context = github.context;

  await publishReleaseDraft(TO_TAG, context, octoKit, CHANGELOG);
}

run();
