import { html } from 'lit'

import './lazy-load.js'

export default ({ src, loading = 'Loading...' }) => html`
<lazy-load src=${src}>
    <div class="loading">${loading}</div>
	<div class="error"></div>
</lazy-load>`