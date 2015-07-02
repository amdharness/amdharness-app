define(	["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin"
		,"text!./DijitTemplatedSample.html!strip" // template uses relative path to itslf
//		, "./DijitSimple"	// js also uses relative to itself path. Not needed if rely on parser to load dependencies
		]
,function( declare, _WidgetBase, _TemplatedMixin, template )
{
	return declare("DijitTemplatedSample", [_WidgetBase,_TemplatedMixin],
	{	templateString:template
	,	passed:1
	});
});
