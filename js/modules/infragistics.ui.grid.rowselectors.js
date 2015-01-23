﻿/*!@license
 * Infragistics.Web.ClientUI Grid Tooltips 13.2.20132.2364
 *
 * Copyright (c) 2011-2014 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery-1.4.4.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.ui.grid.framework.js
 *	infragistics.ui.editors.js
 *	infragistics.ui.shared.js
 *	infragistics.dataSource.js
 *	infragistics.util.js
 */
if(typeof jQuery!=="function"){throw new Error("jQuery is undefined")}(function($){$.widget("ui.igGridRowSelectors",{options:{enableRowNumbering:true,enableCheckBoxes:false,rowNumberingSeed:0,rowSelectorColumnWidth:null,requireSelection:true,showCheckBoxesOnFocus:false,inherit:false},css:{rowSelectorCssClass:"ui-iggrid-rowselector-class",headerRowSelectorCssClass:"ui-iggrid-rowselector-header",footerRowSelectorCssClass:"ui-iggrid-rowselector-footer",checkbox:"ui-state-default ui-corner-all ui-igcheckbox-normal",checkboxOff:"ui-icon ui-icon-check ui-igcheckbox-normal-off",checkboxOn:"ui-icon ui-icon-check ui-igcheckbox-normal-on",nodeHovered:"ui-state-hover"},events:{rowSelectorClicked:"rowSelectorClicked",checkBoxStateChanging:"checkBoxStateChanging",checkBoxStateChanged:"checkBoxStateChanged"},_createWidget:function(options,element){$.Widget.prototype._createWidget.apply(this,arguments);if(this.options.rowSelectorColumnWidth===null){this.options.rowSelectorColumnWidth=55;if(this.options.enableCheckBoxes===true&&this.options.enableRowNumbering===true){this.options.rowSelectorColumnWidth+=15}}},_create:function(){this._cpIdx=0;this._pSelection={};this._vRsDom=[];this._cIdx=0;this._functionsRedirected=false;this._isPaging=false;this._hovTR=null;this._gridRenderRecord=null;this._gridRenderRecordInArray=null;this._checkBoxesShown=false;this._nTmpl="{{html ig_rs_idx}}";this._v=false;this._ms=false},destroy:function(){this._unregisterEvents();this._unregisterCellEvents();if(this._gridRenderRecordHandler!==undefined){this.grid._renderColgroup=this._flatRenderColgroup;this.grid._renderRecord=this._gridRenderRecordHandler;this.grid._renderRecordInArray=this._gridRenderRecordInArrayHandler;this.grid._generateRowTemplate=this._gridRenderTemplateHandler}if(this.options.enableCheckBoxes===true){this._unregisterCheckBoxEvents()}this._cleanInterface(false);$.Widget.prototype.destroy.call(this);return this},_renderHeaderRowSelectors:function(owner){var rows,i,cell,header,$thDataSkip;if(owner.id()!==this.grid.id()){return}if(this.grid.options.fixedHeaders===true){rows=$("#"+this.grid.id()+"_headers thead").children()}else{rows=$("#"+this.grid.id()+" thead").children()}if(rows.length>0){cell=$(rows[0]).find("th.ui-iggrid-expandheadercell")[0];if(cell===undefined){cell=$(rows[i]).children()[0];this._index=0}else{this._index=$(cell).index()+1}if(this.grid._isMultiColumnGrid){$thDataSkip=$("<th></th>").prependTo(this.grid.headersTable().find("thead tr:nth-child(1)")).addClass(this.css.headerRowSelectorCssClass).addClass(this.grid.css.headerClass).attr("data-role","rs").attr("data-skip","true");$thDataSkip.attr("rowspan",this.grid._maxLevel+1);if(this.options.enableCheckBoxes===true&&this._ms){$(this._getCheckBox(true)).appendTo($thDataSkip)}}else{for(i=0;i<rows.length;i++){if($(rows[i]).find("th[data-role='rs']").length>0){continue}header=$("<th>"+($.ig.util.isIE7?"&nbsp;":"")+"</th>").addClass(this.css.headerRowSelectorCssClass).addClass(i===0?this.grid.css.headerClass:"").attr("data-role","rs").attr("data-skip","true").insertBefore($($(rows[i]).children()[this._index]));if(this.options.enableCheckBoxes===true&&i===0&&this._ms){$(this._getCheckBox(true)).appendTo(header)}}}}},_renderFooterRowSelectors:function(owner){var rows,i;if(owner.id()!==this.grid.id()){return}if(this.grid.options.fixedFooters===true){rows=$("#"+this.grid.id()+"_footers tfoot").children()}else{rows=$("#"+this.grid.id()+" tfoot").children()}if(rows.length>0){for(i=0;i<rows.length;i++){if($(rows[i]).find("td[data-role='rs']").length>0){continue}$("<td>"+($.ig.util.isIE7?"&nbsp;":"")+"</td>").addClass(this.css.footerRowSelectorCssClass).attr("data-role","rs").attr("data-skip","true").insertBefore($($(rows[i]).children()[this._index]))}}},_headerRendered:function(event,ui){if(!this._skipRefresh){this._ms=$("#"+this.grid.id()).igGridSelection("option","multipleSelection")===true}this._renderHeaderRowSelectors(ui.owner)},_footerRendered:function(event,ui){this._renderFooterRowSelectors(ui.owner)},_recordsRendering:function(event,ui){if(this.grid.id()!==ui.owner.id()){return}this._cIdx=ui.vrtWnd.start&&ui.vrtWnd.end?ui.vrtWnd.start:0;if(this._functionsRedirected===false){this._renderRecordHandler=$.proxy(this._rsRenderRecord,this);this._renderRecordInArrayHandler=$.proxy(this._rsRenderRecordInArray,this);this._gridRenderRecordHandler=$.proxy(this.grid._renderRecord,this.grid);this._gridRenderRecordInArrayHandler=$.proxy(this.grid._renderRecordInArray,this.grid);this._renderTemplateHandler=$.proxy(this._rsRenderTemplate,this);this._gridRenderTemplateHandler=$.proxy(this.grid._generateRowTemplate,this.grid);this._gridRenderRecord=this._gridRenderRecordHandler;this._gridRenderRecordInArray=this._gridRenderRecordInArrayHandler;this.grid._renderRecord=this._renderRecordHandler;this.grid._renderRecordInArray=this._renderRecordInArrayHandler;this._gridGenerateRowTemplate=this._gridRenderTemplateHandler;this.grid._generateRowTemplate=this._renderTemplateHandler}this._functionsRedirected=true},_recordsRendered:function(event,ui){if(this.grid.id()!==ui.owner.id()){return}if(this.options.enableCheckBoxes===true){this._registerCheckBoxEvents()}},_gridRendered:function(event,ui){if(ui===undefined){return}if(this.grid.id()!==ui.owner.id()){return}if(!this._skipRefresh){this._ms=$("#"+this.grid.id()).igGridSelection("option","multipleSelection")===true}this._unregisterCellEvents();this._registerCellEvents();if(this.options.enableCheckBoxes===true){this._registerCheckBoxEvents()}},_hidingFinished:function(){this._unregisterCellEvents();this._registerCellEvents()},_rsRenderColgroup:function(flatRenderColgroup,rs,table,isHeader,isFooter,autofitLastColumn){var cgrp;flatRenderColgroup.apply(this,[table,isHeader,isFooter,autofitLastColumn]);cgrp=$(table).find("colgroup");if(cgrp.find("col[data-role='rs']").length===0){$("<col></col>").prependTo(cgrp).css("width",rs.options.rowSelectorColumnWidth).attr("data-skip","true").attr("data-role","rs")}},_rsRenderFixedRecord:function(data,rowIndex){var markup=this._renderFixedRecordHandler(data,rowIndex),pre,app,idx,rs=this._getRowSelectorCellMarkup();idx=markup.indexOf("ui-iggrid-expandcolumn");if(idx>=0){app=markup.substr(idx);idx=idx+app.indexOf("</td>")+4;pre=markup.substring(0,idx+1);app=markup.substring(idx+1)}else{idx=markup.indexOf(">")+1;pre=markup.substring(0,idx);app=markup.substring(idx)}markup=pre+rs+app;return markup},_rsRenderRecord:function(data,rowIndex){var markup=this._gridRenderRecord(data,rowIndex),pre,app,idx,rs=this._getRowSelectorCellMarkup();idx=markup.indexOf("ui-iggrid-expandcolumn");if(idx>=0){app=markup.substr(idx);idx=idx+app.indexOf("</td>")+4;pre=markup.substring(0,idx+1);app=markup.substring(idx+1)}else{idx=markup.indexOf(">")+1;pre=markup.substring(0,idx);app=markup.substring(idx)}markup=pre+rs+app;return markup},_rsRenderRecordInArray:function(darr,tbody,data,rowIndex){var i,j;this._gridRenderRecordInArray(darr,tbody,data,rowIndex);for(i=darr.length-1;i>=0;i--){if(darr[i].indexOf&&darr[i].indexOf("<tr")!==-1){for(j=i;j<darr.length;j++){if(darr[j].indexOf&&darr[j].indexOf("<td")!==-1){if(darr[j].indexOf("ui-iggrid-expandcolumn")!==-1){darr[j]+=this._getRowSelectorCellMarkup();break}darr[j]=this._getRowSelectorCellMarkup()+darr[j];break}}break}}},_rsRenderTemplate:function(){var markup=this._gridGenerateRowTemplate(),pre,app,idx,self=this,rs=this._getRowSelectorCellMarkup(true);$.ig.rowNumberingFunctionDelegate=function(id){return $("#"+self.grid.id()).data("igGridRowSelectors")._getCurrentNumber(id)};idx=markup.indexOf("ui-iggrid-expandcolumn");if(idx>=0){app=markup.substr(idx);idx=idx+app.indexOf("</td>")+4;pre=markup.substring(0,idx+1);app=markup.substring(idx+1)}else{idx=markup.indexOf(">")+1;pre=markup.substring(0,idx);app=markup.substring(idx)}markup=pre+rs+app;return markup},_renderExtraHeaderCells:function(row,colgroup,prepend){this._renderExtraCells(row,colgroup,prepend,true)},_renderExtraFooterCells:function(row,colgroup,prepend,cssClass){this._renderExtraCells(row,colgroup,prepend,false,cssClass)},_renderExtraCells:function(row,colgroup,prepend,header,cssClass){var rHeader,rCol,index,cell;if(row.find("[data-role='rs']").length>0){return}if(header===true){rHeader=$("<th>"+($.ig.util.isIE7?"&nbsp;":"")+"</th>").addClass(this.css.headerRowSelectorCssClass).attr("data-role","rs").attr("data-skip","true")}else{rHeader=$("<td>"+($.ig.util.isIE7?"&nbsp;":"")+"</td>").addClass(this.css.footerRowSelectorCssClass).addClass(cssClass).attr("data-role","rs").attr("data-skip","true")}cell=row.find("th.ui-iggrid-expandheadercell,td.ui-iggrid-expandheadercellgb");if(cell.length===0){cell=row.children().eq(0);index=0}else{index=cell.last().index()+1}if(index===0){rHeader.prependTo(row)}else{rHeader.insertBefore(row.children().eq(index))}if(colgroup){rCol=$("<col></col>").attr("data-skip","true").attr("data-role","rs").css("width",this.options.rowSelectorColumnWidth);rCol.insertBefore(colgroup.children().eq(index))}},_registerCellEvents:function(){$("#"+this.grid.id()+">tbody>tr>th."+this.css.rowSelectorCssClass).bind({click:this._rsClickHandler});$("#"+this.grid.id()+" tbody").bind({mousemove:this._rrHoverHandler,mouseleave:this._rrLeaveHandler})},_unregisterCellEvents:function(){$("#"+this.grid.id()+">tbody>tr>th."+this.css.rowSelectorCssClass).unbind({click:this._rsClickHandler});$("#"+this.grid.id()+" tbody").unbind({mousemove:this._rrHoverHandler,mouseleave:this._rrLeaveHandler})},_registerCheckBoxEvents:function(){var cbx=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]');if(cbx.length<=0){if(this.grid.hasFixedColumns()){cbx=this.grid.fixedContainer().find('tbody>tr>th span[name="chk"]')}if(cbx.length===0){return}}cbx.unbind({click:this._checkboxClickHandler,mouseover:this._checkboxMouseOverHandler,mouseout:this._checkboxMouseOutHandler}).bind({click:this._checkboxClickHandler,mouseover:this._checkboxMouseOverHandler,mouseout:this._checkboxMouseOutHandler});$("#"+this.grid.id()+(this.grid.options.fixedHeaders===true?"_headers":"")+'>thead>tr>th span[name="hchk"] > span').unbind({click:this._hCheckboxClickHandler,mouseover:this._checkboxMouseOverHandler,mouseout:this._checkboxMouseOutHandler}).bind({click:this._hCheckboxClickHandler,mouseover:this._checkboxMouseOverHandler,mouseout:this._checkboxMouseOutHandler})},_unregisterCheckBoxEvents:function(){$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]').unbind({click:this._checkboxClickHandler,mouseover:this._checkboxMouseOverHandler,mouseout:this._checkboxMouseOutHandler});$("#"+this.grid.id()+(this.grid.options.fixedHeaders===true?"_headers":"")+'>thead>tr>th span[name="hchk"] > span').unbind({click:this._hCheckboxClickHandler,mouseover:this._checkboxMouseOverHandler,mouseout:this._checkboxMouseOutHandler})},_checkboxMouseOver:function(event){$(event.target).closest('span[data-role="checkbox"]').addClass(this.css.nodeHovered)},_checkboxMouseOut:function(event){$(event.target).closest('span[data-role="checkbox"]').removeClass(this.css.nodeHovered)},_checkBoxClicked:function(event){var trg=$(event.target).closest("span[name='chk']"),rCell=trg.parent(),rRow=rCell.parent(),args,rIdx=this._getVisibleRowIndex(rRow),rKey=rRow.attr("data-id"),noCancel,state=trg.attr("data-chk");if(rKey===""||rKey===null||rKey===undefined){rKey=rIdx}args={row:rRow,rowIndex:rIdx,rowKey:rKey,rowSelector:rCell,owner:this,grid:this.grid,currentState:state,newState:state==="off"?"on":"off",isHeader:false};noCancel=this._triggerCheckingEvent(event,args);if(noCancel===true){this._handleCheck(trg);this._updateHeader();delete args.currentState;args.state=args.newState;delete args.newState;this._triggerCheckedEvent(event,args)}event.stopPropagation()},_headerCheckBoxClicked:function(event){var trg=$(event.target).closest("span[name='hchk']"),args,noCancel,state=trg.attr("data-chk");args={owner:this,grid:this.grid,currentState:state,newState:state==="off"?"on":"off",isHeader:true};noCancel=this._triggerCheckingEvent(event,args);if(noCancel===true){this._handleHcheck(trg);delete args.currentState;args.state=args.newState;delete args.newState;this._triggerCheckedEvent(event,args)}event.stopPropagation();event.preventDefault()},_handleCheck:function(checkbox){var row=checkbox.parent().parent(),idx=this._getVisibleRowIndex(row),rIdx=this._getVisibleHRowIndex(row),offset=0,upd,sel;if(checkbox===undefined||checkbox===null){return}upd=this.grid.element.data("igGridUpdating");sel=this.grid.element.data("igGridSelection");if(sel&&sel._suspend){if(upd){if(upd.findInvalid()){return}upd._endEdit(null,true)}else{return}}if(this._v===true){offset=this.grid._startRowIndex}if(checkbox.attr("data-chk")==="off"){this._alterCheckbox(checkbox,true);if(this.grid.element.igGridSelection("option","multipleSelection")!==true){this._clearRowSelectorsSelection()}this.grid.element.igGridSelection("selectRow",rIdx+offset);if(this._pSelection[this._cpIdx]===undefined){this._pSelection[this._cpIdx]={}}this._pSelection[this._cpIdx][idx+offset]=true;this._updateCheckBoxes(idx)}else{this._alterCheckbox(checkbox,false);this.grid.element.igGridSelection("deselectRow",rIdx+offset);this._pSelection[this._cpIdx][idx+offset]=false}},_handleHcheck:function(checkbox){var checkBoxes=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]'),i,vfs,sm;if(this.grid._isFixedElement(checkbox)){checkBoxes=this.grid.fixedContainer().find('tbody>tr>th span[name="chk"]')}this.grid.element.unbind("iggridselectioninternalrowselectionchanged",this._rowSelectionChangedHandler);if(checkbox.attr("data-chk")==="off"){this._alterCheckbox(checkbox,true);for(i=0;i<checkBoxes.length;i++){if($(checkBoxes[i]).attr("data-chk")==="off"){this._handleCheck($(checkBoxes[i]))}}}else{this._alterCheckbox(checkbox,false);for(i=0;i<checkBoxes.length;i++){if($(checkBoxes[i]).attr("data-chk")==="on"){this._handleCheck($(checkBoxes[i]))}}}if(this._v===true){vfs=checkbox.attr("data-chk")==="on"?true:false;sm=vfs?"selectRow":"deselectRow";for(i=0;i<this.grid._startRowIndex;i++){if(this._pSelection[this._cpIdx][i]!==vfs){this.grid.element.igGridSelection(sm,i);this._pSelection[this._cpIdx][i]=vfs}}for(i=this.grid._startRowIndex+this.grid._virtualRowCount;i<this.grid._totalRowCount;i++){if(this._pSelection[this._cpIdx][i]!==vfs){this.grid.element.igGridSelection(sm,i);this._pSelection[this._cpIdx][i]=vfs}}}this.grid.element.bind("iggridselectioninternalrowselectionchanged",this._rowSelectionChangedHandler)},_updateHeader:function(){var checkboxes=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]'),i,check=true,header=$("#"+this.grid.id()+(this.grid.options.fixedHeaders===true?"_headers":"")+'>thead>tr>th span[name="hchk"]');if(this.grid.hasFixedColumns()&&this.grid.element.data("igGridColumnFixing").options.fixingDirection==="left"){checkboxes=this.grid.fixedContainer().find('tbody>tr>th span[name="chk"]');header=this.grid.fixedContainer().find('thead>tr>th span[name="hchk"]')}for(i=0;i<checkboxes.length;i++){if($(checkboxes[i]).attr("data-chk")==="off"){check=false;break}}this._alterCheckbox(header,check)},_updateCheckBoxes:function(idx){var cb,self=this;if(this.grid.element.igGridSelection("option","multipleSelection")===true){return}cb=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]');if(this._pSelection[this._cpIdx]!==undefined){$.each(this._pSelection[this._cpIdx],function(key,value){if(value===true&&parseInt(key,10)!==idx){self._alterCheckbox($(cb[key]),false);self._pSelection[self._cpIdx][key]=false}})}},_alterCheckbox:function(checkbox,check){var $inner=$(checkbox.children()[0]);if(checkbox!==undefined&&$inner!==undefined){if(check===true){checkbox.attr("data-chk","on");$inner.removeClass(this.css.checkboxOff).addClass(this.css.checkboxOn)}else{checkbox.attr("data-chk","off");$inner.removeClass(this.css.checkboxOn).addClass(this.css.checkboxOff)}}},_getRowSelectorCellMarkup:function(template){return'<th class="'+this.css.rowSelectorCssClass+'">'+'<span class="ui-icon ui-icon-triangle-1-e" style="margin-left: -5px"> </span>'+(this.options.enableRowNumbering===true?template===true?this._nTmpl:this._getCurrentNumber():"")+(this.options.enableCheckBoxes===true?this._getCheckBox():"")+"</th>"},_getCheckBox:function(header){return'<span name="'+(header===true?"hchk":"chk")+'" data-chk="off" data-role="checkbox" class="'+this.css.checkbox+'"'+(this.options.showCheckBoxesOnFocus===true&&this._checkBoxesShown===false?' style="visibility: hidden;"':"")+'><span class="'+this.css.checkboxOff+'"></span></span>'},_getCurrentNumber:function(id){var seed;if(id!==undefined&&id!==null){seed=id}else{seed=++this._cIdx}return'<span class="ui-iggrid-rowselector-row-number">'+(seed+this.options.rowNumberingSeed+this._getStartingIndexForPage())+"</span>"},_getStartingIndexForPage:function(){if(this._isPaging===false){return 0}return this.grid.element.igGridPaging("pageIndex")*this.grid.element.igGridPaging("pageSize")},_rsRenderVirtualRecords:function(event,ui){var i=0,rs;this._cIdx=0;this._vRsDom=[];for(i;i<ui.rows.length;i++){rs=$(this._getRowSelectorCellMarkup());this._vRsDom.push(rs);rs.prependTo($(ui.rows[i]))}this._unregisterCellEvents();this._registerCellEvents();if(this.options.enableCheckBoxes===true){this._registerCheckBoxEvents()}},_rrn:function(event,args){var rsDom=this._vRsDom,rs,i=0,sri=this.grid._startRowIndex||0;for(i=0;i<rsDom.length;i++){rs=$(rsDom[i]);if(this.options.enableRowNumbering===true){rs.children("span.ui-iggrid-rowselector-row-number").text(sri+i+this.options.rowNumberingSeed+1)}rs.removeClass(this.css.nodeHovered)}if(!this._skipRefresh){this._refreshSelection(sri)}},_rcn:function(event,args){var i=0,st=this._index+1;if(args.startColIndex!==0){if(this.grid.options.fixedHeaders===true){$("#"+this.grid.id()+"_headers colgroup:nth-child("+st+")").hide()}$("#"+this.grid.id()+" colgroup:nth-child("+st+")").hide();$("#"+this.grid.id()+" thead th[data-role='rs']").hide();$("#"+this.grid.id()+" tfoot th[data-role='rs']").hide();for(i;i<this._vRsDom.length;i++){this._vRsDom[i].hide()}}else{if(this.grid.options.fixedHeaders===true){$("#"+this.grid.id()+"_headers colgroup:nth-child("+st+")").css("display","")}$("#"+this.grid.id()+" colgroup:nth-child("+st+")").css("display","");$("#"+this.grid.id()+" thead th[data-role='rs']").css("display","");$("#"+this.grid.id()+" tfoot th[data-role='rs']").css("display","");for(i;i<this._vRsDom.length;i++){this._vRsDom[i].css("display","")}}},_cSelectionChanged:function(event,ui){var cells,cog=false;if(ui.owner.grid.id()!==this.grid.id()){cog=true}if(!this._ms){cells=[this.grid._selectedCell]}else{cells=ui.selectedCells}this._selectionChanged(this.grid._selectedRows,cells,cog)},_rSelectionChanged:function(event,ui){var rows,cog=false;if(ui.owner.grid.id()!==this.grid.id()){cog=true}if(!this._ms){rows=[this.grid._selectedRow]}else{rows=ui.selectedRows}if(this.grid.hasFixedColumns()&&this.grid.element.data("igGridColumnFixing").options.fixingDirection==="left"){if(!ui.selectedFixedRows){rows=[]}else if(ui.selectedFixedRows.length===0){rows=[this.grid._selectedFixedRow]}else{rows=ui.selectedFixedRows}this._selectionChanged(rows,this.grid._selectedFixedCells,cog)}else{this._selectionChanged(rows,this.grid._selectedCells,cog)}},_selectionChanged:function(selRows,selCells,selectedOtherGrid){var i,row,rowInRange,rowSelector,checkbox,offset=this._v===true?this.grid._startRowIndex||0:0;this._clearRowSelectorsSelection();if(this.options.enableCheckBoxes===true){this._clearRowSelectorsCheckboxes();this._pSelection[this._cpIdx]={}}if(selectedOtherGrid===true){return}if(this._checkBoxesShown===false&&this.options.showCheckBoxesOnFocus===true){this._animateCheckboxes(true)}for(i=0;i<selRows.length;i++){if(this._v===true){rowInRange=offset<=selRows[i].index&&selRows[i].index<offset+this.grid._virtualRowCount;row=rowInRange===true?$(selRows[i].element).parent().children().eq(selRows[i].index-offset):null}else{row=$(selRows[i].element)}if(row){rowSelector=row.children().eq(this._index);if(rowSelector.hasClass("ui-iggrid-selectedcell ui-state-active")===false){rowSelector.addClass("ui-iggrid-selectedcell ui-state-active")}if(this.options.enableCheckBoxes===true){checkbox=rowSelector.find("span[name='chk']");this._alterCheckbox(checkbox,true)}}if(this.options.enableCheckBoxes===true){this._pSelection[this._cpIdx][selRows[i].index]=true}}for(i=0;i<selCells.length;i++){rowSelector=$($(selCells[i].element).parent().children()[this._index]);if(rowSelector.hasClass("ui-iggrid-selectedcell ui-state-active")===false){rowSelector.addClass("ui-iggrid-selectedcell ui-state-active")}}this._updateHeader()},_refreshSelection:function(sri){var i,checkboxes,cb,sc,sr,rsCells=this._vRsDom.length>0?this._vRsDom:this._allRowSelectorCells();this._clearRowSelectorsSelection(false);if(this.options.enableCheckBoxes===true){checkboxes=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]').attr("data-chk","off");checkboxes.children("span").removeClass(this.css.checkboxOn).addClass(this.css.checkboxOff)}if(!this._skipRefresh){if(!this._ms){sc=this.grid._selectedCell?[this.grid._selectedCell]:[];sr=this.grid._selectedRow?[this.grid._selectedRow]:[]}else{sc=this.grid._selectedCells;sr=this.grid._selectedRows}for(i=0;i<sc.length;i++){if(sc[i].rowIndex>=sri&&sc[i].rowIndex<sri+this._vRsDom.length){$(rsCells[sc[i].rowIndex-sri]).addClass("ui-iggrid-selectedcell ui-state-active")}}for(i=0;i<sr.length;i++){if(sr[i].index>=sri&&sr[i].index<sri+this._vRsDom.length){$(rsCells[sr[i].index-sri]).addClass("ui-iggrid-selectedcell ui-state-active")}}}if(this.options.enableCheckBoxes===true&&this._pSelection[this._cpIdx]){checkboxes=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]').attr("data-chk","off");checkboxes.children("span").removeClass(this.css.checkboxOn).addClass(this.css.checkboxOff);for(i=sri;i<sri+checkboxes.length;i++){if(this._pSelection[this._cpIdx][i]){cb=$(checkboxes[i-sri]);if(this._pSelection[this._cpIdx][i]===true){this._alterCheckbox(cb,true)}}}}},_clearSelection:function(evt,ui){if(ui.owner.id()===this.grid.id()){this._clearRowSelectorsSelection();this._clearRowSelectorsCheckboxes()}if(!ui.uiDirty||ui.uiDirty===false){this._pSelection[this._cpIdx]={}}},_clearRowSelectorsSelection:function(){var selectors,i;selectors=$("#"+this.grid.id()+">tbody>tr>th."+this.css.rowSelectorCssClass);for(i=0;i<selectors.length;i++){$(selectors[i]).removeClass("ui-iggrid-selectedcell ui-state-active")}this._index=$(selectors[0]).index();if(this.grid.hasFixedColumns()){selectors=this.grid.fixedContainer().find("tbody>tr>th."+this.css.rowSelectorCssClass);for(i=0;i<selectors.length;i++){$(selectors[i]).removeClass("ui-iggrid-selectedcell ui-state-active")}if(this._index<0){this._index=$(selectors[0]).index()}}},_clearRowSelectorsCheckboxes:function(){var cbs,$cbs,i;cbs=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]');for(i=0;i<cbs.length;i++){$cbs=$(cbs[i]);if($cbs.attr("data-chk")==="on"){this._alterCheckbox($cbs,false)}}if(cbs.length>0){this._updateHeader()}if(this.grid.hasFixedColumns()){cbs=this.grid.fixedContainer().find('tbody>tr>th span[name="chk"]');for(i=0;i<cbs.length;i++){$cbs=$(cbs[i]);if($cbs.attr("data-chk")==="on"){this._alterCheckbox($cbs,false)}}}},_cellClick:function(event,ui){var args,fRow,rCell=$(event.target).closest("th"),rRow=rCell.parent(),rIdx=this._getVisibleRowIndex(rRow),rKey=rRow.attr("data-id");if(this.options.showCheckBoxesOnFocus===true&&this._checkBoxesShown===false){this._animateCheckboxes(true)}if($(event.target).is("span")&&$(event.target).attr("unselectable")){return}if(rKey===""||rKey===null||rKey===undefined){rKey=rIdx}if(this.grid.hasFixedColumns()){if(this.grid._isFixedElement(rCell)){fRow=rRow;rRow=this.grid.scrollContainer().find("tbody>tr").eq(rRow.index())}else{fRow=this.grid.fixedContainer().find("tbody>tr").eq(rRow.index())}}args={row:rRow,fixedRow:fRow,rowIndex:rIdx,rowKey:rKey,rowSelector:rCell,owner:this,grid:this.grid};this._triggerClickEvent(event,args)},_mouseHoverRow:function(event,ui){var par,tag,tr=event.target;while(tr){par=tr.parentNode;tag=tr.nodeName;if(tag==="TR"&&par.nodeName==="TBODY"){break}tr=tag==="TABLE"?null:par}if(this._hovTR!==tr){if(this._hovTR&&$(this._hovTR).attr("data-container")!=="true"){$("th."+this.css.rowSelectorCssClass,this._hovTR).removeClass(this.css.nodeHovered)}if(tr&&$(tr).attr("data-container")!=="true"){$("th."+this.css.rowSelectorCssClass,tr).addClass(this.css.nodeHovered)}this._hovTR=tr}},_mouseLeaveRow:function(event,ui){if(this._hovTR){$("th",this._hovTR).removeClass(this.css.nodeHovered);this._hovTR=null}},_triggerClickEvent:function(event,args){this._trigger(this.events.rowSelectorClicked,event,args)},_triggerCheckingEvent:function(event,args){return this._trigger(this.events.checkBoxStateChanging,event,args)},_triggerCheckedEvent:function(event,args){this._trigger(this.events.checkBoxStateChanged,event,args)},_pageIndexChanging:function(event,ui){if(ui.owner.grid.id()!==this.grid.id()){return}if(this._v){this._skipRefresh=true}this._isPaging=true;this._cIdx=0},_pageIndexChanged:function(event,ui){var self=this,idx=ui.pageIndex,checkboxes,iKey,cb,sl=jQuery.extend(true,{},this._pSelection[idx]);if(ui.owner.grid.id()!==this.grid.id()){return}this._cpIdx=idx;if(sl){checkboxes=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]');$.each(sl,function(key,value){if(sl[key]===true){iKey=parseInt(key,10);cb=$(checkboxes[iKey]);self._alterCheckbox(cb,true);self.grid.element.igGridSelection("selectRow",cb.closest("tr").index())}})}if(this.options.enableCheckBoxes===true){this._updateHeader()}if(this._v){delete this._skipRefresh}},_getVisibleRowIndex:function(row){return row.closest("tbody").children("tr:not([data-container='true'],[data-grouprow='true'])").index(row)},_getVisibleHRowIndex:function(row){return row.closest("tbody").children("tr:not([data-container='true'])").index(row)},_animateCheckboxes:function(trans){var h=$("#"+this.grid.id()+(this.grid.options.fixedHeaders===true?"_headers":"")+'>thead>tr>th span[name="hchk"]'),c=$("#"+this.grid.id()+'>tbody>tr>th span[name="chk"]'),all=h.add(c);if(trans===true){all.css("visibility","visible").css("opacity",0).animate({opacity:1},1e3)}else{all.css("opacity",1e3).animate({opacity:0},1e3,function(){$(this).css("visibility","hidden")})}this._checkBoxesShown=trans},_newRowAdded:function(event,ui){this._unregisterCellEvents();this._registerCellEvents();if(this.options.enableCheckBoxes===true){this._registerCheckBoxEvents()}},_cleanSelection:function(event,ui){var header;header=$("#"+this.grid.id()+(this.grid.options.fixedHeaders===true?"_headers":"")+'>thead>tr>th span[name="hchk"]');this._alterCheckbox(header,false);this._pSelection={};this._cpIdx=this.grid.dataSource.pageIndex()},_resetIndexing:function(){this._cIdx=0},_cleanInterface:function(isRebind){var header,footer,cols,rsCells,w;if(isRebind===true){header=$("#"+this.grid.id()+(this.grid.options.fixedHeaders===true?"_headers":"")+'>thead>tr>th span[name="hchk"]');this._alterCheckbox(header,false);return}cols=$("#"+this.grid.id()+" col[data-role='rs']");if(this.grid.options.fixedHeaders===true){cols=cols.add("#"+this.grid.id()+"_headers col[data-role='rs']")}if(this.grid.options.fixedFooters===true){cols=cols.add("#"+this.grid.id()+"_footers col[data-role='rs']")}footer=$("#"+this.grid.id()+(this.grid.options.fixedFooters===true?"_footers":"")+" td[data-role='rs']");header=$("#"+this.grid.id()+(this.grid.options.fixedHeaders===true?"_headers":"")+" th[data-role='rs']");rsCells=$("#"+this.grid.id()+" th.ui-iggrid-rowselector-class");if(!this.grid.options.width&&this._functionsRedirected){w=this.grid.container().css("width");if(w&&!w.endsWith("%")){this.grid.container().css("width",parseInt(w,10)-this.options.rowSelectorColumnWidth)}}cols.remove();footer.remove();header.remove();rsCells.remove()},_allRowSelectorCells:function(){var rowSelectors=this.grid.element.children("tbody").children("tr").children("th."+this.css.rowSelector);if(rowSelectors.length===0&&this.grid.hasFixedColumns()){rowSelectors=this.grid.fixedContainer().find("tbody > tr > th."+this.css.rowSelector)}return rowSelectors},_columnFixed:function(args){var columnFixingInstance=this.grid.element.data("igGridColumnFixing"),countFixedCols=args.fixedColsCount;if(!columnFixingInstance){return}if(columnFixingInstance.options.fixingDirection==="right"){return}if(!this._isColumnFixingFunctionsRedirected){this._renderFixedRecordHandler=$.proxy(columnFixingInstance._renderFixedRecord,columnFixingInstance);this._isColumnFixingFunctionsRedirected=true}if(args.isFixed){if(args.isInit){this.grid._renderRecord=this._gridRenderRecordHandler;columnFixingInstance._renderFixedRecord=$.proxy(this._rsRenderFixedRecord,this)}}else{if(countFixedCols<=1&&!this.grid.hasFixedDataSkippedColumns()){this.grid._renderRecord=this._renderRecordHandler;columnFixingInstance._renderFixedRecord=this._renderFixedRecordHandler}}},_checkForSelection:function(){var i,isSelection=false;for(i=0;i<this.grid.options.features.length;i++){if(this.grid.options.features[i].name==="Selection"){isSelection=true;break}}if(isSelection===false){if(this.options.requireSelection===true){throw new Error($.ig.GridRowSelectors.locale.selectionNotLoaded)}this._skipRefresh=true}},_groupedColumnsChanging:function(args){this._resetIndexing()},_createHandlers:function(){this._headerRenderedHandler=$.proxy(this._headerRendered,this);this._footerRenderedHandler=$.proxy(this._footerRendered,this);this._recordsRenderingHandler=$.proxy(this._recordsRendering,this);this._recordsRenderedHandler=$.proxy(this._recordsRendered,this);this._gridRenderedHandler=$.proxy(this._gridRendered,this);this._cellSelectionChangedHandler=$.proxy(this._cSelectionChanged,this);this._rowSelectionChangedHandler=$.proxy(this._rSelectionChanged,this);this._clearSelectionHandler=$.proxy(this._clearSelection,this);this._virtualDomBuiltHandler=$.proxy(this._rsRenderVirtualRecords,this);this._virtualRowsHandler=$.proxy(this._rrn,this);this._virtualColumnsHandler=$.proxy(this._rcn,this);this._pageIndexChangingHandler=$.proxy(this._pageIndexChanging,this);this._pageIndexChangedHandler=$.proxy(this._pageIndexChanged,this);this._renderExtraHeaderCellHandler=$.proxy(this._renderExtraHeaderCells,this);this._renderExtraFooterCellHandler=$.proxy(this._renderExtraFooterCells,this);this._rsClickHandler=$.proxy(this._cellClick,this);this._rrHoverHandler=$.proxy(this._mouseHoverRow,this);this._rrLeaveHandler=$.proxy(this._mouseLeaveRow,this);this._newRowAddedHandler=$.proxy(this._newRowAdded,this);this._cleanHandler=$.proxy(this._cleanSelection,this);if(this.options.enableCheckBoxes===true){this._checkboxMouseOverHandler=$.proxy(this._checkboxMouseOver,this);this._checkboxMouseOutHandler=$.proxy(this._checkboxMouseOut,this);this._checkboxClickHandler=$.proxy(this._checkBoxClicked,this);this._hCheckboxClickHandler=$.proxy(this._headerCheckBoxClicked,this)}},_registerEvents:function(){this.grid.element.bind("iggridheaderrendered",this._headerRenderedHandler);this.grid.element.bind("iggridfooterrendered",this._footerRenderedHandler);this.grid.element.bind("iggrid_rowsrendering",this._recordsRenderingHandler);this.grid.element.bind("iggridrowsrendered",this._recordsRenderedHandler);this.grid.element.bind("iggriddatarendered",this._gridRenderedHandler);this.grid.element.bind("iggridvirtualdombuilt",this._virtualDomBuiltHandler);this.grid.element.bind("iggridvirtualrecordsrender",this._virtualRowsHandler);this.grid.element.bind("iggridvirtualhorizontalscroll",this._virtualColumnsHandler);this.grid.element.bind("iggridselectioncellselectionchanged",this._cellSelectionChangedHandler);this.grid.element.bind("iggridselectionrowselectionchanged",this._rowSelectionChangedHandler);this.grid.element.bind("iggridselectioninternalrowselectionchanged",this._rowSelectionChangedHandler);this.grid.element.bind("iggridselectioninternalcellselectionchanged",this._cellSelectionChangedHandler);this.grid.element.bind("iggridselectionselectioncleared",this._clearSelectionHandler);this.grid.element.bind("iggridpagingpageindexchanging",this._pageIndexChangingHandler);
this.grid.element.bind("iggridpagingpageindexchanged",this._pageIndexChangedHandler);this.grid.element.bind("iggridpagingpagesizechanged",this._cleanHandler);this.grid.element.bind("iggridfilteringdatafiltered",this._cleanHandler);this.grid.element.bind("iggridgroupbygroupedcolumnschanged",this._cleanHandler);this.grid.element.bind("iggriduidirty",this._cleanHandler);this.grid.element.bind("iggridupdatingrowadded",this._newRowAddedHandler);this.grid.element.bind("iggridupdatinginternalrowadded",this._newRowAddedHandler);this.grid.element.bind("iggridloadondemandrowsrequested",this._newRowAddedHandler)},_unregisterEvents:function(){this.grid.element.unbind("iggridheaderrendered",this._headerRenderedHandler);this.grid.element.unbind("iggridfooterrendered",this._footerRenderedHandler);this.grid.element.unbind("iggrid_rowsrendering",this._recordsRenderingHandler);this.grid.element.unbind("iggridrowsrendered",this._recordsRenderedHandler);this.grid.element.unbind("iggriddatarendered",this._gridRenderedHandler);this.grid.element.unbind("iggridvirtualdombuilt",this._virtualDomBuiltHandler);this.grid.element.unbind("iggridvirtualrecordsrender",this._virtualRowsHandler);this.grid.element.unbind("iggridvirtualhorizontalscroll",this._virtualColumnsHandler);this.grid.element.unbind("iggridselectioncellselectionchanged",this._cellSelectionChangedHandler);this.grid.element.unbind("iggridselectionrowselectionchanged",this._rowSelectionChangedHandler);this.grid.element.unbind("iggridselectioninternalrowselectionchanged",this._rowSelectionChangedHandler);this.grid.element.unbind("iggridselectioninternalcellselectionchanged",this._cellSelectionChangedHandler);this.grid.element.unbind("iggridselectioncleared",this._clearSelectionHandler);this.grid.element.unbind("iggridpagingpageindexchanging",this._pageIndexChangingHandler);this.grid.element.unbind("iggridpagingpageindexchanged",this._pageIndexChangedHandler);this.grid.element.unbind("iggridpagingpagesizechanged",this._cleanHandler);this.grid.element.unbind("iggridfilteringdatafiltered",this._cleanHandler);this.grid.element.unbind("iggridgroupbygroupedcolumnschanged",this._cleanHandler);this.grid.element.unbind("iggriduidirty",this._cleanHandler);this.grid.element.unbind("iggridupdatingrowadded",this._newRowAddedHandler);this.grid.element.unbind("iggridupdatinginternalrowadded",this._newRowAddedHandler);this.grid.element.unbind("iggridloadondemandrowsrequested",this._newRowAddedHandler)},_injectGrid:function(gridInstance,isRebind){if(isRebind===true){this._cleanInterface(true);return}var self=this;this.grid=gridInstance;this._v=this.grid.options.virtualization===true||this.grid.options.rowVirtualization===true;this._flatRenderColgroup=this.grid._renderColgroup;this._createHandlers();this.grid._headerInitCallbacks.push({type:"RowSelectors",func:this._renderExtraHeaderCellHandler});this.grid._footerInitCallbacks.push({type:"RowSelectors",func:this._renderExtraFooterCellHandler});this._registerEvents();this.grid._renderColgroup=function(){if(self._flatRenderColgroup!==undefined){self._rsRenderColgroup.apply(self.grid,$.merge([self._flatRenderColgroup,self],arguments))}};this._checkForSelection()}});$.extend($.ui.igGridRowSelectors,{version:"13.2.20132.2364"})})(jQuery);