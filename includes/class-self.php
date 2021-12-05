<?php
/**
 * Created by PhpStorm.
 * User: Awake95
 * Date: 20/11/2021
 * Time: 10:21 AM
 */

namespace Awake\AwakeWooReactAccount;

defined( __NAMESPACE__ . '\PATH' ) or die();

if ( class_exists( __NAMESPACE__ . '\_self' ) ) {
	return;
}

/**
 * Class _self
 *
 * Plugin loader
 *
 * @package Awake\AwakeWooReactAccount
 */
final class _self {

	/**
	 * Load all required classes
	 */
	public static function load() {
		Admin::init();
		Frontend::init();
	}

}
