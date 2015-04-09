# url-hash-router
A small javascript front controller

Examples
--------

```javascript
// Home Page
UrlHashRouter.route( "^$", function() {
	console.log( "home page" );
});

// Articles Main Page
UrlHashRouter.route( "^articles$", function() {
	console.log( "main articles page" );
});

// Article Page
UrlHashRouter.route( "^article/(\\d+)$", function( article_id ) {
	console.log("article page for article_id " + article_id );
});

// Article Page Number
UrlHashRouter.route( "^article/(\\d+)/(\\d+)$", function( article_id, page_number ) {
	console.log("article page for article_id " + article_id + " and page number " + page_number );
});
```

