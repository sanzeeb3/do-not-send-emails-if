import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

export default function Group() {

	const addNewRow = (e) => {
		e.preventDefault();
		setAddNewRowCount( addNewRowCount + 1 );
	}

	const deleteRow = (e) => {
		e.preventDefault();

		if ( addNewRowCount > 1 ) {
			setAddNewRowCount( addNewRowCount - 1 );
		}
	}

	const addNewGroup  = (e) => {
		e.preventDefault();

		setAddNewOrCount( addNewOrCount + 1 );
	}

	const [addNewRowCount, setAddNewRowCount] = useState( 1 );
	const [addNewOrCount, setAddNewOrCount] = useState( 1 );

	var andBlock = (
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
				<button onClick={addNewRow} className="button-primary">{ __( 'AND', 'do-not-send-emails-if' ) }</button>
			</div>

			<div className="do-not-send-emails-if-minus">
				<span onClick={deleteRow} class="dashicons dashicons-trash"></span>
			</div>

		</div>
	);

	var orBlock = (
		<div className="do-not-send-emails-if-or-group">
			<div className="do-not-send-emails-if-conditional-groups">
				{andBlock}
			</div>

			<p> { __( 'or', 'do-not-send-emails-if') }, </p>
		</div>
	);

	for ( let i=0; i<addNewRowCount; i++ ) {
		var	andBlockGroup = [ ...andBlockGroup, andBlock ];
	}

	for ( let i=0; i<addNewOrCount; i++ ) {
		var	orBlockGroup = [ ...orBlockGroup, orBlock ];
	}

	var altogether = [andBlockGroup, orBlockGroup];

	return (
		<div className="do-not-send-emails-if-conditional-settings">

			{altogether}

			<div className="do-not-send-emails-if-add-new-group">
				<button onClick={addNewGroup} className="button-secondary">{__('Add New Group', 'do-not-send-emails-if')}</button>
			</div>

		</div>
	)
}
