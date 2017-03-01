// 17/02/27
// write by Jie
//
// 依据proto和monophones生成hmmdefs
//
// Usage: node this.js protoPath monophonesPath

/// Require

var fs = require('fs');

/// Parameters

const pPath = process.argv[2];
const mPath = process.argv[3];
const tPath = process.argv[4];

/// Methods

function mkHmmdefs(protoPath, monophonesPath, targetPath) {

  fs.readFile(pPath, 'utf8', (perr, pdata) => {

    if (perr) throw perr;

    const proto = pdata.toString().split('\n');
    const slicedproto = proto.slice(4, proto.length);
    const ahmm = slicedproto.join('\n');

    fs.readFile(mPath, 'utf8', (merr, mdata) => {

      if (merr) throw merr;

      mdata.toString().split('\n').forEach(function (line, index, arr) {

        const hmmdef = '~h' + '"' + line + '"' + '\n' + ahmm + '\n';

        fs.appendFileSync(targetPath, hmmdef);
      });
    });
  });
}

mkHmmdefs(pPath, mPath, tPath + '/hmmdefs')
