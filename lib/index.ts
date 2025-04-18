#!/usr/bin/env node

import {  spawn } from "child_process"
import chalk from 'chalk'
import { name, version, description } from '../package.json'
import configGit from './config/index'
import { getSimilarStrInStrArray, isSomeArray } from './utils/str-similarity'

function start() {

  const versionOpt = [ '-v', '-V', '-version' ]
  const descriptionOpt = [ '-des', '-D',  '-descript', '-description' ]
  const helpOpt = [ '-h', '-H', '-help']

  const commander = process.argv.slice(2)

  const optionFirst = commander[0] || ''

  // 版本信息
  if(versionOpt.includes(optionFirst)) {
    console.log(version)
    return
  }
  
  // 描述信息
  if(descriptionOpt.includes(optionFirst)) {
    console.log(description)
    return
  }
  
  // 帮助信息
  if(helpOpt.includes(optionFirst)) {
    console.log(chalk.green(name) + `(v${version})`)
    console.log(description)
    console.log('Options: \n -config add <command>      add command \n -config remove <command>   remove command \n -config ls                 show all command')
    return
  }

  const isConfig = commander[0] === '-config'

  // config 配置，目前只支持git
  if(isConfig) {
    const [, action, value ] = commander

    try {
      const result = configGit[action](value || undefined)
      console.log(result)
    } catch(_e) {
      console.log(chalk.yellow(action + 'is not support now!'))
    }
    return
  }

  
  const list = configGit.ls()
  const similarStrList = commander.map(i => {
    const { value, similarity } = getSimilarStrInStrArray(list, i)
    if(!similarity || similarity === 1) return i
    return value
  })
  const gitSimilarStrList = ['git'].concat(similarStrList)
  // 未替换
  if(isSomeArray(commander, similarStrList)) {
    run(commander)
  } else {
    console.log('Maybe this the command you want to execute?')
    console.log()
    console.log(chalk.yellow(gitSimilarStrList.join(' ')))
    console.log()
    run(commander)
  }
}

function run(commander: string[]) {
  return new Promise((resolve, reject) => {
    const gitStatus = spawn('git', commander, {
      stdio: 'inherit',
    })

    gitStatus.on('close', (code) => {
      if(code === 0) {
        resolve(code)
        process.exit(0)
      } else if(code === 1) {
        reject(code)
        process.exit(0)
      }
    })

  })
}
start()