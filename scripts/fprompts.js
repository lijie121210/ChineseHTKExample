// 17/02/27
// write by Jie
//
// 对HTK的HSGen生成的句子做二次处理
//
// Usage: node this.js sourceFilePath targetFilePath tagOfSentenceHead
/*
1. SENT-START 要 七 箱 银桥 红枣 牛奶 SENT-END
2. SENT-START 来 十 箱 银桥 核桃 牛奶 SENT-END
3. SENT-START 我 来 一 箱 银桥 红枣 牛奶 SENT-END
4. SENT-START 我 要 一 箱 银桥 纯 牛奶 SENT-END
5. SENT-START 我 来 十 箱 银桥 黑谷 牛奶 SENT-END
6. SENT-START 来 四 箱 银桥 纯 牛奶 SENT-END
*/

/// Require

var fs = require('fs');

/// Methods

// 这个处理是把序号数字，变成固定长度的4位字符串，然后再在开头加上一个 tag;
function sentenceHead(index) {
  const head = "" + index;
  const pad = "0000";
  return tagOfSentenceHead + pad.substring(0, pad.length - head.length) + head;
}

// 得到句子中间的内容；
function sentenceContent(line) {
  // 用于匹配的正则表达式；
  const re = /(\d{1,3}\.\sSENT-START\s)(.+)(\sSENT-END\s)/;
  return line.toString().replace(re, '$2');

  /*
  // way 2:
  const re2 = /(SENT-START\s)(.+)(\sSENT-END\s)/;
  const arr = re2.exec(line.toString());
  return arr[2];
  */
}

///

const sourceFile = process.argv[2];
const targetFile = process.argv[3];
const tagOfSentenceHead = process.argv[4];

fs.readFileSync(sourceFile).toString().split('\n').forEach(function (line, index, arr) {
  // 最后一行是空的，排除；
  if (index+1 >= arr.length) {
    return;
  }

  const result = sentenceHead(index+1) + ' ' + sentenceContent(line) + "\n";

  // 写入文件；
  fs.appendFileSync(targetFile, result);
});
