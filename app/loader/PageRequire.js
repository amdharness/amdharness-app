define(["require"], function( localRequire )
{	// PageRequire is a module to be used for replacement of dojo global require as its AMD implementation disrespect relative MIDs.
	// another fix is to replace MID string in require parameter with an array with MID as only element.


	var cp = location.pathname.split('/')
	,	pr = localRequire.toUrl(".").split('/')
	,	bp = localRequire.toUrl("basePath").split('/'); // name is irrelevant, using only path. Same as require.basePath
	cp.pop();
	bp.pop();

	for( var N =0; N< cp.length; N++ )
		if( cp[N] != bp[N] )
			break;
	for( var M =0; M< cp.length; M++ )
		if( cp[M] != pr[M] )
			break;

	localRequire.modules["loader/PageRequire"].mid = location.pathname;

	var ret = mixin( function contextRequire
	(	config		  	//(object, optional) hash of configuration properties
	,	dependencies	//(array of MIDs or MID, optional) list of modules to be loaded before applying callback
	,	callback	  	//(function, optional) lambda expression to apply to module values implied by dependencies
	)
	{
		// seek relative MID and replace with relative to current module path before passing to local require().
		// first occurrence of string or array is an MID.
		for( var i=0; i < arguments.length; i++ )
		{	var a = arguments[i];
			if( !a )
				continue;
			if( a.charAt )
			{	arguments[i] = [a];
				break;
			}
			if( a.splice )
				break;
		}
		return	localRequire.apply(this,arguments);
	}, localRequire );

	ret.toMID = pgMid;
	return ret;

	function mixin( dst, src )
	{	for( var k in src )
			dst[k] = src[k];
		return dst;
	}
	function pgMid(urlPath)
	{
		var zs	= this
		,	cp	= path( urlPath )
		,	bp	= path("zyx098")
		,	i	= 0;

		for( ;i<bp.length && i<cp.length && bp[i] == cp[i]; i++ )
			;
		for( var pg="" ;i<cp.length;i++)
			if( cp[i] )
				pg += cp[i]+"/";
		if( '/' === pg.slice(-1) )
			pg = pg.slice(0,-1); // pg.substring(0,pg.length-1);
		return pg;

		function path( mid )
		{	return zs.toUrl(mid).split("/");
		}
	}
});
