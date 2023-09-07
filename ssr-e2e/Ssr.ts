const childProcess = require('child_process');
const Log = require('./Log');

async function startSsrServer() {
  childProcess.exec('npm run serve:ssr > ssr-e2e/ssr.log', {
    // Enable to read server log output in console
    stdio: 'inherit',
  });
  await Log.waitUntilLogContainsText('Node Express server listening on ');
}

function killSsrServer() {
  return new Promise((resolve) => {
    childProcess.exec('kill $(lsof -t -i:4000)', () => {
      resolve(true);
    });
  });
}

module.exports = { startSsrServer, killSsrServer };
