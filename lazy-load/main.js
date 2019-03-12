const images = document.querySelectorAll('[data-src]');
const config = {
  rootMargin: '0px 0px 100px 0px',
  threshold: 0
};
let loaded = 0;

let observer = new IntersectionObserver(function(entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      preloadImage(entry.target);
      // Stop watching and load the image
      self.unobserve(entry.target);
    }
  });
}, config);

images.forEach(image => {
  observer.observe(image);
});

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) {
    return;
  }
  img.src = src;
  _updateMonitoring();
}

// Just for the monitoring purpose. Isn't needed in real projects
function _updateMonitoring() {
  const container = document.getElementById('isIntersecting');
  const placeholder = container.querySelector('.placeholder');
  loaded += 1;
  placeholder.innerHTML = loaded;
  container.style.opacity = 1;
}
