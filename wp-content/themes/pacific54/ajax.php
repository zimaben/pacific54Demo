<?php
namespace pacific;

use pacific\Theme as Theme;

class Ajax extends Theme {

    public static function run(){

        \add_action('wp_ajax_submit_form_log', array(get_class(), 'submit_form_log'));
        \add_action('wp_ajax_nopriv_submit_form_log', array(get_class(), 'submit_form_log'));
        \add_action('wp_ajax_refresh_forms', array(get_class(), 'refresh_forms'));
        \add_action('wp_ajax_nopriv_refresh_forms', array(get_class(), 'refresh_forms'));

        if(\is_admin()){
            \add_action( 'admin_enqueue_scripts', array(get_class(), 'admin_localize'), 99);
        } else {
            \add_action( 'wp_enqueue_scripts', array(get_class(), 'theme_localize'), 99);
        }

    }
    public static function admin_localize(){
        #Localize Admin 
        \wp_localize_script( 'theme-admin-js', 'theme_admin', array(
            'nonce' => \wp_create_nonce('theme-admin'),
            'ajaxurl' => \admin_url('admin-ajax.php'),
            'theme_root' => \get_template_directory_uri(),
            'siteurl' => \get_site_url(),
        ));
    }
    public static function theme_localize(){ 
        #Localize frontend
        \wp_localize_script( 'sitehead', 'theme_vars', array(
            'nonce' => \wp_create_nonce('theme_vars'),
            'ajaxurl' => \admin_url('admin-ajax.php'),
            'postid'  => \get_the_ID(),
            'userid'  => \get_current_user_id(),
            'theme_root' => \get_template_directory_uri(),
            'siteurl' => \get_site_url(),
        ));
        
    }
    public static function refresh_forms(){

    }

    public static function submit_form_log(){
        if(!isset($_POST)) {
            echo json_encode(array('status'=>400, 'response'=>'Missing Submission'));
            die();
        }
        $name = $_POST['pf-name'] ?? false;
        $phone = $_POST['pf-phone'] ?? false;
        $email = $_POST['pf-email'] ?? false;
        $message = $_POST['pf-message'] ?? false;
        $linked = $_POST['linked'] ?? false;

        if( false === ($name && $phone && $email && $message) ){
            echo json_encode(array('status'=>400, 'response'=>'Missing Required Fields'));
            die();
        } 

        if(!isset($_POST['nonce']) || \wp_verify_nonce($_POST['nonce'], 'theme_vars') === false) {
            echo json_encode(array('status'=>400, 'response'=>'Bad Request'));
            die();
        }

        $post_id = \wp_insert_post(array (
            'post_type' => 'form-log',
            'post_title' => $name,
            'post_content' => $message,
            'post_status' => 'publish'
        ));

        if(!$post_id){
            echo json_encode(array('status'=>500, 'response'=>'Could not insert post'));
            die();
        }

        \update_field('formlog_email', $email, $post_id);
        \update_field('formlog_phone', $phone, $post_id);

        $args = array('status'=>200, 'response'=>'Record was successfully Added');

        if($linked){
            $payload = new View('/views/formlog-entries.php');
            $args['payload'] = $payload->render();
        }

        echo json_encode($args);
        die();
    }
   
     
}
//spin it
Ajax::run();
