let controller;
function fetchAbortTest() {
  if (controller) controller.abort();
  controller = new AbortController();
  return fetch('https://www.baidu.com', { signal: controller.signal })
    .then(() => {
      document.getElementsByTagName('body').innerText = 'fetch successed';
    });
}

fetchAbortTest();
fetchAbortTest();
fetchAbortTest();
fetchAbortTest();
fetchAbortTest();
fetchAbortTest();
fetchAbortTest();
fetchAbortTest();
