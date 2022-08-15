/*
 * @Author: 归宿
 * @Date: 2022-08-12 17:12:22
 * @Description: 
 */
import React from 'react'
import classNames from 'classnames';
import styles from './index.less';

export default function TwoBalls() {
  return (
    <div className={classNames(styles.TwoBallsBox)}>
      <div className={classNames(styles.TwoBallsItem, styles.pink)}></div>
      <div className={classNames(styles.TwoBallsItem, styles.blue)}></div>
    </div>
  )
}

TwoBalls.height = 20;
