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
		add_action( 'wp_ajax_nopriv_awmr_login_user_action', [ __CLASS__, 'awmr_login_user_ajax' ] );
		add_action( 'wp_ajax_nopriv_awmr_register_user_action', [ __CLASS__, 'awmr_register_user_ajax' ] );
	}

	public function awmr_login_user_ajax() {
		check_ajax_referer( 'awmr_nonce', 'awmr_nonce' );

		if ( isset( $_POST['action'] ) && isset( $_POST['username'] ) && isset( $_POST['password'] ) ) {
			$info                  = array();
			$info['user_login']    = $_POST['username'];
			$info['user_password'] = $_POST['password'];
			$info['remember']      = $_POST['remember_me'];

			$user_signon = wp_signon( $info, false );

			if ( is_wp_error( $user_signon ) ) {
				echo json_encode( array(
					'loggedin' => false,
					'message'  => __( 'Login or password is not correct', SLUG )
				) );
			} else {
				echo json_encode( array(
					'loggedin' => true,
					'message'  => __( 'You are successfully logged in!', SLUG )
				) );
			}

			die();
		}

	}

	public function awmr_register_user_ajax() {
		check_ajax_referer( 'awmr_nonce', 'awmr_nonce' );
		$username = 'no' === get_option( 'woocommerce_registration_generate_username' ) ? $_POST['create_username'] : '';
		$password = 'no' === get_option( 'woocommerce_registration_generate_password' ) ? $_POST['create_password'] : '';
		$email    = $_POST['create_user_email'];
		$new_customer = wp_create_user(  $username, $password, $email );

		echo json_encode($new_customer);
		die();

		$generate_password = get_option( 'woocommerce_registration_generate_password' );
		if ( ! empty( $_POST['create_user_email'] ) && ! empty( $_POST['create_password'] ) ) {
			$username = 'no' === get_option( 'woocommerce_registration_generate_username' ) ? $_POST['create_username'] : '';
			$password = 'no' === get_option( 'woocommerce_registration_generate_password' ) ? $_POST['create_password'] : '';
			$email    = $_POST['create_user_email'];

			$validation_error = new \WP_Error();
			$validation_error = apply_filters( 'woocommerce_process_registration_errors', $validation_error, $username, $password, $email );

			if ( $validation_error->get_error_code() ) {
				$errors = array(
					'code'    => $validation_error->get_error_code(),
					'created' => false,
					'message' => $validation_error->get_error_message()
				);
			} else {
				$new_customer = wc_create_new_customer( $email, $username, $password );
				if ( is_wp_error( $new_customer ) ) {
					$errors = array(
						'code'    => $new_customer->get_error_code(),
						'created' => false,
						'message' => $new_customer->get_error_message()
					);
				} else {
					if ( apply_filters( 'woocommerce_registration_auth_new_customer', true, $new_customer ) ) {
						wc_set_customer_auth_cookie( $new_customer );
					}

					$args = array(
						'can_user_register' => get_option( 'users_can_register', 0 ),
						'customer' => $new_customer,
						'created' => true,
						'message'  => __( 'Account created successfully. redirecting...', SLUG ),
						'redirect' => apply_filters( "awmr_register_redirect", false )
					);

					apply_filters( "awmr_register_user_successful", false );
					echo json_encode( $args );
					die();
				}
			}
		} elseif ( $generate_password == 'yes' ) {
			if ( empty( $_POST['create_email'] ) ) {
				$errors = array(
					'code'    => 'error',
					'created' => false,
					'message' => __( 'Please fill all required fields.', SLUG )
				);
			} else {
				$username         = 'no' === get_option( 'woocommerce_registration_generate_username' ) ? $_POST['create_username'] : '';
				$email            = $_POST['create_user_email'];
				$validation_error = new \WP_Error();
				$validation_error = apply_filters( 'awmr_woocommerce_process_registration_errors', $validation_error, $username, $email );

				if ( $validation_error->get_error_code() ) {
					//throw new Exception( $validation_error->get_error_message() );
					$errors = array(
						'code'    => $validation_error->get_error_code(),
						'created' => false,
						'message' => $validation_error->get_error_message()
					);
				} else {
					$new_customer = wc_create_new_customer( sanitize_email( $email ), wc_clean( $username ) );
					if ( is_wp_error( $new_customer ) ) {
						$errors = array(
							'code'    => $new_customer->get_error_code(),
							'created' => false,
							'message' => $new_customer->get_error_message()
						);
					} else {
						if ( apply_filters( 'woocommerce_registration_auth_new_customer', true, $new_customer ) ) {
							wc_set_customer_auth_cookie( $new_customer );
						}

						$args = array(
							'code'     => 200,
							'created' => true,
							'message'  => __( 'Account created successfully. redirecting...', SLUG ),
							'redirect' => apply_filters( "awmr_register_redirect", false )
						);
						echo json_encode( $args );
						die();
					}
				}
			}
		} else {
			$errors = array(
				'code'    => 'error',
				'message' => __( 'Please fill all required fields.', SLUG )
			);
		}
		echo json_encode( $errors );
		die();
	}

	public function awmr_lost_password_ajax() {
		function process_lost_password(){
			if ( isset( $_POST['wc_reset_password'], $_POST['user_login'] ) ) {
				$nonce_value = wc_get_var( $_REQUEST['woocommerce-lost-password-nonce'], wc_get_var( $_REQUEST['_wpnonce'], '' ) ); // @codingStandardsIgnoreLine.


				if ( ! wp_verify_nonce( $nonce_value, 'lost_password' ) ) {
					return;
				}

				$captcha_enabled = get_option( "captcha_enabled", "1" );
				if( $captcha_enabled == '1' ){

					session_start();
					if( strtolower($_POST['lostpassword_captcha']) != strtolower($_SESSION['lostpassword_captcha']['code']) ){
						echo json_encode(array('lost_password'=>false, 'message'=>__('Your captcha is invalid. Please try again.','woocommerce-ajax-login-register')));die();
					}

				}

				$success = \WC_Shortcode_My_Account::retrieve_password();

				// If successful, redirect to my account with query arg set.
				if ( $success ) {
					$lost_password = 'Check your inbox for instructions how to set new password.';
					$lost_password = apply_filters( 'ajaxlogin_lost_password_message', $lost_password );
					echo json_encode(array('lost_password'=>true, 'message'=>__( $lost_password ,'woocommerce-ajax-login-register')));
					die();
				} else{
					echo json_encode(array('lost_password'=>false, 'message'=>__('Invalid username or email.','woocommerce-ajax-login-register')));
					die();
				}
			}
		}
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
			'woo_account_settings' => array(
				'generate_password' => 'yes' === get_option( 'woocommerce_registration_generate_password' ),
				'generate_username' => 'yes' === get_option( 'woocommerce_registration_generate_username' ),
				'register_form'     => 'yes' === get_option( 'woocommerce_enable_myaccount_registration' ),
				'user_logged_in'    => ! empty( is_user_logged_in() ) ? is_user_logged_in() : 0,
				'account_path_name' => get_woo_account_main_path(),
			),
			'site_url'          => get_site_url(),
			'ajax_url'          => admin_url( 'admin-ajax.php' ),
			'i18n'              => json_encode( self::awmr_translated_strings() ),
			'nonce'             => wp_create_nonce( 'awmr_nonce' ),
		);

		wp_localize_script( 'awmr_woo_react_account', 'awmr_localize_variables', $awmr_localize_args );
	}

	/**
	 * Shortcode for whole application
	 * @return string
	 */

	public function awmr_woo_react_account_shortcode(): string {
		return '<div id="awake-woo-react-account"></div>';
	}
}
