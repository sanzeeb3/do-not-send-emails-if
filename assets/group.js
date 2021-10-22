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

	const handleConditionChange = (e) => {
		setSelectConditionValue( e.target.value );
	}

	const handleMatchesChange = (e) => {
		setSelectMatchesValue( e.target.value );
	}

	if ( ! dnsei_plugin_params.settings ) {
		var count    = 1;
	} else {
		var count = dnsei_plugin_params.settings.condition.length;
	}

	const [ rows, setRows ] = useState( count  );

	function andBlock( dataId, settings ) {

		const [ selectConditionValue, setSelectConditionValue ] = useState(  settings.condition[dataId]  );
		const [ selectMatchesValue, setSelectMatchesValue ] = useState( settings.matches[dataId]  );

		return (
			<div key={dataId} className="do-not-send-emails-if-conditional-group">

				<div className="do-not-send-emails-if-condition">
					<select onChange={handleConditionChange} value={selectConditionValue} name="do-not-send-emails-if-condition[]">
						<option> { __( 'To Email', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'From Email', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'Email Subject', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'Email Message', 'do-not-send-emails-if' ) } </option>
					</select>
				</div>

				<div className="do-not-send-emails-if-matches">
					<select onChange={handleMatchesChange} value={selectMatchesValue}  name="do-not-send-emails-if-matches[]">
						<option> { __( 'is', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'is not', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'contains', 'do-not-send-emails-if' ) } </option>
						<option> { __( 'does not contain', 'do-not-send-emails-if' ) } </option>
					</select>
				</div>

				<div className="do-not-send-emails-if-result">
					<input defaultValue={settings.result[dataId]} type="text" name="do-not-send-emails-if-result[]"/>
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

	for ( let i=0; i<rows; i++ ) {

		var block = [ ...block, andBlock( i, dnsei_plugin_params.settings ) ]
	}

	return (
		<div className="do-not-send-emails-if-conditional-settings">
			{block}
		</div>
	)
}
