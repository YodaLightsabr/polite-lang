#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import Stump from 'stump.js';
import path from 'path';
import js from 'js-beautify';

const stump = new Stump(['Debug']);
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


let args = process.argv.filter((n, i) => i > 1);
let [inputPath, outputPath] = args;
let flags = args.map(arg => (arg.startsWith('--') ? arg.substring(2) : arg).toLowerCase());



export function parsePolitefile (politefile) {
  let matches = politefile.match(/\[\w*?\]\n(.*?)*/g);
  if (!matches) matches = [];
  let output = {};
  matches.forEach(match => {
    let type = match.substring(1, match.indexOf(']'));
    let data = match.substring(match.indexOf('\n') + 1);
    let items = data.split(',').map(item => item.trim());
    output[type] = items;
  });
  return output;
}

export function compile (input) {

  let refs = [];
  let pkgs = [];
  
  let politefile;
  try {
    politefile = fs.readFileSync(path.join(__dirname, 'Politefile'), 'utf8');
    let data = parsePolitefile(politefile);
    if (data.flags instanceof Array) data.flags.map(arg => (arg.startsWith('--') ? arg.substring(2) : arg).toLowerCase()).forEach(flag => flags.push(flag));
    if (!input && data.path) input = data.path[0];
  } catch (err) {
  }

  if (!input) {
    stump.error('Missing file path.');
    process.exit();
  }
  stump.info('Starting compilation');
  let fileData = fs.readFileSync(input, 'utf8');

  fileData = ((data) => {
    let matches = data.match(/".*?"/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, '&REF' + refs.length);
      refs.push(match);
    });
    return data;
  })(fileData);

  fileData = ((data) => {
    let matches = data.match(/'.*?'/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, '&REF' + refs.length);
      refs.push(match);
    });
    return data;
  })(fileData);

  fileData = ((data) => {
    let matches = data.match(/\/\*.*?\*\//g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, '&REF' + refs.length);
      refs.push(match);
    });
    return data;
  })(fileData);

  fileData = ((data) => {
    let matches = data.match(/`(.|\n)*?`/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, '&REF' + refs.length);
      refs.push(match);
    });
    return data;
  })(fileData);

  fileData = ((data) => {
    let matches = data.match(/math\((.|\n)*?\)/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, '&REF' + refs.length);
      refs.push(match.substring(
        match.indexOf('(') + 1,
        match.length - 1
      ));
    });
    return data;
  })(fileData);

  if (flags.includes('uwu-safe')) fileData = fileData
    .split('uwu').join('')
    .split('UWU').join('')
    .split('uWu').join('')
    .split('UwU').join('')
    .split('owo').join('')
    .split('OWO').join('')
    .split('oWo').join('')
    .split('OwO').join('');
  
  fileData = fileData
    .split('println').join('log from console')
    .split('please set variable').join('let')
    .split('please set constant').join('const')
    .split(`but there's more`).join('{')
    .split(`ok that's it`).join('}')
    .split(`but there's more`).join('{')
    .split('please create function').join('function')
    .split('please create async function').join('async function')
    .split('create loop and check').join('for (let index = 0;')
    .split('and on every iteration do').join('; index++) {')
    .split('with arguments').join('(')
    .split('.').join(')')
    .split('and the code').join(') {')
    .split('run function').join('')
    .split('is similar to').join('==')
    .split('is less than').join('<')
    .split('is greater than').join('>')
    .split('is less than or equal to').join('<=')
    .split('is greater than or equal to').join('>=')
    .split(' and ').join(' && ')
    .split(' or ').join(' && ')
    .split('is not similar to').join('!=')
    .split('is equal to').join('===')
    .split('equals').join('===')
    .split('is not equal to').join('!==')
    .split('does not equal').join('!==')
    .split('run function').join('')
    .split('please create new ').join('new ')
    .split('run async function ').join('await ')
    .split('with no arguments').join('(')
    .split('if ').join('if (')
    .split('then do').join(') {')
    .split('then').join(') {')
    .split('otherwise').join('} else {')
    .split('othersise if').join('} else if (')
    .split('\nok').join('\n}')
    .split(' ok').join(' }')
    .split(' to ').join(' = ')
    .split(' is ').join(': ')
    .split(', and').join(', ')
  ;

  fileData = ((data) => {
    let matches = data.match(/(\w|\$)* from (\w|\$)*/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, match.split(' from ')[1] + '.' + match.split(' from ')[0]);
    });
    return data;
  })(fileData);

  fileData = ((data) => {
    let matches = data.match(/a group of things \((.|\n)*?\)/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, `{${match.substring(match.indexOf('(') + 1, match.length - 1)}}`);
    });
    return data;
  })(fileData);

  fileData = ((data) => {
    let matches = data.match(/a list of things \((.|\n)*?\)/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, `[${match.substring(match.indexOf('(') + 1, match.length - 1)}]`);
    });
    return data;
  })(fileData);

  fileData = ((data) => {
    let matches = data.match(/import (.|\n)*? in the package .*/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      let [tools, pkg] = match.split(' in the package ');
      tools = tools.substring('import '.length);
      pkgs.push(pkg);
      data = data.replace(match, `import ${tools} from "${pkg}";`);
    });
    return data;
  })(fileData);

  fileData = ((data) => {
    let matches = data.match(/&REF[0-9]*/g);
    if (matches == null) matches = [];
    matches.forEach(match => {
      data = data.replace(match, refs[parseInt(match.substring(4))]);
      refs.push(match);
    });
    return data;
  })(fileData);


  fileData = js(fileData, { indent_size: 2, space_in_empty_paren: true })

  fs.writeFileSync(path.join(path.dirname(input), path.basename(input).split('.')[0] + '.js'), fileData, 'utf8');

  stump.info('Writing to file');

  stump.success('Compilation completed');
}

compile(inputPath, outputPath);

