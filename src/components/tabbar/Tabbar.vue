<!--
 * @message: 描述
 * @Author: 徐士杰
 * @Email: shijie10086@163.com
 * @Github: shijie10086@163.com
 * @Date: 2020-04-11 16:22:31
 * @LastEditors: Roy
 * @LastEditTime: 2020-10-20 19:47:54
 * @Deprecated: 否
 * @FilePath: /hp_h5/src/components/tabbar/Tabbar.vue
 -->
<template>
<div class="bottom-tab">
    <section class="tab-item" @click="switchTo('/home')">
        <van-image width="22px" height="22px" :src="$route.path.includes('/home') ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" />
        <span :class="{on: $route.path.includes('/home')}">{{$t('tabbar.home')}}</span>
    </section>
    <section class="tab-item" @click="switchTo('/market')">
        <van-image width="22px" height="22px" :src="$route.path.includes('/market') ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" />
        <span :class="{on:$route.path.includes('/market')}">{{$t('tabbar.trade')}}</span>
    </section>
    <section class="tab-item" @click="switchTo('/news')">
        <van-image width="22px" height="22px" :src="$route.path.includes('/news') ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" />
        <span :class="{on:$route.path.includes('/news')}">{{$t('tabbar.news')}}</span>
    </section>
    <section class="tab-item" @click="switchTo('/me')">
        <van-image width="22px" height="22px" :src="$route.path.includes('/me') ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" />
        <span :class="{on: $route.path.includes('/me')}">{{$t('tabbar.me')}}</span>
    </section>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: "Tabbar",
    data() {
        return {
            tabBarImgArr: [{
                    normal: require("./../../assets/tabbar/icon_sy02@2x.png"),
                    selected: require("./../../assets/tabbar/icon_sy01@2x.png"),
                },
                {
                    normal: require("./../../assets/tabbar/icon_hq02@2x.png"),
                    selected: require("./../../assets/tabbar/icon_hq01@2x.png"),
                },
                {
                    normal: require("./../../assets/tabbar/icon_zixun02@2x.png"),
                    selected: require("./../../assets/tabbar/icon_zixun01@2x.png"),
                },
                {
                    normal: require("./../../assets/tabbar/icon_wd02@2x.png"),
                    selected: require("./../../assets/tabbar/icon_wd01@2x.png"),
                },
            ],
        };
    },
    created() {},
    computed: {
        ...mapState({
            lang: (state) => state.lang,
        }),
    },
    methods: {
        switchTo(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style lang="scss" scoped>
.bottom-tab {
    width: 100%;
    height: 100px;
    background-color: #1f2b44;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 999;
}

.tab-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #70839c;
    border-top: 1px solid #2a2a2a;

    span {
        margin-bottom: 2px;
        margin-top: 10px;
        color: #70839c;
    }
}

.on {
    color: #2b8ef3;
}
</style>
