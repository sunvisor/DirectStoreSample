<?php
/**
 * employee xFrameworkPX Model Class
 * User: sunvisor
 * Date: 11/03/03
 * Time: 18:33
 */


class employee extends xFrameworkPX_Model
{

    public $usetable = 'employee';

    private function _getFields( $mode = '' )
    {

        $res = array(
            'name_kanji',
            'name_kana',
            'birth_date'
        );
        if( $mode == 'withId' ){
            return array_merge( array('id'), $res );
        } else {
            return $res;
        }

    }

    private function _getParameters( $mode = '' )
    {

        $res = $this->_getFields( $mode );
        foreach( $res as &$one ){
            $one = ':'.$one;
        }
        return $res;

    }

    public function readData()
    {

        $log = xFrameworkPX_Log::getInstance();

        $fields = $this->_getFields('withId');
        $order = array(
            'id'
        );

        try {
            $result = $this->get(
                'all',
                array(
                    'fields' => $fields,
                    'order' => $order
                )
            );

            return array(
                'success' => true,
                'total' => count( $result ),
                'items' => $result
            );
        } catch( Exception $e ){
            $log->error(
                __CLASS__. '->' . __FUNCTION__ . ':' .
                $e->getMessage()
            );
            return array(
                'success' => false
            );
        }

    }

    public function updateData( $pData )
    {

        $log = xFrameworkPX_Log::getInstance();

        try{
            $data = $pData->items;
            if( ! is_array($data) ){
                $data = array($data);
            }
            $result = true;
            foreach( $data as $rec ){
                $result = $result && $this->_updateOne( $rec );
            }

            return array(
                'success' => $result,
                'items' => $data
            );
        } catch( Exception $e ){
            $log->error(
                __CLASS__. '->' . __FUNCTION__ . ':' .
                $e->getMessage()
            );
            return array(
                'success' => false
            );
        }

    }

    private function _updateOne( $pRec )
    {

        $rec = (array)$pRec;

        $fields = $this->_getFields();
        $values = $this->_getParameters();
        $where = array(
            'id = :id'
        );

        return $this->update(
            array(
                'field' => $fields,
                'value' => $values,
                'where' => $where,
                'bind' => $rec
            )
        );

    }

    public function removeData( $pData )
    {

        $log = xFrameworkPX_Log::getInstance();
        $data = $pData->items;
        if( ! is_array($data) ){
            $data = array($data);
        }

        $result = true;

        try {
            foreach( $data as $id ){
                $result = $result && $this->_removeOne( $id );
            }
            return array(
                'success' => $result,
                'items' => $data
            );
        } catch( Exception $e ){
            $log->error(
                __CLASS__. '->' . __FUNCTION__ . ':' .
                $e->getMessage()
            );
            return array(
                'success' => false
            );
        }

    }

    private function _removeOne( $id )
    {

        $log = xFrameworkPX_Log::getInstance();

        $where = array(
            'id = :id'
        );
        $bind = array(
            'id' => $id
        );
        $result = $this->delete(
            array(
                'where' => $where,
                'bind' => $bind
            )
        );
        return $result;

    }

    public function addData( $pData )
    {

        $log = xFrameworkPX_Log::getInstance();

        $data = $pData->items;
        if( ! is_array($data) ){
            $data = array($data);
        }

        $result = true;
        try {
            $rData = array();
            foreach( $data as $rec ){
                $rRec = (array)$rec;
                $id = $this->_addOne( $rRec );
                if( $id !== false ){
                    $rRec['id'] = $id;
                    $rData[] = $rRec;
                } else {
                    $result = false;
                }
            }
            return array(
                'success' => $result,
                'items' => $rData
            );
        } catch( Exception $e ){
            $log->error(
                __CLASS__. '->' . __FUNCTION__ . ':' .
                $e->getMessage()
            );
            return array(
                'success' => false
            );
        }

    }

    private function _addOne( $rec )
    {

        $log = xFrameworkPX_Log::getInstance();
        $fields = $this->_getFields();
        $values = $this->_getParameters();

        // ロックする
//        $this->Lock($this->usetable);

        // 挿入実行
        try {
            $result = $this->insert(
                array(
                     'field' => $fields,
                     'value' => $values,
                     'bind' => $rec
                )
            );
            $id = $this->lastId();
        } catch( Exception $e ) {
            $log->error(
                __CLASS__. '->' . __FUNCTION__ . ':' .
                $e->getMessage()
            );
            $result = false;
        }

        // ロックを解除
//        $this->Unlock();

        return $result ? $id : false;

    }


}
