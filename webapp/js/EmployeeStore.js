/**
 * .
 * User: sunvisor
 * Date: 11/03/04
 * Time: 13:14
 * Copyright (C) Sunvisor 2011 All right reserved.
 */
Ext.Direct.addProvider( Ext.app.REMOTING_API );

/**
 * DirectStore で更新をかけるためのWriterを生成
 */
var writer = new Ext.data.JsonWriter({
    encode: false,
    writeAllFields: true // write all fields, not just those that changed
});

/**
 * Direct Store for Employee Table
 *
 * 対象テーブルの構造
 * CREATE TABLE `employee` (
 *  `id` int(11) NOT NULL AUTO_INCREMENT,
 *  `name_kanji` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
 *  `name_kana` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
 *  `birth_date` date DEFAULT NULL,
 *  PRIMARY KEY (`id`)
 * );
 *
 */
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
