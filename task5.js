const { exec } = require('node:child_process')

exec('ls', (error, stdout, stderr) => {
  if (error) {
    console.log(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

