import Vue from 'vue'

Vue.filter('rising', function (price) {
    if (price * 1 > 0) return `+${(price * 1).toFixed(2)}%`
    return `${(price * 1).toFixed(2)}%`
})

Vue.filter('Fixed', function (price, num) {
    if (price == 0) return (0).toFixed(num)
    if (!price) return 0;
    return (price * 1).toFixed(num);
})

Vue.filter('notation', function (number) {
    const str = (number * 1).toFixed(8)
    const length = str.length
    for (let i = length; i >= 0; i--) {
        if (str[i - 1] != '0') {
            return str.substring(0, str[i - 1] != '.' ? i : i - 1)
        }
    }
    return number * 1
})

Vue.filter('times', function (times, num) {
    if (!times || times.indexOf('-') == -1) return times
    if (num == 0) return times.split(' ')[0]
    if (num == 1) return times.split(' ')[1]
    return times.split('-')[1] + '-' + times.split('-')[2]
})

Vue.filter('tofixed', function (number) {
    let realVal = parseFloat(number).toFixed(2)
    console.log(realVal);
    return realVal;
})