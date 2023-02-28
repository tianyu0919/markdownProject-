<!--
 * @Author: tianyu
 * @Date: 2023-02-03 16:02:15
 * @Description: 
-->
# 关于unified

基于 `AST(abstract syntax trees)` 抽象语法树进行解析，在线转换语法树例子链接：[astExplorer.net][astExplorer-url]

生态：

- [remark][remark-url]：转换 `markdown` 文件相关。
- [rehype][rehype-url]：转换 `html` 文件相关。

官网地址：[unified](https://unifiedjs.com/)，功能很多，本文根据 `html` 和 `markdown` 举例，本项目使用 [react-markdown][react-markdown-url] 来解析 `markdown` 文件用于前端展示。

相关插件：

- [remark-gfm][remark-gfm-url]: 用来解析表格，划线等 `markdown` 语法成 `html` 语法。
- [remark-html][remark-html-url]: 解析 `markdown` 转换成 `html` 文件。
- [react-syntax-highlighter][remark-syntax-highlighter-url]: 跟 `react-markdown` 一起使用，用于高亮 `code` 标签的代码。
- [remark-emoji][remark-emoji-url]: 解析 `markdown` 语法中的表情为 `emoji` 到 `html`。

项目中的例子：

```tsx
<ReactMarkdown
    remarkPlugins={[
      RemarkHTML,
      RemarkGfm,
      [
        RemarkEmoji,
        {
          emoticon: true,
        },
      ],
    ]}
    skipHtml={true}
    rehypePlugins={[rehypeRaw]}
    components={{
      code({ node, inline, className, children, ...props }) {
        console.log(className);
        const match = /language-(\w+)/.exec(className || "");
        return match ? (
          <SyntaxHighlighter
            showLineNumbers={true}
            lineNumberStyle={{ color: "#ccc", fontSize: 10 }} // 左侧行数的样式
            style={oneDark as any}
            language={"tsx"}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  >
    {md || ""}
  </ReactMarkdown>
```

:s
:)
:dog:
:+1:

[astExplorer-url]: https://astexplorer.net/
[remark-url]: https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md
[rehype-url]: https://github.com/rehypejs/rehype/blob/HEAD/doc/plugins.md
[react-markdown-url]: https://www.npmjs.com/package/react-markdown
[remark-gfm-url]: https://www.npmjs.com/package/remark-gfm
[remark-html-url]: https://github.com/remarkjs/remark-html
[remark-emoji-url]: https://github.com/rhysd/remark-emoji
[remark-syntax-highlighter-url]: https://github.com/react-syntax-highlighter/react-syntax-highlighter