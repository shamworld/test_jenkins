import historyProvider from './chart-provider.js'

export default {
  subscribeBars: function (symbolInfo, resolution, updateCb, uid, resetCache) {
    const newSub = {
      uid,
      resolution,
      symbolInfo: symbolInfo.name,
      lastBar: historyProvider.history[symbolInfo.name] ? historyProvider.history[symbolInfo.name].lastBar : null,
      listener: updateCb,
    }
    historyProvider.subs.push(newSub)
  },
  unsubscribeBars: function (uid) {
    const subIndex = historyProvider.subs.findIndex(e => e.uid === uid)
    if (subIndex === -1) {
      return
    }
    historyProvider.subs.splice(subIndex, 1)
  }
}
