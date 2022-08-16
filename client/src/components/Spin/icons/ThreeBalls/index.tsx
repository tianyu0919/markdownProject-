/*
 * @Author: 归宿
 * @Date: 2022-08-12 17:25:15
 * @Description: 
 */
import React from 'react';
import classNames from 'classnames';
import styles from './index.modules.less';
// import './index.less';
export default function ThreeBalls() {
  return (
    <div className={classNames(styles.threeBallsBox)}>
      <div className={classNames(styles.circle)}></div>
      <div className={classNames(styles.circle)}></div>
      <div className={classNames(styles.circle)}></div>
      <div className={classNames(styles.shadow)}></div>
      <div className={classNames(styles.shadow)}></div>
      <div className={classNames(styles.shadow)}></div>
    </div>

    // <div className={classNames('threeBallsBox')}>
    //   <div className={classNames('circle')}></div>
    //   <div className={classNames('circle')}></div>
    //   <div className={classNames('circle')}></div>
    //   <div className={classNames('shadow')}></div>
    //   <div className={classNames('shadow')}></div>
    //   <div className={classNames('shadow')}></div>
    // </div>
  )
}

ThreeBalls.height = 70;