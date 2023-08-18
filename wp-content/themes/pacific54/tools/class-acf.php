<?php
namespace pacific;
use pacific\Theme as Theme;

/**
 *
 * @package Pac54
 */
class ACF{
    public static function run(){
        /* Hide the ACF Menu - Versionable Code Only Beyond this Point*/
  
        add_filter('acf/settings/show_admin', '__return_false');
    
        add_action( 'acf/include_fields', function() {
            if ( ! function_exists( 'acf_add_local_field_group' ) ) {
                return;
            }
        
            acf_add_local_field_group( array(
            'key' => 'group_64df4d036a32a',
            'title' => 'Form Log Fields',
            'fields' => array(
                array(
                    'key' => 'field_64df4d04d797d',
                    'label' => 'Email',
                    'name' => 'formlog_email',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
                array(
                    'key' => 'field_64df4d35d797e',
                    'label' => 'Phone',
                    'name' => 'formlog_phone',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'form-log',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
            'active' => true,
            'description' => '',
            'show_in_rest' => 0,
        ) );
        } );
    }
}
ACF::run();