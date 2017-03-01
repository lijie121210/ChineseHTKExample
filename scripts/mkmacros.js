// 17/02/27
// write by Jie
//
// 依据vFloors生成macros和hmmdefs
//
// Usage: node this.js vFloorsPath

/// Require

var fs = require('fs');

/// Parameters

const vPath = process.argv[2];

const prompts = "~o\n<VECSIZE>39<MFCC_0_D_A>\n";

fs.readFile(vPath, 'utf8', (err, data) => {

  if (err) throw err;

  var result = prompts + data.toString();
  console.log(result);

  fs.writeFile('./macros', result, 'utf8', (err) => {

    if (err) throw err;

    console.log('Done!');
  });

});
