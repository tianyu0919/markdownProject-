/*
 * @Author: 卢天宇
 * @Date: 2022-07-29 00:15:54
 * @Description: 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/layout/App';
import "normalize.css";
import 'antd/dist/antd.css'

const container = document.querySelector('#container');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
