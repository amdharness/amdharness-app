define(	["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin"
		,"../dijitTemplate!./DijitTemplatedSample.html!strip"
		,"cssI!./DijitTemplatedSample.css"
		]
,function( declare, _WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin, template )
{
	return declare("DijitTemplatedSample", [_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin],
		{	templateString:template
		,	widgetsInTemplate: true
		,	passed:1
		});
});
