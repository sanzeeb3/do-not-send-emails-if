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
		add_action( 'admin_init', array( $this, 'save_settings' ) );
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
			'settings'       => get_option( 'do_not_send_emails_if ' ),
		);

		wp_enqueue_style( 'dnsei-admin-style', plugins_url( 'assets/admin-styles.css', DO_NOT_SEND_EMAILS_IF_PLUGIN_FILE ), array(), DO_NOT_SEND_EMAILS_IF_VERSION, $media = 'all' );

		wp_enqueue_script( 'dnsei-settings-script', plugins_url( 'assets/admin-settings.min.js', DO_NOT_SEND_EMAILS_IF_PLUGIN_FILE ), array( 'wp-element', 'wp-i18n' ), DO_NOT_SEND_EMAILS_IF_VERSION, false );

		wp_localize_script(
			'dnsei-settings-script',
			'dnsei_plugin_params',
			$params
		);
	}

	/**
	 * Save settings.
	 *
	 * @since 1.0.0
	 */
	public function save_settings() {

		if ( empty( $_POST['do_not_send_emails_if_settings_nonce'] ) ) {
			return;
		}

		check_admin_referer( 'dnsei_settings', 'do_not_send_emails_if_settings_nonce' );

		$condition = isset( $_POST['do-not-send-emails-if-condition'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['do-not-send-emails-if-condition'] ) ) : array();
		$matches   = isset( $_POST['do-not-send-emails-if-matches'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['do-not-send-emails-if-matches'] ) ) : array();
		$result    = isset( $_POST['do-not-send-emails-if-result'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['do-not-send-emails-if-result'] ) ) : array();

		$inputs = array(
			'condition' => $condition,
			'matches'   => $matches,
			'result'    => $result,
		);

		update_option( 'do_not_send_emails_if', $inputs );

		add_action(
			'admin_notices',
			static function () {
				?>
				<div class="notice notice-success do-not-send-emails-if-notice is-dismissible">
					<p><strong><?php echo esc_html__( 'Your settings have been saved.', 'do-not-send-emails-if' ); ?></strong></p>
				</div>
				<?php
			}
		);
	}
}
