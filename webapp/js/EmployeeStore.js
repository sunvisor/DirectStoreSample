/**
 * .
 * User: sunvisor
 * Date: 11/03/04
 * Time: 13:14
 * Copyright (C) Sunvisor 2011 All right reserved.
 */
//Ext.namespace('Ext.remote');
Ext.Direct.addProvider( Ext.app.REMOTING_API );

var writer = new Ext.data.JsonWriter({
    encode: false,
    writeAllFields: true // write all fields, not just those that changed
});

EmployeeStore = Ext.extend(Ext.data.DirectStore, {

    constructor: function(cfg) {
        cfg = cfg || {};
        EmployeeStore.superclass.constructor.call(this, Ext.apply({
            storeId: 'EmployeeStore',
            writer: writer,
            autoSave: false,
            idProperty: 'id',
            root: 'items',
            api: {
                create: Ext.remote.employee.addData,
                update: Ext.remote.employee.updateData,
                read:   Ext.remote.employee.readData,
                destroy:Ext.remote.employee.removeData
            },
            fields: [
                {
                    name: 'id',
                    mapping: 'id'
                },
                {
                    name: 'name_kanji',
                    mapping: 'name_kanji'
                },
                {
                    name: 'name_kana',
                    mapping: 'name_kana'
                },
                {
                    name: 'birth_date',
                    mapping: 'birth_date'
                }
            ]
        }, cfg));
    }

});
new EmployeeStore();
