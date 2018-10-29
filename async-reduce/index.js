Array.prototype.asyncReduce = function (callback, initialValue) {
  let result = Promise.resolve(initialValue);
  for (const value of this) {
    result = Promise.all([result, value])
      .then(([result, value]) => callback(result, value));
  }
  return result;
}

const pArr = Array.from(new Array(10), (_, i) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(i), i * 1000)
}));

pArr.asyncReduce((r, current) => {
    console.log(Date.now());
    return r + current;
  }, 0)
  .then(result => {
    console.log(result);
  });