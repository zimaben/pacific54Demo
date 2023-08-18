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
?>
<section class="no-results not-found">
	<header class="page-header alignwide">
		<?php if ( is_search() ) : ?>

			<h1 class="page-title">
				<?php
				printf(
					/* translators: %s: Search term. */
					esc_html__( 'Results for "%s"', Theme::TEXTDOMAIN ),
					'<span class="page-description search-term">' . esc_html( get_search_query() ) . '</span>'
				);
				?>
			</h1>

		<?php else : ?>

			<h1 class="page-title">😕 Not seeing that</h1>

		<?php endif; ?>
	</header><!-- .page-header -->

	<div class="page-content default-max-width">



		<?php if ( is_search() ) : ?>

			<p>Sorry, but nothing matched your search terms. Please try again</p>
			<?php get_search_form(); ?>

		<?php else : ?>

			<p>Lost? It's okay happens to me too.</p>
			<?php get_search_form(); ?>

		<?php endif; ?>
	</div><!-- .page-content -->
</section><!-- .no-results -->