export function loadPageInto(dom = mustHave('HTMLElemet')) {
  dom.innerText = 'books';
}

function mustHave(type) {
  throw new Error(`You must pass a ${type}`);
}