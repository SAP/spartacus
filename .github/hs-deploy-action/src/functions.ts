import * as child_process from 'child_process';
import * as exec from '@actions/exec';
import * as crypto from 'node/crypto';

export async function build() {
  //build libs and app
  await exec.exec('yarn', ['install']);
  await exec.exec('yarn', ['build:libs']);
  await exec.exec('yarn', ['build']);
}

export async function deploy() {
  //TODO get git branch suffix to generate the SHA
  const bundleId = crypto
    .createHmac('sha1', '10679')
    .digest('hex')
    .substring(0, 32);
  const command = `upp application deploy -b ${bundleId} -s ./dist/storefrontapp -e stage`;

  const exp = /https\:\/\/\w+\.cloudfront\.net/;
  let output = '';

  const process = child_process.exec(command);

  process.stdout?.on('data', (data) => {
    const line = data.toString();
    console.log(line);
    const match = line.match(exp);
    if (match && match.length > 0) {
      console.log('--> Deployment done to ' + match);
    }
    output += data.toString();
    //INFO - Deployment done. You can access the application at https://ddr1pf6lomx90.cloudfront.net [Request id:3660df82-55fa-4c60-9017-15b22e344196]
  });

  process.on('close', (data) => {
    console.log('--> Process done. Output ommitted for now');
  });

  process.on('exit', (code) => {
    if (code !== 0) {
      console.log(`upp deploy exited with code ${code}`);
    }
  });
}
