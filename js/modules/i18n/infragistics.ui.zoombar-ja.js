/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources 13.2.20132.2364
*
* Copyright (c) 2011-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Zoombar) {
	    $.ig.Zoombar = {};

	    $.extend($.ig.Zoombar, {

	        locale: {
	            zoombarTargetNotSpecified: "igZoombar を有効なターゲットにアタッチする必要があります。",
		        zoombarTypeNotSupported: "ズームバーにアタッチするウィジェット タイプはサポートされません。",
		        optionChangeNotSupported: "igZoombar が作成された後のこのオプションの変更はサポートされません:"
		    }
	    });

    }
})(jQuery);