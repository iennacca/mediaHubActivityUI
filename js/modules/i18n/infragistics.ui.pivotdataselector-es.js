﻿/*!@license
* Infragistics.Web.ClientUI Pivot Data Selector localization resources 13.2.20132.2364
*
* Copyright (c) 2011-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.PivotDataSelector) {
        $.ig.PivotDataSelector = {};

        $.extend($.ig.PivotDataSelector, {
            locale: {
                invalidBaseElement: " no se admite como elemento base. Use DIV en su lugar.",
                catalog: "Catálogo",
                cube: "Cubo",
                measureGroup: "Medir grupo",
                measureGroupAll: "(Todo)",
                rows: "Filas",
                columns: "Columnas",
                measures: "Medidas",
                filters: "Filtros",
                deferUpdate: "Aplazar actualización",
                updateLayout: "Actualizar diseño",
                selectAll: "Seleccionar todo"
            }
        });
    }
})(jQuery);