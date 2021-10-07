<?php

namespace DoNotSendEmailsIf;

defined( 'ABSPATH' ) || exit;

/**
 * Do Not Send Emails If Settings.
 *
 * @since 1.1.2
 */
class Settings {

	/**
	 * Initialize.
	 *
	 * @since 1.1.2
	 */
	public function init() {
		add_action( 'admin_menu', array( $this, 'dnsei_register_setting_menu' ) );
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

	}
}
