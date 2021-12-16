<?php
/**
 * Created by PhpStorm.
 * User: Awake
 * Date: 2/19/19
 * Time: 10:21 AM
 */

namespace Awake\AwakeWooReactAccount;

defined( __NAMESPACE__ . '\PATH' ) or die();
defined( __NAMESPACE__ . '\URL' ) or die();

if ( class_exists( __NAMESPACE__ . '\Admin' ) ) {
	return;
}

final class Admin {

	/**
	 * Init hooks
	 */

	public static function init() {
		add_action( 'init', [ __CLASS__, 'awmr_react_account_init' ] );
		add_filter( 'woocommerce_settings_tabs_array', __CLASS__ . '::awmr_add_tab', 9999, 1 );
		add_action( 'woocommerce_settings_tabs_awmr_account_settings', __CLASS__ . '::awmr_settings_tab' );
		add_action( 'woocommerce_update_options_awmr_account_settings', __CLASS__ . '::awmr_update_settings' );
		add_filter( 'plugin_action_links_awake-woo-react-account/plugin.php', [ __CLASS__, 'awmr_plugin_options_link' ] );
	}

	/**
	 * Load text domain
	 */

	public function awmr_react_account_init() {

		$woo_acc_path = get_woo_account_main_path();
		$reg_rule = '^' . $woo_acc_path . '/(.+)?';

		add_rewrite_rule( $reg_rule, "index.php?pagename=' . $woo_acc_path . ", 'top' );

		load_plugin_textdomain( SLUG, false, URL . '/languages/' );
	}

	/**
	 * @param $tabs
	 * Creating new tab in woocommerce settings
	 *
	 * @return mixed
	 */

	static function awmr_add_tab( $tabs ) {
		$tabs['awmr_account_settings'] = __( 'AWMR Account', SLUG );

		return $tabs;
	}

	/**
	 * Updating custom options
	 */

	static function awmr_update_settings() {
		woocommerce_update_options( self::awmr_get_settings() );
	}

	/**
	 * Set fields to woo tab
	 */

	static function awmr_settings_tab() {
		woocommerce_admin_fields( self::awmr_get_settings() );
	}

	/**
	 * Return array of settings (fields)
	 */

	static function awmr_get_settings() {
		$settings = array(
			'section_title'            => array(
				'name' => __( 'Awake woocommerce my account settings', SLUG ),
				'type' => 'title',
				'desc' => '',
				'id'   => 'awmr_account_settings_title',
			),
			'awmr_sidebar_btn_text'   => array(
				'name' => __( 'Sidebar funnel link text', 'woocommerce-settings-tab-demo' ),
				'type' => 'text',
				'desc' => __( 'Set sidebar funnel link text', SLUG ),
				'id'   => 'awmr_sidebar_btn_text',
				'default' => __( 'Add dog', SLUG )
			),
			'awmr_dogs_page_btn_text' => array(
				'name' => __( 'Funnel link text in dogs page', SLUG ),
				'type' => 'text',
				'desc' => __( 'Set funnel link text in dogs page', SLUG ),
				'id'   => 'awmr_dogs_page_btn_text',
				'default' => __( 'Add dog', SLUG )
			),
			'section_end'              => array(
				'type' => 'sectionend',
				'id'   => 'wwmar_settings_end'
			)
		);

		return apply_filters( 'awmr_settings_filter', $settings );
	}


	/**
	 * @param $links
	 * Add options link on plugins page
	 * @return mixed
	 */

	public function awmr_plugin_options_link( $links ) {
		$url = esc_url( add_query_arg([
			'page' => 'wc-settings',
			'tab' => 'awmr_account_settings'],
			get_admin_url() . 'admin.php'
		) );

		$settings_link = "<a href='$url'>" . __( 'Settings', SLUG ) . '</a>';

		array_unshift (
			$links,
			$settings_link
		);

		return $links;

	}
}
