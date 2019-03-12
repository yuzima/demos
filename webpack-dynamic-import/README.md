## 使用 Loadable 和 Webpack 实现真正的 dynamic import

在之前的 webpack 打包解析时，我已经了解了由于 webpack 需要将 `import` 命令解析到具体的文件上，因此使用 `import()` 语句时不能使用变量而必须是一个确定的文件路径，否则在 webpack 打包的时候会提示错误。

因此在之前，使用 `react-loadable` 在运行时根据 props 不同加载不同的组件模块，是无法成功打包的。

```javascript
import React from 'react'
import loadable from 'react-loadable'

class MyComponent extends React.Component {
  state = {
    Bar: null
  };

  componentWillMount() {
    const { page } = this.props
    import(`./components/${page}`).then(Component => {
      this.setState({ Component: Component.default });
    });
  }

  render() {
    let { Component } = this.state;
    if (!Component) {
      return <div>Loading...</div>;
    } else {
      return <Component/>;
    };
  }
}
```

但是 Webpack 日前增加了对动态 `import()` 变量的支持，也就是我们可以真正地进行动态模块加载了。那么对于使用了变量的 `import()` Webpack 是如何找到模块并打包进来的呢。根据我实现运行打包后的结果，Webpack 会用正则解析变量，解析到某一个目录下，然后加载目录下的所有可 import 文件，为每一个文件模块赋予模块编号。然后将文件名路径同模块编号对应表记录下来，在运行时遇到文件名路径地址就去加载对应的模块文件。

使用 `@loadable/component` 可以创建一个异步加载的组件，它接收组件的 props 作为参数：

```javascript
import React, { Component } from 'react';
import loadable from '@loadable/component'
import logo from './logo.svg';
import './App.css';
const AsyncPage = loadable(props => import(/* webpackChunkName: "AsyncPage-" */ `./components/${props.page}`))

class App extends Component {
  render() {
    return (
      <div>
        <AsyncPage page="Home" />
        <AsyncPage page="Contact" />
      </div>
    );
  }
}

export default App;
```

components 目录下有 `Home.js` 和 `Contact.js` 两个文件，运行 `yarn build` 后目录会出现 **AsyncPage-0.198e2dca.chunk.js** 和 **AsyncPage-2.81069c7f.chunk.js** 分别对应 `Home` 和 `Contact` 模块，这说明对于使用变量的 import，webpack 因为不知道运行时会加载哪个模块，就干脆将 components 目录下的所有文件都打包了。

在生成的 **main.chunk.js** 文件里，我们可以找到 webpack 生成的对应表。

```javascript
(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    11: function(e, t, n) {
      e.exports = n.p + 'static/media/logo.5d5d9eef.svg';
    },
    14: function(e, t, n) {
      e.exports = n(28);
    },
    23: function(e, t, n) {},
    26: function(e, t, n) {},
    27: function(e, t, n) {
      /* 对于带后缀和不带后缀都有对应 */
      var a = {
        './Contact': [12, 0],
        './Contact.js': [12, 0],
        './Home': [13, 1],
        './Home.js': [13, 1]
      };
      function r(e) {
        var t = a[e];
        return t
          ? n.e(t[1]).then(function() {
              var e = t[0];
              return n(e);
            })
          : Promise.resolve().then(function() {
              var t = new Error("Cannot find module '" + e + "'");
              throw ((t.code = 'MODULE_NOT_FOUND'), t);
            });
      }
      (r.keys = function() {
        return Object.keys(a);
      }),
        (r.id = 27),
        (e.exports = r);
    },
    // ......
  },
  [[14, 3, 4]]
]);
```

### Webpack 神奇的备注魔法

> https://webpack.js.org/api/module-methods/#magic-comments

通过备注里添加配置说明，甚至能够灵活地操作 `import()` 的行为，这可以帮助我们在 dyanamic import 时候缩小打包文件的范围，使用 prefetch，preload 加载，等等。

```javascript
// Single target
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
);

// Multiple possible targets
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  `./locale/${language}`
);
```

### 关于 `react-loadable`

`react-loadable` 曾经在很长时间里都作为 React 代码分割的推荐方法，但是目前已经不维护了并且不兼容 Webpack v4+ 和 Babel v7+

如果你还在使用，推荐迁移到 `React.lazy` 或 `@loadable/component`
