const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Read first line from effect-folders.txt
const scriptDir = __dirname;
const filePath = path.join(scriptDir, 'effect-folders.txt');

const lines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);

lines.forEach((folder) => {
  // Prepare your NX generate command
  const command = `npx nx g @angular/core:inject --path=${folder}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }
    console.log(`Command output: ${stdout}`);
  });
});
