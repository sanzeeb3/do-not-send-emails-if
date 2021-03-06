/**
 * Admin JS.
 * 
 * global dnsei_plugin_params
 *
 * @since 1.0.0
 */

import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import Group from './group';

export default function Settings() {

	return (
		<div id="do-not-send-emails-if-settings">
			<h2> { __( 'Do Not Send Emails If', 'do-not-send-emails-if' ) } </h2>

			<form id="do-not-send-emails-if-settings" method="post">

				<Group/>

				<input type="hidden" id="dnsei-settings-save-nonce" name="do_not_send_emails_if_settings_nonce" value={dnsei_plugin_params.settings_nonce} />

				<p className="submit">
					<button type="submit" className="button-primary">Save Changes</button>
				</p>

			</form>
		</div>
	)
}

document.addEventListener( "DOMContentLoaded", function(event) {

	const App = document.getElementById( 'root' );

	if ( App ) {

		render(
			<Settings />,
			App
		)
	}
});
