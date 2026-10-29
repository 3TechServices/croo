const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const workflowDir = path.join(distDir, 'workflow');
const sourceFile = path.join(rootDir, 'index.html');

// 1. Clean and recreate dist directories
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(workflowDir, { recursive: true });

// 2. Copy index.html into dist/workflow/index.html (served at /workflow)
if (!fs.existsSync(sourceFile)) {
  console.error(`Error: ${sourceFile} does not exist!`);
  process.exit(1);
}
fs.copyFileSync(sourceFile, path.join(workflowDir, 'index.html'));
fs.copyFileSync(sourceFile, path.join(distDir, 'workflow.html'));
console.log('✓ Copied index.html -> dist/workflow/index.html and dist/workflow.html');

// 3. Create Cloudflare Pages _redirects file
const redirectsContent = `/  /workflow  302\n`;
fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent);
console.log('✓ Generated dist/_redirects (redirects / to /workflow)');

// 4. Create fallback root dist/index.html with immediate redirect
const rootHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/workflow">
  <title>Redirecting to CROO Workflow...</title>
  <script>window.location.replace('/workflow');</script>
</head>
<body>
  <p>Redirecting to <a href="/workflow">/workflow</a>...</p>
</body>
</html>\n`;
fs.writeFileSync(path.join(distDir, 'index.html'), rootHtmlContent);
console.log('✓ Generated dist/index.html (fallback redirect)');

console.log('Build complete! Ready for Cloudflare Pages deployment.');
