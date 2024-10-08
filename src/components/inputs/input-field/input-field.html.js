import { html, nothing } from 'lit'

import './input-field.css'
import './input-field.js'

export default ({
	label,
	type = 'text',
	width = 'auto',
	id,
	name,
	value,
	autocomplete = 'off',
	placeholder,
	disabled = false,
	readonly = false,
	required = false,
	minlength,
	maxlength,
	step = 1,
	min = 0,
	max,
	pattern,
	validate,
	clearButton = false,
	clearLabel = 'Clear',
	spinButton = false,
	decrementLabel = 'Decrement',
	incrementLabel = 'Increment',
	prefix = '',
	suffix = '',
	error = '',
	description = '',
	remainingCount,
	integer = false,
	className,
}) => html`
<input-field
	value=${value || nothing}
	?integer=${type === 'number' && integer}
	validate=${validate || nothing}
	class=${className || nothing}
>
	<label for="${id}-input">${label}</label>
	<div class="row">
		<div class="group ${width}">
			${prefix && html`<span>${prefix}</span>`}
			<input
				type=${type}
				id="${id}-input"
				name=${name || id}
				value=${value || nothing}
				autocomplete=${autocomplete}
				placeholder=${placeholder || nothing}
				aria-invalid=${error ? 'true' : nothing}
				aria-errormessage=${error ? `${id}-error` : nothing}
				aria-describedby=${description ? `${id}-description` : nothing}
				?disabled=${disabled}
				?readonly=${readonly}
				?required=${required}
				minlength=${minlength || nothing}
				maxlength=${maxlength || nothing}
				min=${(type === 'number') && (typeof min === 'number') ? min : nothing}
				max=${(type === 'number') && (typeof max === 'number') ? max : nothing}
				step=${(type === 'number') ? (integer ? step : 'any') : nothing}
				pattern=${pattern || nothing}
			/>
			${clearButton
				? html`<button type="button" class="clear${!value && ' hidden'}" aria-label=${clearLabel}>×</button>`
				: nothing}
			${suffix && html`<span>${suffix}</span>`}
		</div>
		${(type === 'number') && spinButton && step ? html`<div class="spinbutton" data-step=${step}>
			<button type="button" class="decrement" aria-label=${decrementLabel}>−</button>
			<button type="button" class="increment" aria-label=${incrementLabel}>+</button>
		</div>` : nothing}
	</div>
	<p id="${id}-error" class="error" aria-live="assertive">${error}</p>
	<p id="${id}-description" class="description" aria-live="polite" data-remaining=${remainingCount || nothing}>${description}</p>
</input-field>`
