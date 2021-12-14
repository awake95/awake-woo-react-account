<?php

namespace Awake\AwakeWooReactAccount;

defined( __NAMESPACE__ . '\SLUG' ) or exit;

function get_woo_account_main_path() {
	$woo_acc_url = get_permalink( wc_get_page_id( 'myaccount' ) );
	$segments = explode('/', $woo_acc_url);
	return end($segments);
}
