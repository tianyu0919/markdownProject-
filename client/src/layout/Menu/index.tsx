/*
 * @Author: 卢天宇
 * @Date: 2022-07-29 22:49:26
 * @Description: Menu 导航栏
 */
import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import styles from './index.modules.less';
import classNames from 'classnames';
import { SelectInfo } from 'rc-menu/lib/interface';
import request from '@src/request';
import Spin from '@components/Spin';


interface MenuProps {
  setPath: React.Dispatch<React.SetStateAction<string | null>>
}

const LeftMenu: React.FC<MenuProps> = (props): React.ReactElement => {
  const { setPath } = props;
  const [items, setItems] = useState([
  ]);

  const [showSpin, setShowSpin] = useState(false);
  const [selectedKey, setSelectedKey] = useState(["Home"]);

  const selectedFn = (props: SelectInfo): void => {
    const { selectedKeys } = props;
    setSelectedKey(selectedKeys);
    setPath(selectedKeys[0]);
  }

  const getMenuList = (): void => {
    setShowSpin(true);
    request.get("http://localhost:3001/api/menu/getMenuList").then(({ data: result }) => {
      const { data, code } = result;
      if (code === 200) {
        console.log(data);
        // formatDataSetKey(data);
        setItems(data);
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setShowSpin(false);
    })
  }

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <div className={classNames(styles.menu_container)}>
      <div className={classNames(styles.menu_container_title)} onClick={() => {
        setShowSpin(!showSpin);
      }}>
        GuiSu Blog
      </div>
      <div className={classNames(styles.menu_container_content)}>
        {/* <Spin spinning={showSpin} tip="Loading..." wrapperClassName={'xxxxx'}> */}
        <Spin spinning={showSpin} tip="Loading..." LoadingContentHeight={'calc(100vh - var(--titleHeight))'} style={{ height: 'calc(100vh - var(--titleHeight))' }} type="threeBalls">
          <Menu
            mode="inline"
            onSelect={selectedFn}
            items={items}
            selectedKeys={selectedKey}
            style={{ height: '100%' }}
          />
        </Spin>
      </div>
    </div>
  )
}

export default LeftMenu;