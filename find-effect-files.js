const fs = require('fs');
const path = require('path');

function findEffectFolders(currentDir, result = new Set()) {
  const files = fs.readdirSync(currentDir);

  files.forEach((file) => {
    const fullPath = path.join(currentDir, file);

    // Skip node_modules directory
    if (fs.statSync(fullPath).isDirectory()) {
      if (file === 'node_modules') return;
      findEffectFolders(fullPath, result);
    } else if (file.endsWith('.effect.ts') || file.endsWith('.effects.ts')) {
      // Save the folder RELATIVE to script directory
      const folderRelative = path.relative(__dirname, currentDir);
      result.add(folderRelative === '' ? '.' : folderRelative);
    }
  });

  return result;
}

const scriptDir = __dirname;
const effectFolders = Array.from(findEffectFolders(scriptDir));

// Output to effect-folders.txt
const outputFile = path.join(scriptDir, 'effect-folders.txt');

fs.writeFileSync(outputFile, effectFolders.join('\n'), 'utf-8');
console.log(`Found folders saved to ${outputFile}`);
