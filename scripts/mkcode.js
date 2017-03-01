// 17/02/27
// write by Jie
//
// 生成HTK的HCopy的codetr.scp 和 codete.scp
//
// Usage: node this.js audioDataPath mfcPath type countOfLine

/// Require

var fs = require('fs');

/// Parameters

const sourcePath = process.argv[2];
const targetPath = process.argv[3];
const type = process.argv[4]; // 'S', 'T'
const count = process.argv[5];

/// Methods

// 这个处理是把序号数字，变成固定长度的4位字符串，然后再在开头加上一个 tag;
// - return : 'S0012' or 'T0121'
function titleOf(type, index) {
  const head = "" + index;
  const pad = "0000";
  return type + pad.substring(0, pad.length - head.length) + head;
}

/// - return : './codetr.scp' or './codete.scp'
function resultFile(type) {
  if (type === 'S') {
    return './codetr.scp';
  } else {
    return './codete.scp';
  }
}

for (var i = 0; i < count; i++) {
  var title = titleOf(type, i+1);
  var from = sourcePath + '/' + title + '.wav';
  var to = targetPath + '/' + title + '.mfc';

  var line = from + ' ' + to + "\n";

  fs.appendFileSync(resultFile(type), line);
}
