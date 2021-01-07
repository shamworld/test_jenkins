/*
 * @message: 描述
 * @Author: 徐聪
 * @Email: 15072443716@163.com
 * @Github: 15072443716@163.com
 * @Date: 2020-01-01 11:44:21
 * @LastEditors: 徐聪
 * @LastEditTime: 2020-04-16 10:31:00
 * @Deprecated: 否
 * @FilePath: /app-vue-framework/src/filters/index.js
 */
export function notation(num) {
  const str = (num * 1).toFixed(6);
  const length = str.length;
  for (let i = length; i >= 0; i--) {
    if (str[i - 1] != "0") {
      return str.substring(0, str[i - 1] != "." ? i : i + 2);
    }
  }
  return num * 1;
}

export function rising(price) {
  if (price * 1 > 0) return `+${(price * 1).toFixed(2)}%`;
  return `${(price * 1).toFixed(2)}%`;
}

export function Fixed(price, num) {
  if (price == 0) return (0).toFixed(num);
  if (!price) return 0;
  return (price * 1).toFixed(num);
}

export function Level(level) {
  switch (level) {
    case 0:
      return "无效会员"
      break;
    case 1:
      return "一星达人"
      break;
    case 2:
      return "二星达人"
      break;
    case 3:
      return "三星达人"
      break;
    case 4:
      return "四星达人"
      break;
    case 5:
      return "普通会员"
      break;
    default:
      break;
  }
}

export function times(times, num) {
  if (!times || times.indexOf("-") == -1) return times;
  if (num == 0) return times.split(" ")[0];
  if (num == 1) return times.split(" ")[1];
  return times.split("-")[1] + "-" + times.split("-")[2];
}


export function hideMiiddle(val){
  return `${val.substring(0,6)}****${val.substring(val.length-4)}`
}
