import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

export default function Group() {

	const addNewRow = (e) => {
		e.preventDefault();

		setAddNewRowCount( addNewRowCount + 1 );
	}

	const [addNewRowCount, setAddNewRowCount] = useState( 1 );

	return (
		<div className="do-not-send-emails-if-conditional-group">

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
					<option> { __( 'is', 'do-not-send-emails-if' ) } </option>
					<option> { __( 'is not', 'do-not-send-emails-if' ) } </option>
					<option> { __( 'contains', 'do-not-send-emails-if' ) } </option>
					<option> { __( 'does not contain', 'do-not-send-emails-if' ) } </option>
				</select>
			</div>

			<div className="do-not-send-emails-if-result">
				<input type="text" name="do-not-send-emails-if-result"/>
			</div>

			<div className="do-not-send-emails-if-plus">
				<button onClick={addNewRow} className="button-primary">{ __( 'And', 'do-not-send-emails-if' ) }</button>
			</div>

			<div className="do-not-send-emails-if-minus">
				<span class="dashicons dashicons-trash"></span>
			</div>

		</div>
	)
}