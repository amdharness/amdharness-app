// dtkharness.org/app/loader/dojo initialize dojo AMD loader and sets application parameters.
// adjust dojoConfig here with application specifics.
// @see dtkharness.org/app/loader modules for other AMD loader options

var dojoConfig;

(function()
{   var lp = location.pathname.substring( 0,location.pathname.indexOf("lib/"))
	,	ap = location.pathname.substring( 0,location.pathname.indexOf("app/"))
	,	bp = (lp || ap)+"lib/"; // parent of dojotoolkit.org/dojo  folder

	dojoConfig = mixin( 
	{   async:1, isDebug:1
	,	parseOnLoad	: false // parser invoked manually bellow to keep relative MIDs.
	,   has     :   { 'config-tlmSiblingOfDojo':0 }
	,   baseUrl :   bp
	,   packages:   [   { name:'dojo'	, location:'dojotoolkit.org/dojo'	}
					,   { name:'dijit'	, location:'dojotoolkit.org/dijit'	}
					,   { name:'dojox'	, location:'dojotoolkit.org/dojox'	}
					,   { name:'loader'	, location: bp + "../app/loader"	}
					,   { name:'app'	, location: bp + "../app"			}
					]
	,	paths:{ currentPage:location.pathname.substring(0,location.pathname.lastIndexOf('/'))}
	,	aliases:[["text","dojo/text"],["cssQuery","dojo/query"],["cssI","amdharness.org/amd/cssI/cssI"]]
	,   deps:["dojo/query","dojo/NodeList-manipulate"]
	},	dojoConfig );

	function FixDojoRequire()
	{
		if( require.isFacade || require.FixDojoRequire )
		{	debugger;
			return;
		}
		/*
		 html uses require("./a","../sameFolder/b") in global require() context. Which is not aware of current page location in dojo.
		 The solution would be in creating the FixedRequire AMD module which will replace the global one.
		 As it has context of module, relative path-es are valid relatively to its folder.
		 FixedRequire will replace relative to page paths with relative to own location ones.
		 https://bugs.dojotoolkit.org/ticket/14649
		 */
		if( require === facade )
		{	debugger;
			return;
		}
		var dojoRequire = require;
		require(["loader/PageRequire"],function( PageRequire )
		{	if( require === PageRequire )
			return;
			PageRequire.dojoRequire = dojoRequire;
			require = PageRequire;
			for( var arg ; arg = facade.calls.pop(); )
				try{ PageRequire.apply( this, arg  ); }
				catch(ex){ console.log(ex); }
			require( ["dojo/ready","dojo/parser","dojo/DomReady!"], function( ready, parser )
			{	ready( 100, function()
				{
					dojoRequire.modules["dojo/parser"].mid = PageRequire.toMID(location.pathname);
					// todo fix module auto-load unsupported by _WidgetsInTemplateMixin
					parser.parse();//{contextRequire:dojoRequire});
				});
			});
		});
	}
	function mixin( dst, src )
	{	for( var k in src )
			dst[k] = src[k];
		return dst; 
	}
	function facade() // facade to relocate the actual call when dojo loaded
		{	facade.calls.push(arguments);	}
	require = facade; // set global as a facade
	facade.isFacade 	= 1;
	facade.calls 		= [];

	var parent = document.head || document.documentElement
	,	s 	= document.createElement("script");
	s.src 	= dojoConfig.baseUrl+"dojotoolkit.org/dojo/dojo.js";
	s.type	= "text/javascript";
	s.onload 				= FixDojoRequire;
	s.onreadystatechange 	= FixDojoRequire;
	parent.appendChild( s );

	var deps =
			[	"cssI!dijit/themes/claro/claro.css"
				,	"cssI!dojo/resources/dojo.css"
				,	"cssI!dijit/themes/dijit.css"
			];
//	if( !Array.prototype.forEach )
//		deps.push("shim!es-shims/es5-shim/es5-shim");// MIT lic., https://github.com/es-shims/es5-shim

	//	CSS for page loading should be embedded into HTML. It serves just "loading..." UI.
	//	Than goes application specific but reused in multiple pages:
require(deps,function()
	{
		// lastly (better on timeout) loaded CSS and JS which is not in immediate need, just to preload in case it will be demanded
//		require([	"AMD/cssI!/Styles/App.css"		]);
	});
	// The page specific CSS and JS is embedded into HTML itself as require() list and code.
})();
