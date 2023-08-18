<?php
namespace pacific;
use pacific\Theme as Theme;
use pacific\View as View;
/**
 *
 * @package Pac54
 */
class Template {

    public static function Menu( string $alternate_file = ''){
        $args = array(
            'hamburger_open' => get_template_directory() . 'assets/hamburger_open.svg',
            'hamburger_close' => get_template_directory() . 'assets/hamburger_close.svg',
        );
        $file = strlen($alternate_file) ? $alternate_file : 'views/primary-nav.php';

        self::Do($file, $args);
    }
    public static function Header( string $alternate_file = '' ){
        $args = [];
        $file = strlen($alternate_file) ? $alternate_file : 'header.php';

        self::Do($file, $args);
    }
    public static function Footer( string $alternate_file = '' ){
        $args = [];
        $file = strlen($alternate_file) ? $alternate_file : 'footer.php';

        self::Do($file, $args);
    }
    public static function Content( string $alternate_file = '' ){
        $args = [];
        $file = strlen($alternate_file) ? $alternate_file : 'content.php';

        self::Do($file, $args);
    }

    public static function NotFound( string $alternate_file = '' ){
        $view = new View($file, $args);
        $view->render('echo');
    }

    public static function Do( $file, $args){
        $view = new View($file, $args);
        $view->render('echo');
    }

}