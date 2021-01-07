import Vue from 'vue';
import VueI18n from 'vue-i18n';
import storage from 'storejs'
import {Locale} from 'vant';


import cn from './zh-cn';
import en from './en';

Vue.use(VueI18n);

const messages = {
    'cn': cn,
    'en': en,
}

const i18n = new VueI18n({
    locale: storage('locale_gft') || 'cn',
    messages
})
// Locale.use((key, value) => i18n.t(key, value));

export default i18n
