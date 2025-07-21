#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function main() {
  const screenshotDir = './screenshots';

  if (!fs.existsSync(screenshotDir)) {
    console.log('No screenshots found to post');
    return;
  }

  // Find all PNG files recursively
  function findPngFiles(dir) {
    let pngFiles = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        pngFiles = pngFiles.concat(findPngFiles(fullPath));
      } else if (item.name.endsWith('.png')) {
        pngFiles.push(fullPath);
      }
    }
    return pngFiles;
  }

  const pngFiles = findPngFiles(screenshotDir);

  if (pngFiles.length === 0) {
    console.log('No PNG screenshots found');
    return;
  }

  console.log(`Found ${pngFiles.length} screenshots`);

  // Create comment body with accordion/collapsible sections
  let commentBody = `## 🚨 Accessibility test failures\n\n`;
  commentBody += `Found ${pngFiles.length} screenshot(s) from failed tests.\n\n`;

  // Add each screenshot in a collapsible section
  for (const [index, filePath] of pngFiles.entries()) {
    const fileName = path.basename(filePath);
    const relativePath = filePath.replace('./screenshots/', '');
    const fileSize = fs.statSync(filePath).size;

    commentBody += `<details>\n`;
    commentBody += `<summary>📸 <strong>${fileName}</strong> (${(fileSize / 1024).toFixed(1)}KB)</summary>\n\n`;
    commentBody += `**Path:** \`${relativePath}\`\n\n`;
    commentBody += `**Test:** ${path.dirname(relativePath).replace(/\//g, ' › ')}\n\n`;
    commentBody += `**Size:** ${(fileSize / 1024).toFixed(1)}KB\n\n`;
    commentBody += `💡 *Download the artifact below to view this screenshot*\n\n`;
    commentBody += `</details>\n\n`;
  }

  commentBody += `---\n\n`;
  commentBody += `### 📋 How to view screenshots\n\n`;
  commentBody += `1. **Go to the [workflow run](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID})**\n`;
  commentBody += `2. **Scroll to "Artifacts" section** at the bottom\n`;
  commentBody += `3. **Download** artifacts starting with \`a11y-failure-screenshots-\`\n`;
  commentBody += `4. **Extract** the zip files to view the screenshots listed above\n\n`;

  commentBody += `### 📊 Details\n\n`;
  commentBody += `- **Total screenshots:** ${pngFiles.length}\n`;
  commentBody += `- **Workflow run:** [${process.env.GITHUB_RUN_ID}](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID})\n\n`;

  commentBody += `💡 **Troubleshooting:** See [accessibility documentation](https://wiki.one.int.sap/wiki/display/spar/Spartacus+Accessibility+Feature+Compliance) for guidance.`;

  // Output the comment body to be used by the workflow
  console.log('COMMENT_BODY<<EOF');
  console.log(commentBody);
  console.log('EOF');

  console.log(`\nGenerated comment for ${pngFiles.length} screenshots`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
