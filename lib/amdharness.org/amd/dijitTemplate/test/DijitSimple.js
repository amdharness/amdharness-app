define(["dojo/_base/declare", "dijit/_WidgetBase"],function( declare, _WidgetBase )
{
	return declare("DijitSimple", [_WidgetBase],
		{
			buildRendering: function()
			{   var n = this.domNode || this.srcNodeRef ;
				if( n )
					n.innerHTML = "PASSED DijitSimple";
			}
			,	passed:1
		});
});
