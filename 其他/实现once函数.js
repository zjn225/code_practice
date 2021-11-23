let once = (fn) => {
  let called = false;
  return function (args) {
    if (!called) {
      fn.apply(null, args)
      called = true;
    }
  }
}

let cb = function (name) {
  console.log(name);
};

let t = once(cb);

t('frank');
t('brenda');

//   #result
//   frank

// Vue源码里的
/**
 * Ensure a function is called only once.
 */
export function once(fn: Function): Function {
  let called = false
  return function (args) {
    if (!called) {
      called = true
      fn.apply(this, args)
    }
  }
}
