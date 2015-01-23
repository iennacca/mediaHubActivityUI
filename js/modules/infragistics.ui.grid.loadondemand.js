﻿/*!@license
 * Infragistics.Web.ClientUI Grid LoadOnDemand 13.2.20132.2364
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
 *	infragistics.ui.shared.js
 *	infragistics.util.js
 */
if(typeof jQuery!=="function"){throw new Error("jQuery is undefined")}(function($){$.widget("ui.igGridLoadOnDemand",{options:{type:null,chunkSize:25,recordCountKey:null,chunkSizeUrlKey:null,chunkIndexUrlKey:null,defaultChunkIndex:0,currentChunkIndex:0,loadTrigger:"auto",loadMoreDataButtonText:$.ig.GridLoadOnDemand.locale.loadMoreDataButtonText},css:{loadMoreButton:"ui-iggrid-loadmorebutton"},events:{rowsRequesting:"rowsRequesting",rowsRequested:"rowsRequested"},_loadingIndicator:null,_injectGrid:function(gridInstance,isRebind){this.grid=gridInstance;this._checkNotSupportedScenarios();this.options.currentChunkIndex=this.options.defaultChunkIndex;if(this.options.type===null){this.options.type=this.grid._inferOpType()}this.grid.dataSource.settings.paging.type=this.options.type||"remote";this._defaultChunkSize=parseInt(this.options.chunkSize,10)*(this.options.defaultChunkIndex+1);this.grid.dataSource.settings.paging.pageSize=this._defaultChunkSize;if(this.options.chunkSizeUrlKey!==null&&this.options.chunkIndexUrlKey){this.grid.dataSource.settings.paging.pageSizeUrlKey=this.options.chunkSizeUrlKey;this.grid.dataSource.settings.paging.pageIndexUrlKey=this.options.chunkIndexUrlKey}if(this.options.recordCountKey!==null){this.grid.dataSource.settings.responseTotalRecCountKey=this.options.recordCountKey}this.grid.dataSource.settings.paging.enabled=true;if(this.options.loadTrigger==="auto"){this._verticalScrollHandler=$.proxy(this._probeForNextPage,this)}this._appendRecordsHandler=$.proxy(this._appendRecords,this);this.grid.element.bind("iggridrowsrendered",this._rowsRenderingHandler);this._rowDeletedHandler=$.proxy(this._rowDeleted,this);this._rowAddedHandler=$.proxy(this._rowAdded,this);this.grid.element.bind("iggridupdatinginternalrowdeleted",this._rowDeletedHandler);this.grid.element.bind("iggridupdatinginternalrowadded",this._rowAddedHandler)},_dataRendered:function(){var scrollId="#"+this.grid.scrollContainer()[0].id,buttonId,container;this.grid.scrollContainer().css("background-color","white");this._originalDataSourceCallback=this.grid.dataSource.settings.callback;this._initLoadingIndicator();if(this.options.loadTrigger==="auto"){$(scrollId).unbind("scroll",this._verticalScrollHandler);$(scrollId).bind("scroll",this._verticalScrollHandler);this._probeForNextPage()}this._requestPending=false;if(this.options.loadTrigger==="button"){if(!this._loadMoreButton){this._loadMoreButton=this._renderLoadDataButton()}}if(this._loadingIndicator){this._hideLoading()}},_renderLoadDataButton:function(){var button;buttonId=this.grid.id()+"_loadMoreButton";container=this.grid.options.height?this.grid.scrollContainer():this.grid.container();button=$("<div class='"+this.css.loadMoreButton+"'><input type='button' id='"+buttonId+"'></input></div>").appendTo(container);$("#"+buttonId).igButton({labelText:this.options.loadMoreDataButtonText,click:$.proxy(this._nextChunk,this),width:"100%"});return button},_destroyLoadDataButton:function(buttonDom){$(buttonDom).remove()},_renderFixedLoadDataButton:function(){var button;buttonId=this.grid.id()+"_fixedLoadMoreButton";container=this.grid.fixedTable();button=$("<div class='"+this.css.loadMoreButton+"'><input type='button' id='"+buttonId+"'></input></div>").insertAfter(container);$("#"+buttonId).igButton({labelText:this.options.loadMoreDataButtonText,click:$.proxy(this._nextChunk,this),width:"100%"});return button},_destroyFixedLoadDataButton:function(buttonDom){$(buttonDom).remove()},_checkNotSupportedScenarios:function(){if(this.options.loadTrigger==="auto"&&!this.grid.options.height){throw new Error($.ig.GridLoadOnDemand.locale.loadOnDemandRequiresHeight)}if(this.grid.options.virtualization){throw new Error($.ig.GridLoadOnDemand.locale.virtualizationNotSupported)}var i,featureName,features=this.grid.options.features,featuresLength=features.length;if(featuresLength===1){return}for(i=0;i<featuresLength;i++){featureName=features[i].name;if(!featureName){continue}featureName=featureName.toLowerCase();switch(featureName){case"groupby":throw new Error($.ig.GridLoadOnDemand.locale.groupByNotSupported);case"paging":throw new Error($.ig.GridLoadOnDemand.locale.pagingNotSupported);case"cellmerging":throw new Error($.ig.GridLoadOnDemand.locale.cellMergingNotSupported)}}},_setOption:function(key,value){$.Widget.prototype._setOption.apply(this,arguments);if(key==="defaultChunkIndex"){throw new Error($.ig.Grid.locale.optionChangeNotSupported+" "+key)}if(key==="currentChunkIndex"||key==="chunkSize"){this.grid.dataSource.settings.paging.pageSize=(this.options.currentChunkIndex+1)*this.options.chunkSize;this.grid.dataSource.dataBind()}},_initLoadingIndicator:function(){this._loadingIndicator=this.grid.container().igLoading().data("igLoading").indicator()},_nextChunk:function(){var noCancel=true;if(this.grid.dataSource.pageIndex()>=this.grid.dataSource.pageCount()-1){return}noCancel=this._trigger(this.events.rowsRequesting,null,{owner:this,chunkIndex:this.options.currentChunkIndex+1,chunkSize:this.options.chunkSize});if(noCancel){this._showLoading();this.grid.dataSource.settings.paging.pageSize=this.options.chunkSize;this.grid.dataSource.settings.paging.pageIndex=this.options.currentChunkIndex;this.grid.dataSource.settings.paging.appendPage=true;this._originalDataSourceCallback=this.grid.dataSource.settings.callback;this.grid.dataSource.settings.callback=this._appendRecordsHandler;this._requestPending=true;this.grid.dataSource.nextPage()}},_showLoading:function(){this._loadingIndicator.show()},_hideLoading:function(){this._loadingIndicator.hide()},destroy:function(){var scrollId="#"+this.grid.scrollContainer()[0].id;this._destroyLoadDataButton(this._loadMoreButton);this._destroyFixedLoadDataButton(this._fixedLoadMoreButton);this.grid.element.unbind("iggridrowsrendered",this._rowsRenderingHandler);$(scrollId).unbind("scroll",this._verticalScrollHandler);this.grid.element.unbind("iggridupdatinginternalrowdeleted",this._rowDeletedHandler);this.grid.element.unbind("iggridupdatinginternalrowadded",this._rowAddedHandler);$.Widget.prototype.destroy.call(this);return this},_appendRecords:function(success,errmsg){var i,currentPage,noCancelError,sorting=this.grid.element.data("igGridSorting");if(success===true){currentPage=this.grid.dataSource.recordsForPage(this.grid.dataSource.settings.paging.pageIndex);for(i=0;i<currentPage.length;i++){this.grid.renderNewRow(currentPage[i])}}this._requestPending=false;this.grid.dataSource.settings.paging.pageSize=this.options.chunkSize*(this.options.currentChunkIndex+1);this.grid.dataSource.settings.paging.pageIndex=0;this.grid.dataSource.settings.paging.appendPage=false;this.grid.dataSource.settings.callback=this._originalDataSourceCallback;if(sorting){sorting._dataRendered()}this._hideLoading();if(success===false){noCancelError=this._trigger(this.grid.events.requestError,null,{owner:this,message:errmsg});if(noCancelError){throw new Error(errmsg)}}this.options.currentChunkIndex++;this.grid.dataSource.settings.paging.pageSize=this.options.chunkSize*(this.options.currentChunkIndex+1);this._trigger(this.events.rowsRequested,null,{owner:this,chunkIndex:this.options.currentChunkIndex,chunkSize:this.options.chunkSize,rows:currentPage})},_refreshData:function(){this._showLoading();this.grid.dataSource.settings.paging.appendPage=false;this.grid.dataSource.settings.callback=this._originalDataSourceCallback;this._requestPending=true;this.grid.dataSource.dataBind()},_probeForNextPage:function(evt,ui){var delta=(this.grid.scrollContainer().scrollTop()+this.grid.scrollContainer().height())/$(this.grid.element).height();if(delta>=1&&!this._requestPending){this._nextChunk()}},nextChunk:function(){this._nextChunk()},_columnFixed:function(args){var fixedColumnsCount=this.grid.fixedHeadersTable().find("thead > tr:eq(0) > th").length;if(this.options.loadTrigger==="button"){if(fixedColumnsCount>0){if(!this._fixedLoadMoreButton){this._fixedLoadMoreButton=this._renderFixedLoadDataButton()}}if(fixedColumnsCount===0){this._destroyFixedLoadDataButton(this._fixedLoadMoreButton);this._fixedLoadMoreButton=null}}},_rowDeleted:function(event,args){this.grid.dataSource.settings.paging.pageSize=this.options.chunkSize;var currentPage=this.grid.dataSource.recordsForPage(this.options.currentChunkIndex),record,pageCount=this.grid.dataSource.pageCount();if(currentPage.length==0){this.options.currentChunkIndex=Math.max(0,this.options.currentChunkIndex-1)}else{record=currentPage[this.options.chunkSize-1];if(record&&pageCount>1){this.grid.renderNewRow(record)}}this.grid.dataSource.settings.paging.pageSize=(this.options.currentChunkIndex+1)*this.options.chunkSize}});$.extend($.ui.igGridLoadOnDemand,{version:"13.2.20132.2364"})})(jQuery);