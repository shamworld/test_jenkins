export default {
  history: {},
  timer: {},
  pollingtimer: {},
  subs: [],
  init() {
    this.history = {}
    this.timer = {}
    this.subs = []
  },
  formatBar: function (data, this_vue, symbolInfo, overrides, newmoney) {
    const sub = this.subs.find(e => e.symbolInfo === symbolInfo.name)
    if (!sub) {
      return false
    }

    const lastBar = sub.lastBar
    const coeff = this_vue.range / 1000
    const lastBarSec = lastBar.time

    if (!Array.isArray(data)) {
      data = [data]
    }
    data.sort((a, b) => {
      return a.time - b.time
    })
    const bars = data.map(el => {
      const rounded = Math.floor(el.time / coeff) * coeff

      let _lastbar = {}
      // if (rounded > lastBarSec) {
        _lastbar = {
          low: el.low,
          high: el.high,
          open: el.open,
          close: el.close,
          volume: el.volume,
          time: el.time,
        }
      // } else {
      //   _lastbar = lastBar
      //   if (!newmoney && ((coeff/60).toString() == '1' || overrides)) {
      //     _lastbar.volume = el.vol
      //   }
      // }
      return _lastbar
    })

    let issub = true

    //是否订阅
    
    bars.forEach((item) => {
      const _last = item
      if (_last.time < lastBar.time) {
        return true
      }
      //更新最新一条k线
      setTimeout(() => {
        sub.listener(_last)
      }, 6)

      sub.lastBar = _last
      this.lastone = _last
      //this.history[symbolInfo.name].lastBar = _last
    })
    return issub
  },
  getLastBarsOther: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
  },
  getLastBars: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    const _self = this
    let etime = to * 1000
    if (this.history[symbolInfo.name] && this.history[symbolInfo.name].lastBar) {
      etime = this.history[symbolInfo.name].lastBar.time
    }
    const klineParam = {
      marketId:this_vue.$route.query.id,
      type: this_vue.range=='60000'?'1m':this_vue.range=='300000'?'5m':this_vue.range=='900000'?'15m':this_vue.range=='1800000'?'30m':this_vue.range=='3600000'?'1h':this_vue.range=='86400000'?'d':'1m',
    }
    // const pollTime = resolution=='1'?20000:60000
    const pollTime = 2000;
    const getKline = function () {
      this_vue.$axios.get('/rest/kline/last', {...klineParam},true)
        .then(({data}) => {
          if (data) {
            
            let list = [];
            list.push(data);
            
            list.sort((a, b) => {
              return a.time - b.time
            })
            const issub = _self.formatBar.call(_self, list, this_vue, symbolInfo)

            for (const _t in _self.pollingtimer) {
              clearTimeout(_self.pollingtimer[_t])
              _self.pollingtimer[_t] = -1
            }

            if (issub) {
              _self.pollingtimer[symbolInfo.name] = setTimeout(getKline, pollTime)
            }
          }
        })
        .catch(err=>{
          const issub = _self.formatBar.call(_self, [], this_vue, symbolInfo)
          for (const _t in _self.pollingtimer) {
            clearTimeout(_self.pollingtimer[_t])
            _self.pollingtimer[_t] = -1
          }
          if (issub) {
            _self.pollingtimer[symbolInfo.name] = setTimeout(getKline, pollTime)
          }
        })
    }
    getKline()
  },
  getBars: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    const klineParam = {
      marketId:this_vue.$route.query.id,
      type: this_vue.range=='60000'?'1m':this_vue.range=='300000'?'5m':this_vue.range=='900000'?'15m':this_vue.range=='1800000'?'30m':this_vue.range=='3600000'?'1h':this_vue.range=='86400000'?'d':'1m',
      limit: 200,
    }
    const _self = this
    const getKline = function () {
      return this_vue.$axios.get('/rest/kline/list', {...klineParam},true)
        .then(({data}) => {
          if (data&&data.lines&&data.lines.length&&data.lines[0].time) {
            data.lines.sort((a, b) => {
              return a.time - b.time
            })
            // const issub = _self.formatBar.call(_self, data.lines, this_vue, symbolInfo)

            for (const _t in _self.pollingtimer) {
              clearTimeout(_self.pollingtimer[_t])
              _self.pollingtimer[_t] = -1
            }
            
            // if (issub) {
              _self.pollingtimer[symbolInfo.name] = setTimeout(getKline, 20000)
            // }
            const bars = this_vue.bars = data.lines
            _self.history[symbolInfo.name] = {
              lastBar: bars[bars.length - 1],
              firstBar: bars[0]
            }
            return bars
          } else {
            return []
          }
        }).catch((err)=>{
          console.log(err);
          for (const _t in _self.pollingtimer) {
            clearTimeout(_self.pollingtimer[_t])
            _self.pollingtimer[_t] = -1
          }
          this_vue.loading.close();
          return []
        })
    }
    return getKline()
  },
}
