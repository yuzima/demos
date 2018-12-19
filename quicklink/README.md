## Quicklink 介绍

quicklink 的作用是提前在页面网络空闲的时候，检测页面上的 a 标签，提前下载好内容，让用户访问链接的时候速度更快。

quicklink 该项目的目的是成为网站根据用户视口中的内容预取链接的简易解决方案。

## Quicklink 如何工作

Quicklink 尝试让导航到接下来的页面加载速度更快，它：

- 检测视图上的链接（使用 Intersection Observer）
- 等待浏览器空闲（使用 requestIdleCallback）
- 检查用户连接是否是一个慢连接（使用 navigator.connection.effectiveType）或开启了 data-saver（使用navigator.connection.saveData）
- 预获取这些连接的 URL（使用 `<link rel=prefetch>` 或 XHR）。提供了一些请求优先级控制（如果支持可以切换为 fetch()）


