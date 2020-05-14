const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../dist/storefrontapp/.vercel');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
fs.writeFileSync(
  path.join(__dirname, '../dist/storefrontapp/.vercel/project.json'),
  JSON.stringify({
    projectId: process.env['VERCEL_PROJECT_ID'],
    orgId: process.env['VERCEL_ORG_ID'],
  })
);
