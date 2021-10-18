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

export default function Settings() {
    return (
        <div id="do-not-send-emails-if-settings">
            <h2> { __( 'Do Not Send Emails If', 'do-not-send-emails-if' ) } </h2>
            
            <form id="do-not-send-emails-if-settings" method="post">

                <div className="do-not-send-emails-if-conditional-settings">
                    <div className="do-not-send-emails-if-condition">
                        <select name="do-not-send-emails-if-condition">
                            <option> { __( 'To Email', 'do-not-send-emails-if' ) } </option>
                            <option> { __( 'From Email', 'do-not-send-emails-if' ) } </option>
                            <option> { __( 'Email Subject', 'do-not-send-emails-if' ) } </option>
                            <option> { __( 'Email Message', 'do-not-send-emails-if' ) } </option>
                        </select>
                    </div>

                    <div className="do-not-send-emails-if-matches">
                        <select name="do-not-send-emails-if-matches">
                            <option> { __( 'is', 'do-not-send-emails-if' ) }</option>
                            <option>{ __( 'is not', 'do-not-send-emails-if' ) }</option>
                            <option>{ __( 'empty', 'do-not-send-emails-if' ) } </option>
                            <option>{ __( 'not empty', 'do-not-send-emails-if' ) } </option>
                            <option>{ __( 'contains', 'do-not-send-emails-if' ) } </option>
                            <option>{ __( 'does not contain', 'do-not-send-emails-if' ) } </option>
                        </select>
                    </div>
                    
                    <div className="do-not-send-emails-if-result">
                        <input type="text" name="do-not-send-emails-if-result"/>
                    </div>

                </div>

                <input type="hidden" id="dnsei-settings-save-nonce" name="do_not_send_emails_if_settings_nonce" value={dnsei_plugins_params.settings_nonce} />

                <p className="submit">
                    <button type="submit" className="button-primary">Save</button>
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