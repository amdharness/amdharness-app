define(["dojo/_base/xhr"], function( xhr )
{
	// module:
	//		lib/AMD/cssI
	// summary:
	//		This module implements the lib/AMD/cssI! plugin which loads css text and than injects LINK into html header.
	// description:
	//		returns  css text retrieved by XHR

	return	{	load: function (name, req, load, config)
				{	var url = req.toUrl( name );
					xhr("GET",
					{	url:url
					, handleAs: "text"
					, load: function( text )
							{
								//	$("head").append('<link rel="stylesheet" type="text/css" href="'+url+'" />');
								var cssNode = document.createElement('link');
								cssNode.type = 'text/css';
								cssNode.rel = 'stylesheet';
								cssNode.href = url;
								cssNode.media = 'screen';
								document.getElementsByTagName("head")[0].appendChild(cssNode);
								load(text);
							}
					});
				}
			};
});
