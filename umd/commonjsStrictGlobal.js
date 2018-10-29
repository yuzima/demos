// 使用 CommonJS、AMD 或 browser globals 创建模块。
// 这个例子甚至在使用 AMD 时也会创建一个全局变量。
// 如果你有一些脚本是由 AMD 加载器加载的，但是它们仍然需要全局访问，这是很有用的。

// 定义了一个模块 "a" 依赖于另一个名为 "b" 的模块
// 注意模块名由文件表示.
// 最好是文件名和 export 的 global 对象名称是匹配的

// 如果模块 b 也是使用了该样板，那么在浏览器中，将会创建一个 global.b 被下面的代码使用

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'b'], function (exports, b) {
      factory((root.a = exports), b);
    });
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('b'));
  } else {
    // Browser globals
    factory((root.a = {}), root.b);
  }
}(typeof self !== 'undefined' ? self : this, function (exports, b) {
  // Use b in some fashion.

  // attach properties to the exports object to define
  // the exported module properties.
  exports.action = function () { };
}));
