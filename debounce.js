/**
 * Debounce 0.2.0 by Louy Alakkad
 * https://github.com/louy/Debounce/
 */
( function() {

	/**
	 * Debounce( id, delay, fn ); // run fn after delay, it will cancel and override (debounce) previous one with same id.
	 * Debounce( id, true ); // run fn with specified id instantly, cancel specified delay earlier.
	 * Debounce( id ); // cancel fn with specified delay.
	 *
	 * fn can return any of the following:
	 * - true(ish) : re-schedule the same fn after the same delay.
	 * - number    : re-schedule the same fn after (number) delay.
	 * - false(ish): don't re-schedule anything.
	 *
	 * if fn overrides the same id (i.e. calls Debounce() with the same id) then return value will be ignored.
	 */

	var name = 'debounce',
		version = '0.2.0',
		global = this,
		s = {};

	global[ name ] = function( id, delay, fn ) {

		if( id && !fn ) {
			if( s[id] ) {
				if( delay === true ) { // call instantly
					clearTimeout( s[id].id );
					s[id].cb();
				} else { // cancel
					clearTimeout( s[id].id );
					s[id] = false;
				}
			}
			return;
		}

		if( s[id] ) {
			clearTimeout( s[id].id );
			s[id] = false;
		}

		s[id] = {
			fn: fn,
			delay: delay,
			run: 0,
			set: function() {
				return ( this.id = setTimeout( this.cb, this.delay ) );
			},
		};

		s[id].cb = function() {
			var prevID = s[id].id,
				exec = fn(s[id].run);
				++ s[id].run;

			if( prevID != s[id].id ) {
				// detected override, cancel
				return;
			}

			if( typeof exec === 'number' ) {
				// re-schedule after (number) ms.
				s[id].delay = exec;
				exec = true;
			}

			if( !!exec ) {
				// reschedule
				s[id].set();
			} else {
				// remove
				delete s[id];
			}
		};
		s[id].set();
	};

	global[ name ].version = version;
	global[ name ].isSet = function( id ) {
		return !!s[id];
	};

} ) ();
