import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

export default function Group() {

	var condition = dnsei_plugin_params.settings.condition ? dnsei_plugin_params.settings.condition : [];
	var matches   = dnsei_plugin_params.settings.matches ? dnsei_plugin_params.settings.matches : [];
	var result    = dnsei_plugin_params.settings.result ? dnsei_plugin_params.settings.result : [];

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

	if ( ! dnsei_plugin_params.settings ) {
		var count    = 1;
	} else {
		var count = dnsei_plugin_params.settings.condition.length;
	}

	const [ rows, setRows ] = useState( count  );

	for ( let i=0; i<rows; i++ ) {

		var block = [ ...block, andBlock( i ) ]
	}

	function andBlock( dataId ) {

		return (
			<div key={dataId} className="do-not-send-emails-if-conditional-group">

				<div className="do-not-send-emails-if-condition">
					<select data-id={dataId} defaultValue={condition[dataId]} name="do-not-send-emails-if-condition[]">
						<option> { __( '-- Select --', 'do-not-send-emails-if' ) } </option>
						<option value="to"> { __( 'To Email', 'do-not-send-emails-if' ) } </option>
						<option value="subject"> { __( 'Email Subject', 'do-not-send-emails-if' ) } </option>
						<option value="message"> { __( 'Email Message', 'do-not-send-emails-if' ) } </option>
					</select>
				</div>

				<div className="do-not-send-emails-if-matches">
					<select data-id={dataId} defaultValue={matches[dataId]}  name="do-not-send-emails-if-matches[]">
						<option> { __( '-- Select --', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'is', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'is not', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'contains', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'does not contain', 'do-not-send-emails-if' ) } </option>
					</select>
				</div>

				<div className="do-not-send-emails-if-result">
					<input defaultValue={result[dataId]} type="text" name="do-not-send-emails-if-result[]"/>
				</div>

				<div className="do-not-send-emails-if-plus">
					<button data-id={dataId} onClick={createNewRow} className="button-secondary">{ __( 'Add', 'do-not-send-emails-if' ) }</button>
				</div>

				<div className="do-not-send-emails-if-minus">
					<button data-id={dataId} onClick={deleteRow} className="button-secondary">{ __( 'Remove', 'do-not-send-emails-if' ) }</button>
				</div>

			</div>
		);
	}

	return (
		<div className="do-not-send-emails-if-conditional-settings">
			{block}
		</div>
	)
}
