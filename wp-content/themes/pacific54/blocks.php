<?php 
namespace pacific;

use pacific\Theme as Theme;

class Blocks {

    private static $instance = null;

    public static function get_instance(){
        #singletons have feelings too
        if(null==self::$instance) self::$instance = new self;
        return self::$instance;
    }

    private function __construct(){
        \add_action( 'block_categories_all', array($this, 'register_theme_blocktype'));
        \add_action( 'init', array($this, 'theme_blocks'));


    }
    public static function register_theme_blocktype( $categories ){
        return array_merge(
            $categories, array( array('slug'=>'pacific-fiftyfour', 'title'=>'Pacific 54 Blocks', 'icon' => 'wordpress'))
        );
    }
    public static function theme_blocks(){

        #version is either a random cachebuster or the current version depending on theme mode
        $v =Theme::MODE == "development" ? (string) bin2hex(random_bytes(2)) : Theme::VERSION;
        $cssstyle = Theme::MODE == "development" ? 'style.css' : 'style.min.css';

        #shared js/css
        \wp_register_style( 'theme_blocks_global_css', \get_template_directory_uri() . '/theme/dist/' . $cssstyle, array(), $v, 'all' );
        if(\is_admin()){
            \wp_register_style( 'theme_blocks_editor_css', \get_template_directory_uri() . '/theme/dist/admin_css.css', array(), $v, 'all' );
        } 

        /**
         * 
         */
        \wp_register_script( 'printform', \get_template_directory_uri() . '/theme/dist/js/blocks/printform.js', 
            array( 'wp-blocks', 'wp-editor', 'wp-components'));

        \register_block_type( 'pacfiftyfour/printform', array(
            'editor_script' => 'printform',
            'editor_style'  => 'theme_blocks_editor_css',
            'style'         => 'theme_blocks_global_css',
            //'render_callback' => 'pacific\Theme::printform',    
        ) );

        /**
         * These really are better off server-side
         */
        \wp_register_script( 'formlog', \get_template_directory_uri() . '/theme/dist/js/blocks/formlog.js', 
            array( 'wp-blocks', 'wp-editor', 'wp-components'));

        \register_block_type( 'pacfiftyfour/formlog', array(
            'editor_script' => 'formlog',
            'editor_style'  => 'theme_blocks_editor_css',
            'style'         => 'theme_blocks_global_css',
            'render_callback' => 'pacific\Theme::formlog',     
        ) );
        
    }
}
Blocks::get_instance();