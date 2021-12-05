<?php
/**
 * Created by PhpStorm.
 * User: Awake
 * Date: 2/19/19
 * Time: 10:21 AM
 */

namespace Awake\AwakeWooReactAccount;

defined( __NAMESPACE__ . '\PATH' ) or die();

if ( class_exists( __NAMESPACE__ . '\Frontend' ) ) {
	return;
}

final class Frontend {

	/**
	 * Init hooks
	 */
	public static function init() {
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'enqueue_scripts_and_styles' ] );
		add_action( 'wp_ajax_aw_woo_get_products', [ __CLASS__, 'aw_get_cat_products' ], 10, 0 );
		add_action( 'wp_ajax_nopriv_aw_woo_get_products', [ __CLASS__, 'aw_get_cat_products' ], 10, 0 );
		add_action( 'woocommerce_after_shop_loop', [ __CLASS__, 'aw_woocommerce_products_load_more' ], 9 );
	}

	/**
	 * Include scripts/styles on frontend page for category page and shop page, adding localize script
	 */

	static function enqueue_scripts_and_styles() {
		if ( is_shop() || is_product_category() ) {
			wp_enqueue_style( 'aw_woo_ajax', URL . '/dist/css/aw_woo_ajax_infinite_scroll.css' );
			wp_enqueue_script( 'aw_woo_ajax', URL . '/dist/js/aw_woo_ajax_infinite_scroll.js', ( [ 'jquery' ] ) );

			global $wp_query;
			$aw_localize_args = array(
				'posts'                  => json_encode( $wp_query->query_vars ), // everything about your loop is here
				'current_page'           => get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1,
				'max_page'               => $wp_query->max_num_pages,
				'ajaxurl'                => admin_url( 'admin-ajax.php' ),
				'aw_ajax_woo_options' => [
					'infinite'        => intval( get_option( 'aw_ajax_woo_enable_infinite_scroll_option' ) ),
					'fetch_all'       => intval( get_option( 'aw_ajax_woo_fetch_all_option' ) ),
					'change_url'      => intval( get_option( 'aw_ajax_woo_change_page_url_option' ) ),
					'hide_pagination' => intval( get_option( 'aw_ajax_woo_pagination_option' ) ),
					'animation_name'  => ! empty( get_option( 'aw_ajax_woo_animation_select_option' ) ) ? get_option( 'aw_ajax_woo_animation_select_option' ) : 'fade-in'
				]
			);
			wp_localize_script( 'aw_woo_ajax', 'aw_js_variables', $aw_localize_args );
		}
	}

	/**
	 * Get products data and get posts page from frontend and query
	 */

	public function aw_get_cat_products() {
		$args                = json_decode( stripslashes( $_POST['query'] ), true );
		$args['paged']       = $_POST['page'] + 1; // we need next page to be loaded
		$args['post_status'] = 'publish';
		query_posts( $args );

		if ( have_posts() ) :
			while ( have_posts() ): the_post();
				wc_get_template_part( 'content', 'product' );
			endwhile;
		endif;
		die;
	}

	/**
	 * Show products after request from frontend
	 */

	public function aw_woocommerce_products_load_more() {
		global $wp_query;

		echo '<div class="aw-load-wrap">';
		if ( $wp_query->max_num_pages > 1 ) {
			echo '<button class="aw_load_more_btn">' . ( ! empty( get_option( 'aw_ajax_woo_load_more_btn_text_option' ) ) ? get_option( 'aw_ajax_woo_load_more_btn_text_option' ) : __( 'Load more', SLUG ) ) . '</button>';
			echo ( ! empty( get_option( 'aw_ajax_woo_change_spinner_option' ) ) ? '<img class="aw_ajax_woo_custom_spinner hid" width="20" height="20" src="' . get_option( 'aw_ajax_woo_change_spinner_option' ) . '" alt="spinner">' : '<span class="aw_load_more_spinner hid"></span>' );
		}
		echo '</div>';

	}


}
