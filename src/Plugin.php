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

		add_filter( 'pre_wp_mail', array( $this, 'plugin_in_action' ), PHP_INT_MAX, 2 );

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
	 * Returning a non-null value will short-circuit wp_mail(), returning that value instead. A boolean return value should be used to indicate whether the email was successfully sent.
	 *
	 * @param null|bool $return Short-circuit return value.
	 * @param array     $atts Array of the wp_mail() arguments.
	 *
	 * @since 1.0.0
	 *
	 * @return null|bool Short-circuit return value..
	 */
	public function plugin_in_action( $return, $atts ) { //phpcs:ignore Generic.Metrics.CyclomaticComplexity.MaxExceeded, Generic.Metrics.NestingLevel.MaxExceeded
		$settings = get_option( 'do_not_send_emails_if' );

		foreach ( $settings['condition'] as $key => $condition ) {

			switch ( $settings['matches'][ $key ] ) {
				case 'is':
					foreach ( $atts as $email_attr => $value ) {
						if ( $email_attr === $condition && $value === $settings['result'][ $key ] ) {
							return false;
						}
					}

					break;

				case 'is not':
					foreach ( $atts as $email_attr => $value ) {
						if ( $email_attr === $condition && $value !== $settings['result'][ $key ] ) {
							return false;
						}
					}

					break;

				case 'contains':
					foreach ( $atts as $email_attr => $value ) {
						if ( $email_attr === $condition && strpos( $value, $settings['result'][ $key ] ) !== false ) {
							return false;
						}
					}

					break;

				case 'does not contain':
					foreach ( $atts as $email_attr => $value ) {
						if ( $email_attr === $condition && strpos( $value, $settings['result'][ $key ] ) === false ) {
							return false;
						}
					}
					break;
			}//end switch
		}//end foreach

		return null;
	}
}
