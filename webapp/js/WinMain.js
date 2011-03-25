/*
 * File: WinMain.js
 * Date: Fri Mar 04 2011 13:01:25 GMT+0900 (JST)
 * 
 * This file was generated by Ext Designer version xds-1.0.3.2.
 * http://www.extjs.com/products/designer/
 *
 * This file will be generated the first time you export.
 *
 * You should implement event handling and custom methods in this
 * class.
 */

WinMain = Ext.extend(WinMainUi, {

    store: null,

    initComponent: function() {

        var me = this;

        WinMain.superclass.initComponent.call(me);
        me.store = Ext.StoreMgr.get('EmployeeStore');

        // Event Handler
        me.on('beforerender', me.onBeforeRender, me);
        me.btnMainAdd.on('click', me.onBtnMainAdd, me);
        me.btnMainDelete.on('click', me.onBtnMainDelete, me);
        me.btnMainSave.on('click', me.onBtnMainSave, me);

        me.store.on('beforewrite', me.onStoreBeforeWrite, me)
        me.store.on('write', me.onStoreWrite, me)

    },

    onBeforeRender: function() {

        var me = this;

        me.store.load();

    },

    onBtnMainSave: function () {

        var me = this;

        me.store.save();

    },

    onBtnMainAdd: function () {

        var me = this,
            dialog = new WinAdd;

        dialog.on('insert', function( obj ){

            var rec, newRec;

//            obj.id = me.getNewId();
            newRec = new me.store.recordType(obj, null);
            me.store.add( newRec );

        }, me );
        dialog.show();


    },

    onBtnMainDelete: function () {

        var me = this,
            sm = me.grdEmployee.getSelectionModel(),
            cell = sm.getSelectedCell(),
            rec;

        if( cell ){
            rec = me.store.getAt(cell[0]);
            me.store.remove( rec );
        } else {
            Ext.Msg.show({
                title: 'エラー',
                msg: '行が選択されていません。',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }

    },

    onStoreBeforeWrite: function () {

        Ext.getBody().mask('loading');
        

    },

    onStoreWrite: function () {

        Ext.getBody().unmask();
        
    }

});
