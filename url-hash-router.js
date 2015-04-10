var UrlHashRouter = (function(){
	function UrlHashRouter() {
		this.routes = [];
		this.unknownRoute = null;
	}

	UrlHashRouter.prototype.register = function( regex, callback ) {
		this.routes[ regex ] = callback;	
	}

	UrlHashRouter.prototype.registerUnknown( callback ) {
		this.unknownRoute = callback;
	}

	UrlHashRouter.prototype.execute = function( location ) {
		var routes = this.routes;

		for( var pattern in routes ) {
			var callback = routes[pattern];
			console.log(pattern);

			var re = new RegExp(pattern) ;

			var isTrue = re.test( location );

			if( !isTrue )
				continue;

			var matches = location.match( re );

			var args = getFunctionArguments( matches );

			callback.apply(this, args);
			return;
		}

		if( this.unknownRoute !== null ) 
			this.unknownRoute();
	}

	function getFunctionArguments( matches ) {
		var args = [];

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
