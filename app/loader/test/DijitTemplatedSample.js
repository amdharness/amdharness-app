define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin","amdharness.org/amd/text/textTemplate!./DijitTemplatedSample.html!strip"]
,function( declare, _WidgetBase, _TemplatedMixin, template )
{
	return declare("DijitTemplatedSample", [_WidgetBase,_TemplatedMixin],
	{	templateString:template
	,	passed:1
	});
});
