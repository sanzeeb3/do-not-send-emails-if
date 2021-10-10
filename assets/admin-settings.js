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
        <h1> { __( 'Do Not Send Emails If', 'do-not-send-emails-if' ) } </h1>
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