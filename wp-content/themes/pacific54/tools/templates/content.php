<?php
/**
 * The header.
 *
 * This is the template that displays all of the <head> section and everything up until main.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Pac54
 */

use pacific\Theme as Theme;
global $post;
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="entry-header alignwide">
		<?php the_title( '<h1 class="theme-title">', '</h1>' ); 

		echo get_the_post_thumbnail( $post->ID, 'thumbnail', array( 'class' => 'alignleft' ) );
        ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
		the_content();

		?>
	</div><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->