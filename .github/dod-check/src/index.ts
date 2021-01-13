import * as github from '@actions/github';

async function run() {
  const context = github.context;
  console.log(context);
}

run();
