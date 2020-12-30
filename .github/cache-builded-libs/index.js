const github = require('@actions/github');

async function run() {
  const context = github.context;

  console.log(context);
}

run();
