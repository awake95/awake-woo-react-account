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
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'awmr_enqueue_scripts_and_styles' ] );
		add_shortcode( 'awmr_react_account', [ __CLASS__, 'awmr_woo_react_account_shortcode' ] );
	}

	/**
     * All translations in frontend
	 * @return array
	 */

	static function awmr_translated_strings(): array {
		return array(
			'Some' => __( 'Some', SLUG )
		);
	}

	/**
	 * Include scripts/styles on frontend page for category page and shop page, adding localize script
	 */

	static function awmr_enqueue_scripts_and_styles() {

		if ( ! is_account_page() ) {
			return;
		}

		wp_enqueue_style( 'awmr_woo_react_account', URL . '/assets/css/awake_woo_react_account.css' );
		wp_enqueue_script( 'awmr_woo_react_account', URL . '/assets/js/awake_woo_react_account.js', ( [ 'jquery' ] ) );

		$awmr_localize_args = array(
			'user_logged_in' => ! empty( is_user_logged_in() ) ? is_user_logged_in() : 0,
			'register_form'  => 'yes' === get_option( 'woocommerce_enable_myaccount_registration' ),
			'site_url'       => get_site_url(),
			'ajax_url'       => admin_url( 'admin-ajax.php' ),
			'i18n'           => json_encode( self::awmr_translated_strings() ),
			'nonce'          => wp_create_nonce( 'awmr_nonce' ),
		);

		wp_localize_script( 'awmr_woo_react_account', 'awmr_localize_variables', $awmr_localize_args );
	}

	public function awmr_woo_react_account_shortcode() {
		ob_start() ?>
        <div id="awake-woo-react-account"></div>
		<?php return ob_get_clean();
	}
}
