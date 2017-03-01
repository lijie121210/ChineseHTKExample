// 17/02/27
// write by Jie
//
// 生成HTK的HCompV的train.scp
//
// Usage: node this.js mfcPath countOfLine

/// Require

var fs = require('fs');

/// Parameters

const sourcePath = process.argv[2];
const count = process.argv[3];

/// Methods

// - return : 'S0012' ...
function titleOf(index) {
  const head = "" + index;
  const pad = "0000";
  return 'S' + pad.substring(0, pad.length - head.length) + head;
}

for (var i = 0; i < count; i++) {
  var line = sourcePath + '/' + titleOf(i+1) + '.mfc' + '\n';

  fs.appendFileSync('./train.scp', line);
}
