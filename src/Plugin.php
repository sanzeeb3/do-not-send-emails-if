<?php

namespace DoNotSendEmailsIf;

defined( 'ABSPATH' ) || exit;
// Exit if accessed directly.

/**
 * Plugin Class.
 *
 * @since 1.0.0
 */
final class Plugin {

	/**
	 * Instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @var object
	 */
	protected static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return object A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Initialize.
	 *
	 * @since 1.0.0
	 */
	public function init() {
	}

	/**
	 * Load Localisation files.
	 *
	 * @since 1.0.0
	 *
	 * Note: the first-loaded translation file overrides any following ones if the same translation is present.
	 *
	 * Locales found in:
	 *      - WP_LANG_DIR/do-not-send-emails-if/do-not-send-emails-if-LOCALE.mo
	 *      - WP_LANG_DIR/plugins/do-not-send-emails-if-LOCALE.mo
	 */
	public function load_plugin_textdomain() {
		$locale = apply_filters( 'plugin_locale', get_locale(), 'do-not-send-emails-if' );

		load_textdomain( 'do-not-send-emails-if', WP_LANG_DIR . '/do-not-send-emails-if/do-not-send-emails-if-' . $locale . '.mo' );
		load_plugin_textdomain( 'do-not-send-emails-if', false, plugin_basename( dirname( DO_NOT_SEND_EMAILS_IF_PLUGIN_FILE ) ) . '/languages' );
	}
}
