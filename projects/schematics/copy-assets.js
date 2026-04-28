/**
 * Copy asset files that should be preserved during schematics build
 */

const fs = require('fs');
const path = require('path');

// The original tracker file location (relative to this script in projects/schematics/)
const sourceFile = path.join(__dirname, '../storefrontapp/public/scripts/cart-abandonment-tracker.js');
const targetFile = path.join(__dirname, 'src/add-spartacus/assets/cart-abandonment-tracker.js');

console.log('Copying cart-abandonment-tracker.js asset...');

if (fs.existsSync(sourceFile)) {
  // Ensure target directory exists
  const targetDir = path.dirname(targetFile);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy file
  fs.copyFileSync(sourceFile, targetFile);
  console.log('✓ Copied cart-abandonment-tracker.js');
} else {
  console.error('✗ Error: Source file not found:', sourceFile);
  console.error('  Please ensure the file exists before building schematics');
  process.exit(1);
}
