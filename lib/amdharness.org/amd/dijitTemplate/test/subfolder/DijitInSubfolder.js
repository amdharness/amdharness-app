define(
[	"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin"
,	"../../dijitTemplate!./DijitInSubfolder.html!strip"
,	"../DijitTemplatedSample"
]
,function( declare, _WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin, template )
{
	return declare("DijitInSubfolder", [_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin],
		{	templateString:template
			,	widgetsInTemplate: true
			,	passed:1
		});
});
