var UrlHashRouter = (function(root){
	function UrlHashRouter() {
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

	UrlHashRouter.prototype.route = function( regex, callback ) {
		var location = root.location.hash;
		location = location.substring(1);

		var re = new RegExp(regex) ;

		var isTrue = re.test( location );

		if( !isTrue )
			return;

		var matches = location.match( re );

		var args = getFunctionArguments( matches );

		callback.apply(this, args);
	}

	return new UrlHashRouter();
})(this);
