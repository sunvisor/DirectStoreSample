<?php
/**
 * test xFrameworkPX Action Controller Class
 * User: sunvisor
 * Date: 11/03/05
 * Time: 10:35
 */

class test extends xFrameworkPX_Controller_Action
{

    public $modules = array('employee');

    public function execute()
    {
        try{
            //            $data = $this->employee->readData();
            $data = $this->employee->addData(null);
//            $this->employee->removeData(null);
//            $data = $this->employee->updateData(null);
//            $data = print_r( $data, true );
            //        $data = 'test';
            $this->set('data', $data);
        }catch(Exception $e){
            $this->set('data',$e->getMessage());
        }
    }

}
