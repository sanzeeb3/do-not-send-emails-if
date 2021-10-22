import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

export default function Group() {

	const createNewRow = (e) => {
		e.preventDefault();
		setRows( rows + 1 );
	}

	const deleteRow = (e) => {
		e.preventDefault();

		if ( rows > 1 ) {
			setRows( rows - 1 );
		}
	}

	const [ rows, setRows ] = useState( 1 );

	function andBlock( dataId ) {
		return (
			<div className="do-not-send-emails-if-conditional-group">

				<div className="do-not-send-emails-if-condition">
					<select name="do-not-send-emails-if-condition[]">
						<option> { __( 'To Email', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'From Email', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'Email Subject', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'Email Message', 'do-not-send-emails-if' ) } </option>
					</select>
				</div>

				<div className="do-not-send-emails-if-matches">
					<select name="do-not-send-emails-if-matches[]">
						<option> { __( 'is', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'is not', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'contains', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'does not contain', 'do-not-send-emails-if' ) } </option>
					</select>
				</div>

				<div className="do-not-send-emails-if-result">
					<input type="text" name="do-not-send-emails-if-result[]"/>
				</div>

				<div className="do-not-send-emails-if-plus">
					<span data-id={dataId} onClick={createNewRow} class="dashicons dashicons-plus-alt"></span>
				</div>

				<div className="do-not-send-emails-if-minus">
					<span data-id={dataId} onClick={deleteRow} class="dashicons dashicons-trash"></span>
				</div>

			</div>
		);
	}

	for ( let i=0; i<rows; i++ ) {
		var block = [ ...block, andBlock( i ) ]
	}

	return (
		<div className="do-not-send-emails-if-conditional-settings">
			{block}
		</div>
	)
}
