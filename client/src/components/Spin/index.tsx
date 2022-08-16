/*
 * @Author: 归宿
 * @Date: 2022-08-12 15:56:59
 * @Description: 
 */
import React, { cloneElement } from 'react'
import { SpinProps } from './Types';
import styles from './index.modules.less';
import classNames from 'classnames';
import themes from './icons';


const defaultProps = {
  type: 'twoBalls',
  LoadingContentHeight: "100%"
}

export default function Spin(props: SpinProps) {
  const { children, spinning, style, className, tip, type, LoadingContentHeight } = { ...defaultProps, ...props };
  const SpinIcon = themes[type] || <>type错误</>;
  const { height } = SpinIcon as unknown as { height: string };
  console.log(LoadingContentHeight)

  return (
    <div className={classNames({ [styles.spinBox]: true })} style={style || {}}>
      {
        spinning ? <div className={classNames(styles.SpinLoadingBox)} style={{ height: LoadingContentHeight }}>
          <div className={classNames(styles.SpinLoadingContent)}>
            <div className={classNames(styles.SpinLoadingIcon)} style={{ height: `${height}px` }}>
              <SpinIcon />
            </div>
            <div className={classNames(styles.SpinLoadingText)}>
              {tip}
            </div>
          </div>
        </div> : <></>
      }
      <div className={classNames(styles.spinBoxContent, { [styles.spinning]: spinning })}>
        {children}
      </div>
    </div>
  )
}
