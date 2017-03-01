// 17/02/27
// write by Jie
//
// 依据proto和monophones生成hmmdefs
//
// Usage: node this.js vFloorsPath protoPath monophonesPath targetPathToSaveResult

// Require

var fs = require('fs');

// Parameters

const vPath = process.argv[2];
const pPath = process.argv[3];
const mPath = process.argv[4];
const tPath = process.argv[5];

// Methods

function makeMacros(vFloorsPath, targetPath) {
  const prompts = "~o\n<VECSIZE>39<MFCC_0_D_A>\n";
  const variance = fs.readFileSync(vFloorsPath, 'utf8').toString();
  const result = prompts + variance;
  fs.writeFileSync(targetPath, result, 'utf8');
}

function makeHmmdefs(protoPath, monophonesPath, targetPath) {
  const hmm = fs.readFileSync(protoPath, 'utf8').toString().split('\n').slice(4).join('\n');
  fs.readFileSync(monophonesPath, 'utf8').toString().split('\n').forEach((line, index, arr) => {

    if (line === '' || line === ' ' || line === "\n" || line === " \n") return;

    fs.appendFileSync(targetPath, '~h'+'"'+line+'"'+'\n'+hmm+'\n');
  });
}

// Run

var macrosPath = tPath;
var hmmdefPath = tPath;

if (tPath.slice(-1) === '/') {
  macrosPath += 'macros';
  hmmdefPath += 'hmmdefs';
} else {
  macrosPath += '/macros';
  hmmdefPath += '/hmmdefs';
}

makeMacros(vPath, macrosPath);

console.log('make macros done!');

makeHmmdefs(pPath, mPath, hmmdefPath);

console.log('make hmmdefs done!');
