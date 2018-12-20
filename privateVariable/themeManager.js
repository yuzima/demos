// this[Symbol('customTheme')] 能够通过 getCustomTheme 被访问
// 但同时只能通过 registerTheme 修改
const privateKey = Symbol('customTheme');

class ThemeManager {
  constructor() {
    this[privateKey] = null;
  }

  registerTheme(theme) {
    this[privateKey] = theme;
  }

  getCustomTheme() {
    return new Proxy(this[privateKey], {
      get: (obj, prop) => obj[prop],
      set: () => false
    });
  }
}

const themeManager = new ThemeManager();

themeManager.registerTheme({
  a: 1,
  b: 2
});

const theme = themeManager.getCustomTheme();
console.log(theme);

theme.a = 2;
console.log(theme)
