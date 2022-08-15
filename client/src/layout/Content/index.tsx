/*
 * @Author: 卢天宇
 * @Date: 2022-07-29 23:00:53
 * @Description: 内容区域
 */
import React, { useState, useEffect } from 'react'
import styles from './index.modules.less';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import Spin from '@components/Spin';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, okaidia, oneDark, oneLight, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm'; // * 将链接转换为可以点击的
import RemarkHTML from "remark-html";
import request from '@src/request';

import ss from './index.less';

const s = 1;

interface ContentProps {
  path: null | string;
}

export default function Content(props: ContentProps) {
  const { path } = props;
  const [md, setMd] = useState<null | string>(null);
  const [showSpin, setShowSpin] = useState(false);

  const getContentMd = () => {
    setShowSpin(true);
    request.get('http://localhost:3001/api/content/getContentMd', {
      params: {
        path
      }
    }).then(({ data }) => {
      setMd(data);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setTimeout(() => {
        setShowSpin(false);

      }, 3000)
    })
  }

  useEffect(() => {
    if (path) {
      getContentMd();
    }
  }, [path]);

  return (
    <div className={classNames(styles.ContentContainer)}>
      <div className={classNames(styles.markdownBox)}>
        <Spin spinning={showSpin} tip={'加载中，请稍后...'} type="threeBalls" LoadingContentHeight='calc(100vh - 20px)'>
          <ReactMarkdown
            remarkPlugins={[RemarkHTML, remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                // return !inline && match ? (
                return match ? (
                  <SyntaxHighlighter
                    showLineNumbers={true}
                    lineNumberStyle={{ color: '#ccc', fontSize: 10 }} // 左侧行数的样式
                    style={oneDark as any}
                    language={'tsx'}
                    PreTag='div'
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {md || ""}
          </ReactMarkdown>
        </Spin>
      </div>
    </div >
  )
}
