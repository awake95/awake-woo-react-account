<?php
/**
 * @package Awake\AwakeWooReactAccount
 * @link https://wetail.se
 * @wordpress-plugin
 * Plugin Name: Awake Woo React Account
 * Description: This is woocommerce react account
 * Author: awake95
 * Text Domain: awake-woo-react-account
 * Domain Path: /languages
 * Version: 1.0
 * License: GPL-3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

namespace Awake\AwakeWooReactAccount;

defined( 'ABSPATH' ) or die();
if ( !is_multisite() && ! is_plugin_active( 'woocommerce/woocommerce.php' ) || !is_multisite() && ! is_plugin_active( 'woocommerce/woocommerce.php' ) && !is_plugin_active_for_network('woocommerce/woocommerce.php') ) {
	return;
}

/**
 * Local constants
 */

define( __NAMESPACE__ . '\PATH', dirname( __FILE__ ) );
define( __NAMESPACE__ . '\SLUG', explode( '/', json_decode( file_get_contents( PATH . '/composer.json' ), true )['name'] )[1] );
const INDEX = __FILE__;
define( __NAMESPACE__ . '\NAME', basename( __DIR__ ) );
define( __NAMESPACE__ . '\PLUGIN_ID', basename( __DIR__ ) . '/' . basename( INDEX ) );
define( __NAMESPACE__ . '\URL', dirname( plugins_url() ) . '/' . basename( dirname( __DIR__ ) ) . '/' . NAME );

/**
 * Autoloader init
 */
require_once "autoload.php";
require_once "vendor/autoload.php";
add_filter( 'puc_request_info_query_args-' . SLUG, function ( $a ) {
	return [];
} );

$myUpdateChecker = \Puc_v4_Factory::buildUpdateChecker(
	'https://plugin-updates.wetail.io/api/plugins/' . SLUG . '/',
	__FILE__, //Full path to the main plugin file or functions.php.
	SLUG
);
define( __NAMESPACE__ . '\VERSION', $myUpdateChecker->getInstalledVersion() );

/**
 * Load the plugin
 */

_self::load();
