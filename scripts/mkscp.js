// 17/02/27
// write by Jie
//
// 生成HTK的HCopy的codetr.scp, train.scp or codete.scp, test.scp
// codetr.scp and codete.scp is 数据文件 与 特征文件 的映射列表文件
// train.scp and test.scp is 特征文件列表
//
// Usage:
// 同时生成映射文件和特征文件列表: node this.js -a type countOfLine audioDataPath mfcPath
// 只生成映射文件：             node this.js -m type countOfLine audioDataPath mfcPath
// 只生成特征文件列表：          node this.js -f type countOfLine mfcPath

// Require

var fs = require('fs');

// Methods

// 这个处理是把序号数字，变成固定长度的4位字符串，然后再在开头加上一个 tag;
// - return : 'S0012' or 'T0121'
function titleOf(type, index) {
  const head = "" + index;
  const pad = "0000";
  return type + pad.substring(0, pad.length - head.length) + head;
}

function filenameOf(type) {
  if (type === 'S') {
    return { map: './codetr.scp', mfc: './train.scp' };
  } else {
    return { map: './codete.scp', mfc: './test.scp' };
  }
}

function pathOf(path) {
  var res = path;
  if (path.slice(-1) !== '/') {
    res += '/';
  }
  return res;
}

function makeMappingAndFeatureList(type, count, dataPath, mfcPath) {
  const filename = filenameOf(type);
  for (var i = 0; i < count; i++) {
    var title = titleOf(type, i+1);
    var data = pathOf(dataPath) + title + '.wav';
    var mfc = pathOf(mfcPath) + title + '.mfc' + '\n';
    fs.appendFileSync(filename.map, data + '  ' + mfc);
    fs.appendFileSync(filename.mfc, mfc);
  }
}

function makeMapping(type, count, dataPath, mfcPath) {
  const filename = filenameOf(type);
  for (var i = 0; i < count; i++) {
    var title = titleOf(type, i+1);
    var data = pathOf(dataPath) + title + '.wav';
    var mfc = pathOf(mfcPath) + title + '.mfc' + '\n'
    fs.appendFileSync(filename.map, data + '  ' + mfc);
  }
}

function makeFeatureList(type, count, mfcPath) {
  const filename = filenameOf(type);
  for (var i = 0; i < count; i++) {
    var title = titleOf(type, i+1);
    var mfc = pathOf(mfcPath) + title + '.mfc' + '\n'
    fs.appendFileSync(filename.mfc, mfc);
  }
}

// Run

const param = process.argv[2];
const type = process.argv[3]; // 'S', 'T'
const count = process.argv[4];

if ( param === '-a') {
  const dataPath = process.argv[5];
  const featPath = process.argv[6];

  makeMappingAndFeatureList(type, count, dataPath, featPath);
}
if (param === '-m') {
  const dataPath = process.argv[5];
  const featPath = process.argv[6];

  makeMapping(type, count, dataPath, featPath);
}
if (param === '-f') {
  const featPath = process.argv[5];

  makeFeatureList(type, count, featPath)
}
