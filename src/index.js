/*
 * @Author: your name
 * @Date: 2021-09-27 14:57:56
 * @LastEditTime: 2021-09-27 15:23:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qiankun-micro-react/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createHashHistory } from 'history';
const hashHistory = createHashHistory();

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function render() {
  console.log('*******微应用render');
  // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
  // router = new VueRouter({
  //   // 运行在主应用中时，添加路由命名空间 /vue
  //   base: window.__POWERED_BY_QIANKUN__ ? "/vue" : "/",
  //   mode: "history",
  //   routes,
  // });
  const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/react" : "";

  ReactDOM.render(
    <React.StrictMode>
       <Router history={hashHistory} basename={BASE_NAME}>
        <Route path="/" component={App}/>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("VueMicroApp bootstraped");
  window.localStorage.setItem('name', 'Stephen Curry')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("VueMicroApp mount", props);
  console.log('localStorage-name: ',window.localStorage.getItem('name'));
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  console.log("VueMicroApp unmount");
  // instance.$destroy();
  // instance = null;
  // router = null;
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
