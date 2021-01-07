/*
 * @message: 文件描述
 * @Author: Jack
 * @Email: Jack@163.com
 * @Github: Jack@163.com
 * @Date: 2020-07-20 22:30:56
 * @LastEditors: Roy
 * @LastEditTime: 2020-11-10 19:02:41
 * @Deprecated: 否
 * @FilePath: /hp_h5/src/api/request.js
 */
import axios from "axios";
import qs from "qs";
import { Toast } from "vant";
import storage from "storejs";
//添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // config.baseURL = process.env.API_ROOT
    config.headers.language = window.vm.$storage("locale") || "cn";
    // if (localStorage.getItem("tokens") != null &&
    //   localStorage.getItem("tokens") != undefined &&
    //   config.url.indexOf('/user/login') == -1
    //   // token如果存在并且不是登录接口，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，
    //   //在这里插一嘴axios的请求设置头name后台接收时必须也设置接收这个请求头name（一一对应）,否者会报415
    // ) {
    //   config.headers["token"] = localStorage.getItem("tokens");
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // token 已过期，跳转到初始页
    // if (response.data.code == 40301) {
    //   localStorage.clear()
    //   router.replace({
    //     path: '/',
    //   })
    // }
    return response;
  },
  (error) => {
    return Promise.resolve(error.response);
  }
);
// axios.defaults.baseURL = "http://192.168.0.142:8078";
axios.defaults.baseURL = "http://api.hpl.plus";
// axios.defaults.baseURL = "http://159.138.11.173:8078"; //测试
// axios.defaults.headers["XX-Device-Type"] = "mobile";
// axios.defaults.headers["XX-Api-Version"] = "1.0.0";
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers['Access-Control-Allow-Headers']='Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild';
// axios.defaults.headers['Access-Control-Allow-Origin']='*';
// axios.defaults.headers['access-control-allow-credentials'] = false;
axios.defaults.withCredentials = false; //设置后默认不带cookie
axios.defaults.timeout = 60000;

function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if (
      response &&
      (response.status === 200 ||
        response.status === 304 ||
        response.status === 400)
    ) {
      // console.log(response);
      if (response.data.code === 200) {
        resolve(response.data);
      } else if (response.data.list) {
        resolve(response.data);
      } else {
        Toast.clear();
        Toast(response.data.msg);

        if (response.data.code == 210 || response.data.code == 9002) {
          localStorage.removeItem("isLogin");
          localStorage.removeItem("tokens");
          window.vm.$router.push("/login");
        }
        // Toast(response.data.msg);
      }
    } else {
      Toast.clear();
      Toast('网络或服务器异常');
      reject({
        state: "0",
        message: "网络或服务器异常",
      });
    }
  });
}

export default {
  post(url, params) {
    // axios.defaults.baseURL = baseUrl;
    return axios({
      method: "post",
      url,
      data: params,
      headers: { token: storage("tokens") },
    }).then((response) => {
      return checkStatus(response);
    })
      .catch((err) => {
        return checkStatus(err);
      })
  },
  get(url, params) {
    // params = qs.stringify(params);
    // axios.defaults.baseURL = baseUrl;

    return axios({
      method: "get",
      url,
      headers: { token: storage("tokens") },
      params,
    }).then((response) => {
      return checkStatus(response);
    })
      .catch((err) => {
        return checkStatus(err);
      })
  },
  upFile(url, data) {
    return axios({
      method: "post",
      url,
      headers: {
        "Content-Type": "multipart/form-data",
        token: storage("tokens")
      },
      data: data
    }).then(response => {
      return checkStatus(response);
    });
  },
};
