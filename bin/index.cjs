#!/usr/bin/env node
"use strict";const w=require("child_process"),u=require("chalk"),v=require("@inquirer/prompts"),C=require("conf"),k="fuck-git",d="1.1.0",p="fuck-git description",x=["git","marge","rebase","add","commit","checkout","branch","stash","diff","push","blame","fetch","merge","origin","pop","pull","reset","status","-m","-b","-D"];class S{constructor(e,t){this._key=e,this.clear(),this.add(t)}add(e){let t=this.ls();Array.isArray(e)?t=[...t,...e]:t=[...t,e],t=[...new Set(t)],this.config.set(this._key,t)}ls(){return this.config.get(this._key)||[]}remove(e){const n=this.ls().filter(o=>o!==e);this.config.set(this._key,n)}clear(){this.config.set(this._key,[])}}S.prototype.config=new C({projectName:"fuck-git"});const y=new S("git-command",x);function L(i,e){let t="";for(let n=0;n<i.length;n++)for(let o=n+1;o<=i.length;o++){const r=i.slice(n,o);e.includes(r)&&r.length>t.length&&(t=r)}return t}function _(i,e){if(!i||!e)return{similarity:0,maxChildStr:""};if(i===e)return{similarity:1,maxChildStr:i};const t=L(i,e);return{similarity:t.length*2/(i.length+e.length),maxChildStr:t}}function b(i,e,t=.1){let n=0,o="",r="";for(const a of i){if(r.length>=a.length)continue;const{similarity:c,maxChildStr:m}=_(e,a);c>=t&&c>n&&(n=c,o=a,r=m)}return{value:o,similarity:n}}function q(i,e){const t=i.join("_"),n=e.join("_");return t===n}function j(){const i=["-v","-V","-version"],e=["-des","-D","-descript","-description"],t=["-h","-H","-help"],n=process.argv.slice(2),o=n[0]||"";if(i.includes(o)){console.log(d);return}if(e.includes(o)){console.log(p);return}if(t.includes(o)){console.log(u.green(k)+`(v${d})`),console.log(p),console.log(`Options: 
 -config add <command>      add command 
 -config remove <command>   remove command 
 -config ls                 show all command`);return}if(n[0]==="-config"){const[,s,l]=n;try{const g=y[s](l||void 0);console.log(">>>>>>>",g)}catch{console.log(u.yellow(s+"is not support now!"))}return}const a=y.ls(),c=n.map(s=>{if(/^['"].*['"]$/.test(s))return s;const{value:g,similarity:h}=b(a,s);return!h||h===1?s:g}),m=["git"].concat(c);if(q(n,c))f(n);else{console.log(u.yellow("The command have some issues.")),console.log(),console.log(u.green(m.join(" "))),console.log();const s=async()=>{const l=await v.input({message:"Is this the command you want to execute? (yes/no/quit)"});["yes","y"].includes(l.toLocaleLowerCase())?f(c):["no","n"].includes(l.toLocaleLowerCase())?f(n):["quit","q"].includes(l.toLocaleLowerCase())?process.exit(0):(console.log("Please input yes or no."),s())};s()}}function f(i){return new Promise((e,t)=>{w.spawn("git",i,{stdio:"inherit"}).on("close",o=>{console.log("--------------------funny--------------------"),o===0?e(o):o===1&&t(o)})})}j();
