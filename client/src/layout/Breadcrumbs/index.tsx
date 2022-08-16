/*
 * @Author: 归宿
 * @Date: 2022-08-15 15:33:51
 * @Description: 面包屑导航部分
 */
import React, { useEffect, useState } from 'react';
import styles from './index.modules.less';
import classNames from 'classnames';
import store from '@src/store';
import { toggle as showMenu1 } from '@src/store/modules/showMenu';
import { Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const Breadcrumbs = () => {

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log('xxx');
    console.log(store.getState());
  }, []);

  return (
    <div className={classNames(styles.BreadCrumbsBox)}>
      <div
        className={classNames(styles.BreadCrumbsLeftButtonBox)}
      >
        <div
          className={classNames(styles.BreadCrumbsLeftButton)}
          onClick={(): void => {
            setShowMenu(!showMenu);
            store.dispatch(showMenu1(!showMenu))
          }}>
          <Button type="primary" size="small">{!showMenu ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}</Button>
        </div>
        Breadcrumbs
      </div>
      <div className={classNames(styles.BreadCrumbsTitle)}>登录</div>
    </div>
  )
}

export default Breadcrumbs;