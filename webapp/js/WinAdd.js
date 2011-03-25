/*
 * File: WinAdd.js
 * Date: Fri Mar 04 2011 15:01:56 GMT+0900 (JST)
 * 
 * This file was generated by Ext Designer version xds-1.0.3.2.
 * http://www.extjs.com/products/designer/
 *
 * This file will be generated the first time you export.
 *
 * You should implement event handling and custom methods in this
 * class.
 */

WinAdd = Ext.extend(WinAddUi, {

    initComponent: function() {

        var me = this;

        WinAdd.superclass.initComponent.call(me);

        me.addEvents('insert');

        me.btnAddOK.on('click', me.onBtnAddOKClick, me);
        me.btnAddCancel.on('click', me.onBtnAddCancelClick, me);

    },

    onBtnAddOKClick: function () {

        var me = this,
            newObj;

        newObj = {
            name_kanji: me.txtNameKanji.getValue(),
            name_kana:  me.txtNameKana.getValue(),
            birth_date: me.txtBirthDate.getValue()
        };
        me.fireEvent('insert', newObj );
        me.close();
    },

    onBtnAddCancelClick: function () {

        var me = this;

        me.close();

    }
    
});
