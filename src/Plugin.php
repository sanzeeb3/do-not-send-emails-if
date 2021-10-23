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

		add_filter( 'pre_wp_mail', array( $this, 'prepare_block' ), PHP_INT_MAX, 2 );

		$classes = array( 'Settings' );

		foreach ( $classes as $class ) {
			if ( \class_exists( __NAMESPACE__ . '\\' . $class ) ) {
				$class = __NAMESPACE__ . '\\' . $class;
				$obj   = new $class();
				$obj->init();
			}
		}
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

	/**
	 * Plugin in action. That is, block an email if condition matches.
	 *
	 * @since 1.0.0
	 *
	 * @return void.
	 */
	public function prepare_block( $return, $atts ) {
		$settings = get_option( 'do_not_send_emails_if' );

		foreach ( $settings['condition'] as $key => $condition ) {

			switch ( $settings['matches'][ $key ] ) {
				case 'is':
					if ( 'To Email' === $condition && $atts['to'] === $settings['result'][ $key ] ) {
						return false;
					}

					if ( 'Email Subject' === $condition && $atts['subject'] === $settings['result'][ $key ] ) {
						return false;
					}

					if ( 'Email Message' === $condition && $atts['message'] === $settings['result'][ $key ] ) {
						return false;
					}

					break;

				case 'is not':
					if ( 'To Email' === $condition && $atts['to'] !== $settings['result'][ $key ] ) {
						return false;
					}

					if ( 'Email Subject' === $condition && $atts['subject'] !== $settings['result'][ $key ] ) {
						return false;
					}

					if ( 'Email Message' === $condition && $atts['message'] !== $settings['result'][ $key ] ) {
						return false;
					}

					break;

				case 'contains':
					if ( 'To Email' === $condition && strpos( $atts['to'], $settings['result'][ $key ] ) !== false ) {
						return false;
					}

					if ( 'Email Subject' === $condition && strpos( $atts['subject'], $settings['result'][ $key ] ) !== false ) {
						return false;
					}

					if ( 'Email Message' === $condition && strpos( $atts['message'], $settings['result'][ $key ] ) !== false ) {
						return false;
					}

					break;

				case 'does not contain':

					if ( 'To Email' === $condition && strpos( $atts['to'], $settings['result'][ $key ] ) === false ) {
						return false;
					}

					if ( 'Email Subject' === $condition && strpos( $atts['subject'], $settings['result'][ $key ] ) === false ) {
						return false;
					}

					if ( 'Email Message' === $condition && strpos( $atts['message'], $settings['result'][ $key ] ) === false ) {
						return false;
					}
					break;
			}//end switch
		}//end foreach

		return null;
	}
}
