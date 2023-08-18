<?php
namespace pacific;
use pacific\Theme as Theme;

/**
 *
 * @package Pac54
 */
class PostType {
    public static function add( $plural, $singular, $args = null ){

        $labels = array(
            'name'               => _x( ucfirst($plural), 'post type general name', Theme::TEXTDOMAIN ),
            'singular_name'      => _x( ucfirst($singular), 'post type singular name', Theme::TEXTDOMAIN ),
            'menu_name'          => _x( ucfirst($plural), 'admin menu', Theme::TEXTDOMAIN ),
            'name_admin_bar'     => _x( ucfirst($plural), 'add new on admin bar', Theme::TEXTDOMAIN ),
            'add_new'            => _x( 'New', ucfirst($singular), Theme::TEXTDOMAIN ),
            'add_new_item'       => __( 'New ' . ucfirst($singular), Theme::TEXTDOMAIN ),
            'new_item'           => __( 'New ' . ucfirst($singular), Theme::TEXTDOMAIN ),
            'edit_item'          => __( 'Edit '. ucfirst($singular), Theme::TEXTDOMAIN ),
            'view_item'          => __( 'View '. ucfirst($singular), Theme::TEXTDOMAIN ),
            'all_items'          => __( 'All ' . ucfirst($plural), Theme::TEXTDOMAIN ),
            'search_items'       => __( 'Search '. ucfirst($plural), Theme::TEXTDOMAIN ),
            'not_found'          => __( 'No '.ucfirst($plural).' found.', Theme::TEXTDOMAIN ),
            'not_found_in_trash' => __( 'No '.ucfirst($plural).' found in Trash.', Theme::TEXTDOMAIN )
        );
        
        $default = array(
            'labels'             => $labels,
            'description'        => __( ucfirst($plural), Theme::TEXTDOMAIN ),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => trim(strtolower($plural)) ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => isset($args['hierarchical']) ? $args['hierarchical'] : false,
            'show_in_menu'       => true,
            'menu_icon'          => isset($args['menu_icon']) ? $args['menu_icon'] : 'dashicons-pressthis',
            'menu_position'      => 5,
            'show_in_rest'       => true,
            'rest_base'          => trim(strtolower($plural)),
            'rest_controller_class' => 'WP_REST_Posts_Controller',
            'supports'           => array( 'editor','title', 'custom-fields', 'page-attributes','thumbnail', 'excerpt'),
            'taxonomies'         => isset($args['taxonomies']) ? $args['taxonomies'] : array()       
        );
        if(is_array($args)){
            #merge the defaults
            $default = array_merge($default, $args);
        }
    
        \register_post_type( $plural, $default );
    }
}
/**
 * @Todo Copilot make function headers
 */
class PostTypes {
    public function __construct(string $plural, string $singular = '', array $args = array() ) {
        $this->plural = $this->checkname($plural);
        #if the object arguments are out of order

        $this->singular = strlen($singular) ? $this->checkname($singular) : $this->plural;
        if($this->plural && $this->singular) {
           PostType::add($this->plural, $this->singular, $args);
        }    
    }
    
    private function checkname($name){
        $cased = str_replace(' ', '-', strtolower($name));
        $scrub_invalid_characters = preg_replace("/[^A-Za-z_\- ]/", '', $cased);
        return strlen($scrub_invalid_characters) ? $scrub_invalid_characters : false;
    }
}