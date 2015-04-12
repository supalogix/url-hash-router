var UrlHashRouter = (function(){
	///
	/// Create instance variables for this module so that the member 
	/// functions can store state
	///
	function UrlHashRouter() {
		this.routes = [];
		this.unknownRoute = null;
	}

	///
	/// Associate a regular expression with a callback and cache it
	///
	UrlHashRouter.prototype.register = function( regex, callback ) {
		this.routes[ regex ] = callback;	
	}

	UrlHashRouter.prototype.registerUnknown( callback ) {
		this.unknownRoute = callback;
	}

	/// 
	/// Execute a callback based on the location the caller provides.
	/// Assume that the we only care about the first route we find. We do 
	/// not care about conflicts with different routes (for now).
	///
	UrlHashRouter.prototype.execute = function( location ) {
		var routes = this.routes;

		///
		/// Iterate through all the cached routes and key them off the 
		/// regex patterns
		///
		for( var pattern in routes ) {
			var callback = routes[pattern];

			var re = new RegExp(pattern) ;

			var isTrue = re.test( location );

			///
			/// Skip this loop if the current location does not match the 
			/// regex associated with this pattern
			///
			if( !isTrue )
				continue;

			var matches = location.match( re );

			var args = getFunctionArguments( matches );

			callback.apply(this, args);

			///
			/// Since we found a route we can terminate the loop
			///
			return;
		}

		///
		/// We assume that there does not exist a route for the location if
		/// the execution path reaches this point. Assume that the instance
		/// variable unkownRoute represents the callback the caller wishes
		/// to call.
		///
		if( this.unknownRoute !== null ) 
			this.unknownRoute();
	}

	///
	/// The results of a regular expression contain more the matching
	/// patterns. Use this function to parse the results of a regex
	/// match, and return just the matching patterns.
	///
	function getFunctionArguments( matches ) {
		var args = [];

		///
		/// Return an empty array when there are no matches
		///
		if( !matches )
			return args;

		var keys = Object.keys(matches);

		for( var i in keys ) {
			var key = parseInt(keys[i]);

			if( !isNaN(key) ) {
				if( key === 0)
					continue;

				var value = matches[key]
				args.push( value );
			}
		}

		return args;
	}

	return UrlHashRouter;
})();
