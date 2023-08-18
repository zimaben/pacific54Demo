<?php
/**
 * This is all a Theme is
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Pac54
*/
use pacific\Template as Template;

Template::Header();
Template::Menu();

if ( have_posts() ) {


	while ( have_posts() ) : the_post();

		Template::Content();

    endwhile;

} else {

	Template::NotFound();

}

Template::Footer();