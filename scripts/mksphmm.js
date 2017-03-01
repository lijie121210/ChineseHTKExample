// 17/02/28
// write by Jie
//
// 依据三次重估后的不含sp音素的hmmdefs，生成sp的hmm；
// 步骤：拷贝hmmdefs的sil模型的中间状态，做为sp模型的唯一状态；然后创建一个新的hmmdefs文件，并将sp的hmm添加进去；
//
// Usage: node this.js silHMMPath spHMMPath

// Require

var fs = require('fs');

// Parameters

const silPath = process.argv[2];
var spPath = process.argv[3];

if (spPath.slice(-1) !== '/') {
  spPath += '/hmmdefs'
} else {
  spPath += 'hmmdefs'
}

// Methods

// 生成sp的hmm定义
function sphmmOf(mean, variance, gconst, transp) {
  const sphmm = '~h "sp"\n<BEGINHMM>\n<NUMSTATES> 3\n<STATE> 2\n' +
                '<MEAN> 39\n' + mean + '\n' +
                '<VARIANCE> 39\n' + variance + '\n' +
                '<GCONST>' + gconst + '\n' +
                '<TRANSP> 3\n' + transp +
                '<ENDHMM>';
  return sphmm
}

// 解析原hmmdefs文件，得到sp模型的参数，返回包含这些参数的字典
function parseFile(silFilePath) {
  const originalData = fs.readFileSync(silPath, 'utf8').toString();
  const originalHMMs = originalData.split('\n');
  const silstartindex = originalHMMs.indexOf('~h "sil"');
  if (silstartindex === -1) {
    console.log('Error: fetching ~h "sil"\n');
    return null;
  }

  // The next 28 lines contains sil hmm definition.
  const silHMM = originalHMMs.slice(silstartindex, silstartindex + 28);

  if (silHMM.slice(-1).toString() !== '<ENDHMM>') {
    console.log('Error: fetching sil hmm definition\n');
    return null;
  }

  const centerStateIndex = silHMM.indexOf('<STATE> 3');
  if (centerStateIndex === -1) {
    console.log('Error: fetching center state\n');
    return null;
  }

  var mean = silHMM[centerStateIndex + 2];
  var variance = silHMM[centerStateIndex + 4];
  var gconst = ( /(<GCONST>\s)(.*)/.exec(silHMM[centerStateIndex + 5]) )[2];
  var transp = '';
  silHMM.slice(silHMM.length-6, silHMM.length-1).forEach((val, ind) => {
    if (ind % 2 !== 0) return;
    var i = ind / 2;
    transp += val.trim().split(' ').slice(i, i+3).join(' ') + '\n';
  });

  return {
    data: originalData,
    mean: mean,
    variance: variance,
    gconst: gconst,
    transp: transp
  }
}

function makeNewHMMFile(silFilePath, spFilePath) {

  const hmmdef = parseFile(silFilePath);
  if (hmmdef === null) {
    console.log('Error: parse file failed!\n');
    return
  }

  const sphmm = sphmmOf(hmmdef.mean, hmmdef.variance, hmmdef.gconst, hmmdef.transp);

  const result = hmmdef.data + '\n' + sphmm + '\n';

  fs.writeFileSync(spFilePath, result, 'utf8');
}

// Run

makeNewHMMFile(silPath, spPath)
