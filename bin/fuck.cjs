#!/usr/bin/env node
const { exec } = require('child_process');
const path = require('path')


exec("bash './test.sh'", (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});