# Debounce 
[![Circle CI](https://img.shields.io/circleci/project/louy/debounce.svg)](https://circleci.com/gh/louy/debounce)
[![NPM](https://img.shields.io/npm/v/js-debounce.svg)](https://www.npmjs.com/package/js-debounce)
[![VersionEye](https://img.shields.io/versioneye/d/user/projects/55f344733ed8940014000028.svg)](https://www.versioneye.com/nodejs/js-debounce/)
[![Codecov](https://img.shields.io/codecov/c/github/louy/debounce.svg)](https://codecov.io/github/louy/debounce/)
[![Codacy](https://img.shields.io/codacy/60c6a5326a6b4de39040f0b5cb6c367a.svg)](https://www.codacy.com/app/louy08/debounce)

Javascript setTimeout and setInterval replacement, with advanced options and debounce ability.

## Usage

    debounce( id, delay, callback )
  
This will call the function `callback` after `delay` milliseconds.

    debounce( id, true )

This will call the function assigned to `id` instantly and cancel the assigned timeout.

    debounce( id )

This will cancel the callback assigned with `id` and won't call it.


The callback function will be called with one argument, that's the number of times the _current timeout_ has been run. It will always be 0 unless you return `true` from your callback, then it will increase.


## Return values

Inside a callback function, you can return any of these values to reassign the callback to the same or a different delay.
* __True(ish)__ reschedule the same callback after the same delay again.
* __number__ reschedule the same callback after new returned delay.
* __false(ish)__ don't reschedule anything.

You can also override the timeout with the same `id` inside the callback, and if you do so the return value will be ignored.

## Examples

Scroll events

    $(document).on('scroll', function() {
      debounce( `scroll-event`, 500, scrollEvent );
    });
    
    function scrollEvent() {
      // This will only be excuted if the user scrolls and then stops for 500ms.
    }

Timeout functions

    debounce( `ajax-timeout`, 30000, function() {
      ajax.abort();
    });
    ajax.done(function() {
      // Cancel the callback
      debounce( `check-loaded` );
    });

