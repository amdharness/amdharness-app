// dojo/text! shim to enable the relative MIDs in template( in data-dojo-type ) to be relative to template file.
// "dojo/text" could be aliased to requireJS plugin with same functionality.
// todo make an alias in requireJs-based loader.

define(["dojo/text", "require"], function(textPlugin, require)
{
	// todo parse data-dojo-mixins, dojotype

	var cur=[[	"data-dojo-type='"	,	/data-dojo-type='.\//g	]
			,[	'data-dojo-type="'	,	/data-dojo-type=".\//g	]
			];
	var par=[[	"data-dojo-type='"	,	/data-dojo-type='..\//g ]
			,[	'data-dojo-type="'	,	/data-dojo-type="..\//g	]
			];

	return 	{   normalize: function normalize()
				{
					return textPlugin.normalize.apply( textPlugin,arguments );
				}
				,	load:	function load( name, req, load, config )
				{
					var cp	= path(name )
						,	bp	= path("zyx098")
						,	i	= 0;

					for( ;i<bp.length && i<cp.length && bp[i] == cp[i]; i++ )
						;
					for( var pg="" ;i<cp.length;i++)
						if( cp[i] )
							pg += cp[i]+"/";

					return textPlugin.load( name, req, fixText, config );

					function fixText(text)
					{
						for( var i=0 ; i< cur.length; i++ )
							text = text.replace( cur[i][1], cur[i][0] + pg );

						for( var i=0 ; i< par.length; i++ )
							text = text.replace( par[i][1], par[i][0] + pg+"../" );
						load(text);
					}
					function path( mid )
					{	var bs = req.toUrl(mid);
						return bs.substring( 0, bs.lastIndexOf('/') ).split("/");
					}
				}
			};
});
