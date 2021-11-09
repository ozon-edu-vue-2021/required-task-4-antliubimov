export default function debounce(fn, ms) {
  let lastTimeout = null;

  return function () {
    let args = arguments;
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      fn.apply(null, args);
    }, ms);
  };
}
