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
//		add_action( 'admin_menu', [ __CLASS__, 'aw_woo_ajax_register_screen' ] );
//		add_action( 'admin_init', [ __CLASS__, 'aw_woo_ajax_options_settings' ] );
		add_action( 'init', [ __CLASS__, 'awmr_react_account_plugin_load_text_domain' ] );
//		add_filter( 'plugin_action_links_awake-woo-ajax/plugin.php', [ __CLASS__, 'aw_woo_ajax_plugin_options_link' ] );
	}

	/**
	 * Load text domain
	 */

	public function awmr_react_account_plugin_load_text_domain() {
		load_plugin_textdomain( SLUG, false, URL . '/languages/' );
	}


	/**
	 * @param $links
	 * Add options link on plugins page
	 * @return mixed
	 */

	public function aw_woo_ajax_plugin_options_link( $links ) {
		$url = esc_url( add_query_arg(
			'page',
			'aw_woo_ajax_options',
			get_admin_url() . 'admin.php'
		) );

		$settings_link = "<a href='$url'>" . __( 'Options', SLUG ) . '</a>';

		array_unshift (
			$links,
			$settings_link
		);

		return $links;

	}


	/**
	 * Register menu item in WordPress tools section
	 */

	public function aw_woo_ajax_register_screen() {
		$title = __( 'Awake Ajax', SLUG );
		$callback = [ __CLASS__, 'add_aw_content_page' ];
		add_management_page( $title, $title, 'manage_options', 'aw_woo_ajax_options', $callback );
	}

	/**
	 * Settings option for ajax scrolling
	 */

	public function aw_woo_ajax_options_settings() {
		add_settings_section( 'awsp_first_section', null, null, 'aw_woo_ajax_options' );


		/**
		 * Enable infinite scroll
		 */
		add_settings_field( 'aw_ajax_woo_enable_infinite_scroll_option', 'Enable infinite scroll', [
			__CLASS__,
			'aw_ajax_woo_enable_infinite_scroll_option_html'
		], 'aw_woo_ajax_options', 'awsp_first_section' );
		register_setting( 'aw_ajax_woo_options_group', 'aw_ajax_woo_enable_infinite_scroll_option');

		/**
		 * Fetch all products field
		 */
		add_settings_field( 'aw_ajax_woo_fetch_all_option', 'Fetch all products', [
			__CLASS__,
			'aw_ajax_woo_fetch_all_option_html'
		], 'aw_woo_ajax_options', 'awsp_first_section' );
		register_setting( 'aw_ajax_woo_options_group', 'aw_ajax_woo_fetch_all_option' );

		/**
		 * Change page url field
		 */

		add_settings_field( 'aw_ajax_woo_change_page_url_option', 'Change page url', [
			__CLASS__,
			'aw_ajax_woo_change_page_url_option_html'
		], 'aw_woo_ajax_options', 'awsp_first_section' );
		register_setting( 'aw_ajax_woo_options_group', 'aw_ajax_woo_change_page_url_option' );

		/**
		 * Show/hide pagination field
		 */

		add_settings_field( 'aw_ajax_woo_pagination_option', 'Hide pagination', [
			__CLASS__,
			'aw_ajax_woo_pagination_option_html'
		], 'aw_woo_ajax_options', 'awsp_first_section' );
		register_setting( 'aw_ajax_woo_options_group', 'aw_ajax_woo_pagination_option' );

		/**
		 * Change spinner image
		 */

		add_settings_field( 'aw_ajax_woo_change_spinner_option', 'Add spinner image', [
			__CLASS__,
			'aw_ajax_woo_change_spinner_option_html'
		], 'aw_woo_ajax_options', 'awsp_first_section' );
		register_setting( 'aw_ajax_woo_options_group', 'aw_ajax_woo_change_spinner_option' );

		/**
		 * Button load more text
		 */

		add_settings_field( 'aw_ajax_woo_load_more_btn_text_option', 'Add load more button text', [
			__CLASS__,
			'aw_ajax_woo_load_more_btn_option_html'
		], 'aw_woo_ajax_options', 'awsp_first_section' );
		register_setting( 'aw_ajax_woo_options_group', 'aw_ajax_woo_load_more_btn_text_option' );

		/**
		 * Animation select
		 */

		add_settings_field( 'aw_ajax_woo_animation_select_option', 'Choose animation', [
			__CLASS__,
			'aw_ajax_woo_animation_select_option_html'
		], 'aw_woo_ajax_options', 'awsp_first_section' );
		register_setting( 'aw_ajax_woo_options_group', 'aw_ajax_woo_animation_select_option' );
	}

	/**
	 * Tooltip html
	 *
	 * @param string|null $description
	 */

	static function aw_ajax_woo_tooltip_html( string $description = null ) { ?>
		<?php if ( ! empty( $description ) ): ?>
            <span class="aw_tooltip">
                <p class="description"><?= $description; ?></p>
           </span>
		<?php endif; ?>
	<?php }

	/**
	 * Checkbox template for add_settings_field() callback functions
	 *
	 * @param $id
	 * @param string|null $description
	 */

	static function aw_ajax_woo_checkbox_template( $id, string $description = null ) { ?>
        <div class="aw-section-wrapper">
			<?php self::aw_ajax_woo_tooltip_html( $description ?? '' ); ?>
            <label class="switch" for="<?= $id ?>">
                <input type="checkbox"
                       id="<?= $id ?>"
                       value="1" <?php checked( 1, get_option( $id ), true ); ?>
                       name="<?= $id ?>">
                <span class="dot"></span>
            </label>
        </div>

	<?php }

	/**
	 * Callback functions for add_settings_field() function
	 */

	public function aw_ajax_woo_enable_infinite_scroll_option_html() {
		self::aw_ajax_woo_checkbox_template( 'aw_ajax_woo_enable_infinite_scroll_option', __( 'Hide button load more and products will appear on scrolling to the bottom of products', SLUG ) );
	}

	public function aw_ajax_woo_fetch_all_option_html() {
		self::aw_ajax_woo_checkbox_template( 'aw_ajax_woo_fetch_all_option', __( 'All products will appear after page loaded with interval, infinite scroll will not work', SLUG )
		);
	}

	public function aw_ajax_woo_change_page_url_option_html() {
		self::aw_ajax_woo_checkbox_template( 'aw_ajax_woo_change_page_url_option', __( "Page url will concat with '/page/{number}' after products loaded ", SLUG ) );
	}

	public function aw_ajax_woo_pagination_option_html() {
		self::aw_ajax_woo_checkbox_template( 'aw_ajax_woo_pagination_option', __( 'Hide pagination on page', SLUG ) );
	}

	public function aw_ajax_woo_change_spinner_option_html() {
		$option = get_option( 'aw_ajax_woo_change_spinner_option' );
		if ( ! empty( $option ) ) {
			$last_char = $option[ - 1 ];

			if ( strcmp( $last_char, "/" ) === 0 ) {
				$option = substr( $option, 0, - 1 );
			}
		}
		?>

        <div class="upload_image_wrap">
            <div class="aw_ajax_woo_change_spinner_image_wrap">
                <img width="32px" height="32px"
                     style="border-radius: 3px"
                     class="aw_ajax_woo_change_spinner_image"
                     data-placeholder="<?= wc_placeholder_img_src(); ?>"
                     src="<?= ( ! empty( $option ) ? $option : wc_placeholder_img_src() ) ?>"
                     alt="spinner image">
                <button type="button" class="aw_ajax_woo_remove_image hid"></button>
            </div>

            <input id="aw_ajax_woo_change_spinner_option" type="hidden" name="aw_ajax_woo_change_spinner_option"
                   value="<?= $option; ?>"/>
            <button id="upload_image_button" class="upload_image_btn" type="button"></button>
        </div>
	<?php }

	public function aw_ajax_woo_load_more_btn_option_html() { ?>
        <input id="aw_ajax_woo_load_more_btn_text_option" type="text" name="aw_ajax_woo_load_more_btn_text_option"
               placeholder="Load more button text"
               value="<?= get_option( 'aw_ajax_woo_load_more_btn_text_option' ); ?>"/>
	<?php }

	public function aw_ajax_woo_animation_select_option_html() { ?>
		<?php $description = __( 'Choose animation, when products will appear', SLUG) ?>
        <div class="aw-section-wrapper">
			<?php self::aw_ajax_woo_tooltip_html( $description ?? '' ); ?>
            <select name="aw_ajax_woo_animation_select_option">
                <option value="fade-in" <?php selected( get_option( 'aw_ajax_woo_animation_select_option' ), "fade-in" ); ?>>
					<?= __( 'Fade-in', SLUG ); ?>
                </option>
                <option value="zoom-in" <?php selected( get_option( 'aw_ajax_woo_animation_select_option' ), "zoom-in" ); ?>>
					<?= __( 'Zoom-in', SLUG ); ?>
                </option>
            </select>
        </div>
	<?php }

	/**
	 * Add form on option page, include scripts and styles
	 */

	static function add_aw_content_page() {
		wp_enqueue_media();
		wp_enqueue_style( 'aw_woo_ajax_admin', URL . '/dist/css/aw_woo_ajax_admin.css' );
		wp_enqueue_script( 'aw_woo_ajax_admin', URL . '/dist/js/aw_woo_ajax_admin.js', [ 'jquery' ] );
		?>

        <div class="wrap">
            <h1><?php echo __( 'Awake Woo Ajax options', SLUG ); ?></h1>
            <form class="aw_woo_ajax_form_admin" action="options.php" method="POST">
				<?php
				settings_fields( 'aw_ajax_woo_options_group' );
				do_settings_sections( 'aw_woo_ajax_options' );
				submit_button();
				?>
            </form>
        </div>
	<?php }
}
