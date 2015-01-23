﻿/*!@license
* Infragistics.Web.ClientUI igCombo KnockoutJS extension 13.2.20132.2364
*
* Copyright (c) 2012-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
*	jquery-1.7.2.js
*	ig.util.js
*	ig.dataSource.js
*/
(function($){ko.bindingHandlers.igCombo={init:function(element,valueAccessor,allBindingsAccessor,viewModel){var combo=$(element),options=$.isEmptyObject(valueAccessor())?{}:$.extend({},valueAccessor()),enableTextChangedUpdate=options.enableTextChangedUpdate,enableSelectionChangedUpdate=options.enableSelectionChangedUpdate,isCascading=false,currentDataSource,i;if(valueAccessor().text!==undefined){options.text=ko.utils.unwrapObservable(valueAccessor().text)}if(options.dataSource!==undefined){currentDataSource=options.dataSource;options.dataSource=typeof currentDataSource==="string"?currentDataSource:ko.toJS(currentDataSource)}else if(options.cascadingDataSources!==undefined){currentDataSource=options.cascadingDataSources;options.cascadingDataSources=typeof currentDataSource==="string"?currentDataSource:ko.toJS(currentDataSource);isCascading=true}delete options.enableTextChangedUpdate;delete options.enableSelectionChangedUpdate;combo.igCombo(options);if(currentDataSource!==undefined&&typeof currentDataSource!=="string"){if(isCascading){ko.applyBindingsToNode($(element).data("igCombo").mainElem[0],{igComboCascading:{combo:element}},currentDataSource)}else{currentDataSource=ko.isObservable(currentDataSource)?currentDataSource():currentDataSource;for(i=0;i<currentDataSource.length;i++){ko.applyBindingsToNode($(element).data("igCombo").mainElem[0],{igComboItem:{combo:element,value:currentDataSource[i],index:i,textKey:options.textKey,valueKey:options.valueKey}},currentDataSource[i])}}}if(ko.isObservable(valueAccessor().text)&&valueAccessor().text()===undefined){valueAccessor().text(combo.igCombo("text"))}if(enableTextChangedUpdate){ko.utils.registerEventHandler(element,"igcombotextchanged",function(evt,ui){if(ui.text!==ui.oldText){if(ko.isObservable(valueAccessor().text)){combo.attr("data-text-mutating",true);valueAccessor().text(ui.text)}else{updatePropertyValue(element,"text",viewModel,ui.text)}if(ko.isObservable(valueAccessor().value)){combo.attr("data-value-mutating",true);valueAccessor().value(ui.owner.value())}else{updatePropertyValue(element,"value",viewModel,ui.owner.value())}}})}if(enableSelectionChangedUpdate){ko.utils.registerEventHandler(element,"igcomboselectionchanged",function(evt,ui){var selectedText="",comboSeperator=ui.owner.element.igCombo("option","itemSeparator"),selectedValue=ui.owner.element.igCombo("value"),i;if(ui.items!==null){for(i=0;i<ui.items.length;i++){selectedText+=ui.items[i].text+comboSeperator}}selectedText=selectedText.substring(0,selectedText.length-comboSeperator.length);if(ko.isObservable(valueAccessor().text)){combo.attr("data-text-mutating",true);valueAccessor().text(selectedText)}else{updatePropertyValue(element,"text",viewModel,selectedText)}if(ko.isObservable(valueAccessor().value)){combo.attr("data-value-mutating",true);valueAccessor().value(selectedValue)}else{updatePropertyValue(element,"value",viewModel,selectedValue)}})}ko.utils.registerEventHandler($(element).data("igCombo").fieldElem,"blur",function(e){var newValue=e.target.value,combo=$(e.target).closest(":ui-igCombo");if(ko.isObservable(valueAccessor().text)){combo.attr("data-text-mutating",true);valueAccessor().text(newValue)}else{updatePropertyValue(element,"text",viewModel,newValue)}newValue=combo.igCombo("value");if(ko.isObservable(valueAccessor().value)){combo.attr("data-value-mutating",true);valueAccessor().value(newValue)}else{updatePropertyValue(element,"value",viewModel,newValue)}})},update:function(element,valueAccessor){var oldDataSource,comboCustom,cascChildCombo,combo=$(element),oldText=combo.igCombo("text"),newText=ko.utils.unwrapObservable(valueAccessor().text),oldValue=combo.igCombo("value"),newValue=ko.utils.unwrapObservable(valueAccessor().value),newDataSource=valueAccessor().dataSource,flag,delta;if(newDataSource!==undefined&&typeof newDataSource!=="string"){newDataSource=ko.toJS(newDataSource);oldDataSource=combo.igCombo("option","dataSource");delta=compareArrays(oldDataSource,newDataSource);if(delta){combo.one("igcombodatabound",function(){combo.igCombo("text",oldText).blur()});combo.igCombo("option","dataSource",newDataSource)}cascChildCombo=combo.data("igCombo")._cascFire;while(cascChildCombo!==undefined){if(cascChildCombo[0]!==undefined){cascChildCombo[0].fieldElem.blur();cascChildCombo=cascChildCombo[0]._cascFire}}}if(newText!==undefined&&newText!==oldText){flag=combo.attr("data-value-mutating");if(flag){combo.removeAttr("data-value-mutating");valueAccessor().text(oldText)}else{combo.igCombo("text",newText);comboCustom=combo.igCombo("option","allowCustomValue");if(!comboCustom&&newText!==""&&combo.igCombo("text")===""){valueAccessor().text("")}if(ko.isObservable(valueAccessor().value)){valueAccessor().value(combo.igCombo("value"))}return}}if(newValue!==undefined&&newValue!==oldValue){flag=combo.attr("data-text-mutating");if(flag){combo.removeAttr("data-text-mutating");valueAccessor().value(oldValue)}else{combo.igCombo("value",newValue);if(ko.isObservable(valueAccessor().text)){valueAccessor().text(combo.igCombo("text"))}}}}};ko.bindingHandlers.igComboItem={update:function(element,valueAccessor,allBindingsAccessor,viewModel){var combo,index,dsItem,newItem,textKey=ko.utils.unwrapObservable(valueAccessor().textKey),valueKey=ko.utils.unwrapObservable(valueAccessor().valueKey),isChanged=false;if(valueKey===undefined&&textKey===undefined){return}combo=$(valueAccessor().combo);index=valueAccessor().index;dsItem=combo.igCombo("getDataSource").data()[index];newItem=ko.toJS(viewModel);if(valueKey!==undefined&&newItem[valueKey]!==undefined&&dsItem[valueKey]!==newItem[valueKey]){dsItem[valueKey]=newItem[valueKey];if(dsItem[valueKey+"_"]!==undefined){dsItem[valueKey+"_"]=newItem[valueKey]}isChanged=true}if(textKey!==undefined&&newItem[textKey]!==undefined&&dsItem[textKey]!==newItem[textKey]){dsItem[textKey]=newItem[textKey];if(dsItem[textKey+"_"]!==undefined){dsItem[textKey+"_"]=newItem[textKey]}isChanged=true}if(isChanged){combo.data("igCombo")._renderRow(index,true)}}};ko.bindingHandlers.igComboCascading={update:function(element,valueAccessor,allBindingsAccessor,viewModel){var combo=$(valueAccessor().combo),newCascadingDS=ko.toJS(viewModel),oldText=combo.igCombo("text");combo.igCombo("option","cascadingDataSources",newCascadingDS);combo.igCombo("text",oldText).data("igCombo").fieldElem.blur()}};ko.bindingHandlers.igComboVisible={update:function(element,valueAccessor){var visible=valueAccessor(),combo=$(element);if(!ko.isObservable(visible)){return}combo.css("display",visible()?"inline-block":"none")}};function compareArrays(arr1,arr2){var index,arr1Length=arr1!==undefined&&arr1!==null?arr1.length:0;if(arr1Length!==arr2.length){return true}else{for(index=0;index<arr1Length;index++){arr1[index]=ko.toJS(arr1[index]);arr2[index]=ko.toJS(arr2[index]);if(typeof arr1[index]==="object"&&typeof arr2[index]==="object"){if(!objectsAreSame(arr1[index],arr2[index])){return true}}else{if(ko.toJS(arr1[index])!==ko.toJS(arr2[index])){return true}}}}return false}function objectsAreSame(obj1,obj2){var areObjSame=true,prop1,prop2;for(var propertyName in obj1){prop1=ko.toJS(obj1[propertyName]);prop2=ko.toJS(obj2[propertyName]);if(prop1!==prop2&&typeof prop1!=="object"){areObjSame=false;break}}return areObjSame}function updatePropertyValue(element,option,viewModel,newValue){var reg=new RegExp("igCombo\\s*:\\s*(?:{.*,?\\s*"+option+"\\s*:\\s*)?([^{},\\s]+)"),key,res=$(element).attr("data-bind").match(reg);if(res){key=res[1];if(viewModel[key]){viewModel[key]=newValue}}}})(jQuery);