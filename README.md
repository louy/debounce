Debounce [![Build Status](https://travis-ci.org/louy/Debounce.svg?branch=master)](https://travis-ci.org/louy/Debounce)
========

Javascript setTimeout and setInterval replacement, with advanced options and debounce ability.

Usage
-----

    Debounce( id, delay, callback )
  
This will call the function `callback` after `delay` milliseconds.

    Debounce( id, true )

This will call the function assigned to `id` instantly and cancel the assigned timeout.

    Debounce( id )

This will cancel the callback assigned with `id` and won't call it.


The callback function will be called with one argument, that's the number of times the _current timeout_ has been run. It will always be 0 unless you return `true` from your callback, then it will increase.


Return values
--

Inside a callback function, you can return any of these values to reassign the callback to the same or a different delay.
* __True(ish)__ reschedule the same callback after the same delay again.
* __number__ reschedule the same callback after new returned delay.
* __false(ish)__ don't reschedule anything.

You can also override the timeout with the same `id` inside the callback, and if you do so the return value will be ignored.

Examples
--

Scroll events

    $(document).on('scroll', function() {
      Debounce( `scroll-event`, 500, scrollEvent );
    });
    
    function scrollEvent() {
      // This will only be excuted if the user scrolls and then stops for 500ms.
    }

Timeout functions

    Debounce( `ajax-timeout`, 30000, function() {
      ajax.abort();
    });
    ajax.done(function() {
      // Cancel the callback
      Debounce( `check-loaded` );
    });

