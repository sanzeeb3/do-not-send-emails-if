import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

export default function Group() {

	const addNewRow = (e) => {
		e.preventDefault();

 		var dataId = parseInt( e.target.getAttribute('data-id') );

 		dataId = dataId + 1;

 		// addNewRowCount = [ ...addNewRowCount, dataId ];

 		setAddNewRowCount( [ ...addNewRowCount, dataId ] );
	}

	const deleteRow = (e) => {
		e.preventDefault();

		var dataId = e.target.getAttribute('data-id');
	}

	const [addNewRowCount, setAddNewRowCount] = useState( [] );

	function andBlock( dataId = 0 ) {
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
					<button data-id={dataId} onClick={addNewRow} className="button-primary">{ __( 'AND', 'do-not-send-emails-if' ) }</button>
				</div>

				<div className="do-not-send-emails-if-minus">
					<span data-id={dataId} onClick={deleteRow} class="dashicons dashicons-trash"></span>
				</div>

			</div>
		);
	}

	// var orBlock = (
	// 	<div className="do-not-send-emails-if-or-group">
	// 		<div className="do-not-send-emails-if-conditional-groups">
	// 			{andBlock()}
	// 		</div>

	// 		<p> { __( 'or', 'do-not-send-emails-if') }, </p>
	// 	</div>
	// );
	//
	console.log( addNewRowCount );

	addNewRowCount.sort();

	// addNewRowCount.forEach( element => {
	// 	var andBlockGroup = [ ...andBlockGroup, andBlock( element ) ]
	// });

	for ( const val of addNewRowCount ) {
		var andBlockGroup = [ ...andBlockGroup, andBlock( val ) ]
	}


	return (
		<div className="do-not-send-emails-if-conditional-settings">

			{ andBlockGroup ? andBlockGroup : andBlock(0) }

			<div className="do-not-send-emails-if-add-new-group">
				<button className="button-secondary">{__('Add New Group', 'do-not-send-emails-if')}</button>
			</div>

		</div>
	)
}
