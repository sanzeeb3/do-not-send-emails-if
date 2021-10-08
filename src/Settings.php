<?php

namespace DoNotSendEmailsIf;

defined( 'ABSPATH' ) || exit;

/**
 * Do Not Send Emails If Settings.
 *
 * @since 1.0.0
 */
class Settings {

	/**
	 * Initialize.
	 *
	 * @since 1.0.0
	 */
	public function init() {
		add_action( 'admin_menu', array( $this, 'dnsei_register_setting_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'load_assets' ) );
	}

	/**
	 * Register a Do Not Send Emails If settings under settings menu.
	 *
	 * @since 1.0.0
	 */
	public function dnsei_register_setting_menu() {
		add_options_page( 'Do Not Send Emails If Settings', 'Do Not Send Emails If', 'manage_options', 'do-not-send-emails-if', array( $this, 'dnsei_settings_page' ) );
	}

	/**
	 * Do Not Send Emails If settings page.
	 * 
	 * @since 1.0.0
	 */
	public function dnsei_settings_page() {
		?>
			<div id="root">
			</div>
		<?php
	}

	/**
	 * Load assets in the plugin's settings page.
	 *
	 * @since 1.0.0
	 */
	public function load_assets() {
		global $current_screen;

		if ( 'settings_page_do-not-send-emails-if' !== $current_screen->id ) {
			return;
		}

		$params = array(
			'ajax_url'       => admin_url( 'admin-ajax.php' ),
			'settings_nonce' => wp_create_nonce( 'dnsei_settings' ),
		);

		wp_enqueue_style( 'dnsei-admin-style', plugins_url( 'assets/css/style.css', DO_NOT_SEND_EMAILS_IF_PLUGIN_FILE ), array(), DO_NOT_SEND_EMAILS_IF_VERSION, $media = 'all' );

		wp_enqueue_script( 'dnsei-settings-script', plugins_url( 'assets/js/admin/settings.min.js', DO_NOT_SEND_EMAILS_IF_PLUGIN_FILE ), array( 'wp-element', 'wp-i18n' ), DO_NOT_SEND_EMAILS_IF_VERSION, false );
		
		wp_localize_script(
			'dnsei-settings-script',
			'dnsei_plugins_params',
			$params
		);
	}
}