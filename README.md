# url-hash-router
A small javascript front controller

Examples
--------

```javascript
// Home Page
var router = new UrlHashRouter();

router.register( "^$", function() {
	console.log( "home page" );
});

// Articles Main Page
router.register( "^articles$", function() {
	console.log( "main articles page" );
});

// Article Page
router.register( "^article/(\\d+)$", function( article_id ) {
	console.log("article page for article_id " + article_id );
});

// Article Page Number
router.register( "^article/(\\d+)/(\\d+)$", function( article_id, page_number ) {
	console.log("article page for article_id " + article_id + " and page number " + page_number );
});

router.execute( window.location.hash );
```

