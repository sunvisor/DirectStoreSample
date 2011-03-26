/**
 * index.js
 * User: sunvisor
 * Date: 11/03/03
 * Time: 20:27
 * Copyright (C) Sunvisor 2011 All right reserved.
 */
Ext.onReady( function () {

    // Start Application
    var winMain = new WinMain({
        renderTo: Ext.getBody()
    });

    winMain.show();

});