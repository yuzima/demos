export function loadPageInto(dom = mustHave('HTMLElemet')) {
  dom.innerText = 'video-games';
}

function mustHave(type) {
  throw new Error(`You must pass a ${type}`);
}
