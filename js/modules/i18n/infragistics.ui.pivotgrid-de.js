/*!@license
* Infragistics.Web.ClientUI Pivot Grid localization resources 13.2.20132.2364
*
* Copyright (c) 2011-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.PivotGrid) {
        $.ig.PivotGrid = {};

        $.extend($.ig.PivotGrid, {
            locale: {
                filtersHeader: "Filterfelder hier ablegen",
                measuresHeader: "Datenfelder hierher ziehen",
                rowsHeader: "Zeilenfelder hierher ziehen",
                columnsHeader: "Spaltenfelder hierher ziehen",
                disabledFiltersHeader: "Filterfelder",
                disabledMeasuresHeader: "Datenelemente",
                disabledRowsHeader: "Zeilenfelder",
                disabledColumnsHeader: "Spaltenfelder",
                noSuchAxis: "Keine solche Achse"
            }
        });
    }
})(jQuery);