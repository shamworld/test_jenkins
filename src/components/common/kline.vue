<template>
<div id="app" :class="[{whitebg:$route.query.bg=='1'},{blackbg:$route.query.bg=='0'}]">
  <div :class="['hex-chart flex-v']">
    <div class="hex-chart-plugin clearfix">
        <span
          class="flex-1"
          v-for="item in resolutionList"
          :class="['plugin_interval_tip hover',{'c-b':resolutionInterval==item.key}]"
          @click="setResolution(item)"
          :key="item.key"
        >{{item.value}}</span>
        <!-- <span class="hover" @click="setOtherWindows('insertIndicator')">indicators</span> -->
        <!-- <i :class="['iconfont icon-quanping hover',]" id="fullscreen" @click="fullscreenFun"></i> -->
    </div>
    <div class="chart-content flex1" :style="`height:${heights}`">
        <div id="hex-chart-content"
          ref="hex-chart-content"
          class="hex-chart-content hex-loading"></div>
    </div>
  </div>
</div>
</template>

<script>
import chartFeed from "./../js/chart-feed.js";
import chartprovider from "./../js/chart-provider";
import moment from "moment-timezone";
import TradingView from "./../js/chart-base";

const timezone = [
  "Etc/UTC",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Africa/Lagos",
  "America/Argentina/Buenos_Aires",
  "America/Bogota",
  "America/Caracas",
  "America/Chicago",
  "America/El_Salvador",
  "America/Juneau",
  "America/Lima",
  "America/Los_Angeles",
  "America/Mexico_City",
  "America/New_York",
  "America/Phoenix",
  "America/Santiago",
  "America/Sao_Paulo",
  "America/Toronto",
  "America/Vancouver",
  "Asia/Almaty",
  "Asia/Ashkhabad",
  "Asia/Bahrain",
  "Asia/Bangkok",
  "Asia/Chongqing",
  "Asia/Dubai",
  "Asia/Ho_Chi_Minh",
  "Asia/Hong_Kong",
  "Asia/Jakarta",
  "Asia/Jerusalem",
  "Asia/Kathmandu",
  "Asia/Kolkata",
  "Asia/Kuwait",
  "Asia/Muscat",
  "Asia/Qatar",
  "Asia/Riyadh",
  "Asia/Seoul",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Taipei",
  "Asia/Tehran",
  "Asia/Tokyo",
  "Atlantic/Reykjavik",
  "Australia/ACT",
  "Australia/Adelaide",
  "Australia/Brisbane",
  "Australia/Sydney",
  "Europe/Athens",
  "Europe/Belgrade",
  "Europe/Berlin",
  "Europe/Copenhagen",
  "Europe/Helsinki",
  "Europe/Istanbul",
  "Europe/London",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Moscow",
  "Europe/Paris",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Vilnius",
  "Europe/Warsaw",
  "Europe/Zurich",
  "Pacific/Auckland",
  "Pacific/Chatham",
  "Pacific/Fakaofo",
  "Pacific/Honolulu",
  "Pacific/Norfolk",
  "US/Mountain"
];
export default {
  name: "kline",
  data() {
    return {
      resolutionList: [
        { key: 1, interval: "", range: "", value: this.$t('home.time') },
        { key: 2, interval: "1", range: 1, value: "1M" },
        { key: 3, interval: "5", range: 5, value: "5M" },
        { key: 4, interval: "15", range: 15, value: "15M" },
        { key: 5, interval: "30", range: 30, value: "30M" },
        { key: 6, interval: "60", range: 60, value: "1H" },
        { key: 7, interval: "1D", range: 1440, value: "1D" }
        // { key: 8, interval: "1W", range: 10080, value: "1week" }
      ],
      coinObj: {},
      // bg: "#24303F",//2e323d
      widgetloading: false,
      widgetReady: false,
      history: {},
      resolutionInterval: 2,
      range: 60000,
      feed: null,
      bars: [],
      dayOverrides: {
        'scalesProperties.backgroundColor': "#ffffff",
        'paneProperties.background': "#ffffff",
        'scalesProperties.lineColor': "#DDDDE4",
      },
      nightOverrides: {
        'scalesProperties.backgroundColor': "#132238",
        'paneProperties.background': "#132238",
        'scalesProperties.lineColor': "#383655",
      },
      defaultOverrides: {
        editorFontsList: [""],
        volumePaneSize: "small", //成交量占图比例
        //表格线
        "paneProperties.background": "#0C1724",
        "paneProperties.crossHairProperties.color": "#646B8C",
        "paneProperties.crossHairProperties.width": 1,
        "paneProperties.crossHairProperties.style": 0,
        "paneProperties.vertGridProperties.color": "RGBA(61, 118, 76, 0.15)",
        "paneProperties.horzGridProperties.color": "RGBA(61, 118, 76, 0.15)",
        // //刻度线
        // "scalesProperties.backgroundColor": "#24303F",
        // "scalesProperties.fontSize": 11,
        // "scalesProperties.lineColor": "#383655",
        // "scalesProperties.textColor": "#646B8C",
        //蜡烛
        "mainSeriesProperties.candleStyle.upColor": "#46B05D",
        "mainSeriesProperties.candleStyle.downColor": "#CD4559",
        "mainSeriesProperties.candleStyle.drawWick": true,
        "mainSeriesProperties.candleStyle.drawBorder": false,
        "mainSeriesProperties.candleStyle.wickUpColor": "#46B05D",
        "mainSeriesProperties.candleStyle.wickDownColor": "#CD4559",
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
        // //分时线
        // "mainSeriesProperties.areaStyle.color1": "rgba(111, 143, 241, 0.05)",
        // "mainSeriesProperties.areaStyle.color2": "rgba(111, 143, 241, 0.02)",
        // "mainSeriesProperties.areaStyle.linecolor": "#6f8ff1",
        // "mainSeriesProperties.areaStyle.linestyle": 0,
        // "mainSeriesProperties.areaStyle.linewidth": 1,
        // "mainSeriesProperties.areaStyle.priceSource": "close"
      },
      sub: "",
      timezone: "",
      heights:'90%',
    };
  },
  created() {
    this.heights = document.documentElement.clientWidth>375?'90%':'83%';
    // this.getcoinObj();
  },
  mounted() {
    this.widgetloading = true;
    this.initView();
    this.fullscreenJs();
  },
  watch: {
    widgetReady: function(val) {
      if (val) {
        this.hideLegend();
        this.setAverage(5, "#f9ffea");
        // this.setAverage(10, "#5eff00");
        // this.setAverage(30, "#ff13e0");
      }
    },
    $route: "initView"
  },
  beforeDestroy() {
    console.log(chartprovider);
    
    for (const _t in chartprovider.timer) {
      clearTimeout(chartprovider.timer[_t]);
      chartprovider.timer[_t] = -1;
    }
    for (const _t in chartprovider.pollingtimer) {
      clearTimeout(chartprovider.pollingtimer[_t]);
      chartprovider.pollingtimer[_t] = -1;
    }
  },
  computed: {
    from() {
      return this.$route.query.name || "";
    },
    to() {
      return "";
    },
    symbleParameString: function() {
      return this.from + this.to;
    }
  },
  methods: {
    
    hideLegend() {
      let clickEvent;
      if (document.createEvent) {
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
      } else {
        clickEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false
        });
      }
      const contentWindow = document.getElementById(this.widget._id)
        .contentWindow;
      const a = contentWindow.document.querySelector(
        "a.pane-legend-minbtn.apply-common-tooltip.apply"
      );
      if (a) {
        a.dispatchEvent(clickEvent);
      }
    },
    setResolution(time) {
      this.resolutionInterval = time.key;
      if (time.key == 1) {
        this.setChartType("STYLE_AREA");
        return;
      }
      try {
        for (let i in chartprovider.history) {
          delete chartprovider.history[i].firstBar;
        }
        this.range = time.range * 60000;
        const chart = this.selectChartType("STYLE_CANDLES");
        this.widget.chart().setChartType(chart);
        this.widget.chart().setResolution(time.interval, function(e) {});
      } catch (e) {}
    },
    selectChartType(type) {
      let typenum;
      switch (type) {
        case "STYLE_BARS":
          typenum = 0;
          break;
        case "STYLE_CANDLES":
          typenum = 1;
          break;
        case "STYLE_AREA":
          typenum = 3;
          break;
        case "STYLE_LINE":
          typenum = 2;
          break;
        case "STYLE_HEIKEN_ASHI":
          typenum = 8;
          break;
      }
      return typenum;
    },
    //设置图表类型
    setChartType(type) {
      try {
        const chart = this.selectChartType(type);
        this.widget.chart().setChartType(chart);
        this.widget.chart().resetData();
      } catch (e) {}
    },
    //设置弹窗
    setOtherWindows(val) {
      this.widget.chart().executeActionById(val);
    },
    setAverage(time, color) {
      this.widget
        .chart()
        .createStudy(
          "Moving Average",
          false,
          false,
          [time],
          function(guid) {},
          { "plot.color.0": color }
        );
    },
    initView() {
      let this_vue = this;

      let tz = moment.tz.guess();
      if (timezone.indexOf(tz) < 0) {
        tz = "Etc/UTC";
      }
      
      this.timezone = tz;
      this.feed = chartFeed.createFeed(this_vue);
      this.widget = new TradingView.widget({
        debug: false,
        autosize: true,
        interval: 1,//默认第几分钟
        timezone: tz,
        container_id: "hex-chart-content",
        datafeed: this.feed,
        // library_path: "/chart/",
        library_path: "/static/chart/",
        locale: "zh",
        disabled_features: [
          "header_widget_dom_node",
          "save_chart_properties_to_local_storage",
          "use_localstorage_for_settings",
          "volume_force_overlay",
          "timeframes_toolbar", //底部时间栏
          "header_screenshot", //快照
          "header_saveload", //保存
          "adaptive_logo",
          "header_symbol_search", //头部搜索
          "header_chart_type",
          "header_indicators",
          "header_undo_redo",
          "header_compare",
          "header_resolutions",
          "items_favoriting",
          "header_interval_dialog_button",
          "show_interval_dialog_on_key_press"
        ],
        studies_overrides: {
          //显示交易量的移动平均线
          //"volume.show ma": true,
          "volume.show": true
        },
        overrides: Object.assign(this.defaultOverrides, this.$route.query.bg == '1' ? this.dayOverrides : {}, this.$route.query.bg == '0'?this.nightOverrides:{}),
        custom_css_url: "css/hex.css",
        enabled_features: [
          "move_logo_to_main_pane",
          "study_templates",
          "hide_left_toolbar_by_default"
        ],
        preset: "mobile",
        charts_storage_url: "http://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id"
      });
      this.widget.onChartReady(() => {
        const wd = document.getElementById(this.widget._id);
        wd.style.visibility = "visible";
        this.widgetloading = false;

        this.widgetReady = true;
      });
    },
    fullscreenJs(){
      (function(){
        var sdk = window.SDK || {};
        sdk.goFull = function(){
          window.top.postMessage({ action: "goFull" }, "*")
        };
        window.SDK = sdk;
      })();
    },
    fullscreenFun(){
      try{
        kline.fullscreenFun();
      }catch(e){
        try{
          fullscreenFun();
        }catch(e){
          window.SDK.goFull();
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
//chart_tooltip
$cl_008: #008ee6;
$cl_46b: #46b05d;
$cl_999: #999999;
$cl_ea0: #ea003d;
$cl_333: #333333;
$cl_fff: #ffffff;
$cl_f5a: #f5a623;
$cl_f0e: #f0eff7;
$cl_c9c: #c9c8cc;
$cl_666: #666666;
$cl_dbd: #dbdaea;
$cl_858_2: RGBA(133, 131, 172, 0.2);
$cl_bbb: #bbbbbb;
$cl_f9f: #f9f9fb;
$cl_cd4: #cd4559;
$cl_ddd: #dddddd;
$cl_858: #8583ac;
$cl_f5f: #f5f5f8;
$cl_1d1: #1d1d34;
$cl_383: #383655;
$cl_f0f: #f0f0f0;
$cl_000: #000000;
$cl_289: #2895fb;
$cl_aaa: #aaaaaa;
$cl_e1e: #e1e0ec;
$cl_1a2: #1a2134;
$cl_262: #262b42;
$cl_1c1: #1c1b36;
$cl_242: #242438;
$cl_181: #181729;
$cl_232: #23233f;
$cl_c5c: #c5c3dd;
$cl_f1f: #f1f4f8;
$cl_212: #21283e;
$cl_37b_00a: linear-gradient(
  90deg,
  rgba(55, 191, 242, 1) 0%,
  rgba(0, 174, 239, 1) 100%
);
$cl_00e_24d: linear-gradient(
  90deg,
  rgba(0, 230, 166, 1) 0%,
  rgba(36, 208, 137, 1) 100%
);
$cl_faf: #fafafd;
$cl_838: #838cac;
$cl_e96: #e96c42;
$cl_646: #646b8c;
$cl_cec: #cecde1;
$cl_344: #344b6c;
$cl_515: rgba(51, 51, 51, 1);
$cl_153: rgba(153, 153, 153, 1);


$cl_global: #13161c;
$cl_content:#0C1724;
$cl_buy: #03bf7b;
$cl_sell: #e96c42;
$cl_link: rgba(111, 143, 241, 1);
$cl_link_hover: linear-gradient(
  135deg,
  rgba(158, 182, 255, 1) 0%,
  rgba(141, 168, 250, 1) 100%
);

$cl_8790A1: #8790a1;
$cl_292E39: #292e39;
$cl_5E6573: #5e6573;
$cl_CED3DD: #ced3dd;
$cl_282D37: #282d37;
$cl_171B23: #171b23;
.hex-chart.fullscreen{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}
#app.blackbg{
  background-color: #0C1724;
  .hex-chart-content,
  .hex-chart-plugin{
    background-color: #0C1724;
    border-color: #151F30;
    span.c-b,
    span:hover{
      background-color: rgba(255,255,255,0.05);
    }
  }
}
#app.whitebg{
  background-color: #fff;
  .hex-chart-content,
  .hex-chart-plugin{
    background-color: #fff;
    border-color: #eaf6ff;
    span.c-b,
    span:hover{
      background-color: #eaf6ff;
    }
    .js-rootresizer__contents{
      background: #fff!important;
    }
  }
}
.flex1 {            
    -webkit-flex: 1;        /* Chrome */  
    -ms-flex: 1;             /* IE 10 */  
    flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
.hex-chart {
  height: 100%;
  .hex-chart-plugin {
    font-size: 12px;
    // border-bottom: 1px solid $cl_292E39;
    background-color: $cl_content;
    margin-bottom: 5px;
    color: $cl_8790A1;
    display: flex;
    span {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      
      &.c-b,
      &:hover {
        background: #2B8EF3;
        color: #fff;
        border-radius: 10px;
      }
    }
    i.iconfont {
      float: right;
      line-height: 30px;
      padding: 0 10px;
    }
  }
  .chart-content {
    width: 100%;
    .hex-chart-content {
      width: 100%;
      height: 100%;
      background: $cl_content;
    }
  }
}

#app{
    width: 100%;
    height: 100%;
    background: rgb(27,39,45);
    overflow: hidden;
}
.c-b{
    color: #4378eb;
}

.flex{
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    height: 100%;
 }
 .flex1 {            
    -webkit-flex: 1;        /* Chrome */  
    -ms-flex: 1;             /* IE 10 */  
    flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
.flex-v {
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
}
.flex-vr {
    -webkit-flex-direction: column-reverse;
    -moz-flex-direction: column-reverse;
    -ms-flex-direction: column-reverse;
    -o-flex-direction: column-reverse;
    flex-direction: column-reverse;
}
.flt{
    float: left;
}
.clearfix:after{
    content: "";
    display: block;
    clear: both;
}

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
