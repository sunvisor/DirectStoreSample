<?php
/**
 * extdirect xFrameworkPX Action Controller Class
 * User: sunvisor
 * Date: 11/03/03
 * Time: 18:40
 */

class extdirect extends xFrameworkPX_Controller_ExtDirect
{

    public $direct = array(
        'namespace' => 'Ext.remote'
    );
    public $modules = array(
        'employee' => array( 'conn' => 'default' )
    );

}
