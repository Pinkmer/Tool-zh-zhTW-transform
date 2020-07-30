const ztwJson = require('./ztwJson.js')

// 需排除:排除标点符号空格等等
const EXCLUDE_CHARS = {
  "，": "中文逗号",
  "。": "中文句号",
  "！": "中文感叹号",
  "：": "中文冒号"
};

// 单个简体字转繁体字
const changeCharZTW = (function changeCharZTW() {
  const cacheCharDic = {};
  return function (char) {
    if (!(typeof char === "string" && char.length === 1)) throw new Error('转换失败，参数须是单个汉字')
    if (EXCLUDE_CHARS[char]) {
      console.log('排除:', char)
      return char
    }
    if (cacheCharDic[char]) return cacheCharDic[char]
    if (ztwJson[char]) {
      return cacheCharDic[char] = ztwJson[char]
    } else {
      return char
    }
  }
})()

// 单行简体文本转繁体文本
const changeLineZTW = (function changeLineZTW() {
  const cacheLineDic = {}
  return function (line) {
    if (cacheLineDic[line]) return cacheLineDic[line]
    const TCLine = line.split(/\s*/).map(char => changeCharZTW(char)).join('');
    return cacheLineDic[line] = TCLine
  }
})()




module.exports = {
  changeCharZTW,
  changeLineZTW
}

