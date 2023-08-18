<?php
namespace pacific;

/**
 *
 * @package Pac54
 */

class Theme{

    const TEXTDOMAIN = 'Pac54';
    const VERSION = "1.0.0";
    const MODE = 'development';

    public static function go(){

        //classes
        require_once __DIR__ . '/tools/class-posttypes.php';
        require_once __DIR__ . '/tools/class-template.php';
        require_once __DIR__ . '/tools/class-view.php';
        require_once __DIR__ . '/tools/class-acf.php';

        //enqueue
        if( \is_admin()){  
            
            \add_action( 'admin_enqueue_scripts', array(get_class(), 'theme_admin_enqueue'));

        } else {  

            \add_action( 'wp_enqueue_scripts', array(get_class(), 'theme_enqueue')); 
        }

        //blocks & core
        require_once __DIR__ . '/blocks.php';
        require_once __DIR__ . '/ajax.php';


        //register post type
        new PostTypes('Form log');

    }
    
    /**
     * Wrapper for print form log block
     */
    public static function formlog( $attributes ){
        error_log("ATTRIBUTES" . print_r($attributes, true));
        $view = new View('/views/formlog.php', $attributes);
        return ($view->error) ? $view->error : $view->render();
    }
        
    public static function theme_enqueue(){
        $v =Theme::MODE == "development" ? (string) bin2hex(random_bytes(2)) : Theme::VERSION;
        #Dependencies
        
        \wp_enqueue_script ( 'footer', \get_template_directory_uri() . '/theme/dist/js/footer.js', array(), $v, true );
        \wp_enqueue_script ( 'sitehead', \get_template_directory_uri() . '/theme/dist/js/main.js', array(), $v, false );
        # \wp_enqueue_script ( 'blocks', \get_template_directory_uri() . '/theme/dist/js/blocks.js', array(), $v, false );
        \wp_enqueue_style( 'theme-css', \get_template_directory_uri() . '/theme/dist/style.css', array('flatpickr'), $v, 'all');
    }

    public static function theme_admin_enqueue(){
        $v = bin2hex(random_bytes(2)); #never cache any javascript in admin view
        \wp_enqueue_style( 'theme-admin-css', \get_template_directory_uri() . '/theme/dist/admin_css.css', array('flatpickr'), $v, 'all');
    }   

}
Theme::go();