const { execSync } = require('child_process');

const gitStatus = execSync('git status --porcelain').toString('utf-8');

if (gitStatus) {
  console.log(gitStatus);

  process.exit(1);
}

process.exit(0);
