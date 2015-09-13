/**
 * debounce 0.2.0 by Louy Alakkad
 * https://github.com/louy/debounce/
 */
(function(root, factory) {
  /* global define */
  /*istanbul ignore next*/
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.debounce = factory();
  }
}(this, function() {

  /**
   * debounce( id, delay, fn );
   *   run fn after delay, it will cancel and override (debounce)
   *   previous one with same id.
   * debounce( id, true );
   *   run fn with specified id instantly, cancel specified delay earlier.
   * debounce( id );
   *   cancel fn with specified delay.
   *
   * fn can return any of the following:
   * - true(ish) : re-schedule the same fn after the same delay.
   * - number    : re-schedule the same fn after (number) delay.
   * - false(ish): don't re-schedule anything.
   *
   * if fn overrides the same id (i.e. calls debounce() with the same id) then
   *   return value will be ignored.
   */

  var version = '0.2.0',
  s = {};

  function cb() {
    var prevID = this.id,
        exec = this.fn(this.run);
    ++this.run;

    if (prevID !== this.id) {
      // detected override, cancel
      return;
    }

    if (typeof exec === 'number') {
      // re-schedule after (number) ms.
      this.delay = exec;
      exec = true;
    }

    if (!!exec) {
      // reschedule
      this.set();
    } else {
      // remove
      delete this.fn;
    }
  }

  var debounce = function(id, delay, fn) {

    if (id && !fn) {
      if (s[id]) {
        if (delay === true) { // call instantly
          clearTimeout(s[id].id);
          s[id].cb();
        } else { // cancel
          clearTimeout(s[id].id);
          s[id] = false;
        }
      }

      return;
    }

    if (s[id]) {
      clearTimeout(s[id].id);
      s[id].fn = fn;
      if (delay) {
        s[id].delay = delay;
      }
    } else {
      s[id] = {
        fn: fn,
        delay: delay,
        run: 0,
        set: function() {
          return (this.id = setTimeout(this.cb, this.delay));
        },
      };
    }

    s[id].cb = function() {
      cb.apply(s[id]);
    };

    s[id].set();
  };

  debounce.version = version;
  debounce.isSet = function(id) {
    return !!s[id];
  };

  return debounce;
}));
