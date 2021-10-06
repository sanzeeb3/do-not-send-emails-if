<?php
/**
 * Plugin Name: Do Not Send Emails If
 * Description: Do not send emails if conditions matches. You set the condition.
 * Version: 1.0.0
 * Author: Sanjeev Aryal
 * Author URI: http://www.sanjeebaryal.com.np
 * Text Domain: do-not-send-emails-if
 * Domain Path: /languages/
 *
 * @package    Do Not Send Emails If
 * @author     Sanjeev Aryal
 * @link       https://github.com/sanzeeb3/do-not-send-emails-if
 * @since      1.0.0
 * @license    GPL-3.0+
 */

defined( 'ABSPATH' ) || exit;

define( 'DO_NOT_SEND_EMAILS_IF_PLUGIN_FILE', __FILE__ );
define( 'DO_NOT_SEND_EMAILS_IF_PLUGIN_PATH', __DIR__ );

/**
 * Plugin version.
 */
const DO_NOT_SEND_EMAILS_IF_VERSION = '1.4.0';

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Return the main instance of Plugin Class.
 *
 * @since  1.0.0
 *
 * @return Plugin.
 */
function do_not_send_emails_if() {
	$instance = \DoNotSendEmailsIf\Plugin::get_instance();
	$instance->init();

	return $instance;
}

do_not_send_emails_if();
