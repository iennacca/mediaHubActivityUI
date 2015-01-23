/*!@license
* Infragistics.Web.ClientUI Popover localization resources 13.2.20132.2364
*
* Copyright (c) 2011-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Popover) {
	    $.ig.Popover = {};

	    $.extend( $.ig.Popover, {
		    locale: {
			    popoverOptionChangeNotSupported: "Die Änderung der folgenden Option nach der Initialisierung von igPopover wird nicht unterstützt:",
			    popoverShowMethodWithoutTarget: "The target parameter of the show function is mandatory when the selectors option is used"
		    }
	    });

    }
})(jQuery);