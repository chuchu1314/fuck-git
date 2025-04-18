#!/usr/bin/env node
"use strict";
const path = require('path');
const os = require('os');
 
const homeDir = os.homedir();
const historyFilePath = path.join(homeDir, '.bash_history');
 
console.log(historyFilePath);