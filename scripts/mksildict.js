// mksiledic.js
// 17/02/28
// write by Jie
//
// 在一个dict中增加sil音素
//
// Usage: node mksiledic.js dictfile newdictfile

// Require

var fs = require('fs');
var execSyncShell = require('child_process').execSync, child;

if (process.argv.length !== 4) {
  console.log('\nUsage: \n\tnode mksiledic.js dictfile newdictfile\n');
  return
}

const existedDicPath = process.argv[2];
const savingPath = process.argv[3];
var existedDicData = fs.readFileSync(existedDicPath, 'utf8').toString();
if (existedDicData.endsWith('\n')) {
  existedDicData = existedDicData.slice(0, existedDicData.length-1);
}
const newLine = 'silence sil';

fs.writeFileSync(savingPath, existedDicData + '\n' + newLine, 'utf8');

const tempFile = savingPath + '.tmp'
const sortit = 'sort ' + savingPath + ' > ' + tempFile;

execSyncShell(sortit);

const coverit = 'cat ' + tempFile + ' > ' + savingPath;

execSyncShell(coverit);

const omittmp = 'rm ' + tempFile;

execSyncShell(omittmp);

console.log('Done!');
