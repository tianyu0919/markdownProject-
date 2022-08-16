/*
 * @Author: 卢天宇
 * @Date: 2022-07-29 00:15:24
 * @Description: 主页
 */
import React, { useState } from 'react';
import styles from './App.modules.less';
import LeftMenu from './Menu';
import Content from './Content';
import Breadcrumbs from './Breadcrumbs';

const App: React.FC = (): React.ReactElement => {
  const [path, setPath] = useState<string | null>(null);

  return (
    <div className={styles.App}>
      <div className={styles.LeftMenu}>
        <LeftMenu setPath={setPath} />
      </div>
      <div className={styles.ContentContainer}>
        <Breadcrumbs />
        <Content path={path} />
      </div>
    </div>
  );
}

export default App;