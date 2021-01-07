import stream from './chart-stream.js'
import historyProvider from './chart-provider.js'

// const resolutions = ["1", "5", "15", "30", "60", "1D", "1W"]
const resolutions = ["1", "5", "15", "30" , "60", "1D"]

export default {
  //创建feed
  createFeed: function (this_vue) {
    historyProvider.init()
    // console.log(this_vue);
    
    return {
      onReady: cb => {
        setTimeout(() => cb({
          supported_resolutions: resolutions
        }), 0)
      },
      searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        const symbol_stub = {
          name: this_vue.from + ":" + this_vue.to,
          ticker: this_vue.from + ":" + this_vue.to,
          type: 'crypto',
          session: '24x7',
          regular_session: '24x7',
          minmov: 1,
          pricescale: 100,//小数点位数
          has_intraday: true,
          has_daily: true,
          has_weekly_and_monthly: true,
          volume_precision: 8,
          data_status: 'streaming',
          intraday_multipliers: resolutions,
          timezone: this_vue.timezone
        }
        setTimeout(() => {
          onSymbolResolvedCallback(symbol_stub)
        }, 0)
      },
      getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
        historyProvider.getBars(this_vue, symbolInfo, resolution, from, to, firstDataRequest)
          .then(bars => {
            if (bars.length) {
              setTimeout(() => {
                onHistoryCallback(bars, {noData: false})
                if (firstDataRequest) {
                  //监听最后一条数据socket
                  historyProvider.getLastBars(this_vue, symbolInfo, resolution, from, to, firstDataRequest)
                  /*获取最后一条数据接口*/
                  // historyProvider.getLastBarsOther(this_vue, symbolInfo, resolution, from, to, firstDataRequest)
                }
              }, 6)
            } else {
              setTimeout(() => {
                onHistoryCallback(bars, {noData: true})
              }, 6)
            }
          }).catch(err => {
            onErrorCallback(err)
          })
      },
      subscribeBars: (symbolInfo, resolution, onTick, subscriberUID, onResetCacheNeededCallback) => {
        stream.subscribeBars(symbolInfo, resolution, onTick, subscriberUID, onResetCacheNeededCallback)
      },
      unsubscribeBars: subscriberUID => {
        stream.unsubscribeBars(subscriberUID)
      },
      calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
      },
      getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
        //optional
      },
      getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
        //optional
      },
      getServerTime: cb => {

      }
    }
  }
}
