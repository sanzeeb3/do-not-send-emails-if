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
            
            <div className="do-not-send-emails-if-conditional-settings">
                <div className="do-not-send-emails-if-condition">
                    <select name="">
                        <option>To Email</option>
                        <option>From Email</option>
                        <option>Email Subject</option>
                        <option>Email Content</option>
                    </select>
                </div>
                
                <div className="do-not-send-emails-if-matches">
                    <select name="">
                        <option>is</option>
                        <option>is not</option>
                        <option>emtpy</option>
                        <option>not emtpy</option>
                        <option>contains</option>
                        <option>does not contain</option>
                    </select>
                </div>
                
                <div className="do-not-send-emails-if-result">
                    <input type="text"/>
                </div>

            </div>

            <p className="submit">
                <button type="submit" className="button-primary">Save</button>
            </p>

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