<?php
namespace pacific;
use pacific\Theme as Theme;


class View extends Theme {
    private $file;
    private $args = array();
    public $error = false;

    public function __construct( string $file, array $args = array() ) {
        $this->setArgs($args);
        $this->doesfileexist = $this->isfile( $file ) ? true : false;
        $this->file = $this->doesfileexist ? \get_template_directory() . '/tools/templates/'. $file : false;
        $this->html = $this->file ? $this->get_html() : false;
        
        if(!$this->html) $this->error = 'Could not generate HTML';
    }
    public function __set( $key, $val) {
        $this->{$key} = $val;
    }
    public function __get( $key ){
         return (isset($this->{$key}) ) ? $this->{$key} : null;
    }
    private function isfile( $file ){
        return file_exists( \get_template_directory() . '/tools/templates/'. $file );
    }
    private function setArgs($args){
        #magic methods for php8.2 compatibility
        foreach($args as $k => $v) {
            $this->__set($k,$v);
        }
        return $args;
    }
    private function get_html(){
        //buff
        ob_start();
        //get template for view
        if( $this->doesfileexist ) include( $this->file );

        $output_str = ob_get_contents();
        ob_end_clean();
        return $output_str;
    }
    public function render( $echo = null ){
        if( $echo && strtoupper($echo) === 'ECHO' ) echo $this->html;
        return $this->html;
    }
      
}